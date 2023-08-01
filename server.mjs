'use strict';
import { createServer } from 'http';
import Client from 'ssh2-sftp-client';
import csv from 'csvtojson';
const sftp = new Client();

createServer((req, res) => {
  const config = {
    host: 'sftp.paycomonline.net',
    port: 22,
    username: '000_0ry94_netsuite',
    password: 'c^2Xx)6Lg^9So!2L'
  };
  sftp.connect(config)
    .then(() => {
      return sftp.cwd();
    })
    .then(() => {
      return sftp.list('/Home/000_0ry94_netsuite/outbound');
    })
    .then(data => {
      data.sort((a, b) => {
        return b.modifyTime - a.modifyTime;
      });
      const latestFile = data[0].name;
      console.log(latestFile);
      res.write(JSON.stringify(jsonObj));
      // return sftp.get(`/Home/000_0ry94_netsuite/outbound/${latestFile}`);
    })
    .catch(err => {
      console.error(err.message);
      res.write(err.message);
      sftp.end();
      res.end();
    });
    /* .then(data => {
      // console.log(JSON.stringify(data));
      return csv().fromString(data.toString());
    })
    .then((jsonObj) => {
      // console.log(JSON.stringify(jsonObj));
      res.write(JSON.stringify(jsonObj));
      sftp.end();
      res.end();
    }) */
}).listen(process.env.PORT);