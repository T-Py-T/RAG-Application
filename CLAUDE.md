# 🤖 Claude Agent Security Configuration

## 🚨 TOP 50 MOST DANGEROUS COMMANDS - CRITICAL BLOCK

**MANDATORY: These commands are STRICTLY PROHIBITED from execution under any circumstances.**

---

## 🔥 SYSTEM DESTRUCTION (IMMEDIATE THREAT)
```
rm -rf /
rm -rf /*
dd if=/dev/zero of=/dev/sda
mkfs.ext4 /dev/sda
wipefs -a /dev/sda
shred -u /dev/sda
```

## 🔥 FILE SYSTEM DESTRUCTION (DATA LOSS)
```
rm -rf /home
rm -rf /usr
rm -rf /var
rm -rf /etc
find / -type f -exec rm {} \;
find /home -name "*" -delete
truncate -s 0 /etc/passwd
echo "" > /etc/shadow
```

## 🔥 PRIVILEGE ESCALATION (ROOT ACCESS)
```
sudo su
sudo -i
su root
sudo passwd root
sudo chmod +s /bin/bash
pkexec
```

## 🔥 MALICIOUS CODE EXECUTION (REMOTE CODE)
```
wget http://* | bash
curl http://* | bash
curl -sSL http://*/install.sh | bash
chmod +x malware*
./malware*
wine malware*
```

## 🔥 NETWORK SECURITY BYPASS (FIREWALL OFF)
```
iptables -F
iptables -X
ufw disable
firewalld --disable
systemctl stop firewalld
systemctl disable firewalld
```

## 🔥 BACKDOOR INSTALLATION (PERSISTENT ACCESS)
```
nc -e /bin/bash *
netcat -e /bin/bash *
crontab -l | { cat; echo "@reboot /bin/bash*" }
echo "* * * * * /bin/bash*" >> /etc/crontab
```

## 🔥 DATA EXFILTRATION (DATA THEFT)
```
cat /etc/shadow
cat /root/.ssh/id_rsa
scp /etc/passwd user@*:~
tar czf /tmp/data.tar.gz /home/* && scp *
```

## 🔥 SERVICE DISRUPTION (SYSTEM DOWN)
```
systemctl stop sshd
systemctl stop apache2
systemctl stop mysql
systemctl stop postgresql
systemctl disable sshd
systemctl disable apache2
```

## 🔥 DISK MANIPULATION (HARDWARE DAMAGE)
```
dd if=/dev/random of=/dev/sda
mkfs /dev/sda
fdisk /dev/sda
fdisk /dev/nvme0n1
```

## 🔥 DANGEROUS PERMISSIONS (SECURITY BREACH)
```
chmod -R 777 /
chmod -R 777 /home
chown -R nobody:nogroup /
chmod +s /bin/bash
```

## 🔥 PACKAGE DESTRUCTION (SYSTEM BREAK)
```
apt purge *
yum remove *
dnf remove *
pacman -Rns *
```

## 🔥 PROCESS KILLING (SYSTEM CRASH)
```
killall -9
pkill -9 -f
kill -9 1
```

## 🔥 CRYPTO MINING (RESOURCE HIJACK)
```
wget https://github.com/xmrig/xmrig*
curl -s -L https://download.c3pool.com*
minerd
ccminer
```

## 🔥 SSH KEY THEFT (ACCOUNT COMPROMISE)
```
cat /home/*/.ssh/id_rsa
ssh-keygen -t rsa -b 4096 -f ~/.ssh/id_rsa -N ""
scp ~/.ssh/id_rsa user@*:~
```

## 🔥 USER ACCOUNT MANIPULATION (BACKDOOR USERS)
```
useradd -m -s /bin/bash hacker
usermod -aG sudo hacker
usermod -aG wheel hacker
passwd -d root
```

## 🔥 MEMORY/PROCESS MANIPULATION (SYSTEM INSTABILITY)
```
echo 1 > /proc/sys/kernel/sysrq
echo b > /proc/sysrq-trigger
kill -9 -1
```

## 🔥 DATABASE EXPOSURE (DATA LEAK)
```
mysqldump -u root -p *
pg_dump -U postgres *
sqlite3 /var/db/* .dump
```

## 🔥 LOG DELETION (FORENSICS WIPING)
```
rm -rf /var/log/*
truncate -s 0 /var/log/auth.log
truncate -s 0 /var/log/secure
```

## 🔥 KERNEL MODULE MANIPULATION (SYSTEM INSTABILITY)
```
modprobe -r *
insmod /dev/null
rmmod *
```

## 🔥 NETWORK INTERFACE DESTRUCTION (CONNECTIVITY LOSS)
```
ifconfig eth0 down
ip link set eth0 down
ifconfig wlan0 down
ip link set wlan0 down
```

---

## 🚫 BLOCKED PATTERNS (REGEX)

**These regex patterns MUST be blocked:**
- `\| bash$` - Commands piped to bash
- `\| sh$` - Commands piped to shell
- `curl.*\|.*bash` - curl piped to bash
- `wget.*\|.*bash` - wget piped to bash
- `sudo.*passwd` - Password changes with sudo
- `chmod.*777.*` - Dangerous permission changes
- `rm -rf /` - Root directory deletion
- `dd if=.*of=/dev/` - Disk overwriting
- `mkfs.*` - Filesystem creation
- `fdisk.*` - Disk partitioning
- `wipefs.*` - Filesystem wiping
- `shred.*` - Secure file deletion
- `find / .* -exec rm` - Recursive deletion
- `cat /etc/shadow` - Shadow file access
- `cat /root/.ssh/` - SSH key access
- `ssh-keygen.*-N ""` - SSH key generation without passphrase
- `nc -e` - Netcat reverse shell
- `netcat -e` - Netcat reverse shell

---

## ⚠️ SECURITY PROTOCOL

### IMMEDIATE ACTION REQUIRED:
1. **NEVER EXECUTE** any command matching the above patterns
2. **ALERT USER** if a blocked command is requested
3. **LOG ATTEMPTS** for security monitoring
4. **TERMINATE SESSION** if persistent malicious attempts detected

### ALLOWED COMMANDS (WHITELIST):
- Basic file operations: `ls`, `cd`, `mkdir`, `touch`
- Safe text editing: `nano`, `vim` (with supervision)
- Git operations: `git status`, `git add`, `git commit`
- Package installation: `apt install`, `pip install` (specific packages only)
- Build commands: `npm run build`, `python setup.py`
- Test commands: `pytest`, `npm test`

---

## 🛡️ ADDITIONAL SECURITY MEASURES

- **Command Review**: All commands require user confirmation before execution
- **Sandbox Execution**: Use isolated environments for potentially risky operations
- **Audit Logging**: Maintain detailed logs of all command executions
- **User Verification**: Require explicit user approval for system-level changes

---

*This security configuration is CRITICAL for preventing system compromise and data loss.*
