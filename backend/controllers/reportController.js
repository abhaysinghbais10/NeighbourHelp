// get all student list

const db = require("../config/db");

const getReports = async (req,res)=>{
    try{
        const data = await db.query('SELECT * FROM reports')
        if(!data){
            return res.status(404).send({
                success : false,
                message : 'No Records found'
            })
        }
        res.status(200).send({
            success:true,
            message: 'all report Records',
            
            data : data[0]
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success : false,
            message: 'error in get All reports API',
            error
        })
    }
}


//get student by id
const getReportById = async(req,res)=>{
    try{
        const reportId = req.params.id
        if(!reportId){
            return res.status(404).send({
                success : false,
                message : 'Invalid or Provide report id'

            })
        }
        const data = await db.query(`SELECT * FROM reports WHERE id = ?`, [reportId])
        if(!data){
            return res.status(404).send({
                success : false,
                message: 'no records found'
            });
        }
        res.status(200).send({
            success : true,
            reportDetails : data[0]
        })
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message : 'error in get report by id',
            error

        })
    }
}


//create student

const createReport = async (req,res)=>{
    try{
       const {name,report,address}  = req.body
       if(!name || !report || !address){
        return res.status(500).send({
            success:false,
            message:"Please provide all fields"
        })
       }
       const data = await db.query(
        `INSERT INTO reports (name, report, address) VALUES (?, ?, ?)`,
        [name, report, address]
    );
       if(!data){
        return res.status(404).send({
            success:false,
            message:'error in insert query'
        })
       }
       res.status(201).send({
        success:true,
        message:'new report record created'
       })
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:'error in create report API',
            error
        })
    }
}




// update

const updateReport = async (req,res)=>{
    try{
        const reportId = req.params.id
        if(!reportId){
            return res.status(404).send({
                success:false,
                message:'Invalid ID or provide id'
            })
        }
        const {id,name,report,address}  = req.body
        const data = await db.query(`UPDATE reports SET name=?, report = ?, address=? WHERE id = ?` ,[name,report,address,id])
        if(!data){
            return res.status(500).send({
                success:false,
                message:'Error in update data'
            })
        }
        res.status(200).send({
            success:true,
            message : "report details updates"
        })
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message : "error in update API  ",
            error
        })
    }
};



module.exports = { getReports, getReportById,createReport,updateReport}