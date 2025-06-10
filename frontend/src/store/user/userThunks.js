import {createAsyncThunk} from "@reduxjs/toolkit";
import {getUser} from "../../api/user";

export const getUserData = createAsyncThunk(
  "user/getUser",
  async (id) => {
    return await getUser(id);
  }
);