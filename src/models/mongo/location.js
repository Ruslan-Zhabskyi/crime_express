import Mongoose from "mongoose";

const { Schema } = Mongoose;

const locationSchema = new Schema({
  Name: String,
  Latitude: Number,
  Longitude: Number,
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Location = Mongoose.model("Location", locationSchema);
