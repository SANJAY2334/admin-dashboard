import mongoose from "mongoose";

const TicketSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true }, // Optional description field
    status: {
      type: String,
      enum: ["Pending", "Resolved", "Received"],
      default: "Pending",
      required: true,
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
  },
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt`
);

const Ticket = mongoose.model("Ticket", TicketSchema);
export default Ticket;
