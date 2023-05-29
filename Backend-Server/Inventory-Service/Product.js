const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  ID: {
    type: Number,
    required: true,
    unique: true, 
    immutable: true
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
    },  
  slug: {
      type: String,
      required: true,
    },
  description: {
      type: String,
      required: true,
    }, 
  ratingAverage: {
      type: Number,
      required: true,
    },     
  imageUrl: {
          type: String,
          required: true,
    }
      
    
});

module.exports = mongoose.model("Product", productSchema);