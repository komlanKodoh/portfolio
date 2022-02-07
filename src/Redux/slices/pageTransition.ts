// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface PageState {
//   isInTransition: boolean;
//   transitionState: "rest" | "started" | "swapping" | "ending";
//   transitionName: string | null;
// }

// const initialState = {
//   isInTransition: false,
//   transitionState: "rest",
//   transitionName: null,
// } as PageState;

// const sectionSlice = createSlice({
//   name: "transitionState",
//   initialState,
//   reducers: {
//     startTransition(state) {
//       state.isInTransition = true;
//     },
//     setTransitionState(
//       state,
//       transitionState: PayloadAction<"rest" |"started" | "swapping" | "ending" >
//     ) {
//       state.transitionState = transitionState.payload;
//     },
//     scheduleTransition(state, animations: PayloadAction<string>) {
//       state.transitionName = animations.payload;
//     },
//     endTransitionState(state) {
//       state.transitionName = null;
//       state.isInTransition = false;
//     },
//   },
// });

// export const { endTransitionState, startTransition, scheduleTransition, setTransitionState } =
//   sectionSlice.actions;
// export default sectionSlice.reducer;
