const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Jwellery = require('./jwellery');
const cors = require('cors');
const path =require('path');

mongoose.connect('mongodb://localhost:27017/jwelleryDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to database'))
  .catch(err => console.log(err));

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); // Allow CORS for local testing
app.use(express.static('public')); // Serve static files from 'public' folder

// API routes
app.listen(3000, () => console.log('Server is running on port 3000'));

// Get all
app.get('/Jwellery', async (req, res) => {
  const ans = await Jwellery.find();
  res.send(ans);
});

// Get by id
app.get('/Jwellery/:id', async (req, res) => {
  const ans = await Jwellery.findOne({ id: req.params.id });
  res.send(ans);
});

// Create
app.post('/Jwellery', async (req, res) => {
  const jwe = new Jwellery({ ...req.body });
  const ans = await jwe.save();
  res.send(ans);
});

// Delete
app.delete('/Jwellery/:id', async (req, res) => {
  const ans = await Jwellery.deleteOne({ id: req.params.id });
  res.send(ans);
});

// Update
app.patch('/Jwellery/:id', async (req, res) => {
  const stu = await Jwellery.findOne({ id: req.params.id });
  stu.name = req.body.name;
  const ans = await stu.save();
  res.send(ans);
});
