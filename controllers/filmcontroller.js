const mongoClient = require("mongodb").MongoClient
const request = require('request')
const mongo_username = 'dummy'  // update your username
const mongo_password = 'sncnick2' // update your password

const apiKey = 'a5a4ee3a'
const url = `https://www.omdbapi.com/?apikey=${apiKey}&t=`

const jwt = require('jsonwebtoken')

//JWT secretKey
const secretKey = '30624700'


const CONNECTION_URI = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.kjkf9lj.mongodb.net/`  //Update the path

const DATABASE_NAME = "projectfilm" // Update your database name here
const COLLECTION = "filmdata" // Update your collection name here


const filmController = {
 
  getOMDb (req, res) {
    const film_name = req.params.filmname
    const conbined_url = url + film_name
    console.log(film_name)

    request(conbined_url, (error, response, body) => {
      if (error) {
        return res.status(500).json({
          error: error
        });
      }
      
      if (response.statusCode !== 200) {
        return res.status(response.statusCode).json({
          error: body
        });
      }
      
      const movieData = JSON.parse(body);
      res.status(200).json(movieData);
    });
  },


  
}

module.exports = filmController