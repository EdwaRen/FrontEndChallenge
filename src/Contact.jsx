import React, { Component } from 'react';
import { Button, Form, Message } from 'semantic-ui-react';
import {FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap';
import './css/styles.css';
import Select from 'react-select';
import 'react-select/dist/react-select.css';


const INTERESTS = [
  { label: 'Ecommerce', value: 'Ecommerce' },
  { label: 'Startups', value: 'Startups' },
  { label: 'Fashion', value: 'Fashion' },
  { label: 'Tech', value: 'Tech' },
  { label: 'Automobiles', value: 'Automobiles' },
  { label: 'Journals', value: 'Journals' },
];

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      email: '',
      error: '',
      selectedOption: '',

    };
    this.handleChange = this.handleChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.noActions = this.noActions.bind(this);

  }

  getValidationState() {
    const length = this.state.error.length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
    return null;
  }
  noActions() {

  }

  handleChange(e) {
    // Ensures email is saved into the this.state whenever the input changes
    this.setState({ email: e.target.value });
  }

  errorMessage(e) {
    // Changes error message in this.state which will automatically re-render the component with this.state.error
    if (this.state.value >0) {
      return (
        <div>
          {this.state.value};
        </div>
      )
    }
  }
  handleButtonClick() {
    // Uses logic to display proper error message depending on which combination of fields have been filled
    if (this.state.email.includes("@") > 0 && this.state.value != '') {
      console.log("Suceess! User email:", this.state.email , "\nUser interests: " , this.state.value);
      this.setState({
        error: "",
      })
    } else if (this.state.email.includes("@") <= 0 && this.state.value == '') {
      this.setState({
        error: 'Please enter valid email address and choose an interest'
      })
    } else if (this.state.email.includes("@") <= 0 ) {
      this.setState({
        error: 'Please enter valid email address'
      })
    } else {
      this.setState({
        error: 'Please choose a valid interest'
      })
    }

  }
  handleSelectChange (value) {
    // Concatenates data from multi-select input form whenever something is modified in the input
    this.setState({ value });
    console.log(this.state.value);
  }

  render() {
    const { disabled, stayOpen, value } = this.state;
    // options contains all the interests in multi-select input
    const options = INTERESTS;
    return (
      <div className = "background">
        <Form className = "formField">
          <div className = "headerContact"><b>Stay up to date with ecommerce trends with Shopify's newsletter</b></div>
          <div className = "greenSeparatorContact"></div>
          <div className = "subheaderContact">Subscribe for free marketing tips</div>

          <FormGroup
            className = "emailField"
            controlId="formBasicText"
            >
              <FormControl
                value = {this.state.email}

                // This could also be set to type="email" for a further input check but we want to implement our own error logic
                type="text"
                placeholder= 'Email'
                onChange={this.handleChange}

              />
              <div className = "errorMessageField" ><b>{this.state.error}</b></div>
              <FormControl.Feedback />
            </FormGroup>
            <FormGroup
              className = "interestField"
              >

                <Select
                  closeOnSelect={!stayOpen}
                  disabled={disabled}
                  multi
                  onChange={this.handleSelectChange}
                  options={options}
                  placeholder="Interested in..."
                  removeSelected={this.state.removeSelected}
                  rtl={this.state.rtl}

                  simpleValue
                  value={value}
                />
                <br />

                {/* </Col> */}
              </FormGroup>
              <Button
                className = "buttonField"

                // handleButtonClick processes the input fields to ensure data is safely passed
                onClick = {this.handleButtonClick}
                >Sign Up Now
              </Button>


            </Form>


            <div
              // The footer will properly resize when the height is reduced
              className = "footerContact"
              onclick ={this.noActions}>
              <u><p>Unsubscribe</p></u>
            </div>

          </div>
        );
      }
    }

    export default Contact;
