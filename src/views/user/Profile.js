import React from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Badge,
  Col
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import { useEffect, useState } from "react";
import http from "../services/api";

function UserProfile() {

  const [user, setUser] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const tokenUser = localStorage.getItem('userToken');

  useEffect(() => {
    http.get("/auth/me"
      , {
        headers: {
          Authorization: `Bearer ${JSON.parse(tokenUser)}`
        }
      })
      .then((res) => {
        setUser(res.user);
      });

  }, []);

  const Disable = () => {
    setIsDisabled(false)
    console.log(isDisabled)
  }

  const [values, setValues] = useState({
    email: user.email,
    password: user.password,
    firstName: user.firstName,
    lastName: user.lastName,
    skills: user.skills
  });
  const [profil, setProfil] = useState({
    isAdmin: false,
    isCollaborator: true,
    isChief: true
  });

  const updateUser = () => {
    const data = {
      email: values.email,
      password: values.password,
      firstName: values.firstName,
      lastName: values.lastName,
      skills: values.skills,
      isAdmin: profile.isAdmin,
      isChief: profile.isChief,
      isCollaborator: profile.isCollaborator,
    };
    http
      .put("/auth/user/" + user._id, data)
      .then((res) => {
        console.log(res);
        setIsDisabled(true)
      })
      .catch((er) => console.log(er));
  };

  const onChangeValue = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
    setProfil({ ...profil, [prop]: event.target.checked });
  }

  let profile;
  if (user.isAdmin == true) {
    profile = 'Admin';
  } else if (user.isChief == true) {
    profile = 'Chief';
  } else if (user.isCollaborator == true) {
    profile = 'Collaborator';
  } else {
    profile = 'No profile';
  }

  

  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={require("assets/img/theme/team-4-800x800.jpg")}
                      />
                    </a>
                  </div>
                </Col>
              </Row>
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div className="d-flex justify-content-between">
                  <Button
                    className="mr-4"
                    color="info"
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                    size="sm"
                  >
                    Connect
                    </Button>
                  <Button
                    className="float-right"
                    color="default"
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                    size="sm"
                  >
                    Message
                    </Button>
                </div>
              </CardHeader>
              <CardBody className="pt-0 pt-md-4">
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                      <div>
                        <span className="heading">22</span>
                        <span className="description">Friends</span>
                      </div>
                      <div>
                        <span className="heading">10</span>
                        <span className="description">Photos</span>
                      </div>
                      <div>
                        <span className="heading">89</span>
                        <span className="description">Comments</span>
                      </div>
                    </div>
                  </div>
                </Row>
                <div className="text-center">
                  <h3>
                    hhhhhhhhhhhhh
                      <span className="font-weight-light">, 27</span>
                  </h3>
                  <div className="h5 font-weight-300">
                    <i className="ni location_pin mr-2" />
                      Bucharest, Romania
                    </div>
                  <div className="h5 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                      Solution Manager - Creative Tim Officer
                    </div>
                  <div>
                    <i className="ni education_hat mr-2" />
                      University of Computer Science
                    </div>
                  <hr className="my-4" />
                  <p>
                    Ryan — the name taken by Melbourne-raised, Brooklyn-based
                    Nick Murphy — writes, performs and records all of his own
                    music.
                    </p>
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    Show more
                    </a>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">My account</h3>
                  </Col>
                  <Col className="text-right">
                    <Button
                      color='info'
                      size="sm"
                      onClick={Disable}
                    >
                      <i className="ni ni-bold-left" />{" "}Edit
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    User information
                    </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            First name
                            </label>
                          <Input
                            className="form-control-alternative"
                            size="sm"
                            defaultValue={user.firstName}
                            onChange={onChangeValue('firstName')}
                            disabled={isDisabled}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Last name
                            </label>
                          <Input
                            className="form-control-alternative"
                            size="sm"
                            defaultValue={user.lastName}
                            onChange={onChangeValue('lastName')}
                            disabled={isDisabled}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Profile
                            </label>
                          <Input type="select" size="sm" disabled={isDisabled}>
                            <option value='true'>{profile}</option>
                            <option value='true'>Admin</option>
                            <option >
                              <input
                                className="custom-control-input"
                                id="admin"
                                type="checkbox"
                                onChange={onChangeValue('isAdmin')}
                              />
                            </option>
                            <option onChange={onChangeValue('isChief')}>Chief</option>
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Email address
                            </label>
                          <Input
                            className="form-control-alternative"
                            size="sm"
                            defaultValue={user.email}
                            onChange={onChangeValue('email')}
                            disabled={isDisabled}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  {/* Address */}
                  <h6 className="heading-small text-muted mb-4">
                    Other information
                    </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Skills
                            </label>
                          <Input
                            className="form-control-alternative"
                            size="sm"
                            defaultValue={user.skills}
                            onChange={onChangeValue('skills')}
                            disabled={isDisabled}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Technologies
                            </label>
                          <Input
                            className="form-control-alternative"
                            size="sm"
                            defaultValue={user.technologies}
                            disabled={isDisabled}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-city"
                          >
                            Hobbies
                            </label>
                          <Input
                            className="form-control-alternative"
                            size="sm"
                            defaultValue={user.hobbies}
                            disabled={isDisabled}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Experiences
                            </label>
                          <Input
                            className="form-control-alternative"
                            size="sm"
                            defaultValue={user.experiences}
                            disabled={isDisabled}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Educations
                            </label>
                          <Input
                            className="form-control-alternative"
                            size="sm"
                            defaultValue={user.educations}
                            disabled={isDisabled}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="text-right">
                        <Button
                          size="sm"
                          color="success"
                          disabled={isDisabled}
                          onClick={updateUser}
                        >
                          Save modification
                        </Button>
                      </Col>
                    </Row>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default UserProfile;
