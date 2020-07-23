
import React, { useState }from "react";
import {withRouter, Link} from 'react-router-dom';
import http from "../services/api";
import { useForm } from 'react-hook-form';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col
} from "reactstrap";

function Login(props){

  const { register, handleSubmit, errors } = useForm();
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const onChangeValue = prop => event =>{
    setValues({ ...values, [prop]: event.target.value });
  }

  const LoginHandler = () => {
    const user = {
      email : values.email,
      password : values.password
    };
    
      http
      .post("/auth/login",user)
      .then((res) => {
          console.log('Ifffffffffff')
          const userToken = res.token;
          localStorage.setItem("userToken", JSON.stringify(userToken));
          props.history.push("/admin/project");
      })
  };
    return (
      <>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0" >
            <CardHeader className="bg-transparent pt-5">
              <div className="btn-wrapper text-center pb-2">
                  <span className="btn-inner--icon">
                    <img
                      src={require("assets/img/LOGO.PNG")}
                    />
                  </span>
              </div>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">
              <form role="form" onSubmit={handleSubmit(LoginHandler)}>
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <input 
                      class="form-control"
                      name="email"
                      type="text" 
                      placeholder="Email" 
                      onChange={onChangeValue('email')}
                      value={values.email}
                      ref={register({
                        required: "You must specify a email", 
                        pattern: /^\S+@\S+$/i
                      })} 
                    />
                  </InputGroup>
                  {errors.email && <h6 style={{color: 'red'}}>{errors.email.message}</h6>}
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
                      onChange={onChangeValue('password')}
                      value={values.password}
                      ref={register({
                        required: "You must specify a password"
                      })} 
                    />
                  </InputGroup>
                  {errors.password && <h6 style={{color: 'red'}}>{errors.password.message}</h6>}
                </FormGroup>
                <div className="text-center pt-1">
                  {/* <input
                        type='submit'
                        value='Upload'
                        className='btn btn-primary btn-block mt-4'
                      /> */}
                  <button 
                    type='submit'
                    className='btn btn-primary btn-block mt-4 '
                  >
                    Sign in
                  </button>
                </div>
              </form> 
            </CardBody>
          </Card>
          <Row className="mt-3">
            <Col xs="6">
                <Link to="/auth/forgot-password">
                  <small>Forgot password?</small>
                </Link>
            </Col>
            <Col className="text-right" xs="6">
                <Link to="/auth/register">
                  <small>Create new account</small>
                </Link>
            </Col>
          </Row>
        </Col>
      </>
    );
}

export default withRouter(Login);
