var express =  require('express')
var router =  express.Router()
var controller =  require('../controllers/transactions_controller')

router.get('/',controller.getAllTransactions)
router.post('/',controller.createTransaction)
router.put('/:id',controller.updateTransaction)
router.delete('/:id',controller.deleteTransaction)


module.exports = router;
