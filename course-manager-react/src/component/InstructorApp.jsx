import React, { Component } from 'react';
import CourseList from './CourseList';

class InstructorApp extends Component {
  render() {
    return (
      <>
        <h1>Instructor Application</h1>
        <CourseList />
      </>
    )
  }
}

export default InstructorApp;