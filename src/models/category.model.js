import { Schema, model } from 'mongoose';

const categorySchema = new Schema(
    {
        name: { type: String, required: true },
    },
    {
        timestamps: true,
        versionKey: false,
        virtuals: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

categorySchema.virtual(`flowers`, {
    ref: `Flower`,
    localField: `_id`,
    foreignField: `categoryId`,
});

const Category = model(`Category`, categorySchema);
export default Category;
