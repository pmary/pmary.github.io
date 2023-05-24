---
layout: post
title:  "Backup your Linux server to Amazon S3"
date:   2015-03-12 13:46:40
categories: amazon linux
comments: true
language: en
---
I needed to backup some databases and web files from my Ubuntu server.  

**Prerequisites**

Set up this backup will require a few things:

- ssh access to your server
- sudo permissions
- an amazon s3 account
- some basic knowledge about command line

**What will we do**

Of course, you may need to adapt this recipe to you needs. In this case, I just want a couple things to happen:

- back up the databases
- back up the web files
- back up the vhost configuration

**Step 1. Install the aws-cli**

The easy way to get aws-cli is to install it with pip, which requiered to have both python and pip installed:

```other
sudo apt-get install -y python-pip
sudo pip install awscli
```
You can find more about it in the official documentation [https://aws.amazon.com/en/cli/](https://aws.amazon.com/en/cli/)

**Step 2. configure the s3 storage setting**  

After installing the package we need to configure the s3cmd to user our bucket. Type the following command to process:

```other
aws configure
```

You will be prompted to enter the configuration. Here is an example of what you should have:

```other
AWS Access Key ID [None]: YOLO404
AWS Secret Access Key [None]: LoR3MIpSum+doLOLsitAmEt
Default region name [None]: us-west-2
Default output format [None]: json
```

**Step 3. Create an S3 bucket in Amazon from command line**

We need to create a Bucket to upload our files using aws-cli and we can do it in a single simple command:

```other
aws s3 mb s3://myserver_backups
```

**Step 4. Write the backup script**

First, I need a place to keep the backups. For my server’s setup, `/var/www/_backups/` makes sense.

```other
mkdir /var/www/_backups
```

Then, I create a backup.sh file in my home directory:

```other
#!/bin/sh
THEDBUSER=\"myDatabaseUsername\"
THEDBPW=\"myDatabasePassword\"
THEDATE=`date +%d%m%y%H%M`
# Export all the databases
mysqldump -u $THEDBUSER -p${THEDBPW} --all-databases > /var/www/_backups/dbbackup_${THEDATE}.sql
# Remove backups older than 31 days
find /var/www/_backups/site* -mtime +31 -exec rm {} \\;
find /var/www/_backups/apache* -mtime +31 -exec rm {} \\;
find /var/www/_backups/db* -mtime +31 -exec rm {} \\;
# Export files
tar czf /var/www/_backups/sitebackup_${THEDATE}.tar -C / var/www/docs
# Export the Apache vhosts configuration
tar czf /var/www/_backups/apachebackup_${THEDATE}.tar -C / etc/apache2/sites-available
# Sync to amazon. With the 'delete' option, the files removed from
# /var/www/_backups will be removed from the bucket as well
aws s3 sync /var/www/_backups s3://my-bucket-name --delete
```

Make that script executable with chmod +x backup.sh and test it.

```other
chmod +x backup.sh
./backup.sh
```

If all is well, edit your crontab with ‘crontab -e’ and append something like:

```other
0 3 * * * /path/to/backup.sh > /dev/null 2>&1
```

That runs everyday at 3am (according to the server’s clock) and pipes any output.
