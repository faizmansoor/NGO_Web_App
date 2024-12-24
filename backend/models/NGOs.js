import mongoose from 'mongoose';

const NGOSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true, maxlength: 100 },
    email: { type: String, unique: true, required: true, match: /.+\@.+\..+/ },
    address: { type: String, required: true },
    contactNo: { type: String, unique: true, required: true, minlength: 10, maxlength: 15 },
    fundraisingLink: {
        type: String,
        validate: {
            validator: function (value) {
                return /^(https?:\/\/[^\s]+)$/.test(value);
            },
            message: 'Invalid URL format.',
        },
    },
    websiteLink: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return /^(https?:\/\/[^\s]+)$/.test(value);
            },
            message: 'Invalid URL format.',
        },
    },
    picUrl: {
        type: String,
        validate: {
            validator: function (value) {
                return /^(https?:\/\/[^\s]+)$/.test(value);
            },
            message: 'Invalid URL format.',
        },
    },
}, { timestamps: true });

export default mongoose.model('NGO', NGOSchema);
