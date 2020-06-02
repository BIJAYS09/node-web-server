const express = require('express');
const hbs = require('hbs');
var app = express();
const fs = require('fs');
const port = process.env.PORT  || 3000;

app.set('view engine','hbs');


hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
})

app.use((req, res, next)=>{
    var now = new Date().toLocaleDateString();
    var log = `${now} ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log+'\n', (err)=>{
        if(err){
            console.log(err);
        }
    });
    next();
});

// app.use((req, res, next)=>{
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname+'/public'));

app.get('/',(req, res) => {
    // res.send({
    //     name: 'Bijay',
    //     likes: [
    //         'Biking',
    //         'Cities'
    //     ]
    // });

    res.render('home.hbs',{
        pageTitle: 'Home',
        welcomeMessage:'Welcome to my website'
    })
});



app.get('/about',(req, res) => {
   // res.send('About Page');
   res.render('about.hbs',{
       pageTitle:'About'
   });
});



app.get('/bad',(req, res)=>{
    res.send({
         errorMessage:"Unable to get message" 
    });
});

app.listen(port, () =>{
    console.log(`Server is up on port ${port}`);
});