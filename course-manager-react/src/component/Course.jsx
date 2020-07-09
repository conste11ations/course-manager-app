import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import CourseDataService from '../service/CourseDataService';

const INSTRUCTOR = 'in28minutes'

class Course extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: this.props.match.params.id,
      description: ''
    }

  }

  componentDidMount() {

    console.log(this.state.id)

    // eslint-disable-next-line
    if (this.state.id == '-1') {
      return
    }

    CourseDataService.retrieveCourse(INSTRUCTOR, this.state.id)
      .then(response => this.setState({
        description: response.data.description
      }))
  }

  render() {
    let { description, id } = this.state
    return (
      <>
        <h3>Course</h3>
        <div>{id}</div>
        <div>{description}</div>
      </>
    )
  }
}
export default Course;