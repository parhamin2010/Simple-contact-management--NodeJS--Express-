const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel')
//@desc Get all contacts
//@route GET /api/contacts
//@access private
const getContacts = asyncHandler(async (req,res) => {
    const contacts = await Contact.find({user_id: req.user.id})
    res.status(200).json(contacts);
})

//@desc get contact
//@route GET /api/contacts/:id
//@access private
const getContact = asyncHandler(async (req,res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("There is no contact with this ID");
    }
    res.status(200).json(contact);
})

//@desc Create new contact
//@route POST /api/contacts/:id
//@access private
const createContacts = asyncHandler(async (req,res) => {
    const {name, email, phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("all fields must be filled");
    }

    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    });

    res.status(201).json(contact);
})


//@desc update contact
//@route PUT /api/contacts/:id
//@access private
const updateContacts = asyncHandler(async (req,res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("There is no contact with this ID");
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(401);
        throw new Error("Do not have permission to update");
    }
    const updateContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );


    res.status(200).json(updateContact);
})


//@desc delete contact
//@route DELETE /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async (req,res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("There is no contact with this ID");
    }


    if(contact.user_id.toString() !== req.user.id){
        res.status(401);
        throw new Error("Do not have permission to update");
    }

    const deleteContact = await Contact.findByIdAndDelete(req.params.id);

    res.status(200).json(deleteContact);
})

module.exports = {getContacts, createContacts, getContact, updateContacts, deleteContact};