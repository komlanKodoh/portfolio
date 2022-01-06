import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SectionState {
  active: number;
  sectionsData: sectionData[];
}

export type sectionData = {
  height: number
  theme: string;
}

const initialState = { active: 0, sectionsData: [] } as SectionState;

const sectionSlice = createSlice({
  name: "sections",
  initialState,
  reducers: {
    focusSection(state, action: PayloadAction<number>) {
      state.active = action.payload;
    },
    updateSectionData(state, action: PayloadAction<{index: number, sectionData: sectionData}>) {
      state.sectionsData[action.payload.index] = action.payload.sectionData;
    },
  },
});

export const { focusSection, updateSectionData } = sectionSlice.actions;
export default sectionSlice.reducer;
