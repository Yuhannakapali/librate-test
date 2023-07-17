import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../index";
import type { Country } from "../../DataApi/country.interface";
const initialState: Country[] = []

export const countrySlice = createSlice({
  name: 'Country',
  initialState,
  reducers: {
    addCountry(state, payload: PayloadAction<Country[]>) {
      payload.payload.forEach((country) => {
        const exist = state.find((item) => item.name === country.name);
        if (!exist) {
          state.push(country);
        }
      })

    },

  }
});
export const { addCountry } = countrySlice.actions;
export const selectCountry = (state: RootState) => state.countryReducer;
export default countrySlice.reducer;