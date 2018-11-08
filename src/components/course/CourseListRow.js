import React,{PropTypes} from 'react';
import {Link} from 'react-router';

const CourseListRow = ({course,actions}) =>{

    return (
        <tr>
            <td><Link to={'/course/' + course.id}>{course.title}</Link></td>
            <td>{course.authorId}</td>
            <td>{course.category}</td>
            <td>{course.length}</td>
            <td><Link to={'/courseDelete/'+course.id} >Delete</Link></td>
        </tr>
    );
};

CourseListRow.propTypes = {
    course:  PropTypes.object.isRequired,
    actions:  PropTypes.object.isRequired
};

export default CourseListRow;