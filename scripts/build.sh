#!/usr/bin/env bash

trap 'exit' ERR

usage () {
    echo "Usage: $0 -c creds -v version" 1>&2
    exit 1
}

while getopts 'c:' option;
do
    case "${option}"
    in
        c)
            creds=${OPTARG}
            ;;
        v)
            version=${OPTARG}
            ;;
        *)
            usage
            ;;
    esac
done

shift $((OPTIND - 1))

if [ -z "${creds}" ]
then
    usage
fi

if [ -z "${version}" ]
then
    usage
fi

set -x

pushd ../web
podman build -t rkallio/varasto-httpd:"${version}" .
podman tag rkallio/varasto-httpd:"${version}" rkallio/varasto-httpd:latest
podman push rkallio/varasto-httpd:"${version}" --creds="${creds}"
podman push rkallio/varasto-httpd:latest --creds="${creds}"
popd
pushd ../api
podman build -t rkallio/varasto-http-api:"${version}" .
podman tag rkallio/varasto-http-api:"${version}" rkallio/varasto-http-api:latest
podman push rkallio/varasto-httpd:"${version}" --creds="${creds}"
podman push rkallio/varasto-httpd:latest --creds="${creds}"
popd
