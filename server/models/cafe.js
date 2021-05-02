const mongoose = require('mongoose')

module.exports = mongoose.model('Cafe',{
  name:'String',
  about:"String",
  url: 'String',
  newRating:{type:"Number", default:0}
})
