const express = require('express');
const app = express();
const hbs= require('hbs');
const fs = require('fs');

hbs.registerPartials(__dirname+'/views/partials'); //support for partials in hbs (works with HTML Partial code)
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
});
app.set('view engine', 'hbs')//set some property for express

app.use((req,res,next)=>{
    let now = new Date().toString();
    let logs = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log',logs+'\n',(err)=>{
        if(err)
        console.log('Unable to append to server.log');
    });
    console.log(logs);
   next();
});//middleware should call next() to run the application without hanging

app.use((req,res,next)=>{
    res.render("maintenance.hbs", {
      pageTitle: "Under Maintenance"
    });
    //did not add 'next' so next code is not gonna get executed...
});

app.use(express.static(__dirname+'/public'));//register middleware with express

//handler for http get request (root path)
app.get('/',(req,res)=>{
    // res.send('<h1>Hello Express!<h1>'); //send back static HTML data
    // res.send({
    //     name:'MADHURI',
    //     id:1,
    //     likes:['Reading', 'Painting','Skeching'], 
    // });//send back JSON data

    res.render("home.hbs", {
      pageTitle: "Home Page",
      welcomeMessage: 'Welcome to the page'
    });
});

app.get('/about',(req,res)=>{
    // res.send('About Page');
    res.render('about.hbs',{
        pageTitle: 'About Page'
    });  //render the template page on UI
});

app.get('/bad',(req,res)=>{
    res.send({
      errorMessage: "Handling Bad Requests and Errors"
    });
});

//bind application to the port on machine
app.listen(3000,()=>{
    console.log('Server is up on port 3000');
});