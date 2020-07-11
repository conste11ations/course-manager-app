import React, { Component, useEffect } from 'react';
import CourseDataService from '../service/CourseDataService';

const INSTRUCTOR = 'in28minutes'

class CourseList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      courses: [],
      message: null
    }
    this.deleteCourseClicked = this.deleteCourseClicked.bind(this)
    this.updateCourseClicked = this.updateCourseClicked.bind(this)
    this.addCourseClicked = this.addCourseClicked.bind(this)
    this.refreshCourses = this.refreshCourses.bind(this)
  }

  componentDidMount() {
    this.refreshCourses();
  }

  refreshCourses() {
    CourseDataService.retrieveAllCourses(INSTRUCTOR)//HARDCODED
      .then(
        response => {
          this.setState({ courses: response.data })
        }
      )
  }

  deleteCourseClicked(id) {
    CourseDataService.deleteCourse(INSTRUCTOR, id)
      .then(
        response => {
          this.setState({ message: `Successfully deleted course ${id}.` })
          this.refreshCourses()
        }
      )

  }

  addCourseClicked() {
    this.props.history.push(`/courses/new`)
  }

  updateCourseClicked(id) {
    this.props.history.push(`/courses/${id}`)
  }

  render() {
    return (
      <div className="container">
        <h3>All Courses</h3>
        {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
        <div className="container">
          <table className="table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Description</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.courses.map(
                  course =>
                    <tr key={course.id}>
                      <td>{course.id}</td>
                      <td>{course.description}</td>
                      <td><button className="btn btn-warning" onClick={() => this.updateCourseClicked(course.id)}>Update</button></td>
                      <td><button className="btn btn-danger" onClick={() => this.deleteCourseClicked(course.id)}>Delete</button></td>
                    </tr>
                )
              }
            </tbody>
          </table>
          <div className="row">
            <button className="btn btn-success" onClick={this.addCourseClicked}>Add</button>
          </div>
        </div>
      </div>
    )
  }
}

export default CourseList;