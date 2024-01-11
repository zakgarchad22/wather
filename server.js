const express = require('express')
const app = express()
const api = require('./server/routes/api')
const path = require('path')
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI||'mongodb://localhost/weatherDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
.then(() => console.log("MongoDB successfully connected"))
.catch((err) => console.log("MongoDB connection error:", err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'node_modules')))


app.use('/api', api);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
})


const PORT = 8080
app.listen(process.env.PORT || PORT);