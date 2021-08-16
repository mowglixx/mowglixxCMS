const express = require('express')
const fs = require('fs')

// Port setttings
const port = '3000'
const host = 'localhost'

// Define app as express app
const app = express()

// make listen on defined port
app.listen(port, () => {
    console.log(`Server started on http://${host}:${port}`)
    // console.log('Some other helpful message when the server has started on the defined port')
    
});


// Set Template Engine
app.set('view engine','pug')

// Load Endpoints
const enderFriend = () => {
    const dataBuffer = fs.readFileSync('config/endpoints.json')
    //console.log(dataBuffer)
    const dataJSON = dataBuffer.toString()
    //console.log(dataJSON)
    // console.log(JSON.parse(dataJSON)) 
    return JSON.parse(dataJSON) 
}
// Serialise Endpoints
const Endpoints = enderFriend()

const getLinks = () => {
    let Body = []
    Endpoints.forEach(({endpoint}) => {
        Body.push(endpoint)
    })
    return Body
}
const Links = getLinks()

console.log('Endpoints:', Links)

// Define Home Page
app.get('/', (req, res) => {
    res.render('index', {title: 'Home', body: 'Welcome, this is the Home Page', template: 'NA', Links})
    console.log('Endpoints:', Links)
})
app.get('/home', (req, res) => {
    res.render('index', {title: 'Home', body: 'Welcome, this is the Home Page', template: 'NA', Links})
    console.log('Endpoints:', Links)
})

// Present Endpoints
Endpoints.forEach(({endpoint, title, body, template}) => {
   app.get(`${'/'+endpoint}`, (req, res) => {
       res.render('index', {endpoint,title, body, template, Links})
   }) 
});
