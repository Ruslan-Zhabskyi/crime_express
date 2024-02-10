import Mongoose from "mongoose";

const { Schema } = Mongoose;

const reportSchema = new Schema({
  name: String,
  latitude: Number,
  longitude: Number,
  category: String,
  description: String,
  locationid: {
    type: Schema.Types.ObjectId,
    ref: "Location",
  },
});

export const Report = Mongoose.model("Report", reportSchema);
