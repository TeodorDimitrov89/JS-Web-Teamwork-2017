const mongoose = require('mongoose')
const SCHEMA = mongoose.Schema
const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required!'
const ObjectId = mongoose.Schema.Types.ObjectId

let gadgetSchema = new SCHEMA({
  title: { type: SCHEMA.Types.String, required: REQUIRED_VALIDATION_MESSAGE, unique: true },
  description: { type: SCHEMA.Types.String, required: REQUIRED_VALIDATION_MESSAGE },
  createdOn: { type: SCHEMA.Types.Date, default: Date.now },
  image: {type: SCHEMA.Types.String},
  comments: [{ type: ObjectId, ref: 'Comment' }],

   // Array containing Ids of the users bought gurrent gadget
  buyerUsers: [String],

  // This field denotes ceratin gadget's Quantity bought by the User
  // Each index corresponds to an index from buyerUsers id's array e.g. - buyerUsers[0] -> quantityBought[0]
  quantityBought: [Number],

  quantityOnStock: {type: Number, required: REQUIRED_VALIDATION_MESSAGE},
  quantitySold: {type: Number, default: 0},
  price: {type: Number, required: REQUIRED_VALIDATION_MESSAGE}
})

let Gadget = mongoose.model('Gadget', gadgetSchema)

module.exports = Gadget
