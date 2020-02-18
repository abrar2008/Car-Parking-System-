import axios from 'axios'
import request from 'request'

export const types = {
    ADD_PARKING_AREA : "ADD_PARKING_AREA",
    EDIT_PARKING_AREA : "EDIT_PARKING_AREA",
    DELETE_PARKING_AREA : "DELETE_PARKING_AREA",
    GET_PARKING_AREA : "GET_PARKING_AREA",
    PAY_PARKING_AREA : "PAY_PARKING_AREA",
    GET_BOOK_LIST : "GET_BOOK_LIST",
    DELETE_BOOK_LIST : "DELETE_BOOK_LIST",
}

export const getParkingArea = (value) => (dispatch) => {
    const url = "http://localhost:4000/getParkingArea"
    axios({
            method: 'post',
            url: url,
    }).then(response => {
        dispatch({
            type: types.GET_PARKING_AREA,
            data: response.data
        })
    })
}

export const addParkingArea = (value) => (dispatch) => {
    const url = "http://localhost:4000/addParkingArea"
    request.post({
        url: url,
        form: {
            name: value[0],
            weekday_rate: value[1],
            weekend_rate: value[2],
            discount_rate: value[3],
            image: value[4]
        },
        method: "POST"
    }, function(error, response, body) {
        dispatch({
            type: types.ADD_PARKING_AREA,
            data: body
        })
    })
}

export const editParkingArea = (value) => (dispatch) => {
    const url = "http://localhost:4000/editParkingArea"
    request.post({
        url: url,
        form: {
            name: value[0],
            weekday_rate: value[1],
            weekend_rate: value[2],
            discount_rate: value[3],
            image: value[4],
            id: value[5]
        },
        method: "POST"
    }, function(error, response, body) {
        dispatch({
            type: types.EDIT_PARKING_AREA,
            data: body
        })
    })
}

export const delParkingArea = (value) => (dispatch) => {
    const url = "http://localhost:4000/delParkingArea"
    request.post({
        url: url,
        form: {
            id: value[0],
        },
        method: "POST"
    }, function(error, response, body) {
        dispatch({
            type: types.DELETE_PARKING_AREA,
            data: body
        })
    })
}

export const payParkingArea = (value) => (dispatch) => {
    const url = "http://localhost:4000/payParkingArea"
    request.post({
        url: url,
        form: {
            id: value[0],
            start_date: value[1],
            start_time: value[2],
            end_date: value[3],
            end_time: value[4],
            pay_amount: value[5],
        },
        method: "POST"
    }, function(error, response, body) {
        dispatch({
            type: types.PAY_PARKING_AREA,
            data: body
        })
    })
}

export const getBookList = (value) => (dispatch) => {
    const url = "http://localhost:4000/getBookList"
    request.post({
        url: url,
        method: "POST"
    },
      function(error, response, body) {
        dispatch({
           // type: types.GET_BOOK_LIST,
            data: body
        })
    })
  
}

export const delBookList = (value) => (dispatch) => {
    const url = "http://localhost:4000/delBookList"
    request.post({
        url: url,
        form: {
            id: value,
        },
        method: "POST"
    }, function(error, response, body) {
        dispatch({
            type: types.DELETE_BOOK_LIST,
            data: body
        })
    })
}