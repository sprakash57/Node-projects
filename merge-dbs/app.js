const MongoClinet = require('mongodb').MongoClient;
const async = require('async');
const customers = require('./records/m3-customer-data.json.js');
const customerAddress = require('./records/m3-customer-address-data.json.js');

const url = 'mongodb://localhost:27017';
const noOfQueries = parseInt(process.argv[2], 10) || customers.length;

const client = new MongoClinet(url, {useUnifiedTopology: true});
let task = [];
client.connect((err, client) => {
    if(err) return process.exit(1);
    customers.forEach((customer, index) => {
        customers[index] = Object.assign(customer, customerAddress[index]);
        if (index % noOfQueries === 0) {
            let start = index;
            let end = (start + noOfQueries > customers.length ? customers.length - 1 : start + noOfQueries);
            console.log(`Processing data from ${start} to ${end}`);
            const db = client.db('ConnectMeDB');
            task.push((done) => {
                db.collection('customers').insertMany(customers.slice(start, end), (err, result) => {
                    if (err) done(err, result);
                    done(null, result);
                    console.log(`data inserted for ${start} to ${end}`);
                })
            })
        }
    })
    console.log(`Running ${task.length} task(s) in parallel`)
    async.parallel(task, (err, result) => {
        if(err) console.log('Async: ',err);
        else console.log(`${result.length} field inserted`);
        client.close();
    })
})
