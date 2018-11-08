import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function courseReducer(state = initialState.courses, action){
    switch(action.type){

        case types.LOAD_COURSES_SUCCESS:
            return action.courses;

        case types.CREATE_COURSE_SUCCESS:
            return [Object.assign({},action.course),...state ];

        case types.UPDATE_COURSE_SUCCESS:
            return [ Object.assign({},action.course),...state.filter(course => course.id !== action.course.id)];

        case types.DELETE_COURSE_SUCCESS:
            return [ state.filter(course => course.id !== action.course.id)];

        default:
            return state;
    }
}