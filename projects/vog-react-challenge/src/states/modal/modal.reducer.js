import actionTypes from "./modal.types";

/**
 * Initial state (DTO)
 */
 const initialState = {
	status: false,
};

/**
 * Posts reducer
 * @param {*} state = initialState
 * @param {*} action 
 * @returns newState
 */
const modalReducer = (state = initialState, { type }) => {
	switch (type) {
		case actionTypes.SHOW:
			return {
				...state,
				status: true,
			};

		case actionTypes.HIDE:
			return {
				...state,
				status: false,
			};

		default:
			return state;
	}
};

export default modalReducer;