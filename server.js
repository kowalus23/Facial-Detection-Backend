const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');

const db = knex({
  client: 'pg',
  version: '7.2',
  connection: {
    host: '127.0.0.1',
    user: 'patrykkowalski',
    password: '',
    database: 'facial-detection'
  }
});

db.select('*').from('users').then(data => {
});

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.get('/', (req, res) => {
  res.send(database.users);
});

// SIGN IN end point//
app.post('/signin', (req, res) => {
  db.select('email', 'hash').from('login')
    .where('email', '=', req.body.email)
    .then(data => {
      const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
      if (isValid) {
        db.select('*').from('users')
          .where('email', '=', req.body.email)
          .then(user => {
            res.json(user[0])
          })
          .catch(err => res.status(400).json('unable to get user'))
      } else {
        res.status(400).json('wrong credentials')
      }
    })
    .catch(err => res.status(400).json('wrong credentials'))
});

/// REGISTER end point ///
app.post('/register', (req, res,) => {
  const {email, name, password} = req.body;
  const hash = bcrypt.hashSync(password, 10);
  db.transaction(trx => {
    trx.insert({
      hash: hash,
      email: email
    })
      .into('login')
      .returning('email')
      .then(loginEmail => {
        return trx('users')
          .returning('*')
          .insert({
            email: loginEmail[0],
            name: name,
            joined: new Date()
          })
          .then(user => {
            res.json(user[0])
          })
      })
      .then(trx.commit)
      .catch(trx.rollback)
  })
    .catch(err => res.status(400).json('unable to register'))
});

// PROFILE/IDs for future extends //
app.get('/profile/:id', (req, res) => {
  const {id} = req.params;
  db.select('*').from('users').where({id})
    .then(user => {
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status(400).json('not found')
      }
    })
    .catch(err => res.status(400).json('not found'))
});

//  UPDATE an IMAGE and entries value end //
app.put('/image', (req, res) => {
  const {id} = req.body;
  db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get entries'))
});

// SERVER PORT LISTENER //
app.listen(3000, () => {
  console.log('app is running on port 3000');
});