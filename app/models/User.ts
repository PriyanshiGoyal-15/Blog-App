import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    unique: true,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    // enum : enumeration where we define whether are person is admin or user n

    enum: ["admin", "user"],
    default: "user",
  },
});

// Prevent model overwrite warning and ensure schema registration
let User: any;
try {
  User = mongoose.model("User");
} catch (error) {
  User = mongoose.model("User", UserSchema);
}

export default User;
