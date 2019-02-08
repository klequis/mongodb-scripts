# Upadate part of an object that is contained in an array field

Find all documents with `email.address: 'dummy@dummy.com'` and update to `''`

## Data
```js
{
  _id: 5c53516e882ae679f2dd596d,
  firstName: 'Heather',
  lastname: 'Mac',
  email: [
    {
      address: 'dummy@dummy.com',
      type: 'work',
    }
  ],
}
```

## Code
```js
const database = 'CRMDev'
const collection = 'people'
const url = 'mongodb://localhost:27017'
const MongoClient = require('mongodb').MongoClient

const client = new MongoClient(url, { useNewUrlParser: true });

client.connect(function(err) {

  const db = client.db(database);
  const col = db.collection('people')
  col.find({
    'email.address': { $in: ['dummy@dummy.com'] }
  }).toArray(function(err, docs) {
    console.log(docs)
  })

  col.updateMany(
    { 'email.address': { $in: ['dummy@dummy.com'] } },
    { $set: { 'email.$.address': '' }},
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
```

