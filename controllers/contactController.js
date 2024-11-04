const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");


//@desc Create new contacts
//@route POST /api/contacts
//@access private

const createContact = asyncHandler(async (req, res) => {
    console.log("The request body is :", req.body);
    const {name, email, phone} = req.body;
    if (!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory !");
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    });
    res.status(201).json(contact);
});

//@desc Get all contacts
//@route GET /api/contacts
//@access private

const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({user_id: req.user.id });
    res.status(200).json(contacts);
});

//@desc Get contact
//@route GET /api/contacts/:id
//@access private

const getContact = asyncHandler(async (req, res) => {
    console.log("get contact: check1  ");
    const contact = await Contact.findById({user_id: req.params.id});
    console.log("get contact: check2  ");
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    console.log("get contact: check3  ");
    res.status(200).json(contact);
});

//@desc Update contact
//@route PUT /api/contacts/:id
//@access private

const updateContact = asyncHandler(async (req, res) => {
   
    const contact = await Contact.findById(req.params.id);
    if (!contact){
        res.status(404);
        throw new Error("Contact not found");
    }

    if (contact.user_id.toString() != req.user.id){
        res.status(403);
        throw new Error("user don't have permission to update other user's contacts");
    } 

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );
    res.status(200).json(updatedContact);
});

//@desc Delete contact
//@route delete /api/contacts/:id
//@access private

const deleteContact = asyncHandler(async (req, res) => {
    console.log("check0");
    const contact = await Contact.findById(req.params.id);
    console.log("check1");
    if (!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    if (contact.user_id.toString() != req.user.id){
        res.status(403);
        throw new Error("user don't have permission to update other user's contacts");
    } 
    await Contact.deleteOne({_id: req.params.id});
    console.log("check3");
    res.status(200).json(contact);
});

module.exports = {getContacts, createContact, getContact, updateContact, deleteContact};