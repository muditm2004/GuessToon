const mongoose = require("mongoose");

const charSchema = mongoose.Schema({
    Character:String,
    Hint:String,
    Image_2:String,
    ShowName:String
});


module.exports = mongoose.model("character", charSchema);