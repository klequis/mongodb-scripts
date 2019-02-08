const database = 'CRMDev'
const collection = 'people'
const url = 'mongodb://localhost:27017'
const MongoClient = require('mongodb').MongoClient

const client = new MongoClient(url, { useNewUrlParser: true });


client.connect(function(err) {

  const db = client.db(database);
  const col = db.collection('people')


  // col.find( { local: { $exists: false } } )

  col.find({
    local: { $exists: false }
  }).toArray(function(err, docs) {
    console.log('num docs found:', docs.length)
  })

  col.updateMany({
    local: { $exists: false }
  },
    { $set: { local: true }},
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