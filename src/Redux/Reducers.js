import { decode, verify } from 'jsonwebtoken';


const initialState = {
    isAuthenticated: false,
    username: ""
};


export const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case "AUTHENTICATE":
            const token = localStorage.getItem('token');
          return  verify(token, process.env.REACT_APP_SECRETKEY, (err, decode) => {
                if (err) {
                    console.log('verification error' + err.message);
                    return {
                        ...state,
                        isAuthenticated: false
                    };
                }
                else {
                    return {
                        isAuthenticated: true,
                        username: decode.username

                    }
                }

            })
        case "RETRIVE":
            console.log('retrive called');
            return {
                isAuthenticated: false
            };
        default:
            return state;
    }


}