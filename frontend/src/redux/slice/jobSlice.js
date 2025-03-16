import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  jobs: [],
  loading: false,
  error: null,
};

export const fetchJobs = createAsyncThunk("jobs/fetchJobs", async () => {
  const response = await fetch("http://localhost:5000/api/jobs");
  const data = await response.json();
  return data.jobs;
});

export const fetchJobDetails = createAsyncThunk("jobs/fetchJobDetails", async (jobId) => {
  const response = await fetch(`http://localhost:5000/api/jobs/${jobId}`);
  const data = await response.json();
  return data.job;  
});

export const deleteJob = createAsyncThunk("jobs/deleteJob", async (jobId) => {
  const response = await fetch(`http://localhost:5000/api/jobs/${jobId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (response.ok) {
    return jobId;
  } else {
    throw new Error("Failed to delete job");
  }
});

// Update a job
export const updateJob = createAsyncThunk("jobs/updateJob", async ({ jobId, updatedJobData }) => {
  const response = await fetch(`http://localhost:5000/api/jobs/${jobId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(updatedJobData),
  });

  const data = await response.json();
  console.log("Server response:", data);

  if (response.ok) {
    return data.job; 
  } else {
    throw new Error("Failed to update job");
  }
});


const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Jobs
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      // Delete Job
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.jobs = state.jobs.filter((job) => job._id !== action.payload);
      })
      // Update Job
      .addCase(updateJob.fulfilled, (state, action) => {
        const updatedJob = action.payload; 
        const index = state.jobs.findIndex((job) => job._id === updatedJob._id);
        if (index !== -1) {
          state.jobs[index] = updatedJob;
        }
      });
      
  },
});

export default jobSlice.reducer;
