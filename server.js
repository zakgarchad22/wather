const express = require('express')
const app = express()
const api = require('./server/routes/api')
const path = require('path')
const mongoose = require('mongoose')

mongoose.connect("mongodb://127.0.0.1:27017/weatherDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).catch((err) => console.log(err));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'node_modules')))


app.use('/api', api);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
})


const port = 4200;
app.listen(port, () => {
  console.log(`Running on port ${port}`)
})
