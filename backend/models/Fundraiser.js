import mongoose from "mongoose";

const FundraiserSchema = new mongoose.Schema(
  {
    ngoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NGO",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: false,
    },
    qrCodeUrl: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Fundraiser", FundraiserSchema);
