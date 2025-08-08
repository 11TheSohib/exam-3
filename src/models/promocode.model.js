import { Schema, model } from 'mongoose';

const promoCodeSchema = new Schema(
    {
        paramaCode: { type: String, required: true },
        isActive: { type: Boolean, required: true },
        userId: { type: Schema.Types.ObjectId, ref: `User`, required: true },
    },
    { timestamps: true, versionKey: false }
);

const PromoCode = model(`Promocode`, promoCodeSchema);
export default PromoCode;
