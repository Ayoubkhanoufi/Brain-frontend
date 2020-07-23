import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  ListGroupItemText,
  Badge,
  Form,
  Container,
  Row,
  Col,
  Modal,ListGroup, ListGroupItem, ModalHeader, ModalBody, ModalFooter
} from "reactstrap";
// core components

import Header from "components/Headers/Header.js";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import http from "../services/api";
import "../../assets/css/Generale.css";

function ProjectDetails (){
  
  const [timesheets, setTimesheets] = useState([]);
  const [issues, setIssues] = useState([]);
  const [project, setProjects] = useState([]);
 
  const { id } = useParams();

  useEffect(() => {
    http.get("/resources/projects/" + id).then((res) => {
        setProjects(res);
      });
  
      const data = async () => {
        const project = await http.get("resources/projects/" + id);
        const issues = await http.get(
            //"gitlab/projects/325/issues"
          "gitlab/projects/" + project.gitlabId + "/issues"
        );
        setIssues(issues);
        const timesheets = await http.post(
          "bexio/timesheets/" + project.bexioId
        );
        setTimesheets(timesheets);
      };
      console.log(timesheets)
      data();
  }, []);

    return (
      <>
        <div className="header bg-gradient-info pb-6 pt-5 pt-md-8">
          
        </div>
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="order-xl-2 mb-5 mb-xl-0" >
              <Card className="card-profile shadow">
                <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                    <Col xs="7">
                      <h3 className="mb-0">Bexio timesheets</h3>
                    </Col>
                </CardHeader>
                
                <ListGroup size='sm'>
                    {timesheets.map((item) => {
                        return (
                        <ListGroupItem >
                            <a className="avatar rounded-circle mr-3">
                                <img 
                                    src="https://media.glassdoor.com/sql/1312614/bexio-squarelogo-1500988647798.png"
                                />
                            </a>
                            <a>#{item.id}</a> - Duration:{" "}
                                    {item.duration}h
                            <ListGroupItemText>
                                {item.text}
                            </ListGroupItemText>
                        </ListGroupItem>
                        );
                    })}
                </ListGroup>
              </Card>
            </Col>
            <Col className="order-xl-2 mb-5 mb-xl-0" >
              <Card className="card-profile shadow">
                <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                    <Col xs="7">
                      <h3 className="mb-0">GitLab timesheets</h3>
                    </Col>
                </CardHeader>
                <ListGroup size='sm'>
                    {issues.map((item) => {
                        return (
                        <ListGroupItem >
                            <a className="avatar rounded-circle mr-3">
                                <img
                                    src="https://about.gitlab.com/images/press/logo/png/gitlab-icon-rgb.png"
                                />
                            </a>
                            <a href={item.web_url}>
                                #{item.iid}
                                {item.title}
                            </a>{" "}
                            <span>
                              - Estimate:{" "}
                              {item.time_stats.human_time_estimate || 0}{" "}
                              
                              / Spent:{" "}
                              {item.time_stats.human_total_time_spent || 0}
                            </span>
                            <ListGroupItemText>
                                {item.description}
                            </ListGroupItemText>
                        </ListGroupItem>
                        );
                    })}
                </ListGroup>
              </Card>
            </Col>
            
          </Row>
        </Container>
    </>
    );  
}
export default ProjectDetails;
