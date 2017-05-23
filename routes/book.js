var express =  require('express')
var router =  express.Router()
var controller =  require('../controllers/books_controller')

router.get('/',controller.getAllBooks)
router.post('/',controller.createBook)
router.put('/:id',controller.updateBook)
router.delete('/:id',controller.deleteBook)


module.exports = router;
