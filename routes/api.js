var express =  require('express')
var router =  express.Router()
var controller =  require('../controllers/books_controller')




router.get('/',controller)




module.exports = router;
