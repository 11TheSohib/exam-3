import { Schema, model } from 'mongoose';

const flowersSchema = new Schema(
    {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        isActive: { type: Boolean, default: true },
        sallerId: { type: Schema.Types.ObjectId, ref: `User` },
        categoryId: { type: Schema.Types.ObjectId, ref: `Category` },
    },
    { timestamps: true, versionKey: false }
);

flowersSchema.virtual(`flowers`, {
    ref: `Flower-image`,
    localField: `_id`,
    foreignField: `flowerId`,
});

const Flower = model(`Flower`, flowersSchema);
export default Flower;
