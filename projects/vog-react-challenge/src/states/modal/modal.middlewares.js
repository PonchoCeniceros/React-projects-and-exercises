import actions from "./modal.actions";

/**
 * Show modal
 * @returns 
 */
export const showModal = () => (dispatch) => {
    dispatch(actions.showModal());
};


/**
 * Hide modal
 * @returns 
 */
export const hideModal = () => (dispatch) => {
    dispatch(actions.hideModal());
};