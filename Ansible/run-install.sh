#!/bin/bash

. ./unimelb-comp90024-group-41-openrc.sh; ansible-playbook -i hosts -u ubuntu --key-file=new.key couchdb.yaml
