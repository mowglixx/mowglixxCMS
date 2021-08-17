const express = require('express')
const fs = require('fs')

// Port setttings
const Port = '3000'
const Host = 'localhost'

// Define app as express app
const app = express()

// Set Template Engine
app.set('view engine', 'pug')

// make listen on defined Port
app.listen(Port, () => {
    console.log(`Server started on http://${Host}:${Port}`)
})

// Load Endpoints
const enderFriend = () => {
    const dataBuffer = fs.readFileSync('config/endpoints.json')
    const dataJSON = dataBuffer.toString()
    const returnData = JSON.parse(dataJSON)
    console.log('enderFriend::returnData: \n%o',returnData)
    return returnData
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
Endpoints.forEach(({ endpoint, page, user }) => {
    app.get(`${'/' + endpoint.path}`, (req, res) => {
        res.render('index', { endpoint, page, user, Links })
    })
});
