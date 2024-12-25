import mongoose from "mongoose";

const FundraiserSchema = new mongoose.Schema(
  {
    ngoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NGO", // Link to the NGO collection
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true, // The description of the fundraiser
    },
    image: {
      type: String, // URL to the image representing the fundraiser
      required: false,
    },
    qrCodeImage: {
      type: String, // URL to the QR code image associated with the fundraiser
      required: false,
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

export default mongoose.model("Fundraiser", FundraiserSchema);
