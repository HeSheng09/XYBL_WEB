#! /bin/bash
rm -f /root/.forever/forever.log
forever start -l forever.log -o ../log/out.log -e ../log/err.log ./www