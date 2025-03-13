import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  savedJobs: [],
  appliedJobs: [],
  error: null,
};

export const fetchSavedJobs = createAsyncThunk(
  "jobActions/fetchSavedJobs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:5000/api/job-actions/saved", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (!response.ok) throw new Error("Failed to fetch saved jobs");
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAppliedJobs = createAsyncThunk(
  "jobActions/fetchAppliedJobs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:5000/api/job-actions/applied", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (!response.ok) throw new Error("Failed to fetch applied jobs");
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const saveJob = createAsyncThunk(
  "jobActions/saveJob",
  async (jobId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token provided");

      const response = await fetch(`http://localhost:5000/api/job-actions/save/${jobId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save/unsave job");
      }

      return jobId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const applyJob = createAsyncThunk(
  "jobActions/applyJob",
  async (jobId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token provided");

      const response = await fetch(`http://localhost:5000/api/job-actions/apply/${jobId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to apply for job");

      return jobId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const jobActionSlice = createSlice({
  name: "jobActions",
  initialState,
  reducers: {
    clearJobActions: (state) => {
      state.savedJobs = [];
      state.appliedJobs = [];
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchSavedJobs.fulfilled, (state, action) => {
        state.savedJobs = action.payload;
      })

      .addCase(fetchAppliedJobs.fulfilled, (state, action) => {
        state.appliedJobs = action.payload;
      })

      .addCase(saveJob.fulfilled, (state, action) => {
        state.savedJobs = state.savedJobs.some((job) => job.job._id === action.payload)
          ? state.savedJobs.filter((job) => job.job._id !== action.payload) // Remove if already saved
          : [...state.savedJobs, { job: { _id: action.payload }, saved: true }];
      })

      .addCase(applyJob.fulfilled, (state, action) => {
        state.appliedJobs.push({ job: { _id: action.payload }, applied: true });
      })
      .addCase(saveJob.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(applyJob.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearJobActions } = jobActionSlice.actions;
export default jobActionSlice.reducer;
