import actionTypes from "./posts.types"


/**
 * start action
 * @returns action
 */
const postsStart = () => ({
	type: actionTypes.POSTS_START,
});

/**
 * success action
 * @returns action
 */
const postsSuccess = (posts) => ({
	type: actionTypes.POSTS_SUCCESS,
	payload: posts,
});

/**
 * error action
 * @returns action
 */
const postsError = (errorMessage) => ({
	type: actionTypes.POSTS_ERROR,
	payload: errorMessage,
});

const actions = {
	postsStart,
	postsSuccess,
	postsError,
};

export default actions;