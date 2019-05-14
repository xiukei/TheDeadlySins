# Ansible Deployment Guide
The system deployment is using ansible-playbook.
The guide lists below.

## Ansible Installation
### Linux (Ubuntu)
Use apt-get to install ansible.

```bash
sudo apt-get update && sudo apt-get install software-properties-common
sudo apt-add-repository --yes --update ppa:ansible/ansible
sudo apt-get install ansible
```

### macOS
Use [Brew](https://brew.sh/) or [pip](https://pip.pypa.io/en/stable/) to install.
```bash
brew install ansible
sudo pip install ansible
```

### Windows 10 (WSL)
1. Install [Windows Subsystem for linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10)
2. Install Ansible as Linux (Ubuntu)

## System Deployment
1. Run run-nectar.sh which can deploy 4 instances with volumes and security groups attached on Nectar.
```bash
./run-nectar.sh
```
It will prompt to enter openstackapi password which store in openstack-api-password.txt and sudo password.

if facing \r problem or could not find yaml file, install dos2unix to change format.
```bash
sudo apt-get install dos2unix
dos2unix run-nectar.sh
```
if key permission problem
```bash
chmod 600 new.key
```
2. Create internal security group and attach it to group41_2, group41_3, group41_4

3. Run run-install.sh which will install required software packages, deploy couchdb cluster, harvester as well as web server.
```bash
./run-install.sh
```

## Ansible Documentation
[Link to Ansible Documentation](https://doc.ansible.com/ansible/latest/installation_guide/intro_installation.html)