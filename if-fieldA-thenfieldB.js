const database = 'CRMDev'
const collection = 'people'
const url = 'mongodb://localhost:27017'
const MongoClient = require('mongodb').MongoClient

const client = new MongoClient(url, { useNewUrlParser: true });


const findField = 'email.address'
const findValue = ''
const setField = 'email.$.label'
const setValue = ''

client.connect(function(err) {

  const db = client.db(database);
  const col = db.collection('people')
  col.find({
    [findField]: { $in: [findValue] }
  }).toArray(function(err, docs) {
    console.log(docs)
  })

  col.updateMany(
    { [findField]: { $in: [findValue] } },
    { $set: { [setField]: setValue }},
    function(err, result) {
      if (err) {
        console.log('err', err)
      } else {
        console.log('updated', result.modifiedCount)
      }
    }
  )
  client.close();
})