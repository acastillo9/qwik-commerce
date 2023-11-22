import connectDB from "~/db/connect-db";
import { server$ } from "@builder.io/qwik-city";
import Joi from "joi";
import User from "~/model/User";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const login = server$(async function (email, password) {
  await connectDB(this.env.get("DB_URI") as string);

  const { error } = schema.validate({ email, password });
  if (error) return { success: false, message: error.details[0].message.replace(/['"]+/g, '') };

  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser) return { success: false, message: "Account not Found" };

    const isMatch = await compare(password, checkUser.password);
    if (!isMatch) return { success: false, message: "Incorrect Password" };

    const token = jwt.sign({ id: checkUser._id, email: checkUser.email , role : checkUser?.role }, process.env.JWT_SECREAT ?? 'default_secret_dumbScret', { expiresIn: '1d' });

    const data = {token , user : {email : checkUser.email , name : checkUser.name , _id : checkUser._id , role : checkUser?.role}}
    return { success: true, message: "Login Successfull", data};
  } catch (error) {
    console.log('Error in register (server) => ', error);
    return { success: false, message: "Something Went Wrong Please Retry Later !" };
  }
});
