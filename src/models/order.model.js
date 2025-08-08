import { Schema, model } from 'mongoose';

const orderSchema = new Schema(
    {
        totalPrice: { type: Number, required: true },
        quantity: { type: Number, required: true },
        flowerId: {
            type: Schema.Types.ObjectId,
            ref: `Flower`,
            required: true,
        },
        clientId: { type: Schema.Types.ObjectId, ref: `User`, required: true },
    },
    { timestamps: true, versionKey: false }
);

const Order = model(`Order`, orderSchema);
export default Order;
