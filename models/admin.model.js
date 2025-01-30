const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema({

  fullName:{
    type : 'string',
    required : true,
    unique : true,
  },
  email:{
    type : 'string',
    required : true,
    unique : true,
  },
  phone:{
    type : "string",
    required : true,
  },
  password:{
    type : "string",
    required : true,
  },

 
});

module.exports = mongoose.model("admin", adminSchema);