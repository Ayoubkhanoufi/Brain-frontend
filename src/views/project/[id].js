import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Input,
  Form,
  Container,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Badge
} from "reactstrap";
import { useParams, Link } from "react-router-dom";
import http from "../services/api";
import "../../assets/css/Generale.css";
import FileUpload from './file-upload.js'

function ProjectDetails() {

  const [project, setProject] = useState([]);
  const [gProjects, setGProjects] = useState([]);
  const [gitlabId, setGitlabId] = useState("");
  const [isGitlabPLoaded, setIsGitlabPLoaded] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    http.get("/resources/projects/" + id).then((res) => {
      setProject(res);
    });
  }, []);

  const [values, setValues] = useState({
    name: project.name,
    start_date: project.start_date,
    end_date: project.end_date,
    pr_invoice_type_id: project.pr_invoice_type_id,
    pr_invoice_type_amount: project.pr_invoice_type_amount,
    pr_budget_type_id: project.pr_budget_type_id,
    pr_budget_type_amount: project.pr_budget_type_amount,
    contact_sub_id: project.contact_sub_id,
    comment: project.comment,
  });

  const EditHandler = () => {
    const data = {
      name: values.name,
      start_date: values.start_date,
      end_date: values.end_date,
      pr_invoice_type_id: values.pr_invoice_type_id,
      pr_invoice_type_amount: values.pr_invoice_type_amount,
      pr_budget_type_id: values.pr_budget_type_id,
      pr_budget_type_amount: values.pr_budget_type_amount,
      contact_sub_id: values.contact_sub_id,
      comment: values.comment,
    };
    http
      .put("/resources/projects/" + id, data)
      .then((res) => {
        setProject(res);
        setIsDisabled(true)
      })
      .catch((er) => console.log(er));
  };

  const onChangeValue = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  }

  const openModal = () => {
    setIsModalOpen(true);
    setIsGitlabPLoaded(false);

    http.get("gitlab/projects").then((res) => {
      console.log(gProjects);
      setIsGitlabPLoaded(true);
      setGProjects(res);
    });
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleModal = () => {
    http
      .put("/resources/projects/" + id, { gitlabId })
      .then((res) => {
        setIsModalOpen(false);
        setProject(res);
      })
      .catch((er) => console.log(er));

    console.log(gitlabId);
  };

  const Disable = () => {
    setIsDisabled(false)
    console.log(isDisabled)
  }

  let status;
  if (project.gitlabId == null) {
    status = <Badge color="danger" pill>Not affected</Badge>;
  } else {
    status = <Badge color="success" pill>Affected</Badge>;
  }
  return (
    <>
      <div className="header bg-gradient-info pb-6 pt-5 pt-md-8" />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col className="text-left">
                    <h3 className="mb-0">Project : {project.name} {status}</h3>
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
                    Project details
                    </h6>
                  <div className="pl-lg-4">
                    <Row className="pb-4">
                      <Col md="6">
                        <span className="heading">Number ID</span>
                        <div className="desc">
                          <Input
                            className="form-control-alternative"
                            size="sm"
                            type="text"
                            defaultValue={project.nr}
                            disabled
                          />
                        </div>
                      </Col>
                      <Col md="6">
                        <span className="heading">Name </span>
                        <div className="desc">
                          <Input
                            className="form-control-alternative"
                            size="sm"
                            disabled={isDisabled}
                            defaultValue={project.name}
                            onChange={onChangeValue('name')}
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row className="pb-4">
                      <Col md="6">
                        <span className="heading">Start date</span>
                        <div className="desc">
                          <Input
                            className="form-control-alternative"
                            size="sm"
                            defaultValue={project.start_date}
                            onChange={onChangeValue('start_date')}
                            disabled={isDisabled}
                          />
                        </div>
                      </Col>
                      <Col md="6">
                        <span className="heading">End date</span>
                        <div className="desc">
                          <Input
                            className="form-control-alternative"
                            size="sm"
                            disabled={isDisabled}
                            defaultValue={project.end_date}
                            onChange={onChangeValue('end_date')}
                          />
                        </div>
                      </Col>
                    </Row>
                    <hr className="my-4" />
                    <Row className="pb-4">
                      <Col md="6">
                        <span className="heading">Invoice type</span>
                        <div className="desc">
                          <Input
                            className="form-control-alternative"
                            size="sm"
                            disabled={isDisabled}
                            defaultValue={project.pr_invoice_type_id}
                            onChange={onChangeValue('pr_invoice_type_id')}
                          />
                        </div>
                      </Col>
                      <Col md="6">
                        <span className="heading">Invoice amount</span>
                        <div className="desc">
                          <Input
                            className="form-control-alternative"
                            size="sm"
                            disabled={isDisabled}
                            defaultValue={project.pr_invoice_type_amount}
                            onChange={onChangeValue('pr_invoice_type_amount')}
                          />
                        </div>
                      </Col>
                    </Row>

                    <Row className="pb-4">
                      <Col md="6">
                        <span className="heading">Budget type</span>
                        <div className="desc">
                          <Input
                            className="form-control-alternative"
                            size="sm"
                            disabled={isDisabled}
                            defaultValue={project.pr_budget_type_id}
                            onChange={onChangeValue('pr_budget_type_id')}
                          />
                        </div>
                      </Col>
                      <Col md="6">
                        <span className="heading">Budget amount</span>
                        <div className="desc">
                          <Input
                            className="form-control-alternative"
                            size="sm"
                            disabled={isDisabled}
                            defaultValue={project.pr_budget_type_amount}
                            onChange={onChangeValue('pr_budget_type_amount')}
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row className="pb-4">
                      <Col md="6">
                        <span className="heading">Contact sub</span>
                        <div className="desc">
                          <Input
                            className="form-control-alternative"
                            size="sm"
                            disabled={isDisabled}
                            defaultValue={project.contact_sub_id}
                            onChange={onChangeValue('contact_sub_id')}
                          />
                        </div>
                      </Col>
                      <Col md="6">
                        <span className="heading">Descriptions</span>
                        <div className="desc">
                          <Input
                            className="form-control-alternative"
                            size="sm"
                            disabled={isDisabled}
                            defaultValue={project.comment}
                            onChange={onChangeValue('comment')}
                          />
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Form>
              </CardBody>
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col className="text-left" xm="4">
                    <Button
                      disabled={project.gitlabId != null}
                      color="primary"
                      size="sm"
                      onClick={openModal}
                    >
                      Add to GitLab
                      </Button>
                  </Col>
                  <Col className="text-center">
                    <Button
                      disabled={project.gitlabId == null}
                      size="sm"
                    >
                      <Link to={`/admin/timesheets/${project._id}`}>
                        <a>Timesheets</a>
                      </Link>
                    </Button>
                  </Col>
                  <Col className="text-right">
                    <Button
                      size="sm"
                      color="success"
                      disabled={isDisabled}
                      onClick={EditHandler}
                    >
                      Save modification
                      </Button>
                  </Col>
                </Row>
              </CardHeader>
            </Card>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col xl="12">
            <FileUpload nr={project.nr} idP={id} />
          </Col>
        </Row>
      </Container>
      <Modal
        isOpen={isModalOpen}
        toggle={closeModal}
      >
        <ModalHeader>Choose a gitlab project</ModalHeader>
        <ModalBody>
          <Input
            type="select"
            name="select"
            placeholder="Select a project"
            onChange={setGitlabId}
          >
            {setGitlabId}
            {gProjects.map((gp) => {
              return (
                <option key={gp.id} value={gp.id}>
                  {gp.name_with_namespace}
                </option>
              );
            })}
          </Input>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={ev => handleModal()} >OK</Button>{' '}
          <Button color="secondary" onClick={closeModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default ProjectDetails;
