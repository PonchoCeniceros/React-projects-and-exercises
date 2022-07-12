import actionTypes from "./modal.types";

/**
 * start action
 * @returns action
 */
const showModal = () => ({
	type: actionTypes.SHOW,
});

/**
 * success action
 * @returns action
 */
const hideModal = () => ({
	type: actionTypes.HIDE,
});

const actions = {
	showModal,
	hideModal,
};

export default actions;