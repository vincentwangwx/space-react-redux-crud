import axios from 'axios';

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (course) => {
  return replaceAll(course.title, ' ', '-');
};

class CourseApi {
  static getAllCourses() {
    axios.get("http://localhost:9000/courses/")
            .then(function (response) {
                let json = response.data;
                console.log(json);
                return (Object.assign([], json)); 
            })
            .catch(function (error) {
                console.log(error);
            });
  }

  static saveCourse(course) {
    course = Object.assign({}, course); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        const minCourseTitleLength = 1;
        if (course.title.length < minCourseTitleLength) {
          reject(`Title must be at least ${minCourseTitleLength} characters.`);
        }

        if (course.id) {
        //   const existingCourseIndex = courses.findIndex(a => a.id == course.id);
        //   courses.splice(existingCourseIndex, 1, course);
        } else {
          //Just simulating creation here.
          //The server would generate ids and watchHref's for new courses in a real app.
          //Cloning so copy returned is passed by value rather than by reference.
          course.id = generateId(course);
          course.watchHref = `http://www.pluralsight.com/courses/${course.id}`;
        //   courses.push(course);
        }

        resolve(course);
      }, 0);
    });
  }

  static deleteCourse(courseId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // const indexOfCourseToDelete = courses.findIndex(course => {
        //   course.id == courseId;
        //});
        // courses.splice(indexOfCourseToDelete, 1);
        debugger;
        //resolve(courses);
      }, 0);
    });
  }
}

export default CourseApi;
