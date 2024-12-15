import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// config
// socket
import { SOCKET } from "../../config";

// initial state
const initialState = {
  vehicles: [],
  isVehicleLoading: false,
  isNewVehicleUploading: false,
  isVehicleUploadingDone: false,
  isVehicleDeleting: false,
  isVehicleUpdating: false,
  isVehicleUpdateDone: false,
};

// get all vehicles
export const getAllVehicles = createAsyncThunk(
  "vehicles/getAllVehicles",
  async () => {
    try {
      const response = await axios.get("/api/vehicle/get-all-vehicles");
      console.log("GET ALL VEHICLES", response.data);
      return response.data;
    } catch (err) {
      console.log("GET ALL VEHICLES ERROR", err.response.data);
      return err.response.data;
    }
  }
);

// add new vehicles
export const addNewVehicle = createAsyncThunk(
  "vehicles/addNewVehicle",
  async (data) => {
    try {
      const response = await axios.post("/api/vehicle/new-vehicle", data, {
        headers: {
          "Content-Type": "multipart/form-data", // Optional, handled by Axios
          Authorization: `Bearer ${token}`, // Include JWT in the Authorization header
        },
      });
      console.log("ADD NEW VEHICLE RESPONSE:", response.data);
      return response.data;
    } catch (err) {
      console.log("ADD NEW VEHICLE ERROR:", err.response.data);
      return err.response.data;
    }
  }
);

// delete vehicle
export const deleteVehicle = createAsyncThunk(
  "vehicles/deleteVehicle",
  async (_id) => {
    try {
      const response = await axios.delete(`/api/vehicle/delete-vehicle/${_id}`);
      return response.data;
    } catch (err) {
      return err.response.data;
    }
  }
);

// update vehicle
export const updateVehicle = createAsyncThunk(
  "vehicles/updateVehicle",
  async (data) => {
    const { _id, name, status, file } = data;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("status", status);
    formData.append("image", file);
    try {
      const response = await axios.put(
        `/api/vehicle/update-vehicle/${_id}`,
        formData
      );
      return response.data;
    } catch (err) {
      return err.response.data;
    }
  }
);

const vehiclesSlice = createSlice({
  name: "vehicles",
  initialState,
  reducers: {
    // add new vehicle
    addNewVehicleEvent: (state, action) => {
      state.vehicles?.unshift(action?.payload);
    },
    // delete vehicle
    updateVehicleEvent: (state, action) => {
      console.log(action.payload);
      let index = state.vehicles.findIndex(
        (vi) => vi._id === action.payload?._id
      );
      state.vehicles[index] = action.payload;
    },
    // delete vehicle
    deleteVehicleEvent: (state, action) => {
      state.vehicles = state.vehicles.filter(
        (vehicleItem) => vehicleItem?._id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      // cases
      // get all vehicles
      // pending
      .addCase(getAllVehicles.pending, (state) => {
        state.isVehicleLoading = true;
        console.log("PENDING-GET-POSTS");
      })
      // fulfilled
      .addCase(getAllVehicles.fulfilled, (state, action) => {
        state.isVehicleLoading = false;
        if (action.payload?.vehicles) {
          state.vehicles = action.payload.vehicles;
        }
      })
      // rejected
      .addCase(getAllVehicles.rejected, (state) => {
        state.isVehicleLoading = false;
        console.log("REJECTED-GET-POSTS");
      })

      // new vehicles
      // pending
      .addCase(addNewVehicle.pending, (state) => {
        state.isNewVehicleUploading = true;
        state.isVehicleUploadingDone = false;
      })
      // fulfilled
      .addCase(addNewVehicle.fulfilled, (state, action) => {
        state.isNewVehicleUploading = false;
        state.isVehicleUploadingDone = true;
        if (action.payload?.newVehicle) {
          SOCKET.emit("addNewVehicle", action.payload?.newVehicle);
        }
      })
      // rejected
      .addCase(addNewVehicle.rejected, (state) => {
        state.isNewVehicleUploading = false;
        state.isVehicleUploadingDone = true;
        console.log("ADD-NEW-POST-REJECTED");
      })
      // updating vehicle
      // pending
      .addCase(updateVehicle.pending, (state) => {
        state.isVehicleUpdating = true;
      })
      // fulfilled
      .addCase(updateVehicle.fulfilled, (state, action) => {
        state.isVehicleUpdating = false;
        if (action.payload?.updatedVehicle) {
          SOCKET.emit("updateVehicle", action.payload?.updatedVehicle);
        }
      })
      // rejected
      .addCase(updateVehicle.rejected, (state) => {
        state.isVehicleUpdating = false;
      })
      // delete vehicle
      // pending case
      .addCase(deleteVehicle.pending, (state) => {
        state.isVehicleDeleting = true;
      })
      // fulfilled
      .addCase(deleteVehicle.fulfilled, (state, action) => {
        state.isVehicleDeleting = false;
        if (action.payload?._id) {
          SOCKET.emit("deleteVehicle", action.payload?._id);
        }
      })
      // rejected
      .addCase(deleteVehicle.rejected, (state) => {
        state.isVehicleDeleting = false;
        console.log("DELETE-POST-REJECTED");
      });
  },
});

// actions
export const { addNewVehicleEvent, updateVehicleEvent, deleteVehicleEvent } =
  vehiclesSlice.actions;

// selectors
// vehicles selector
export const vehiclesSelector = (state) => state.vehicles.vehicles;
// is vehicle uploading
export const isNewVehicleUploadingSelector = (state) =>
  state.vehicles.isNewVehicleUploading;
// is vehicle uploading done
export const isVehicleUploadingDoneSelector = (state) =>
  state.vehicles.isVehicleUploadingDone;
// is vehicle uploading done
export const isVehicleUpdatingSelector = (state) =>
  state.vehicles.isVehicleUpdating;

// is vehicle deleting
export const isVehicleDeletingSelector = (state) =>
  state.vehicles.isVehicleDeleting;

// exports
export default vehiclesSlice.reducer;
