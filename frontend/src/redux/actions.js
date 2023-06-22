import { SET_ACTIVE_LINK, SET_LOADING, SET_TOAST} from "./actionTypes";

export const setActiveLink = link => ({ type: SET_ACTIVE_LINK, payload: { link } });
export const setLoading = loading => ({ type: SET_LOADING, payload: { loading } });
export const setToast = toast => ({ type: SET_TOAST, payload: { toast } });