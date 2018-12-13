const express = require('express')
const router = express.Router()
const controller = require('../controllers/reviewControllers')

router.get('/', controller.getReviews)
router.post('/', controller.postReview)
router.delete('/:id', controller.deleteReview)

module.exports = router