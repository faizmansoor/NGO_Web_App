import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    ngoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NGO",
      required: true,
    },
    name: { type: String, required: true },
    ngoName: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String },
    participants: { type: String },
    eligibility: { type: String },
    volunteerLink: { type: String },
    
  },
  { timestamps: true }
);

export default mongoose.model("Event", EventSchema);
