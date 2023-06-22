import { SET_ACTIVE_LINK, SET_LOADING, SET_TOAST} from "./actionTypes";

const initialState = {
    activeLink: '',
    loading: false,
    toast: {
      open: false,
      message: "Successfully saved",
      severity: "success",
      duration: 5000,
      reloadAction: false
    }
  };

  export default function rootReducer(state = initialState, action) {
    switch (action.type) {
      case SET_ACTIVE_LINK: {
        return {
          ...state,
          activeLink: action.payload.link
        }
      }
      case SET_LOADING: {
        return {
          ...state,
          loading: action.payload.loading
        }
      }
      case SET_TOAST: {
        return {
          ...state,
          toast: action.payload.toast
        }
      }
      default:
        return state;
    }
  }