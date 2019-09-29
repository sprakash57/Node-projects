const fs = require("fs");

const parseXls = file => {
  fs.readFile(file, { encoding: "utf-8" }, (err, data) => {
    if (err) throw err;
    const csvRows = data.split("\n");
    let headers = csvRows[0];
    headers = headers.split(",");
    csvRows.shift();
    let json = [], index = 0;
    for (let item of csvRows) {
      let values = item.split(",");
      json[index] = {};
      for (let i = 0; i < headers.length; i++) {
        json[index][headers[i]] = values[i];
      }
      index++;
    }
    json = JSON.stringify(json).replace(/\\r/g, "");
    fs.writeFile("customer-data.json", json+'\n', err => {
      if (err) throw err;
      console.log("done");
    });
  });
};

parseXls(process.argv[2]);
