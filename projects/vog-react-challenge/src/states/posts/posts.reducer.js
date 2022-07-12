import actionTypes from "./posts.types";

/**
 * Initial state (DTO)
 */
 const initialState = {
	isLoading: false,
	posts: null,
	errorMessage: null,
};

/**
 * Posts reducer
 * @param {*} state = initialState
 * @param {*} action 
 * @returns newState
 */
const postsReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case actionTypes.POSTS_START:
			return {
				...state,
				isLoading: true,
				posts: null,
				errorMessage: null,
			};

		case actionTypes.POSTS_SUCCESS:
			return {
				...state,
				isLoading: false,
				posts: payload,
			};

		case actionTypes.POSTS_ERROR:
			return {
				...state,
				isLoading: false,
				errorMessage: payload,
			};

		default:
			return state;
	}
};

export default postsReducer;