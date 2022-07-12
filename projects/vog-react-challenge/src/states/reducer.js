import { combineReducers } from "redux";
import postsReducer from "./posts/posts.reducer";
import modalReducer from "./modal/modal.reducer";

const rootReducer = () =>
    combineReducers({
        posts: postsReducer,
        modal: modalReducer,
    });

export default rootReducer;