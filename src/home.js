import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "./userReducer";
import Profile from "./logo192.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function Home() {
  const navigate = useNavigate();
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleClose = () => setShow(false);

  const handleDeletePokemon = (id) => {
    setDeleteId(id);
    setShow(true);
  };

  const confirmDelete = () => {
    dispatch(deleteUser({ id: deleteId }));
    toast.error("Pokemon deleted successfully", {
      position: "top-center",
    });
    setShow(false);
  };

  // Filter the users based on search query
  const filteredUsers = users.filter((user) => {
    const { id, name, breed } = user;
    const lowerCaseQuery = searchQuery.toLowerCase();
    return (
      id.toLowerCase().includes(lowerCaseQuery) ||
      name.toLowerCase().includes(lowerCaseQuery) ||
      breed.toLowerCase().includes(lowerCaseQuery)
    );
  });

  return (
    <div className="container mt-4 ">
      <h2 className="text-center mb-4" style={{ color: "#ffffff" }}>
        Welcome to the Pokemon App
      </h2>
      <div className="d-flex gap-5">
        <button
          onClick={() => navigate("./create")}
          className="btn btn-success mb-3"
        >
          Create +
        </button>
        <div className="mb-3 w-25">
          <input
            type="text"
            className="form-control"
            placeholder="Search by ID, Name, or Breed"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Image</th>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Breed</th>
              <th scope="col">Description</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={index}>
                <td>
                  <img
                    src={user.image || Profile}
                    alt="pokemon image"
                    className="img-thumbnail"
                    style={{ maxWidth: "100px", maxHeight: "100px" }}
                  />
                </td>
                <td>{user?.id}</td>
                <td>{user?.name}</td>
                <td>{user?.breed}</td>
                <td>{user?.description}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={() => navigate(`/edit/${user.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDeletePokemon(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Pokemon</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this Pokemon?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Home;
