import { Schema, model } from 'mongoose';

const paymentSchema = new Schema(
    {
        amount: { type: Number, required: true, required: true },
        status: {
            type: String,
            enum: [`Paid`, `Payment canceled`, `Process`],
            required: true,
        },
        clientId: { type: Schema.Types.ObjectId, ref: `User`, required: true },
        orderId: { type: Schema.Types.ObjectId, ref: `Order` },
    },
    { timestamps: true, versionKey: false }
);

const Payment = model(`Payment`, paymentSchema);
export default Payment;
