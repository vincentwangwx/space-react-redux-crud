import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as courseActions from '../../actions/courseActions';
import {bindActionCreators } from 'redux';
import CourseList from './CourseList';
import {browserHistory} from 'react-router';
import toastr from 'toastr';

class CoursesPage extends React.Component{
    constructor(props,context){
        super(props,context);
        this.state = {
            courses:  Object.assign({},this.props.courses),
            course:  Object.assign({},this.props.course),
            actions:  Object.assign({},this.props.actions),
            saving:false,
            errors:{}
        };
        this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);
    }

    componentWillReceiveProps(nextProps){

        if( nextProps.course.id !==""){
            debugger;
            //Necessary to populate form when existing course in loaded directly.
            //this.setState({course:Object.assign({},nextProps.course)});
            this.state.actions.deleteCourse(this.props.course);
            this.redirectCourseListPage();
        }
    }


    redirectToAddCoursePage(){
        browserHistory.push('/course');
    }
    redirectCourseListPage(){
        browserHistory.push('/courses');
    }

    render(){
        const {courses} = this.props;
        const {actions} = this.props;
        return(
            <div>
                <h1>Courses</h1>
                <input type = "submit"
                    value = "Add Course"
                    className = "btn btn-primary"
                    onClick = {this.redirectToAddCoursePage}
                />
                <CourseList courses={courses} actions={actions}/>
            </div>
        );
    }
}

CoursesPage.propTypes = {
    courses: PropTypes.array.isRequired,
    course: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};
function getCourseById(courses,id){
    const course = courses.filter(course => course.id == id);
    if(course) return course[0];
    return null;
}
function mapStateToProps(state,ownProps){
    const courseId = ownProps.params.id; // from the path '/course/:id'

    let course = {id:'', watchHref:'',title:'',authorId:'',length:'',category:''};
    if(courseId&&state.courses.length>0){
        course = getCourseById(state.courses,courseId);
    }
    debugger;
    return{
        courses: state.courses,
        course:course
    };
}
function mapDispatchToProps(dispatch){
    return{
        actions:bindActionCreators(courseActions,dispatch)
    };
}
export default connect(mapStateToProps,mapDispatchToProps) (CoursesPage);