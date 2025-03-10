import express from "express";
import Ticket from "../models/Ticket.js"; // Ensure the .js extension

const router = express.Router();

// ✅ Get all tickets
router.get("/", async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.status(200).json(tickets);
  } catch (error) {
    console.error("❌ Error fetching tickets:", error);
    res.status(500).json({ error: "Server error while fetching tickets" });
  }
});

// ✅ Add a new ticket
router.post("/", async (req, res) => {
  try {
    let { title, status } = req.body;

    // Validate input
    if (!title || !status) {
      return res.status(400).json({ error: "Title and status are required." });
    }

    title = title.trim();
    const validStatuses = ["Pending", "Resolved", "Received"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status value." });
    }

    const newTicket = new Ticket({ title, status });
    await newTicket.save();
    res.status(201).json(newTicket);
  } catch (error) {
    console.error("❌ Error creating ticket:", error);
    res.status(500).json({ error: "Server error while creating ticket" });
  }
});

// ✅ Update ticket status
router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: "Status is required." });
    }

    const validStatuses = ["Pending", "Resolved", "Received"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status value." });
    }

    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found." });
    }

    ticket.status = status;
    await ticket.save();

    res.status(200).json(ticket);
  } catch (error) {
    console.error("❌ Error updating ticket:", error);
    res.status(500).json({ error: "Server error while updating ticket" });
  }
});

// ✅ Delete a ticket
router.delete("/:id", async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found." });
    }

    await ticket.deleteOne();
    res.status(200).json({ message: "Ticket deleted successfully." });
  } catch (error) {
    console.error("❌ Error deleting ticket:", error);
    res.status(500).json({ error: "Server error while deleting ticket" });
  }
});

export default router;
