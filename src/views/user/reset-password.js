import React,  {useEffect, useState } from "react";
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
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Alert,
  Col
} from "reactstrap";
import Message from '../utils/message.js'

function ResetPassword(props) {

  const { register, handleSubmit, errors, watch } = useForm();
  const [message, setMessage] = useState('');
  const [values, setValues] = useState({
    token: '',
    password: '',
    confirmPassword: '',
});

const onChangeValue = prop => event =>{
  setValues({ ...values, [prop]: event.target.value });
}

const resetPassword = () => {
    const user = {
      token: values.token,
      password: values.password,
      confirmPassword:  values.confirmPassword
    };
    http
      .post("/auth/reset-password" , user)
      .then((res) => {
        setMessage(res.message)
      })
      .catch((er) => console.log(er));
};
    return (
      <>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent px-lg-5 py-lg-4">
              <div className="btn-wrapper text-center pb-2">
                  <span className="btn-inner--icon">
                    <img
                      src={require("assets/img/LOGO.PNG")}
                    />
                  </span>
              </div>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">
              {message ? <Message success={message} /> : null}
                <div className="text-center text-muted mb-4">
                  <small>
                    To get a new password, 
                    first confirm the verification code sent to your account.  
                  </small>
                </div>
              <Form role="form">
                <FormGroup>
                      <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-hat-3" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <input 
                        class="form-control"
                        name="token" 
                        type="text" 
                        placeholder="Code -" 
                        value={values.token}
                        onChange={onChangeValue('token')}
                        ref={register({
                          required: "You need the Verification code",
                        })}
                      />
                      </InputGroup>
                      {errors.token && <h6>{errors.token.message}</h6>}
                    </FormGroup>
                    <FormGroup>
                      <InputGroup className="input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-hat-3" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <input 
                          class="form-control"$
                          name="password" 
                          type="password" 
                          placeholder="New password" 
                          value={values.password}
                          onChange={onChangeValue('password')}
                          ref={register({
                            required: "Specify your new password",
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
                      name="confirmPassword" 
                      type="password" 
                      placeholder="Confirm password" 
                      value={values.confirmPassword}
                          onChange={onChangeValue('confirmPassword')}
                      ref={register({
                        validate: value =>
                          value === watch('password') || "The passwords do not match"
                      })} 
                    /> 
                  </InputGroup>
                  {errors.confirmPassword && <h6>{errors.confirmPassword.message}</h6>}
                </FormGroup>
                <div className="text-center">
                  <Button 
                    className="mt-4" 
                    color="primary" 
                    type="button"
                    onClick={handleSubmit(resetPassword)}
                  >
                    Save
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </>
    );
}
export default ResetPassword;
