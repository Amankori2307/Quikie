const mongoose = require('mongoose');
const uploadSchema = mongoose.Schema({
    url:{
        type:String,
        required:true
    },
    filename:{
        type:String,
        required:true
    },
});

module.exports = mongoose.model('quikie',uploadSchema )