This is my backend for https://github.com/kowalus23/Facial-Detection

P.s.

We also need to have newest (at least 12+) version of NODE.
Because of using - https://www.npmjs.com/package/bcrypt package to hide and secure our passwords, by hash.
You can decrease version of bcrypt as well, and run on older node's version. Everything about bcrypt is in the link above.

## Requirements
* Node (ver recomended 12+)
* Postgres


## Available Scripts

In the project directory, you can run:

### `npm install`
to install all packages that i used (especially nodemon)

### `npm start`
run server use(by default it's set on port:3000): 

Also be sure, that your port on front app is correct with listen() at the bottom of server.js file

### `important!`
Database is based on Herokus, so if you want yours, you have to add an account and update KEY + create your DB then linked with your project, otherwise it shouldn't work
