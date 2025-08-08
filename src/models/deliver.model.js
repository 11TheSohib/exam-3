import { Schema, model } from 'mongoose';

const deliverSchema = new Schema(
    {
        address: { type: String, required: true },
        deliverDate: { type: Date, required: true },
        orderId: { type: Schema.Types.ObjectId, ref: `Order`, required: true },
    },
    { timestamps: true, versionKey: false }
);

const Deliver = model(`Deliver`, deliverSchema);
export default Deliver;
