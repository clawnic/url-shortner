const mongoose = require('mongoose');

const urlMapSchema = new  mongoose.Schema({
    long_url:{type:String,require:true},
    key:{type:String,require:true}
},{ timestamps:  { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model('urlMap',urlMapSchema);