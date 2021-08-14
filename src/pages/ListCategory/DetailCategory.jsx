import React, { useState } from 'react';
import { Button, Modal, Col, Row } from 'react-bootstrap';

const UserDetailsModal = ({ isShowed, currentUser }) => {
  const [show, setShow] = useState(isShowed || false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div id="user-details-modal">
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="form-header">Detailed User Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm="4">
              <b>Id</b>
            </Col>
            <Col sm="8">
              <p className="staff-code">{currentUser.id}</p>
            </Col>
          </Row>

          <Row>
            <Col sm="4">
              <b>Username</b>
            </Col>
            <Col sm="8">
              <p className="full-name">{currentUser.username}</p>
            </Col>
          </Row>

          <Row>
            <Col sm="4">
              <b>Email</b>
            </Col>
            <Col sm="8">
              <p className="username">{currentUser.email}</p>
            </Col>
          </Row>

          <Row>
            <Col sm="4">
              <b>Phone</b>
            </Col>
            <Col sm="8">
              <p className="date-of-birth">{currentUser.phone}</p>
            </Col>
          </Row>

          <Row>
            <Col sm="4">
              <b>Gender</b>
            </Col>
            <Col sm="8">
              <p className="gender">{currentUser.gender}</p>
            </Col>
          </Row>

          {/* <Row>
            <Col sm="4">
              <b>Joined Date</b>
            </Col>
            <Col sm="8">
              <p className="joined-date">{currentUser.joinedDate}</p>
            </Col>
          </Row> */}

          <Row>
            <Col sm="4">
              <b>Type</b>
            </Col>
            <Col sm="8">
              <p className="type">{currentUser.userType}</p>
            </Col>
          </Row>

          {/* <Row>
            <Col sm="4">
              <b>Location</b>
            </Col>
            <Col sm="8">
              <p className="location">{currentUser.userLocation}</p>
            </Col>
          </Row> */}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UserDetailsModal;
