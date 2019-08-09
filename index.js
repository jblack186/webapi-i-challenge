// implement your API here
const express = require('express');

const db = require('./data/db.js');

const server = express();

server.use(express.json());

server.post('/api/users', (req, res) => {
   const user = req.body;
   console.log('new user', user)
    db.insert(user)
        .then(user => {
            res.status(201).json(user);
        })
        .catch(err => {
            res.status(500).json({
                err: err,
            message: "There was an error while saving the user to the database" 
            })
        })
});

server.get('/api/users', (req, res) => {
    db.find()
    .then(users => {
        console.log(users)
        res.json(user);
    })
    .catch(err => {
        res.status(500).json({
        err: err
    })
    })

})

server.get('/api/users/:id', (req, res) => {
    const userId = req.params.id
    
    db.findById(userId)
        .then(user => {
            console.log(user)
            res.status(201).json({ message: 'user found'});
        })
        .catch(err => {
            res.status(500).json({
                err: err
            })
        })
})

server.delete('/api/users/:id', (req, res) => {
    const userId = req.params.id
    db.remove(userId)
    .then(user => {
        console.log(user)
        res.status(201).json({ message: 'user delet'});
    })
    .catch(err => {
        res.status(500).json({
            err: err
        })
    })
    
})


server.put('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    const changes = req.body;
    db.update(userId, changes)
    .then(user => {
        console.log(user)
        res.status(201).json({ message: 'user updated'});
    })
    .catch(err => {
        res.status(500).json({
            err: err
        })
    })
    
})


server.listen(4000, () => {console.log('yo yo api running on port 4000')})

