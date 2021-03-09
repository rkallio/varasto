#!/usr/bin/env bash

trap 'exit' ERR

usage () {
    echo "Usage: $0 -s <secret> -e <email> -d <domain>" 1>&2
    exit 1
}

while getopts 's:d:e:' option;
do
    case "${option}"
    in
        s)
            secret=${OPTARG}
            ;;
        d)
            domain=${OPTARG}
            ;;
        e)
            email=${OPTARG}
            ;;
        *)
            usage
            ;;
    esac
done

shift $((OPTIND - 1))

if [ -z "${secret}" ]
then
    usage
fi

if [ -z "${email}" ]
then
    usage
fi

if [ -z "${domain}" ]
then
    usage
fi

set -x

dnf up -y
dnf install -y epel-release podman
dnf install -y certbot

if [ ! -d /etc/letsencrypt/live ]
then
    certbot certonly --standalone --non-interactive --agree-tos \
            --email ${email} \
            --domains ${domain}
fi

podman pull rkallio/varasto-http-api:latest
podman pull rkallio/varasto-httpd:latest

if podman pod exists varasto
then
    podman pod rm --force varasto
fi

podman pod create -p 443:443 --hostname varasto --name varasto

podman create \
       --volume /etc/letsencrypt:/usr/ssl/:Z \
       --name varasto-httpd --pod varasto \
       --env HTTPD_SERVER_ADMIN="${email}" \
       --env HTTPD_SERVER_NAME="${domain}" \
       rkallio/varasto-httpd:latest

mkdir -p /var/lib/varasto

podman create \
       --volume /var/lib/varasto:/var/lib/varasto:Z \
       --name varasto-api --pod varasto \
       rkallio/varasto-http-api:latest --jwt-secret="${secret}"

podman pod start varasto
