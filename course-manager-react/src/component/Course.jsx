import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import CourseDataService from '../service/CourseDataService';

const INSTRUCTOR = 'in28minutes';

class Course extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id === 'new' ? -1 : this.props.match.params.id,
      description: ''
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.validate = this.validate.bind(this);
  }

  componentDidMount() {

    if (this.state.id === -1) {
      return;
    }

    CourseDataService.retrieveCourse(INSTRUCTOR, this.state.id)
      .then(response => this.setState({
        description: response.data.description
      }));
  }

  onSubmit(values) {
    let username = INSTRUCTOR;

    let course = {
      id: this.state.id,
      description: values.description
    }

    if (this.state.id === -1) {
      CourseDataService.createCourse(username, course)
        .then(() => this.props.history.push('/courses'));
    } else {
      CourseDataService.updateCourse(username, this.state.id, course)
        .then(() => this.props.history.push('/courses'));
    }
  };

  onCancel() {
    this.props.history.push('/courses');
  }

  validate(values) {
    let errors = {};
    if (!values.description) {
      errors.description = 'Enter a description';
    } else if (values.description.length < 5) {
      errors.description = 'Enter a minimum of 5 characters in the description';
    }
    return errors;
  }

  render() {
    let { description, id } = this.state;
    const parsedId = id;
    return (
      <>
        <h3>Course</h3>
        <div className="container">
          <Formik initialValues={{ parsedId, description }}
            onSubmit={this.onSubmit}
            validateOnChange={false}
            validateOnBlur={false}
            validate={this.validate}
            enableReinitialize={true}>
            {
              (props) => (
                <>
                  <ErrorMessage name="description" component="div" className="alert alert-danger" />
                  <Form>
                    <fieldset className="form-group">
                      <label>Id</label>
                      <Field className="form-control" type="text" name="parsedId" disabled />
                    </fieldset>
                    <fieldset className="form-group">
                      <label>Description</label>
                      <Field className="form-control" type="text" name="description" />
                    </fieldset>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <button className="btn btn-success" style={{ margin: '10px' }} type="submit">Save</button>
                      <button className="btn btn-info" style={{ margin: '10px' }} type="reset">Reset</button>
                      <button className="btn btn-warning" style={{ margin: '10px' }} type="button" onClick={() => this.onCancel()}>Cancel</button>
                    </div>
                  </Form>
                </>
              )
            }
          </Formik>
        </div>
      </>
    )
  }
}
export default Course;