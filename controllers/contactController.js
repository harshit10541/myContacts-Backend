const asyncHandler = require("express-async-handler");
//@desc Get all contacts
//@route GET /api/contacts
//@access public

const getContacts = asyncHandler(async (req, res) => {
    res.status(200).json({message: "Get all contacts"});
});

//@desc Create new contacts
//@route POST /api/contacts
//@access public

const createContact = asyncHandler(async (req, res) => {
    console.log("The request body is :", req.body);
    const {name, email, phone} = req.body;
    if (!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory !");
    }
    res.status(201).json({message: "Create contacts"});
});

//@desc Get contact
//@route GET /api/contacts/:id
//@access public

const getContact = asyncHandler(async (req, res) => {
    res.status(200).json({message: `Get contact for id ${req.params.id}`});
});

//@desc Update contact
//@route PUT /api/contacts/:id
//@access public

const updateContact = asyncHandler(async (req, res) => {
    res.status(200).json({message: `update contact for id ${req.params.id}`});
});

//@desc Delete contact
//@route delete /api/contacts/:id
//@access public

const deleteContact = asyncHandler(async (req, res) => {
    res.status(201).json({message: `delete contact for id ${req.params.id}`});
});

module.exports = {getContacts, createContact, getContact, updateContact, deleteContact};