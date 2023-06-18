import React, { useEffect, useRef, useState } from "react";
import { Button, Modal, Form, Toast, ToastContainer } from "react-bootstrap";

const AddUserModal = ({ showModal, handleRefreshUsers, handleCloseModal }) => {
  const [toastMsg, setToastMsg] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    status: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://gorest.co.in/public/v2/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer 0d457d422346f26e1b96e76de5adc10418b499f408d02f16ec261c2c4aac0bc5",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.id) {
        handleRefreshUsers({ ...data, new: true });
        setToastMsg("success");
        handleCloseModal();
        setFormData({ name: "", email: "", gender: "", status: "" });
      } else {
        setToastMsg(data[0].field + " " + data[0].message);
      }
    } catch (error) {
      console.log("Error adding user:", error);
    }
  };

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
              <Form.Check
                inline
                type="radio"
                id="Male"
                label="Male"
                name="gender"
                value="male"
                checked={formData.gender === "male"}
                onChange={handleChange}
                required
              />
              <Form.Check
                inline
                type="radio"
                id="Female"
                label="Female"
                name="gender"
                value="female"
                checked={formData.gender === "female"}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Label>Status</Form.Label>
            <Form.Group controlId="formEmail" className="mb-2">
              <Form.Check
                inline
                type="radio"
                id="Active"
                label="Active"
                name="status"
                value="active"
                checked={formData.status === "active"}
                onChange={handleChange}
                required
              />
              <Form.Check
                inline
                type="radio"
                id="Inactive"
                label="Inactive"
                name="status"
                value="inactive"
                checked={formData.status === "inactive"}
                onChange={handleChange}
                required
              />
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
