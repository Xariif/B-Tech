import { combineReducers } from "redux";
import toastsReducer from "./features/toasts/toastsSlice";
import postsReducer from "./features/posts/postSlice";

const rootReducer = combineReducers({
	toasts: toastsReducer,
	posts: postsReducer,
});

export default rootReducer;
