/* eslint-disable no-console */
const pm2 = require('pm2');

const instances = process.env.WEB_CONCURRENCY || -1;
const maxMemory = process.env.WEB_MEMORY || 512;

pm2.connect(() => {
  pm2.start({
<<<<<<< HEAD
    script: 'app.js',
    instances: instances,
    max_memory_restart: `${maxMemory}M`,
    env: {
      NODE_ENV: 'production',
=======
    script: './src/app.js',
    instances: instances,
    max_memory_restart: `${maxMemory}M`,
    env: {
      NODE_ENV: 'prod',
>>>>>>> 16160f82ab9a22f85d42247e59b7fac3a2e2fb21
      NODE_PATH: '.'
    },
  }, (err) => {
    if (err) {
      return console.error('Error while launching applications', err.stack || err);
    }

    console.log('PM2 and application has been succesfully started');

    pm2.launchBus((err, bus) => {
      console.log('[PM2] Log streaming started');

      bus.on('log:out', (packet) => {
        console.log('[App:%s] %s', packet.process.name, packet.data);
      });

      bus.on('log:err', (packet) => {
        console.error('[App:%s][Err] %s', packet.process.name, packet.data);
      });
    });
  });
});