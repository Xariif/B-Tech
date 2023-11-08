import { combineReducers } from "redux";
import toastReducer from "./features/toasts/toastsSlice";

const rootReducer = combineReducers({
	toasts: toastReducer,
});

export default rootReducer;
