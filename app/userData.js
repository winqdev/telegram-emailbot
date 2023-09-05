const mongoose = require("mongoose")

const userDataSchema = new mongoose.Schema({ 
    user_id: Number,
    smtp: String,
    port: Number,
    user: String,
    pass: String,
    email: String,
    to: String,
    subject: String,
    content: String
});
  
module.exports = mongoose.model("userData", userDataSchema);