const mongoClient = require("mongodb").MongoClient
const request = require('request')
const mongo_username = 'dummy'  // update your username
const mongo_password = 'sncnick2' // update your password

const jwt = require('jsonwebtoken')

//JWT secretKey
const secretKey = '30624700'


const CONNECTION_URI = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.kjkf9lj.mongodb.net/`  //Update the path

const DATABASE_NAME = "projectfilm" // Update your database name here
const COLLECTION = "userdata" // Update your collection name here


const userController = {
  /**
*  To check if the username and password is correct
*  @param {Object} req - nothing
*  @param {Object} res - return the information
*/
  auth(req, res) {

    //const {username, password} = req.body
    //const username = req.params.username
    //const password = req.params.password
    console.log(`Someone query the user information with`, Object.values(req.body)[0])
    mongoClient.connect(CONNECTION_URI)
      .then((db) => {
        db.db(DATABASE_NAME).collection(COLLECTION).find(req.body).toArray((err, result) => {
          if (result.length === 0 || err) {
            res.status(500).send({ "status": 500, "description": err })

          } else {
            const token = jwt.sign({username:(req.body)[0],password:(req.body)[1]},secretKey)
            console.log(token)
            res.status(200).send({ "status": 200, "description": "Auth successfully", "Token":token })
          }
        })
      })
      .catch((err) => {
        console.log(err)
        res.status(500).send({ "status": 500, "description": err })
      })
  },

  /**
*  ” To create a new user with same JSON structure that store
in MongoDB
*  @param {Object} req - nothing
*  @param {Object} res - return the information
*/
  newuser(req, res) {

    //const {username, password} = req.body
    //const username = req.params.username
    //const password = req.params.password
    console.log('create a new user')
    mongoClient.connect(CONNECTION_URI)
      .then((db) => {

        db.db(DATABASE_NAME).collection(COLLECTION).find({}).toArray((err, result) => {

          //Find same value
          function findKeyValueCount(key, value, obj) {
            var count = 0;
            var keys = Object.keys(obj);
            keys.forEach(function(k) {
              var v = obj[k];
              if (typeof v === 'object') {
                count += findKeyValueCount(key, value, v)
              }
              else if (k === key && v === value) {
                count += 1;
              }
            });
            return count;
          }
          //report the new user name is unique or not
          function isUnique(key, value, obj) {
            return findKeyValueCount(key, value, obj) === 1;
          }

          //console.log(Object.keys(req.body)[0])
          if (Object.keys(req.body)[0] != "username" || Object.keys(req.body)[1] != "password" || req.body.username.length === 0 || req.body.password.legnth === 0 || Object.keys(req.body).length > 3 || findKeyValueCount('username', Object.values(req.body)[0], result) || err) {
            res.status(500).send({ "status": 500, "description": "Username exists / the JSON structure did not comply with database" })
            console.log("Username exists / the JSON structure did not comply with database")
          } else {
            //console.log(req.body)
            //console.log(Object.keys(req.body).length)
            res.status(201).send({ "status": 201, "description": "Data insert successfully" })
            console.log("Data insert successfully")
            db.db(DATABASE_NAME).collection(COLLECTION).insertOne(req.body)
          }
        })
      })
      .catch((err) => {
        console.log(err)
        res.status(500).send({ "status": 500, "description": err })
      })
  },

  /**
 *  ” To update the password of delegated user
in MongoDB
 *  JSON - only PW, username grab from url
 *  @param {Object} req - nothing
 *  @param {Object} res - return the information
 */
  chkpwd(req, res) {
    //const username = Object.values(req.body)[0]
    const username = req.params.username
    //const password = req.params.password
    console.log(`someone going to update the user password: `, username)
    mongoClient.connect(CONNECTION_URI).then((db) => {
      db.db(DATABASE_NAME).collection(COLLECTION).findOneAndUpdate({ 'username': username },
        { $set: { 'username': username, 'password': Object.values(req.body)[0] } },
        {},
        (err) => {
          if (Object.keys(req.body)[0] != "password" || Object.keys(req.body).length > 1 || err) {
            res.status(500).send({ "status": 500, "description": err })
          } else {
            res.status(201).send({ "status": 201, "description": "Data update successfully" })
          }
        })
    })
      .catch((err) => {
        console.log(err)
        res.status(500).send({ "status": 500, "description": err })
      })
  },



  
}

module.exports = userController
