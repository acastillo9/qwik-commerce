import { models, model, Schema } from "mongoose";

const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
  },
});

const User = models?.User || model("User", UserSchema);

export default User;
