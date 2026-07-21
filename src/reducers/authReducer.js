export const initialState = {
    role: null
}
export const authReducer = (state, action)=>{
    switch (action.type) {
        case "LOGIN":
            return{...state, role: action.payload};
          case "LOGOUT":
            return{...state, role: null};

        default:
            return state;
    }
}