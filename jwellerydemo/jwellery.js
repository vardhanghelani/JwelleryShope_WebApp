const mongoose =require("mongoose");
const Schema = mongoose.Schema({
  id: Number,
  name : String,
  price : Number,
  description : String,
  groosweight : Number,
  netweight : Number,
  image : String
});

module.exports=mongoose.model('Jwellery',Schema);