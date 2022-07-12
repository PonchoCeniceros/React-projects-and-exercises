import axios from "axios";
import actions from "./posts.actions";

/**
 * Retrieve all posts
 * @returns 
 */
export const loadAllPosts = () => (dispatch) => {
    dispatch(actions.postsStart());

    axios
        .get(process.env.REACT_APP_API_URL + "posts?_start=0&_limit=20")
        .then((resp) => dispatch(actions.postsSuccess(resp.data)))
        .catch((err) => dispatch(actions.postsError(err.message)));
};

/**
 * Retrieve post by id
 * @param {*} id 
 * @returns 
 */
export const loadPostById = (id) => (dispatch) => {
    dispatch(actions.postsStart());
    
    if (isNaN(parseInt(id))) {
        dispatch(actions.postsError("Empty post id"));
    } else {
        axios
            .get(process.env.REACT_APP_API_URL + `posts/${id}`)
            .then((resp) => dispatch(actions.postsSuccess([resp.data])))
            .catch((err) => dispatch(actions.postsError(err.message)));
    }
};

/**
 * Compose a post given a title and body
 * @param {*} title 
 * @param {*} body 
 * @returns 
 */
export const postPost = (title, body) => (dispatch) => {
    dispatch(actions.postsStart());
    console.log("POSTING DATA:\nTITLE:", title, "BODY:", body);
    
    axios
        .get(process.env.REACT_APP_API_URL + "posts?_start=0&_limit=20")
        .then((resp) => dispatch(actions.postsSuccess(resp.data)))
        .catch((err) => dispatch(actions.postsError(err.message)));
};