import React, { Component } from 'react';

class CourseList extends Component {

  render() {
      return (
          <div className="container">
              <h3>All Courses</h3>
              <div className="container">
                  <table className="table">
                      <thead>
                          <tr>
                              <th>Id</th>
                              <th>Description</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr>
                              <td>1</td>
                              <td>Learn Full stack with Spring Boot and Angular</td>
                          </tr>
                      </tbody>
                  </table>
              </div>
          </div>
      )
  }
}

export default CourseList