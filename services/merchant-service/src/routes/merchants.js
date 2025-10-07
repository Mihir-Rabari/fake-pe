const express = require('express');
const router = express.Router();
const merchantController = require('../controllers/merchantController');

// Create merchant account
router.post('/', merchantController.createMerchant);

// Get merchant details
router.get('/:merchantId', merchantController.getMerchant);

// Update merchant
router.put('/:merchantId', merchantController.updateMerchant);

// Get merchant stats
router.get('/:merchantId/stats', merchantController.getMerchantStats);

module.exports = router;
