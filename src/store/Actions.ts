import {ACTION_CITY} from './Reducers'

export const changeCity = (newCity) =>{

    return{
        type: ACTION_CITY,
        payload: newCity,
    }
}