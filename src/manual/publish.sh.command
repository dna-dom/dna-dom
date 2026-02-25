#!/bin/bash
#######################
# dna-dom             #
# Publish Manual      #
# https://dna-dom.org #
#######################

# To make this file runnable:
#     $ chmod +x *.sh.command

banner="Publish Manual --> dna-dom.org"
projectHome=$(cd $(dirname $0)/../..; pwd)
pkgInstallHome=$(dirname $(dirname $(which httpd)))
apacheCfg=$pkgInstallHome/etc/httpd
apacheLog=$pkgInstallHome/var/log/httpd/error_log
webDocRoot=$(grep ^DocumentRoot $apacheCfg/httpd.conf | awk -F'"' '{ print $2 }')
cliFlagMsg="Use the '--no-server' flag to skip the interactive web server."
cliFlag=$1

displayIntro() {
   cd $projectHome
   echo
   echo $banner
   echo $(echo $banner | sed s/./=/g)
   pwd
   echo
   }

buildHtmlFiles() {
   cd $projectHome
   echo "Tasks:"
   folderListing="$projectHome/../^gists/folder-listing.php/folder-listing.php"
   test -f $folderListing && cp -v $folderListing src/manual/static/api/index.php
   npm run build-manual
   npm run validate-html
   echo
   }

publishWebFiles() {
   cd $projectHome
   publishSite=$webDocRoot/centerkey.com
   publishFolder=$publishSite/www.dna-dom.org
   publish() {
      echo "Publishing:"
      echo $publishSite
      rm -rf $publishFolder
      mkdir $publishFolder
      cp -R build/manual/3-prod/* $publishFolder
      ls -o $publishSite | grep dna
      test -x "$(which tree)" && tree $publishFolder
      }
   test -w $publishSite && publish
   }

interactiveServer() {
   cd $projectHome
   test "$cliFlag" = "--no-server" && echo "Skipping interactive server (--no-server)." || echo $cliFlagMsg
   test "$cliFlag" != "--no-server" && npm run interactive
   echo
   }

displayIntro
buildHtmlFiles
publishWebFiles
interactiveServer
