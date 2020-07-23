import React, { useEffect, useState } from "react";
import {
  Media,
  Card,
  CardHeader,
  CardBody,
  Table,
  Form,
  Container,
  Row,
  Label, CustomInput,
  Col,
  Progress,
  Badge
} from "reactstrap";
import PropTypes from 'prop-types';
import http from "../services/api";
import { useParams, Link } from "react-router-dom";
import Header from "components/Headers/Header.js";
import Message from './message.js'

function FileUpload({ nr, idP }) {

  const [project, setProject] = useState([]);
  const [file, setFile] = useState({})
  const [allFile, setallFile] = useState([])
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    const getAllFiles = async () => {
      const project = await http.get("resources/projects/" + idP);
      await http.get("http://localhost:8585/file/upload/" + project.nr).then((res) => {
        setallFile(res);
      });
    };
    getAllFiles();
  }, []);

  console.log(allFile)

  const onUpload = e => {
    setFile(e.target.files[0]);
  }

  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append(nr, file);

    try {
      const res = await http.post('/file/upload', formData
        // onUploadProgress: progressEvent => {
        //   setUploadPercentage(
        //     parseInt(
        //       Math.round((progressEvent.loaded * 100) / progressEvent.total)
        //     )
        //   );

        //   // Clear percentage
        //   setTimeout(() => setUploadPercentage(0), 10000);
        // }
      );

      setMessage('File Uploaded');

    } catch (err) {
      if (err.response.status === 500) {
        setMessage('There was a problem with the server');
      } else {
        setMessage(err.response.data.msg);
      }
    }
  };


  return (
    <>
      {/* Page content */}
      <Container fluid>
        <Row>
          <Col xl="4">
            <Form onSubmit={onSubmit}>
              <Card className="card-profile shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xm="9">
                      <h3 className="text-center">Attach files</h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody className="pt-0 pt-md-4">
                  <Row>
                    <Col className="text-left" >
                      {message ? <Message msg={message} /> : null}
                      <CustomInput
                        type="file"
                        id="exampleCustomFileBrowser"
                        name="customFile"
                        onChange={onUpload} />
                      <input
                        type='submit'
                        value='Upload'
                        className='btn btn-primary btn-block mt-4'
                      />
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Form>
          </Col>
          <Col xl="8">
            <Form onSubmit={onSubmit}>
              <Card className="card-profile shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xm="9">
                      <h3 className="text-center">Files uploaded</h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody className="pt-0 pt-md-4">
                  <Row>
                    <Col className="text-left" >
                      <Table className="align-items-center table-flush" responsive>
                        <thead className="thead-light">
                          <tr>
                            <th scope="col">File name</th>
                            <th scope="col">File type</th>
                          </tr>
                        </thead>
                        <tbody>
                          {allFile.map((fileUp) => {
                            return (
                              <tr>
                                <th scope="row">
                                  <span className="mb-0 text-sm">
                                    {fileUp.file}
                                  </span>
                                </th>
                                <td>
                                  <div className="d-flex align-items-center">
                                    <Badge color="primary" pill>.</Badge>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

FileUpload.propTypes = {
  id: PropTypes.string.isRequired
};

export default FileUpload;
