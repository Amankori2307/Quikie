const express = require('express');
const multer = require('multer');
const path = require('path');
const Upload = require('../models/upload')
const fs = require('fs')
const router = express.Router();

const storage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null,path.join(__dirname,'..','..','uploads'))
    },
    filename : (req,file,cb) => {
        cb(null,Date.now()+path.extname(file.originalname))
    }
})


const fileFilter = (req,file,cb) => {
    const fileTypes = /pdf|jpeg|mp4|png/i
    const extname = fileTypes.test(path.extname(file.originalname))
    
    const mimetype = fileTypes.test(file.mimetype)
    
    if(extname && mimetype) cb(null, true)
    else cb(`Invalid file type only pdf, png, jpg and mp4 are allowed`)
}

const upload = multer({
    storage : storage,
    limits : {
        fieldSize : 50000
    },
    fileFilter : (req,file,cb) => fileFilter(req,file,cb)
}).single('file')



router.post('/',(req,res) => {
    upload(req,res, async err =>{
        if(req.file){
            var file =  req.file      
            if(err)  return res.json({message : {msgBody : err, msgError : true}})
            const newUpload = Upload({url : `${req.file.filename}`, filename : file.originalname})
            newUpload.save((err, doc) => {
                if(err)  return res.json({message : {msgBody : err, msgError : true}})
                return res.json({message : {msgBody : "File saved successfully", msgError : false},doc})
                
            })
        }
        else
            res.json({message : {msgBody : "Please Select a File", msgError : true}})
        
    })
    
})
router.delete('',(req,res) => {
    var id = req.body.id;
    if(id){
        Upload.findOneAndDelete({_id:id},(err, file) => {
            if(err) return  res.json({message : {msgBody : err, msgError : true}})
            if(file){
                fs.unlink(path.join(__dirname,'..','..','uploads',file.url),(err) => {
                    if(err) return  res.json({message : {msgBody : err, msgError : true}})
                    return res.json({message : {msgBody : "File deleted successfully", msgError : false}, file})
                })
            }
            else return  res.json({message : {msgBody :"No file found", msgError : true}})

        })
    }else return  res.json({message : {msgBody :"Pls enter an id", msgError : true}})

})

router.put('',(req,res) => {
    var {filename, id} = req.body;
    if(id){
        Upload.findOne({_id:id},(err, file) => {
            if(err) return res.json({message : {msgBody : err, msgError : true}})
            file.filename = filename+path.extname(file.filename);
            file.save((err, file) => {
                if(err) return res.json({message : {msgBody : err, msgError : true}})
                return res.json({message : {msgBody : 'Successfully Edited file', msgError : false},file})
            });            
        })
    }else return res.json({message : {msgBody : 'Pls enter an id', msgError : true}})
})
router.get('/',async (req, res) => {
    Upload.find({},(err,data) => {
        if(err) return res.json({message : {msgBody : err, msgError : true}})
        return res.json({message : {msgBody : 'Successfully Fetched Data', msgError : false},data})
    })

})
router.get('/bar',async (req, res) => {
    const png = await Upload.find({ "filename" : { $regex: /.png$/, $options: 'i' }})|| [];
    const jpeg = await Upload.find({ "filename" : { $regex: /.jpeg$/, $options: 'i' }}) || [];
    const mp4 = await Upload.find({ "filename" : { $regex: /.mp4$/, $options: 'i' }}) || [];
    const pdf = await Upload.find({ "filename" : { $regex: /.pdf$/, $options: 'i' }}) || [];
    res.send({png :png.length,jpeg : jpeg.length,mp4 : mp4.length,pdf : pdf.length})
})
module.exports = router