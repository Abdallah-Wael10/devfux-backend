const data = require("../models/contactus.model")
const asyncWrapper = require("../middleware/asyncWrapper")

// Fetch all leads

const allContact = asyncWrapper(async(req,res)=>{
    const leads = await data.find({},{__v:false});
    if (!leads) {
         return res.status(404).json({ message: "Leads not found" });
    }
    res.json(leads)
})

const oneContact = asyncWrapper(async(req,res)=>{
    const lead = await data.findById(req.params.id, {__v:false});
    if (!lead) {
        return res.status(404).json({ message: "Lead not found" });
    }
    res.json(lead)
})

const createContact = asyncWrapper(async(req,res)=>{
    const newContact = new data(req.body);
    const lead = await newContact.save();
    res.status(201).json(lead)
})

const updateContact = asyncWrapper(async(req,res)=>{
    const id = req.params.id;
    const updateContact = await data.updateOne(
      {_id: id},
      {$set: {...req.body}}
    );
    res.json(updateContact)
})

const deleteContact = asyncWrapper(async(req,res)=>{
    await data.deleteOne({_id: req.params.id})
    res.json({ message: "Lead deleted successfully." })
})

module.exports = {
    allContact,
    oneContact,
    createContact,
    updateContact,
    deleteContact,
 
}