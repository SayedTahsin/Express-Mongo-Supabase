import mongoose, { Schema, Document } from 'mongoose';

interface Inote extends Document {
  text: string;
  mail: string;
  color: string;
}

const noteSchema: Schema = new Schema(
  {
    text: { type: String, required: true },
    mail: { type: String, required: true },
    color: { type: String, default: 'White' },
  },
  { timestamps: true },
);

const note = mongoose.model<Inote>('notes', noteSchema);

export default note;
