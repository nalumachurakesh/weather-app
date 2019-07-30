import WeatherActionTypes from '../actionTypes/weatherActionType';

export default (state = {}, action) => {
    switch (action.type) {
        case WeatherActionTypes.GET_WEATHER_FORECAST_SUCCESS:
            return {
                result: action.payload
            }
        case WeatherActionTypes.GET_WEATHER_FORECAST_FAILURE:
            return {
                error: action.payload
            }
        default:
            return state
    }
}