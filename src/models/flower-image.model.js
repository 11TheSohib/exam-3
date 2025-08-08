import { Schema, model } from 'mongoose';

const flowerImageSchema = new Schema(
    {
        imageURL: { type: String, required: true },
        color: { type: String, required: true },
        flowerId: { type: Schema.Types.ObjectId, required: true },
    },
    { timestamps: true, versionKey: false }
);

const FlowerImage = model(`FlowerImage`, flowerImageSchema);
export default FlowerImage;
