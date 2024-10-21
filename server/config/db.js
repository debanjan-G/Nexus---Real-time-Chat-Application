import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connection to DB successfully established!");
  } catch (error) {
    console.log("ERROR: ", error.message);
    process.exit();
  }
};

export default connectDB;
