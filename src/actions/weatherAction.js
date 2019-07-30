import WeatherActionTypes from '../actionTypes/weatherActionType';
import superAgent from 'superagent';

const apiKey = '19cc730a6ded10a66c136ea7048e7f96';

export function getMultipleCitiesCurrentWeather() {

    // 5128581 - New york
    // 4317656 - Boston
    // 4560349 - Philadelphia
    // 4915545 - Washington
    // 5391959 - San Fransico
    // 4924095 - Chicago
    // 4984500 - Atlanta
    // 5186266 - Dallas
    // 5304640 - Miami
    // 5364571 - Los Ang
    // 5475433 - Las Vegas
    
    const apiMulti = `http://api.openweathermap.org/data/2.5/group?id=5475433,5364571,5304640,5186266,4984500,5128581,4317656,4560349,4915545,5391959,4924095&units=metric&APPID=${apiKey}`
    
    return function (dispatch) {
        superAgent.get(apiMulti)
            .then(function (response) {
                dispatch({
                    type: WeatherActionTypes.GET_WEATHER_FORECAST_SUCCESS,
                    payload: JSON.parse(response.text).list
                })
            })
            .catch(function (error) {
                dispatch({
                    type: WeatherActionTypes.GET_WEATHER_FORECAST_FAILURE,
                    payload: JSON.parse(error)
                })
            });
    }
}

export function updateSelectedLocations(data) { 
    return function (dispatch) {
        dispatch({
            type: WeatherActionTypes.GET_WEATHER_FORECAST_SUCCESS,
            payload: data
        })
     }
}