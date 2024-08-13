import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname=dirname(fileURLToPath(import.meta.url));
const app=express();
const port=8000;
let IsUserAuth=false;

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public/'));

function accessPass(req,res,next){
    let bodyChange=req.body['password'];
    IsUserAuth = false;  //taki har bar condition reset ho true hi na rahe

    if(bodyChange==="JavaScript69420"){
        IsUserAuth=true;
    }
    next();
}
app.use(accessPass);

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/submit',(req,res) => {
    if(IsUserAuth){
        res.sendFile(__dirname + '/public/secret.html');
    }
    else{
        res.sendFile(__dirname + '/public/notFound.html');
    }
});

app.listen(port,()=>{
    console.log(`listening on port ${port}`);
});