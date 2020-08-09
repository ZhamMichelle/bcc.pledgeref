export const ACTION_CITY = 'Action_CITY';

const initialState = {
    city: "Актобе",
}

export const rootReducer = (state = initialState, action) =>{

    switch(action.type){
        case ACTION_CITY : return{ ...state, city: action.payload};
    }
    
return state;
}