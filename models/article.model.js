var mongoose = require("mongoose")
var Schema = mongoose.Schema

var articleSchema = new Schema({
      title: {
          type: String,
          required: "must require title"
      },
      content: {
        type: String, 
        required: "must require content"
      }
    }
)

var Article = mongoose.model('Article',articleSchema)

module.exports=Article