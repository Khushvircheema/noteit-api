import express from "express";
import {
  loginpost,
  loginget,
  registerpost,
  createNote,
  renderNotes,
  updateNote,
  deleteNote,
} from "../controllers/notesController.js";
const router = express.Router();

// login
router.get("/login", loginget);
router.post("/login", loginpost);

// register
router.post("/register", registerpost);

// render all personnal on page
router.get("/notes/:id", renderNotes);

// post note to the database
router.post("/notes/:id", createNote);

router.delete("/notes/:object/:note", deleteNote);

// update a note
router.patch("/notes/:object/:note", updateNote);

export default router;
