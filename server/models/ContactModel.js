import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: { type: String },
    title: { type: String },
    phone: { type: String },
    email: { type: String },
    fax: { type: String },
    company: { type: String },
    address: { type: String },
    birthday: { type: String },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "accounts", required: true }
});

export const ContactModel = mongoose.model("contacts", ContactSchema);
