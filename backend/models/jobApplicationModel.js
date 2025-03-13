import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  saved: { type: Boolean, default: false },   // Tracks if the job is saved
  applied: { type: Boolean, default: false }, // Tracks if the user has applied to the job
  dateApplied: { type: Date, default: Date.now }, // Tracks the date of the application (only relevant if applied)
});

export default mongoose.model('Application', applicationSchema);
