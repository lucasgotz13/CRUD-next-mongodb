import { Schema, model, models } from "mongoose";

const TaskSchema = new Schema({
    title: {
        type: String,
        required: [true, "El titulo es requerido"],
        unique: true,
        trim: true
    },
    description: {
        type: String,
        required: [true, "La desscripcion es requerida"],
        trim: true,
    },
}, {
    timestamps: true
})

export default models.Task || model("Task", TaskSchema)
