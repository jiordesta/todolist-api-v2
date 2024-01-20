import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  title: { type: String, default: "New Todo" },
  description: { type: String },
  status: {
    type: String,
    enum: ["0", "1", "2"],
    default: "0",
  },
  owner: { type: mongoose.Types.ObjectId },
});

export default mongoose.model("Todo", TodoSchema);
