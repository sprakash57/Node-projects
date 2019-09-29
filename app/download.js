const http = require("http");
const fs = require("fs");
const path = require("path");
const uuidV1 = require("uuid/v1");

const downloadPage = (url = "http://nodeprogram.com") => {
  console.log("downloading ", url);
  const fetchPageData = (url, callback) => {
    http
      .get(url, response => {
        let buff = "";
        response.on("data", chunk => (buff += chunk));
        response.on("end", () => callback(null, buff));
      })
      .on("error", err => {
        console.error(`Got error: ${err}`);
        callback(err);
      });
  };

  fetchPageData(url, (err, data) => {
    if (err) return console.log(err);
    const folderName = uuidV1();
    fs.mkdirSync(folderName);
    fs.appendFileSync("url.txt", url + "\n");
    fs.writeFileSync(path.join(__dirname, folderName, "file.html"), data);
  });
};

downloadPage(process.argv[2]);
