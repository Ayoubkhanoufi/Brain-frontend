import React from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Badge,
  Table,
  Container,
  Row,
  Button,
  Col
} from "reactstrap";
// core components
import { useEffect, useState } from "react";
import http from "../services/api";
import { Link } from "react-router-dom";
import Header from "components/Headers/Header.js";

function Project() {

  const [projects, setProject] = useState([]);
  const [loading, setLoading] = useState(false);

  const getProject = () => {
    http.get("/resources/projects/")
      // ,{
      //   headers: {
      //     Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImtoYW5vdWZpLmF5b3ViQGdtYWlsLmNvbSIsImV4cGlyZXMiOjE1OTM2OTEzMzkwNzR9.d_oelTzAP8OS_ZvGBugNXNrPM5Fmx0pXk5Fz49I-CgA`}
      //   })
      .then((res) => {
        setProject(res);
      });
  }

  useEffect(() => {
    getProject();
  }, []);

  const handleSync = async () => {
    setLoading(true);
    const data = await http.get("/bexio/projects/sync");
    setProject(data);
    setLoading(false);
  }

  //Delete laptop
  const handleDelete = (id) => {
    console.log('Deleted');
    http.delete('/resources/projects/' + id)
      .then(res => {
        getProject();
      })
  }

  console.log(projects)
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-6">
                <Row className="align-items-center">
                  <Col className="text-left" >
                    <Link to='/admin/project'>

                      <Button
                        color="info"
                        size="sm"
                        loading={loading}
                        onClick={handleSync}
                      >
                        Sync.
                        </Button>
                    </Link>
                  </Col>
                  <Col xs="7">
                    <h3 className="mb-0">Projects Bexio</h3>
                  </Col>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">NumberId</th>
                    <th scope="col">Name</th>
                    <th scope="col">Start date</th>
                    <th scope="col">End date</th>
                    <th scope="col">Status</th>
                    <th scope="col">Actions</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {projects.map((bp) => {
                    let status;
                    if (bp.gitlabId == null) {
                      status = <Badge color="danger" pill>Not affected</Badge>;
                    } else {
                      status = <Badge color="success" pill>Affected</Badge>;
                    }
                    return (
                      <tr>
                        <th scope="row">
                          <Media className="align-items-center">
                            <a className="avatar avatar-sm mr-2">
                              <img
                                alt="..."
                                className="rounded-circle"
                                src={require("assets/img/BexioLogo.png")}
                              />
                            </a>
                            <Media>
                              <Link to={`/admin/project/${bp._id}`}>
                                <span className="mb-0 text-sm">
                                  {bp.nr}
                                </span>
                              </Link>
                            </Media>
                          </Media>
                        </th>
                        <td>{bp.name}</td>
                        <td>{bp.start_date}</td>
                        <td>{bp.end_date}</td>
                        <td>
                          <div className="d-flex align-items-center">
                            <div>
                              {status}
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <Button
                              color="danger"
                              size="sm"
                              onClick={() => handleDelete(bp._id)}
                            >
                              Delete<i className="ni ni-fat-remove" />
                            </Button>
                          </div>
                        </td>
                        <td className="text-right">
                          <UncontrolledDropdown>
                            <DropdownToggle
                              className="btn-icon-only text-light"
                              href="#pablo"
                              role="button"
                              size="sm"
                              color=""
                              onClick={e => e.preventDefault()}
                            >
                              <i className="fas fa-ellipsis-v" />
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-arrow" right>
                              <DropdownItem>
                                <Link to={`/admin/project/${bp._id}`}>Details project</Link>
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        1
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        3
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );

}

export default Project;
