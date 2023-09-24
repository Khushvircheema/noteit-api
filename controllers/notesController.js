import { UserModel } from "../models/schema.js";

// login
const loginget = async (req, res) => {
  console.log("login get");
};

const loginpost = async (req, res) => {
  let Email = req.body.email;
  let Password = req.body.password;

  // check if email password matches in database

  let foundUser = await UserModel.findOne({ email: Email });
  if (foundUser) {
    console.log("email found");
    if (foundUser.password === Password) {
      console.log("password matched");
      const id = foundUser._id;
      res.send(id);
    } else {
      console.log("incorrect password");
      res.redirect("/login");
    }
  } else {
    console.log("user doesn't exist");
    res.redirect("/register");
  }
};

// Register
const registerpost = async (req, res) => {
  let FirstName = req.body.fname;
  let LastName = req.body.lname;
  let Email = req.body.email;
  let Password = req.body.password;

  let checkIfExists = await UserModel.findOne({ email: Email });

  if (checkIfExists) {
    console.log("user exists in the database");

    return res.redirect("/login");
  } else {
    console.log("user doesn't exists in the database");
    try {
      const newUser = await UserModel.create({
        firstName: FirstName,
        lastName: LastName,
        email: Email,
        password: Password,
      });

      console.log("User added Successfully");
      const newUserId = await UserModel.findOne({ email: Email });
      const responseData = newUserId;
      console.log("backend: ", responseData);
      res.send(responseData);
    } catch (error) {
      console.error("Error in adding User to database ", error.message);
      res.status(500).send("Error in adding doc");
    }
  }
};

// Render all notes
const renderNotes = async (req, res) => {
  const personalNotes = req.params.id;
  console.log("Notes rendered");
  try {
    const myNotes = await UserModel.findOne({ _id: personalNotes });
    if (!myNotes) {
      console.log("User doesn't exist");
      res.send("User not found");
      return;
    } else {
      // Retrieve all notes from the database

      const allMyNotes = await myNotes.notes;
      // Log successful rendering of notes
      console.log("Notes rendered successfully");
      res.send(allMyNotes);
    }
  } catch (error) {
    // Handle error by sending error message and status 500
    console.error("Error: ", error.message);
    res.status(500).send({ error: "An error occurred while fetching notes." });
  }
};

// Create a new note
const createNote = async (req, res) => {
  const params = req.params.id;
  const titleOfNote = req.body.title;
  const contentOfNote = req.body.content;

  console.log(titleOfNote);
  console.log(contentOfNote);

  try {
    const user = await UserModel.findById(params);
    // Create a new note using data from the request body
    await user.notes.push({
      title: titleOfNote,
      content: contentOfNote,
    });
    await user.save();

    // Log successful creation and redirect with 200 status
    console.log("Document created successfully");
    res.status(200).redirect(`/notes/${params}`);
  } catch (error) {
    // Handle error by sending error message and status 400
    console.error("Can't create document", error.message);
    res.status(400).send({ error: "An error occurred while creating a note." });
  }
};

// Delete a note
const deleteNote = async (req, res) => {
  const userId = req.params.object;
  const noteId = req.params.note;

  try {
    const updateUser = await UserModel.findByIdAndUpdate(
      userId,
      { $pull: { notes: { _id: noteId } } }, // Remove the note with the specified _id
      { new: true }
    );

    if (!updateUser) {
      // Handle the case where the user or note wasn't found
      return res.status(404).send({ error: "User or note not found." });
    }

    // Return a success response with a 200 status
    res.status(200).send({ message: "Note deleted successfully." });
  } catch (error) {
    // Handle other errors by sending an error message and status 500
    console.log("Can't delete", error.message);
    res.status(500).send({ error: "An error occurred while deleting a note." });
  }
};

// Update a note
const updateNote = async (req, res) => {
  const userId = req.params.object;
  const noteId = req.params.note;
  const updatedNoteData = req.body;
  console.log(userId, noteId, updatedNoteData);

  try {
    const noteUpdate = await UserModel.findOneAndUpdate(
      { "notes._id": noteId }, // Find the note by its _id within the array
      {
        $set: {
          "notes.$.title": updatedNoteData.title,
          "notes.$.content": updatedNoteData.content,
        },
      }, // Update the title and content
      { new: true } // Return the updated user document
    );

    if (noteUpdate) {
      console.log(`Note with _id ${noteId} updated successfully.`);
      res.status(200).send(noteUpdate.notes);
    } else {
      console.log(`Note with _id ${noteId} not found.`);
      res.status(404).send({ error: "Note not found." });
    }
  } catch (error) {
    console.log("Can't update note", error.message);
    res.status(500).send({ error: "An error occurred while updating a note." });
  }
};

// Export the functions for use in routes
export {
  registerpost,
  loginget,
  loginpost,
  createNote,
  renderNotes,
  updateNote,
  deleteNote,
};
