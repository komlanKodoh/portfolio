
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PageState {
  isInTransition: boolean;
  transitionName: string | null;
}

const initialState = {
  isInTransition: false,
  transitionName: null
} as PageState;

const sectionSlice = createSlice({
  name: "transitionState",
  initialState,
  reducers: {
    startTransition(state) {
      state.isInTransition = true;
    },
    scheduleTransition(state, animations: PayloadAction<string>) {
      state.transitionName = animations.payload ;
    },
    endTransitionState(state) {
      state.transitionName = null;
      state.isInTransition = false;
    },
  },
});

export const { endTransitionState, startTransition, scheduleTransition } =
  sectionSlice.actions;
export default sectionSlice.reducer;
