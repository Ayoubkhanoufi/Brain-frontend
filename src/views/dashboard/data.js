import React, { useEffect, useState } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar, Doughnut } from "react-chartjs-2";

import http from "../services/api";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Media,
  Progress,
  Table,
  CardTitle,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
} from "variables/charts.js";

import Header from "../../components/Headers/Header.js";

function Index(props){

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const [allProject, setAllProject] = useState([]);
  const [projects, setProjects] = useState(0);
  const [month, setMonth] = useState([]);
  const [NProject, setNProject] = useState([]);


  const projectPerMonth  = async () => {
    let nbProject= []
    let nameMonth = []

    await http.get("resources/perMount")
    .then(res => {
      for(const dataobj of res){
        const names = ["","January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];
        nameMonth.push(names[dataobj._id]);
        nbProject.push(dataobj.numberofproject);
      }
      console.log(nameMonth)
    })
    setMonth(nameMonth);
    setNProject(nbProject)
  }

  const countTotalProject = async () => {
    const count = await http.get("/resources/count");
      setProjects(count);
  };
  
  useEffect(() => {
    countTotalProject();
    projectPerMonth();

    http.get("/resources/projects/")
    // ,{
    //   headers: {
    //     Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImtoYW5vdWZpLmF5b3ViQGdtYWlsLmNvbSIsImV4cGlyZXMiOjE1OTM2OTEzMzkwNzR9.d_oelTzAP8OS_ZvGBugNXNrPM5Fmx0pXk5Fz49I-CgA`}
    //   })
    .then((res) => {
      setAllProject(res);
    });
  }, []);

    const chartBar = {
      data: {
        labels: month,
        datasets: [
          {
            label: 'Project/month',
            data: NProject,
            maxBarThickness: 10
          }
        ]
      }
    }
  
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="mb-5 mb-xl-0" xl="8">
              <Card className="bg-gradient-default shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h6 className="text-uppercase text-light ls-1 mb-1">
                        Overview
                      </h6>
                      <h2 className="text-white mb-0">Sales value</h2>
                    </div>
                    <div className="col">
                      <Nav className="justify-content-end" pills>
                        <NavItem>
                          <NavLink
                            className={classnames("py-2 px-3", {
                              //active: this.state.activeNav === 1
                            })}
                            href="#pablo"
                            //onClick={e => this.toggleNavs(e, 1)}
                          >
                            <span className="d-none d-md-block">Month</span>
                            <span className="d-md-none">M</span>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames("py-2 px-3", {
                             // active: this.state.activeNav === 2
                            })}
                            data-toggle="tab"
                            href="#pablo"
                            //onClick={e => this.toggleNavs(e, 2)}
                          >
                            <span className="d-none d-md-block">Week</span>
                            <span className="d-md-none">W</span>
                          </NavLink>
                        </NavItem>
                      </Nav>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                  {/* Chart */}
                  <div className="chart">
                    <Line
                      data={chartBar.data}
                      options={chartBar.options}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl="4">
              <Card className="shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h6 className="text-uppercase text-muted ls-1 mb-1">
                        Performance
                      </h6>
                      <h2 className="mb-0">Project per month</h2>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                  {/* Chart */}
                  <div className="chart">
                    <Bar
                      data={chartBar.data}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col className="mb-5 mb-xl-0" xl="4">
              <Card className="card-stats mb-4 mb-xl-0">
                <CardBody>
                  <Row>
                    <div className="col">
                      <CardTitle
                        tag="h5"
                        className="text-uppercase text-muted mb-0"
                      >
                      Project
                      </CardTitle>
                      <span className="h2 font-weight-bold mb-0">
                        {projects}
                      </span>
                    </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fas fa-chart-bar" />
                        </div>
                      </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-success mr-2">
                          <i className="fa fa-arrow-up" />3.48%
                        </span>{" "}
                        <span className="text-nowrap">Since last month</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
                <Col className="mb-5 mb-xl-0" xl="4">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            New users
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            2,356
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                            <i className="fas fa-chart-pie" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-danger mr-2">
                          <i className="fas fa-arrow-down" /> 3.48%
                        </span>{" "}
                        <span className="text-nowrap">Since last week</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
                <Col xl="4">
                  <Card className="shadow">
                    <CardHeader className="bg-transparent">
                      <Row className="align-items-center">
                        <div className="col">
                          <h2 className="mb-0">Progress track</h2>
                        </div>
                      </Row>
                    </CardHeader>
                    <CardBody>
                    <Table className="align-items-center table-flush" responsive>
                      <thead className="thead-light">
                        <tr>
                          <th scope="col">Project name</th>
                          <th scope="col">Progress</th>
                        </tr>
                      </thead>
                      <tbody>
                      {/* {allProject.map((bp) => { 
                        return (*/}
                        <tr>
                          <th scope="row">
                            <Media className="align-items-center">
                              <a
                                className="avatar avatar-sm mr-2"
                                onClick={e => e.preventDefault()}
                              >
                                <img
                                  alt="..."
                                  className="rounded-circle"
                                  src={require("assets/img/BexioLogo.png")}
                                />
                              </a>
                              <span className="mb-0 text-sm">
                                Brain
                              </span> 
                            </Media>
                          </th>
                          <td>
                            <div className="d-flex align-items-center">
                              <span className="mr-1">100%</span>
                              <Progress color="info" value={50} />
                            </div>
                          </td>
                        </tr>
                       {/* );
                       })} */}
                      </tbody>
                    </Table>
                    </CardBody>
                  </Card>
                </Col>
              
             </Row>
        </Container>
      </>
    ); 
}
export default Index;
