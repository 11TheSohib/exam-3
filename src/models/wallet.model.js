import { Schema, model } from 'mongoose';

const walletSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: `User`, required: true },
    balance: { type: Number, required: true },
    cardNumber: { type: Number, required: true },
});

const Wallet = model(`Wallet`, walletSchema);
export default Wallet;
