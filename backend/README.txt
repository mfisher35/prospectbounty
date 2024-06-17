sudo npm -i pm2
pm2 startup
#exec output command, example: sudo env PATH=$PATH:/home/madfish/.nvm/versions/node/v20.12.2/bin /home/madfish/.nvm/versions/node/v20.12.2/lib/node_modules/pm2/bin/pm2 startup systemd -u madfish --hp /home/madfish
#exec output command of that, example: sudo systemctl enable pm2-madfish
pm2 start index.js
pm2 save
