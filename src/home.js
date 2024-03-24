import { Button } from "bootstrap";
import React from "react";
import { UseSelector, useDispatch, useSelector } from "react-redux";
import { userList } from "./data";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "./userReducer";

function Home() {
  const navigate = useNavigate();
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteUser({ id: id }));
  };

  return (
    <div>
      <div className="container">
        <h2>Pokemon App </h2>
        <button
          onClick={() => navigate("./create")}
          className="btn btn-success my-3"
        >
          Crate +
        </button>

        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Breed</th>
              <th>Description</th>
              {/* <th>Image</th> */}
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user?.id}</td>
                <td>{user?.name}</td>
                <td>{user?.breed}</td>
                <td>{user?.discription}</td>
                {/* <td>{user?.image}</td> */}
                <td>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={(e) => navigate(`/edit/${user.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger ms-2"
                    onClick={(e) => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
