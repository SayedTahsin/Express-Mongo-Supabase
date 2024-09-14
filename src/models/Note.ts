import mongoose, { Schema, Document } from 'mongoose';

interface Inote extends Document {
  text: string;
  mail: string;
}

const noteSchema: Schema = new Schema(
  {
    text: { type: String, required: true },
    mail: { type: String, required: true },
  },
  { timestamps: true },
);

const note = mongoose.model<Inote>('notes', noteSchema);

export default note;
