var http = require('http');
var express = require('express');
var app = express();
var server = http.Server(app);
var bodyParser = require('body-parser');
var mongo = require('mongodb');

var db, uri = "mongodb+srv://mirsazzathossain:sazzatmir@cluster0-wdd8v.mongodb.net/test?retryWrites=true&w=majority"

mongo.MongoClient.connect(uri,
  {useNewUrlParser: true, useUnifiedTopology: true},
  function(err, client){
    if(err){
      console.log('Could not connect to MongoDB')
    }else{
      db = client.db('node-cw9')
    }

  });

var save = function(form_data){
  db.createCollection('articles', function(err, collections){})
  var collection = db.collection('articles')
  collection.save(form_data)
}

app.use(bodyParser.urlencoded({extended:true}));

let articles=[];

app.post('/new_article', function(request, response){
  save(request.body);
  articles.push(request.body);
  console.log(articles);
  response.json({msg: "Successfully recieved"});
});

app.get('/article/:index', function(request, response){
  if(articles[request.params.index]){
    response.render('article.ejs', {
      article:articles[request.params.index]
    });
  }else{
    response.json({msg:"Article not found"});
  }
});



app.get('/',function(request,response){
  response.sendFile(__dirname+'/views/index.html');
});


app.get('/second',function(request,response){
  response.sendFile(__dirname+'/views/index_2.html')
});

app.get('/new_article',function(request,response){
  response.sendFile(__dirname+'/views/form.html');
});

server.listen(3000, 'localhost', function(){
  console.log('Server running');
});
