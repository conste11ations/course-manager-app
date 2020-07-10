import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CourseList from './CourseList';
import Course from './Course';

class InstructorApp extends Component {
  render() {
    return (
      <Router>
        <>
          <h1>Instructor Application</h1>
          <Switch>
            <Route path="/" exact component={CourseList} />
            <Route path="/courses" exact component={CourseList} />
            <Route path="/courses/:id" component={Course} />
          </Switch>
        </>
      </Router>
    )
  }
}

export default InstructorApp;