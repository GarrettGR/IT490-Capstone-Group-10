#!/bin/bash

sudo apt-get update && sudo apt-get upgrade -y
sudo apt install bridge-utils qemu-kvm qemu-utils virtinst libvirt-daemon virt-manager -y

if [[ ! kvm-ok ]]; then
	echo "Virtualization acceleration is not available on this system"
	return 1
fi

net_config="$(cat <<-EOF
<network>
  <name>vmbr0</name>
  <forward mode="route"/>
  <bridge name="vmbr0" stp="on" delay="0"/>
  <ip address="145.40.76.248" netmask="255.255.255.248">
    <dhcp>
      <range start="145.40.76.249" end="145.40.76.254"/>
    </dhcp>
  </ip>
</network>
EOF
)"

echo "$net_config" > ${HOME}/kvm_network.xml

sudo virsh net-define ${HOME}/kvm_network.xml
sudo virsh net-autostart vmbr0
sudo virsh net-start vmbr0
sudo systemctl restart libvirtd.service
sudo sed -i "/net.ipv4.ip_forward=1/ s/# *//" /etc/sysctl.conf
sudo usermod -a -G libvirt ${USER}

cd /var/lib/libvirt/images
sudo wget https://releases.ubuntu.com/jammy/ubuntu-22.04.5-desktop-amd64.iso
sudo mount /var/lib/libvirt/images/ubuntu-22.04.5-desktop-amd64.iso /mnt
sudo virt-install --name Ubuntu-VM --os-variant ubuntu22.04 --vcpus 6 --memory 8192 --location /var/lib/libvirt/images/ubuntu-22.04.5-desktop.iso,kernel=casper/vmlinuz,initrd=casper/initrd --network bridge=vmbr0 --graphics vnc,listen=0.0.0.0 --disk size=40 --console pty,target_type=serial --noautoconsole

sudo virsh net-dhcp-leases vmbr0
sudo virsh list 
sudo echo "to connect to the VM and finish its installation, run 'ssh username@vm-ip-address' or connect via a VNC viewer of your choice"
