const express = require('express');
const{response}=require('express');
const app = express();
const https = require('https');
const bodyparser=require('body-parser');
app.set('view engine','ejs');
app.use(bodyparser.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/index.html")
})


app.post('/',(req,res)=>{
    const location = req.body.cityName;
    const url="API ID + Location"
    https.get(url,(response)=>{
        response.on('data',(data)=>{
            const info = JSON.parse(data);
            const Temperature=(info.main.temp);
            const d=(info.weather[0].description);
            var date_ob = new Date();
            var hours = date_ob.getHours();
            var minutes = date_ob.getMinutes();
            var dateTime =hours + ":" + minutes;
            const answer={
                "loc":location,
                "temp":Temperature,
                "desc":d,
                "time":dateTime
            }
            res.render('home',{answer});
            
           
        })
    })


})

app.listen(8000,()=>{
    console.log("Listening");
})