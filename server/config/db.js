import mongoose from "mongoose";

const ConnectDB = async () => {
  try {
    const data = await mongoose.connect(process.env.MONGO_URI);
    console.log("db is connected", `${data.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};

export default ConnectDB;
