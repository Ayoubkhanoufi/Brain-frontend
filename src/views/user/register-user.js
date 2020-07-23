import React,  { useState } from "react";
import { useForm } from 'react-hook-form';
import { withRouter, Link } from 'react-router-dom';
import http from "../services/api";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  CustomInput,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col
} from "reactstrap";

function RegisterUser(props) {

  const { register, handleSubmit, errors, watch } = useForm();

  const [values, setValues] = useState({
    email: '',
    password:'',
    firstName:'',
    lastName:''
  });
  const [profil, setProfil] = useState({
    isAdmin: false, 
    isCollaborator: false,
    isChief: false
  });

  const registerHandler = () => {
    const user = {
      email : values.email,
      password: values.password,
      firstName: values.firstName,
      lastName: values.lastName,
      isAdmin: profil.isAdmin,
      isChief: profil.isChief,
      isCollaborator: profil.isCollaborator,
    };
    http
      .post("/auth/register" ,user)
      .then((res) => {
        console.log(res);
        props.history.push('/');
      })
      .catch((er) => console.log(er));
  };

  const onChangeValue = prop => event =>{
    setValues({ ...values, [prop]: event.target.value });
    setProfil({ ...profil, [prop]: event.target.checked });
  }
    return (
      <>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent pb-5">
              <div className="btn-wrapper text-center pb-2">
                  <span className="btn-inner--icon">
                    <img
                      src={require("assets/img/LOGO.PNG")}
                    />
                  </span>
              </div>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">
              <Form role="form">
                <FormGroup>
                  <Row>
                    <Col class="col">
                      <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-hat-3" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <input 
                        class="form-control"
                        name="firstName" 
                        type="test" 
                        placeholder="FirstName" 
                        value={values.firstName}
                        onChange={onChangeValue('firstName')}
                        ref={register({
                          required: "Specify your first name",
                        })}
                      />
                      </InputGroup>
                      {errors.firstName && <h6>{errors.firstName.message}</h6>}
                    </Col>
                    <Col class="col">
                      <InputGroup className="input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-hat-3" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <input 
                          class="form-control"$
                          name="lastName" 
                          type="text" 
                          placeholder="lastName" 
                          value={values.lastName}
                          onChange={onChangeValue('lastName')}
                          ref={register({
                            required: "Specify your last name",
                          })} 
                        />
                      </InputGroup>
                      {errors.lastName && <h6>{errors.lastName.message}</h6>}
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <input 
                      class="form-control"$
                      name="email" 
                      type="text" 
                      placeholder="Email" 
                      onChange={onChangeValue('email')}
                      value={values.email}
                      ref={register({
                        required: "You must specify an email",
                      })} 
                    />  
                  </InputGroup>
                  {errors.email && <h6>{errors.email.message}</h6>}
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <input 
                      class="form-control"$
                      name="password" 
                      type="password" 
                      placeholder="Password" 
                      value={values.password}
                      onChange={onChangeValue('password')}
                      ref={register({
                        required: "You must specify a password",
                      })} 
                    /> 
                  </InputGroup>
                  {errors.password && <h6>{errors.password.message}</h6>}
                </FormGroup>
                
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <input 
                      class="form-control"$
                      name="passwordConfirm" 
                      type="password" 
                      placeholder="Confirm password" 
                      ref={register({
                        validate: value =>
                          value === watch('password') || "The passwords do not match"
                      })} 
                    /> 
                  </InputGroup>
                  {errors.passwordConfirm && <h6>{errors.passwordConfirm.message}</h6>}
                </FormGroup>
                <Row className="my-4">
                  <Col>
                    <div className="custom-control custom-control-alternative custom-checkbox">
                      <input
                        className="custom-control-input"
                        id="admin"
                        type="checkbox"
                        onChange={onChangeValue('isAdmin')}
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="admin"
                      >
                        <span className="text-muted">
                          Admin
                        </span>
                      </label>
                    </div>
                  </Col>
                  <Col >
                    <div className="custom-control custom-control-alternative custom-checkbox">
                      <input
                        className="custom-control-input"
                        id="chief"
                        type="checkbox"
                        onChange={onChangeValue('isChief')}
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="chief"
                      >
                        <span className="text-muted">
                          Chief
                        </span>
                      </label>
                    </div>
                  </Col>
                  <Col >
                    <div className="custom-control custom-control-alternative custom-checkbox">
                      <input
                        className="custom-control-input"
                        id="collaborator"
                        type="checkbox"
                        onChange={onChangeValue('isCollaborator')}
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="collaborator"
                      >
                        <span className="text-muted">
                          Collaborator
                        </span>
                      </label>
                    </div>
                  </Col>
                </Row>
                <div className="text-center">
                  <Button 
                    className="mt-4" 
                    color="primary" 
                    type="button"
                    onClick={handleSubmit(registerHandler)}
                  >
                    Save
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
          <Row className="mt-3">
            <Col className="text-center">
              <Link to="/">
                <small>Already have an account ? Sign In</small>
              </Link>
            </Col>
          </Row>
        </Col>
      </>
    );
}

export default RegisterUser;
