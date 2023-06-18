import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddUserModal from "./AddUserModal";

const Users = () => {
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState([]);

  const handleRefreshUsers = (newUser) => {
    setUsers((oldUsers) => [newUser, ...oldUsers]);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://gorest.co.in/public/v2/users?page=1&per_page=10",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization:
                "Bearer 0d457d422346f26e1b96e76de5adc10418b499f408d02f16ec261c2c4aac0bc5"
            }
          }
        );
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.log("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="container col-lg-5 py-4">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h1 className="title mb-0">Users</h1>
        <button className="btn btn-dark btn-sm" onClick={handleShowModal}>
          Add User
        </button>
      </div>
      <p className="small">Here is a list of users. Click to view details</p>
      <div className="list-group">
        {users.length
          ? users.map((user) => (
              <Link
                className="list-group-item list-group-item-action"
                key={user.id}
                to={`user-details/${user.id}`}
              >
                <span>{user.name}</span>
                <span title={user.status} className={`badge p-1 ms-2 text-bg-${user.status === 'active' ?'success':'danger'}`}>
                  <span class="visually-hidden">New alerts</span>
                </span>
                {user.new && (
                  <span className="badge text-bg-warning ms-2">New</span>
                )}
              </Link>
            ))
          : Array(10)
              .fill()
              .map((_, i) => {
                return (
                  <li key={i} className="list-group-item">
                    <p className="placeholder-glow">
                      <span className="placeholder col-6"></span>
                    </p>
                  </li>
                );
              })}
      </div>

      <AddUserModal
        showModal={showModal}
        handleRefreshUsers={handleRefreshUsers}
        handleCloseModal={handleCloseModal}
      />
    </div>
  );
};

export default Users;
