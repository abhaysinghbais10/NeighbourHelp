const express = require('express');
const { getReports, getReportById, createReport, updateReport } = require('../controllers/reportController');

//router object
const router = express.Router();

//routes


//get all student list || get
router.get('/getall', getReports );

//get student by id

router.get('/get/:id', getReportById );

//create student || post

router.post('/create' ,createReport)

// update 
router.put('/update/:id',updateReport)

module.exports = router