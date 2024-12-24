import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
    ngoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'NGO',
        required: true,
    },
    name: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    description: { type: String },
}, { timestamps: true });

export default mongoose.model('Event', EventSchema);
