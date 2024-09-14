import mongoose, { Schema, Document } from 'mongoose';

enum TypeOfTask {
  General = 'General',
  Daily = 'Daily',
  Weekly = 'Weekly',
  Monthly = 'Monthly',
}

interface ITask extends Document {
  text: string;
  status: boolean;
  mail: string;
  type: TypeOfTask;
}

const taskSchema: Schema = new Schema(
  {
    text: { type: String, required: true },
    status: { type: Boolean, required: true },
    mail: { type: String, required: true },
    type: {
      type: String, // Must use String in the schema
      enum: Object.values(TypeOfTask), // Set allowed enum values
      required: true,
    },
  },
  { timestamps: true },
);

const Task = mongoose.model<ITask>('Tasks', taskSchema);

export default Task;
