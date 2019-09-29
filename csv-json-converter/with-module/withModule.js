const csvtojson = require('csvtojson');
const fs = require('fs');

csvtojson().fromFile('customer-data.xls').then(jsonObj => {
    fs.writeFile('customer-data.json', JSON.stringify(jsonObj, null, 2), err => {
        if (err) return process.exit(1);
        console.log('done');
        process.exit(0);
    });
}, err => console.log('Some error occured -->', err));
