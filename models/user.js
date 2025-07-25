const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Fruit', 'Vegatable', 'Protien', 'Grain', 'Dairy', 'Seasoning'],
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  notes: {
    type: String,
    maxLength: 100,
  }
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  pantry: [foodSchema]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
