// models/Grade.js
import mongoose from "mongoose";

const gradeSchema = new mongoose.Schema(
  {
    submission: { type: mongoose.Schema.Types.ObjectId, ref: "Submission", required: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    score: { type: Number, required: true, min: 0, max: 100 },
    feedback: String,
  },
  { timestamps: true }
);

export default mongoose.model("Grade", gradeSchema);
