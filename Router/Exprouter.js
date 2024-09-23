const { Router} = require('express')
const router= Router()


const { save, getExpenses, update ,Delete} = require('../Controller/Exp-controller');

// Define the route
// router.get('/', get)
router.post('/save', save); // Corrected route path
router.post('/update', update);
router.post('/delete', Delete);
router.get('/:userId', getExpenses);


module.exports = router;
