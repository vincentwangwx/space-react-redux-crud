import * as types from '../actions/actionTypes';
import courseApi from '../api/mysqlCourseApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';
import axios from 'axios';

export function loadCoursesSuccess(courses){
    return { type: types.LOAD_COURSES_SUCCESS, courses};
}

export function createCourseSuccess(course){
    return {type: types.CREATE_COURSE_SUCCESS,course};
}

export function updateCourseSuccess(course){
    return {type:types.UPDATE_COURSE_SUCCESS,course};
} 

export function deleteCourseSuccess(course){
    return {type:types.DELETE_COURSE_SUCCESS,course};
}

export function deleteCourse(course){
    return function (dispatch){
        //debugger;
        dispatch(beginAjaxCall());
        return courseApi.deleteCourse(course.id).then(

        course =>{
            deleteCourseSuccess(course);
        }
        ).catch(error =>{
            dispatch(ajaxCallError(error));
            throw(error);
        });
    }
}

export function loadCourses(){
    return function(dispatch){

        dispatch(beginAjaxCall());
        axios.get("http://localhost:9000/courses/")
        .then(function (response) {
            let json = response.data;
            console.log(json);
            return dispatch(loadCoursesSuccess(json));
        })
        .catch(function (error) {
            console.log(error);
        });
    }
}

export function saveCourse(course){
    return function (dispatch,getState){
        dispatch(beginAjaxCall());
        return courseApi.saveCourse(course).then(savedCourse =>{
            course.id ? dispatch(updateCourseSuccess(savedCourse)):
                dispatch(createCourseSuccess(savedCourse));
        }).catch(error =>{
            dispatch(ajaxCallError(error));
            throw(error);
        });
    }
}