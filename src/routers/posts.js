const Express = require('express')
const router = Express.Router()
const Posts = require('../models/Post')


//GET BACK ALL THE POSTS
router.get('/', async (req, res) => {
    try {
        const posts = await Posts.find()
        res.json(posts)
    } catch (error) {
        res.sendStatus(500)
        console.log(error)
    }

})
//SUBMIT POST
router.post('/', async (req, res) => {

    const post = new Posts({
        ...req.body
    })
    try {
        post.save()
        res.json(post)
    } catch (error) {
        res.sendStatus(500)
        console.log(error)
    }
})

//SPECIFIC POST
router.get('/:postId', async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId)
        res.json(post)
    } catch (error) {
        res.json({ msj: error })
    }
})

//DELETE POST 
router.delete('/:postId', async (req, res) => {
    try {
        const removePost = await Posts.deleteOne({ _id: req.params.postId })
        res.json(removePost)
    } catch (error) {
        console.log(error)
    }
})

//UPDATE POST
router.patch('/:postId', async (req, res) => {
    try {
        const updatePost = await Posts.updateOne({ _id: req.params.postId },
            { $set: { title: req.body.title } })
        res.json(updatePost)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router