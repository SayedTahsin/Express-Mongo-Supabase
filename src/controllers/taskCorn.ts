import cron from 'node-cron';
import Task from '../models/Task';
import { TypeOfTask } from '../models/Task';

export const scheduleCronJobs = () => {
  // Schedule a task to run everday
  cron.schedule('0 0 * * *', async () => {
    try {
      await Task.updateMany({ type: TypeOfTask.Daily }, { status: false });
      console.log('Daily tasks reset successful');
    } catch (error) {
      console.error('Error updating tasks:', error);
    }
  });

  // Schedule a cron job for the last day of the month at 12:00 AM
  cron.schedule('0 0 28-31 * *', async () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (tomorrow.getDate() === 1) {
      try {
        await Task.updateMany({ type: TypeOfTask.Monthly }, { status: false });
        console.log('Monthly tasks reset successful');
      } catch (error) {
        console.error('Error updating tasks:', error);
      }
    }
  });

  // Schedule a cron job for Monday at 12:00 AM
  cron.schedule('0 0 * * 1', async () => {
    try {
      await Task.updateMany({ type: TypeOfTask.Weekly }, { status: false });
      console.log('Weekly tasks reset successful');
    } catch (error) {
      console.error('Error updating tasks:', error);
    }
  });
};
