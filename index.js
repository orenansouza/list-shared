const fs = require('fs');

fs.readFile('/proc/net/arp', function (err, data) {
  if (!!err) return done(err, null);

  const output = [];
  const devices = data.toString().split('\n');
  devices.splice(0, 1);

  for (i = 0; i < devices.length; i++) {
    const cols = devices[i].replace(/ [ ]*/g, ' ').split(' ');
    if ((cols.length > 3) && (cols[0].length !== 0) && (cols[3].length !== 0 && cols[3] !== '00:00:00:00:00:00') ) {
      output.push({
        ip: cols[0],
        mac: cols[3]
      });
    }
  }

  console.log(output)
  // const result = getReports('/mnt');
  // if (result) console.log(result);
});

function getReports(dir) {
  let fileName = [];
  try {

    fs.readdirSync(dir)
      .forEach(file => {
        fileName.push(file);
      })
    return fileName
  } catch (error) {
  }
    console.log(error);
};

// sudo mount -t cifs //192.168.25.81/www /mnt/shared