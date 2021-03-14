#!/usr/bin/env bash

trap 'exit' ERR

usage () {
    echo "Usage: $0 -s <secret> -t <tag>" 1>&2
    exit 1
}

while getopts 's:t:' option;
do
    case "${option}"
    in
        s)
            secret=${OPTARG}
            ;;
        t)
            tag=${OPTARG}
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

if [ -z "${tag}" ]
then
    usage
fi

set -x

mkdir -p /tmp/varasto/sqlite

if [ ! -d /tmp/varasto/ssl/ ]
then
    mkdir -p /tmp/varasto/ssl/live/localhost/
    printf "\n\n\n\n\nlocalhost\n${USER}@localhost\n" \
        | openssl req \-x509 -newkey rsa:4096 -nodes \
                  -keyout /tmp/varasto/ssl/live/localhost/privkey.pem \
                  -out /tmp/varasto/ssl/live/localhost/fullchain.pem \
                  -days 365
fi

if podman pod exists varasto
then
    podman pod rm --force varasto
fi

podman pod create -p4443:443 --hostname varasto --name varasto

podman create \
       --volume /tmp/varasto/ssl/:/usr/ssl/:Z \
       --name varasto-httpd --pod varasto \
       --env HTTPD_SERVER_ADMIN="${USER}@localhost" \
       --env HTTPD_SERVER_NAME='localhost' \
       rkallio/varasto-httpd:"${tag}"

podman create \
       --volume /tmp/varasto/sqlite/:/var/lib/varasto/:Z \
       --name varasto-api --pod varasto \
       rkallio/varasto-http-api:"${tag}" --jwt-secret="${secret}"

podman pod start varasto
