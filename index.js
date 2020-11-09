var express=require('express');
 var app = express();

 app.use(express.static('assets'));

 app.listen(8080,()=>{
     console.log('Listening on port...')
 })

 app.get('/',(req,res)=>{
     res.sendFile(__dirname+'/index.html')
 })