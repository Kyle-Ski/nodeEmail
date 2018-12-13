const knex = require('../db/connection')

const getReviews = (req, res, next) => {
    return knex('review')
        .orderBy('id', 'asc')
        .then(reviews => res.json({reviews}))
        .catch(err => console.error(err))
}

const postReview = (req, res, next) => {
    const body = req.body
    console.log(body)
    if(!body.name || !body.description || !body.subject || !body.rating){
        res.json({error: 'Please make sure all fields are filled out.'})
    } else {
        return knex('review')
            .insert(body)
            .returning('*')
            .then(review => res.json({review: review[0]}))
            .catch(err => console.error(err))
    }
}

const deleteReview = (req, res, next) => {
    const id = req.params.id
    if (!Number(id)) {
        res.status(404).json({ error: 'Please enter a valid id' })
    } else {
        return knex('review')
            .where('id', id)
            // .then(book => {
            //     if(!book.length){
            //         return res.status(404).json({error: 'Please enter a valid id'})
            //     } else {
            //         return book
            //     }
            // })
            .delete()
            .returning('*')
            .then(review => res.json({ deleted: review[0] }))
    }
}

module.exports = {
    getReviews, 
    postReview,
    deleteReview
}
