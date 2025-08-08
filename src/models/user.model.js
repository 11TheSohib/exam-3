import { Schema, model } from 'mongoose';

import { Roles } from '../const/index.js';

const userSchema = new Schema(
    {
        fullName: { type: String, required: true },
        username: { type: String, unique: true, required: true },
        email: { type: String, unique: true, required: true },
        phoneNumber: { type: String, unique: true, required: true },
        hashedPass: { type: String, unique: true, required: true },
        role: {
            type: String,
            enum: [Roles.admin, Roles.client, Roles.saller, Roles.superadmin],
            default: Roles.client,
        },
        isActive: { type: Boolean, default: true },
        address: { type: String },
    },
    { timestamps: true, versionKey: false }
);

userSchema.virtual(`promocode`, {
    ref: `Promocode`,
    localField: `_id`,
    foreignField: `userId`,
});

userSchema.virtual(`saller-image`, {
    ref: `Saller-image`,
    localField: `_id`,
    foreignField: `sallerId`,
});

userSchema.virtual(`payment`, {
    ref: `Payment`,
    localField: `_id`,
    foreignField: `clientId`,
});

userSchema.virtual(`saller-flowers`, {
    ref: `Flower`,
    localField: `_id`,
    foreignField: `sallerId`,
});

userSchema.virtual(`wallet`, {
    ref: `Wallet`,
    localField: `_id`,
    foreignField: `userId`,
});

userSchema.virtual(`order`, {
    ref: `Order`,
    localField: `_id`,
    foreignField: `clientId`,
});

const User = model(`User`, userSchema);
export default User;
