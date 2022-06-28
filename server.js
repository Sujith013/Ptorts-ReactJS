const express = require('express');
const bodyParser = require('body-parser')
const fileupload = require("express-fileupload");
const cors = require('cors');
const fs = require('fs');
const mongodb = require('mongodb');
const MongoClient = require('mongodb').MongoClient;

var url ="";

const app = express();

app.use(fileupload());
app.use(express.static("files"));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Connection Success");

  const dbs = db.db("ptorts");
  const bucket = new mongodb.GridFSBucket(dbs);

  app.post("/insert",(req,res)=>{

    var name = req.body.name;
    var email = req.body.email;
    var dob = req.body.date;
    var mobile = req.body.mobile;
    var gender = req.body.gender;
  
    var obj = {name:name,email:email,mobile:mobile,dob:dob,gender,gender}
  
    console.log(obj);
  
    var dbo=db.db("ptorts");
  
    dbo.collection("userDetails").insertOne(obj, function(err, result) {
      if (err) throw err;
      console.log(result);
      res.sendStatus(200);
    });   
  })

  app.post("/check",(req,res)=>{

    var email = req.body.email;
  
    var dbo=db.db("ptorts");
  
    dbo.collection("userDetails").findOne({email:email}, function(err, result) {
      if (err) throw err;
      console.log(result);
      if(result==null)
        res.sendStatus(200);
    });   
  })

  app.post("/profile",(req,res)=>{

    var email = req.body.email;
  
    var dbo=db.db("ptorts");
  
    dbo.collection("userDetails").findOne({email:email}, function(err, result) {
      if (err) throw err;
      console.log(result);
      if(result!=null)
        res.send(result);
    });   
  })

  app.post("/upload", (req, res) => {
    
    const newpath = __dirname + "/files/";
    const file = req.files.file;
    const filename = file.name;
   
    file.mv(`${newpath}${filename}`, (err) => {

      if (err) {
        res.send("Error Occured while uploading");
      }
      res.sendStatus(200);
    });

    try{

    fs.createReadStream(`${newpath}${filename}`).pipe(bucket.openUploadStream(filename,{
         chunkSizeBytes: 1048576,
         metadata: { field: 'myfile', value: 'myValue' }
    }))
  }catch(err)
  {
    console.log(err);
  }

  });
});

app.listen(5000,()=>{
  console.log("listening");
});
