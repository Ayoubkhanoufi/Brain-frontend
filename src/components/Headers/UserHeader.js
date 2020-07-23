import React, { useState, useEffect } from "react";
import http from "../../views/services/api"
import {
  Button,
  Container,
  Row,
  Col
} from "reactstrap";

function UserHeader() {

  const [user, setUser] = useState('');
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
  return (
    <>
      <div
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          minHeight: "600px",
          backgroundImage:
            "url(" + require("assets/img/pulseback.PNG") + ")",
          backgroundSize: "cover",
          backgroundPosition: "center top"
        }}
      >
        {/* Mask */}
        <span className="mask bg-gradient-default opacity-7" />
        {/* Header container */}
        <Container className="d-flex align-items-center" fluid>
          <Row>
            <Col lg="7" md="10">
              <h1 className="display-2 text-white">Hello {user.lastName}{' '}{user.firstName}</h1>
              <p className="text-white mt-0 mb-5">
                This is your profile page. You can see the progress you've
                made with your work and manage your projects or assigned tasks
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );

}

export default UserHeader;
