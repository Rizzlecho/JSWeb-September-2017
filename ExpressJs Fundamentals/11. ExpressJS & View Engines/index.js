const express = require('express');
const app = express();
const port = 2000;

const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');

// Middleware usage
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static('views'));
app.use(bodyParser.urlencoded({ extended: true }));
//
// View Engine
app.engine('handlebars', exphbs({
  partialsDir: path.join(__dirname, '/handlebars-views')
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '/handlebars-views'));

// app.get('/test', (req, res) => {
//   res.render('test', {
//     myArray: [5, 4, 9, 10],
//     isAdmin: true
//   })
// });

app.get('/', (req,res)=>{
    res.status(200);
    res.send('Welcome to Express.js')
});

app.listen(port, () => console.log(`Server running on ${port}`));

// app.get('/', (req,res)=>{
//     res.status(200);
//     res.send('Welcome to Express.js')
// });
//
// // All methods route
//
//
// app.all('/about', (req, res, next) => {
// console.log('Middleware execution..');
// next()
// }, (req, res) => {
// res.send('Show about page.');
// });
//
// app.listen(port,()=> console.log('Running on port: ' + port));
