import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Toast, ToastContainer } from "react-bootstrap";
import { useAddUserMutation } from "../redux/api";

const AddUserModal = ({ showModal, handleCloseModal }) => {
  const [toastMsg, setToastMsg] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    status: "",
  });
  const [addUser, result] = useAddUserMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    addUser({ formData });
  };

  useEffect(() => {
    if (result.status === "fulfilled") {
      setToastMsg("success");
      handleCloseModal();
      setFormData({ name: "", email: "", gender: "", status: "" });
    } else if (result.status === "rejected") {
      const { data } = result.error;
      setToastMsg(data[0].field + " " + data[0].message);
    }
  }, [result]);

  return (
    <>
      <Modal centered show={showModal} onHide={handleCloseModal}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Add User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="formName" className="mb-2">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter Name"
                autoFocus
                required
              />
            </Form.Group>

            <Form.Group controlId="formEmail" className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Email"
                required
              />
            </Form.Group>

            <Form.Label>Gender</Form.Label>
            <Form.Group className="mb-2">
              {["male", "female"].map((gender, i) => (
                <Form.Check
                  inline
                  key={i}
                  type="radio"
                  id={gender}
                  label={gender[0].toUpperCase() + gender.slice(1)}
                  name="gender"
                  value={gender}
                  checked={formData.gender === gender}
                  onChange={handleChange}
                  required
                />
              ))}
            </Form.Group>

            <Form.Label>Status</Form.Label>
            <Form.Group controlId="formEmail" className="mb-2">
              {["active", "inactive"].map((status, i) => (
                <Form.Check
                  inline
                  key={i}
                  type="radio"
                  id={status}
                  label={status[0].toUpperCase() + status.slice(1)}
                  name="status"
                  value={status}
                  checked={formData.status === status}
                  onChange={handleChange}
                  required
                />
              ))}
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="dark" type="submit">
              Add User
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <ToastContainer
        className="p-3"
        position="top-end"
        style={{ zIndex: 1056 }}
      >
        <Toast
          onClose={() => setToastMsg(false)}
          show={toastMsg}
          className={`text-white ${
            toastMsg === "success" ? "bg-success" : "bg-danger"
          }`}
          delay={5000}
          autohide
        >
          <Toast.Body className="text-capitalize">
            {toastMsg === "success" ? "User added successfully" : toastMsg}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default AddUserModal;
