import mongoose from "mongoose";

export const connect = async () => {
  const { connection } = await mongoose.connect(process.env.MongoURI);

  console.log(`Database connect with ${connection.host}`);
};
