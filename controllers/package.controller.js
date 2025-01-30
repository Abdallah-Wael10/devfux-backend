const data = require("../models/package.model")
const asyncWrapper = require("../middleware/asyncWrapper")

// Get all packages
  
 const getALLPackage = asyncWrapper (async(req,res)=>{
   const packages = await data.find({},{__v:false});
   if (!packages) {
    return res.status(404).json("data not found");
   }
   res.json(packages)
 })
 // get one package
 const getOnePackage = asyncWrapper(async(req,res)=>{
   const package = await data.findById(req.params.id);
   if (!package) {
    return res.status(404).json("data not found");
   }
   res.json(package)
 })
 // add package
 const addPackage = asyncWrapper(async(req,res)=>{
   const newPackage = new data(req.body);
   const package = await newPackage.save();
   res.status(201).json(package)
 })
 // update package
 const updatePackage = asyncWrapper(async(req,res)=>{
  const id = req.params.id;
  const updatePackage = await data.updateOne(
    {_id: id},
    {$set: {...req.body}}
  );
  res.json(updatePackage)
 })
 // delete package 
 const deletePackage = asyncWrapper(async (req,res)=>{
    await data.deleteOne({_id: req.params.id});
    res.json("Package deleted.")
 })

 module.exports ={
    getALLPackage,
    getOnePackage,
    addPackage,
    updatePackage,
    deletePackage
 }