import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class PostsNew extends Component {
  renderField(field) {
    return (
      <div className="form-group has-danger">
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
        <div className="text-help">
          {field.meta.touched ? field.meta.error : ''}
        </div>
      </div>
    )
  }

  onSubmit(values) {
    /// this === component
    console.log(values);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Title"
          name="title"
          component={this.renderField}
        />
        <Field
          label="Categories"
          name="categories"
          component={this.renderField}
        />
        <Field
          label="Post Content"
          name="content"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    )
  }
}

function validate(values) {
    //console.log(values) -> { title: 'asf', categories: 'dcd', content: 'ade'}
    const errors = {};

    if (!values.title || values.title.length < 3) {
      errors.title = "Please enter a title that is at least 3 characters.";
    }

    if (!values.categories) {
      errors.categories = "Please enter at least 1 category.";
    }

    if (!values.content) {
      errors.content = "Please enter some content.";
    }
    //Validate input from 'values'


    //If errors is empty, form is fine to submit
    //If errors has ANY properties, redux-form assumes from is invalid
    return errors;
}

export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(PostsNew);
