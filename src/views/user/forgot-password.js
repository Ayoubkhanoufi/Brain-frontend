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
import Progress from '../utils/progress';

function ForgotPassword(props) {

  const { register, handleSubmit, errors } = useForm();
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const [values, setValues] = useState({
    email: '',
  });

  const sendEmail = () => {

    console.log('ffffffffffff')
    const user = {
      email : values.email,
    };
    http
      .post("/auth/forget-password" ,user,{
        onUploadProgress: progressEvent => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );
          // Clear percentage
          setTimeout(() => setUploadPercentage(0), 10000);
        }
      })
      .then((res) => {
        setMessage(res.message)
        props.history.push('/auth/reset-password');
      })
      .catch((er) => console.log(er));
  };

  const onChangeValue = prop => event =>{
    setValues({ ...values, [prop]: event.target.value });
  }

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
            <CardBody className="px-lg-5 py-lg-4">
              {message ? <Message msg={message} /> : null}
              <div className="text-center text-muted mb-4">
                <small>
                    Enter your email address that you used to register. 
                    We'll send you an email with your username 
                    and a link to reset your password
                .</small>
              </div>
              <Form role="form">
                <FormGroup>
                  <Row>
                    <Col class="col">
                      <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-email-83" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <input 
                        class="form-control"
                        name="email" 
                        type="test" 
                        placeholder="Your email" 
                        value={values.email}
                        onChange={onChangeValue('email')}
                        ref={register({
                          required: "You must specify your email",
                          pattern: /^\S+@\S+$/i
                        })} 
                      /> 
                    </InputGroup>
                    {errors.email && <h6 style={{color: 'red'}}>{errors.email.message}</h6>}
                      <Progress percentage={uploadPercentage}/>
                    </Col>
                    </Row>
                </FormGroup>
                <div className="text-center">
                  <Button 
                    className="mt-4" 
                    color="primary" 
                    type="button"
                    onClick={handleSubmit(sendEmail)}
                  >
                    Send
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </>
    );
}
export default ForgotPassword;
