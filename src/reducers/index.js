import {combineReducers} from 'redux';
import {types} from '../actions/index.js';

const initialState = {
    parkingAreaList: [],
    paymentList: [],
}

const parking_area = (state = initialState, action) => {
    switch(action.type) {
        case types.ADD_PARKING_AREA:            
            return {
                ...state,
                parkingAreaList: [...state.parkingAreaList, JSON.parse(action.data)]
            };
        case types.EDIT_PARKING_AREA:
            const data = JSON.parse(action.data)
            const newParkingAreaList = state.parkingAreaList.map(parkingArea => {
                if (parkingArea.id === data.id) {
                    return data;
                }
                return parkingArea;
            });
            return {
                ...state,
                parkingAreaList: newParkingAreaList
            };
        case types.DELETE_PARKING_AREA:
            return {
                ...state,
                parkingAreaList: state.parkingAreaList.filter(parkingArea => parkingArea.id !== action.data)
            };
        case types.GET_PARKING_AREA:
            return {
                ...state,
                parkingAreaList: action.data
            };
        case types.PAY_PARKING_AREA:
            return {
                ...state,
                paymentList: [...state.paymentList, JSON.parse(action.data)]
            };
        case types.GET_BOOK_LIST:
            return {
                ...state,
                paymentList: JSON.parse(action.data)
            };
        case types.DELETE_BOOK_LIST:
            return {
                ...state,
                paymentList: state.paymentList.filter(payment => payment.id !== action.data)
            };
        default:
            return state;
    }
}

const reducers = combineReducers({
    parking_area,
})

export default reducers;