import mongoose, { type ConnectOptions } from "mongoose";

interface connectedOptions extends ConnectOptions {
  useNewUrlParser: boolean;
  useUnifiedTopology: boolean;
}

const options: connectedOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// connecting to database
const connectDB = async (dbURI: string) => {
  const connectionUrl: string = dbURI;
  mongoose
    .connect(connectionUrl, options)
    .then(() => console.log(`Database connected successfully`))
    .catch((err) =>
      console.log("Getting Error from DB connection" + err.message),
    );
  mongoose.set("strictQuery", false);
};

export default connectDB;
