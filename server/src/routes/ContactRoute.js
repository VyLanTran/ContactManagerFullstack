import express from 'express';
import { ContactModel } from '../models/ContactModel.js';
import { AccountModel } from '../models/AccountModel.js';

const contactRouter = express.Router();

// Get all contacts
contactRouter.get('/:accountID', async (req, res) => {
    try {
        const { accountID } = req.params;
        const results = await ContactModel.find({ owner: accountID });
        return res.status(200).json(results);
    } catch (error) {
        return res.status(404).json({ message: "No contact found" });
    }
});

// Create a new contact
contactRouter.post('/addContact', async (req, res) => {
    try {
        const { accountID, contactObject } = req.body;

        // Check if contact existed in the contact list of this account
        const { firstName, lastName } = contactObject;
        const contact = await ContactModel.findOne({
            $and: [{ owner: accountID }, { firstName }, { lastName }]
        });

        if (contact) {
            return res.status(400).json({ message: "This contact already existed in the contact list" });
        }

        // Create new contact if not existed in the contact list of this account
        const account = await AccountModel.findById(accountID);
        const newContact = new ContactModel({
            ...contactObject,
            owner: accountID
        });
        account.contacts.push(newContact);
        await account.save();
        await newContact.save();

        return res.status(201).json({ contactID: newContact._id });

    } catch (error) {
        return res.status(404).json({ message: "Failed to add new contact" });
    }
});


// Get a contact by ID
contactRouter.get('/:accountID/:contactID', async (req, res) => {
    try {
        const { accountID, contactID } = req.params;
        const result = await ContactModel.find({ _id: contactID, owner: accountID });
        return res.status(200).json(result[0]);
    } catch (error) {
        return res.status(404).json({ message: "No contact found" });
    }
});


// Delete a contact
contactRouter.delete('/deleteContact/:accountID/:contactID', async (req, res) => {
    const { accountID, contactID } = req.params;

    try {
        await AccountModel.findByIdAndUpdate(
            accountID,
            { $pull: { contacts: { $in: [contactID] } } },
            { new: true }
        );
        await ContactModel.findByIdAndDelete(contactID);
        return res.status(200).json({ message: "Delete contact successfully" });
    } catch (err) {
        return res.status(500).json({ error: 'Deletion failed' });
    }
});


// Update a contact
contactRouter.put('/editContact/:accountID/:contactID', async (req, res) => {
    const { accountID, contactID } = req.params;

    const { updatedContact } = req.body;
    try {
        await ContactModel.findByIdAndUpdate(contactID, updatedContact, { new: true });
        return res.status(200).json({ message: 'success' });
    } catch (error) {
        return res.status(500).json({ error: 'Editting failed' });
    }
})


export { contactRouter };