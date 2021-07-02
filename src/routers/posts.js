const Express = require('express')
const router = Express.Router()
const Posts = require('../models/Post')

router.get('/posts', (req, res) => {
    res.send('we are on posts')

})
router.post('/', async (req, res) => {
    const post = new Posts({
        ...req.body
    })
    try {
        const savePost = await post.save()
        console.log(savePost)
        res.json(savePost)
    } catch (error) {
        resp.json({ msg: error })
    }
})

module.exports = router