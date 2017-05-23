var express =  require('express')
var router =  express.Router()
var controller =  require('../controllers/customers_controller')

router.get('/',controller.getAllCustomers)
router.post('/',controller.createCustomer)
router.put('/:id',controller.updateCustomer)
router.delete('/:id',controller.deleteCustomer)


module.exports = router;
