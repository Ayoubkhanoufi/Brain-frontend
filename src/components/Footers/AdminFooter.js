import React from "react";


// reactstrap components
import { Container, Row, Col, Nav, NavItem, NavLink } from "reactstrap";
var FontAwesome = require('react-fontawesome')

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <Row className="align-items-center justify-content-xl-between">
          <Col >
            <Nav className="nav-footer">
              <NavItem>
                <NavLink className="copyright text-xl-left mr-8">
                  Copyright © 2020{" "}
                  <a
                    className="font-weight-bold ml-1 text-danger"
                    href="https://ma.pulse.digital" 
                  >
                   PULSE.digital
                  </a>
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink className="pl-4">
                Tel : +212 5 24 33 52 63<br/>
                Email : maroc@pulse.digital
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink>
                  Adresse : <br/>
                  Quartier industriel,Sidi Ghanem <br/>
                  Numéro 292, bureaux 1 et 2، 40000      
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  href="http://blog.creative-tim.com?ref=adr-admin-footer"
                  className="pl-7"
                >
                  Blog
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  href="https://github.com/creativetimofficial/argon-dashboard/blob/master/LICENSE.md?ref=adr-admin-footer"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  MIT License
                </NavLink>
              </NavItem>
            </Nav>
          </Col>
        </Row>
      </footer>
    );
  }
}

export default Footer;
