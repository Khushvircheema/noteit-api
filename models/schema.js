import { Schema, model } from "mongoose";

const noteSchema = new Schema([{ title: String, content: String }]);

const userSchema = Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  notes: [noteSchema],
});

const UserModel = model("notes", userSchema);

export { UserModel };
