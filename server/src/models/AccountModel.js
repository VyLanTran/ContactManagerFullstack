import mongoose from 'mongoose';

const AccountSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    contacts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ContactModel'
    }],
});

export const AccountModel = mongoose.model("accounts", AccountSchema);