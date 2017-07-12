const Gadget = require('mongoose').model('Gadget')
const Comment = require('mongoose').model('Comment')

function validateGadgetForm (payload) {
  const errors = {}
  let isFormValid = true
  let message = ''

  if (!payload || typeof payload.title !== 'string') {
    isFormValid = false
    errors.email = 'Please provide a correct title.'
  }

  if (!payload || typeof payload.title !== 'string' || payload.title.trim().length < 4) {
    isFormValid = false
    errors.title = 'Title must have at least 4 characters.'
  }

  if (!payload || typeof payload.description !== 'string' || payload.description.trim().length === 0) {
    isFormValid = false
    errors.description = 'Please provide a valid description.'
  }

  if (!payload || typeof payload.description !== 'string' || payload.description.trim().length < 10) {
    isFormValid = false
    errors.description = 'Description must have at least 10 characters.'
  }

  if (!payload || (Number(payload.quantityOnStock) < 0 || Number(payload.quantityOnStock) > 100) ||
  typeof Number(payload.quantityOnStock) !== 'number') {
    isFormValid = false
    errors.quantity = 'Quantity must be between 0 and 100pcs.'
  }
  if (!payload || typeof Number(payload.price) !== 'number' || !payload.price > 1) {
    isFormValid = false
    errors.price = 'Price must be greater than 1.'
  }
  if (!isFormValid) {
    message = 'Check the form for errors.'
  }

  return {
    success: isFormValid,
    message,
    errors
  }
}
module.exports = {
  create: (req, res) => {
    let gadgetBody = req.body
    let userId = req.user._id
    const validationResult = validateGadgetForm(gadgetBody)
    if (!validationResult.success) {
      return res.status(200).json({
        success: false,
        message: validationResult.message,
        errors: validationResult.errors
      })
    }
    Gadget.create({
      title: gadgetBody.title,
      image: gadgetBody.image,
      description: gadgetBody.description,
      quantityOnStock: gadgetBody.quantityOnStock,
      userId: userId,
      price: gadgetBody.price,
      comments: [],
      isBought: false
    })
    .then((gadget) => {
      res.status(200).json({
        success: true,
        message: 'Gadget added successfuly.',
        gadget
      })
    })
    .catch(() => {
      res.status(200).json({
        success: false,
        message: 'Title must be unique.',
        errors: 'Title must be unique.'
      })
    })
  },
  all: (req, res) => {
    const page = parseInt(req.query.page) || 1
    let getGadgets = new Promise((resolve, reject) => {
      const pageSize = 3
      Gadget
        .find({})
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .then(gadgets => {
          return resolve(gadgets)
        })
        .catch(err => res.status(200).json(err))
    })

    getGadgets
      .then(gadget => {
        res.status(200).json(gadget)
      })
      .catch(err => res.status(200).json(err))
  },
  getDetails: (req, res) => {
    const id = req.params.id
    Gadget
        .findById(id)
        .populate('comments')
        .then(gadget => {
          if (!gadget) {
            return res.status(200).json({
              success: false,
              message: 'Gadget does not exists!'
            })
          }
          return res.status(200).json(gadget)
        })
        .catch((err) => {
          console.log(err)
          return res.status(200).json(err)
        })
  },
  editGet: (req, res) => {
    let idEditGadget = req.params.id
    Gadget
      .findById(idEditGadget)
      .then(gadget => {
        if (!gadget) {
          return res.status(200).json({
            success: false,
            message: 'Gadget does not exists!'
          })
        }
        res.status(200).json(gadget)
      }).catch(err => {
        console.log(err)
        res.status(200).json(err)
      })
  },
  editPost: (req, res) => {
    let idEditGadget = req.params.id
    let reqbody = req.body
    let title = reqbody.title
    let description = reqbody.description
    let image = req.body.image
    let quantityOnStock = Number(req.body.quantityOnStock)
    let price = Number(req.body.price)
    Gadget
      .findByIdAndUpdate(idEditGadget, {
        $set: {
          title: title,
          description: description,
          image: image,
          quantityOnStock: quantityOnStock,
          price: price
        }
      })
      .then(gadget => {
        gadget.save()
        .then(() => {
          return res.status(200).json({
            success: true,
            message: 'Edit successful!',
            gadget
          })
        })
      })
  },
  deleteGet: (req, res) => {
    let idDeleteGadget = req.params.id
    Gadget
      .findById(idDeleteGadget)
      .then(gadget => {
        if (!gadget) {
          return res.status(200).json({
            success: false,
            message: 'Gadget does not exists!'
          })
        }
        res.status(200).json(gadget)
      }).catch(err => {
        console.log(err)
        res.status(200).json(err)
      })
  },
  deletePost: (req, res) => {
    let idDeleteGadget = req.params.id
    Comment
      .remove({gadgetId: idDeleteGadget})
      .then(() => {
        Gadget.findByIdAndRemove(idDeleteGadget)
          .then(gadget => {
            res.status(200).json({
              success: true,
              message: 'Gadget deleted successfuly.'
            })
          })
      }).catch(err => {
        console.log(err)
        res.status(200).json(err)
      })
  },
  search: (req, res) => {
    const search = req.query.search
    let query = Gadget.find({})
    if (search){
      query = query.where('title').regex(new RegExp(search, 'i'))
    }
    query
      .then(gadgets => {
        return res.status(200).json(gadgets)
      })
      .catch(err => res.status(200).json(err))
  },
  buyGadget: (req, res) => {
    let idReqUser = req.user._id
    let idGadgetBought = req.body.gadgetId
    Gadget
      .findById(idGadgetBought)
      .then(gadget => {
        if (gadget.quantityOnStock > 0) {
          let isBoughtIndex = gadget.buyerUsers.indexOf(idReqUser)

          // Check if current user already bought this gadget before
          if (isBoughtIndex > -1) {
            let quantityBoughtByUser = gadget.quantityBought[isBoughtIndex]
            gadget.quantityBought[isBoughtIndex] = ++quantityBoughtByUser
          } else {
            gadget.buyerUsers.push(idReqUser.toString())
            gadget.quantityBought.push(1)
          }
          Gadget.update(
          {_id: idGadgetBought},
            {$set: {
              buyerUsers: gadget.buyerUsers,
              quantityBought: gadget.quantityBought,
              quantityOnStock: --gadget.quantityOnStock,
              quantitySold: ++gadget.quantitySold
            }}
        )
          .then(() => {
            return res.status(200).json({
              success: true,
              message: 'Gadget bought successfuly.'
            })
          }).catch(err => {
            console.log(err)
            res.status(200).json(err)
          })
        } else {
          return res.status(200).json({
            success: false,
            message: 'Thre are no available quantities on stock for this article at the moment.'
          })
        }
      }).catch(err => {
        console.log(err)
        res.status(200).json(err)
      })
  },
  findGadgetsBought: (req, res) => {
    let idReqUser = req.params.id

    Gadget
     .find({buyerUsers: idReqUser})
     .then(gadgets => {
       let qtyBoughtGadgets = {}
       for (let gadget of gadgets) {
         let searchedIndex = gadget.buyerUsers.indexOf(idReqUser)
         let totalPrice = gadget.quantityBought[searchedIndex] * gadget.price
         let userQuantityBought = gadget.quantityBought[searchedIndex]
         qtyBoughtGadgets[gadget.title] = [userQuantityBought, totalPrice]
       }
       return res.status(200).json({
         success: true,
         qtyBoughtGadgets
       })
     }).catch(err => {
       console.log(err)
       res.status(200).json(err)
     })
  }
}
