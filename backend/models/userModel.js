const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    verificationCode: {
      type: String,
      required: true,
    },
  },
  { collection: "EcoVend" } // Explicitly set the collection name
)

// No need for a pre-save hook for hashing
// Remove the password comparison method if not needed
// userSchema.methods.matchPassword = async function (enteredPassword) {
//   return enteredPassword === this.password;
// }

module.exports = mongoose.model("User", userSchema, "Users")
