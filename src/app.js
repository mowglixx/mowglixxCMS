const express = require('express')
const fs = require('fs')

// Port setttings
const port = '3000'
const host = 'localhost'

// Define app as express app
const app = express()

// Set Template Engine
app.set('view engine', 'pug')

// make listen on defined port
app.listen(port, () => {
    console.log(`Server started on http://${host}:${port}`)
})

// Load Endpoints
const enderFriend = () => {
    const dataBuffer = fs.readFileSync('config/endpoints.json')
    const dataJSON = dataBuffer.toString()
    console.log(JSON.parse(dataJSON))
    return JSON.parse(dataJSON)
}

const getLinks = () => {
    let Body = []
    Endpoints.forEach(({ endpoint }) => {
        Body.push(endpoint.path)
    })
    return Body
}

// Serialise Endpoints and Links
const Endpoints = enderFriend()
const Links = getLinks()

// Define Home Page
app.get('/', (req, res) => {
    res.render('home', { title: 'Home', body: 'Welcome, this is the Home Page', template: 'NA', Links })
    console.log('Endpoints:', Links)
})

// Present Endpoints
Endpoints.forEach(({ endpoint, page }) => {
    app.get(`${'/' + endpoint.path}`, (req, res) => {
        res.render('index', { endpoint, page, Links })
    })
});
