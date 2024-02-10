import Mongoose from "mongoose";

const { Schema } = Mongoose;

const reportSchema = new Schema({
  Name: String,
  Latitude: Number,
  Longitude: Number,
  Category: String,
  Description: String,
  locationid: {
    type: Schema.Types.ObjectId,
    ref: "Location",
  },
});

export const Report = Mongoose.model("Report", reportSchema);
