import React from "react";

// reactstrap components
import { NavItem, NavLink, Nav, Container, Row, Col } from "reactstrap";

class Login extends React.Component {
  render() {
    return (
      <>
        <footer className="py-5">
          <Container>
            <Row className="align-items-center justify-content-center">
              <Col>
                <Nav className="nav-footer justify-content-center">
                <NavItem>
                  <NavLink className="copyright text-xl-left">
                    Copyright © 2020{" "}
                    <a
                      className="font-weight-bold ml-1 text-danger"
                      href="https://ma.pulse.digital" 
                    >
                    PULSE.digital
                    </a>
                  </NavLink>
                </NavItem>
                </Nav>
              </Col>
            </Row>
          </Container>
        </footer>
      </>
    );
  }
}

export default Login;
