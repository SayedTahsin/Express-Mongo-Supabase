import mongoose, { Schema, Document } from 'mongoose';

export interface ITask extends Document {
  text: string;
  status: string;
  mail: string;
  type: string;
}

const taskSchema: Schema = new Schema(
  {
    text: { type: String, required: true },
    status: { type: String, required: true },
    mail: { type: String, required: true, unique: true },
    type: { type: String, required: true },
  },
  { timestamps: true },
);

const Task = mongoose.model<ITask>('Tasks', taskSchema);

export default Task;
