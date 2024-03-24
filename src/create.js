import { useState } from "react";
import { Form } from "react-router-dom";
import { addUser } from "./userReducer";
import { UseDispatch, useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [discription, setDiscription] = useState("");
  const unique_id = uuid();
  const small_id = unique_id.slice(0, 5);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addUser({
        id: small_id,
        name: name,
        breed: breed,
        discription: discription,
      })
    );
    navigate("/");
  };

  return (
    <>
      <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
        <div className="w-50 border bg-secondary text-white p-5">
          <h3 className="addpokemon">Add New Pokemon</h3>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="labelshow">
                Name:{" "}
              </label>
              <input
                type="text"
                name="name"
                className="from-control inputfield"
                placeholder="Enter Name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <br />
            <div>
              <label htmlFor="name" className="labelshow">
                Breed:{" "}
              </label>
              <input
                type="text"
                name="Breed"
                className="from-control inputfield"
                placeholder="Enter Breed"
                onChange={(e) => setBreed(e.target.value)}
              />
            </div>
            <br />
            <div>
              <label htmlFor="name" className="labelshow">
                Description:{" "}
              </label>
              <input
                type="text"
                name="Description"
                className="from-control inputfield"
                placeholder="Description"
                onChange={(e) => setDiscription(e.target.value)}
              />
            </div>
            <br />
            <button className="btn btn-info"> submit</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Create;
