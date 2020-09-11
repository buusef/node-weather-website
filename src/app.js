const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forcast = require('./utils/forcast');

// console.log(__dirname);
// console.log(__filename);
// console.log(path.join(__dirname, '../public'));

const app = express();

//define paths for express config
const publicDirectory = path.join(__dirname, '../public')
const hbsViewsDirectory = path.join(__dirname, '../templates/views') //changing the default /views directory
const partialsDirectory = path.join(__dirname, '../templates/partials')

//Setup handebars engine and views location
app.set('view engine', 'hbs');
app.set('views', hbsViewsDirectory);
hbs.registerPartials(partialsDirectory)

//Setup static directory to serve
app.use(express.static(publicDirectory))
// app.use enforces server to look up the directory for static html files and ignores the below if match is found

// app.get('', (req,res)=>{
//     res.send('Hello Express');
// });

// app.get('/about.html', (req,res)=>{
//     res.send('<h1>This is the about page</h1>');
// });


//make sure to delete .html pages from public
app.get('', (req,res)=>{
    res.render('index', {
        name:'Yousef',
        title:'Weather App'
    });
});

app.get('/about', (req,res)=>{
    res.render('about', {
        name:'Yousef',
        title:'About Page'
    })
})

app.get('/message', (req,res)=>{
    res.render('message', {
        message: 'Heeeeeelp',
        name: 'Yousef',
        title: 'help page'
    })
})

//served from app.js directly
app.get('/weather', ({query},res)=>{
    
    if (!query.address) {
        //return is used instead of else statement to end func call
        return res.send({
            error: 'You must provide and address'
        })
    }
    geocode(query.address, (error, {latitude, longitude, location}={})=>{
        if(error) {
            return res.send({error});
        }

        forcast(latitude, longitude, (error, {weatherCondition, temperature, feelsLike}={})=>{
            if(error) {
                return res.send({error});
            }

            res.send({
                location,
                weatherCondition,
                temperature,
                feelsLike
            });
        })
    });
})

app.get('/products', (req,res)=>{
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query);
    res.send({
        products: []
    });
})

app.get('/about/*', (req,res)=>{
    res.render('404', {
        errorMsg: 'about article not found 404',
        name: 'Yousef',
        title: '404'
    });
})

app.get('*', (req,res)=>{
    res.render('404', {
        errorMsg: 'Page not found 404',
        name: 'Yousef',
        title: '404'
    });
})

app.listen(3000);