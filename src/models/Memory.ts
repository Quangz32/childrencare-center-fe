/*Table memories {
  id objectId [pk]
  user objectId [ref: > users.id ]
  date date 
  image string
  title string
  content string

} */

import { models, model, Schema, SchemaTypes } from "mongoose";

const MemorySchema: Schema = new Schema({
  user: {
    type: SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const MemoryModel = models.Memory || model("Memory", MemorySchema, "memories");

export default MemoryModel;
