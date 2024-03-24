import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { updateUser } from "./userReducer";
import ImageUploading from "react-images-uploading";
const Update = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const existingUser = users.filter((f) => f.id === id);
  const { name, breed, discription } = existingUser[0];
  const [pname, setName] = useState(name);
  const [pbreed, setBreed] = useState(breed);
  const [pdiscription, setDiscription] = useState(discription);
  const navigate = useNavigate();

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(
      updateUser({
        id: id,
        name: pname,
        breed: pbreed,
        discription: pdiscription,
      })
    );
    navigate("/");
  };
  return (
    <>
      <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
        <div className="w-50 border bg-secondary text-white p-5">
          <h3 className="addpokemon">Edit Pokemon</h3>
          <form onSubmit={handleUpdate}>
            <div>
              <label htmlFor="name" className="labelshow">
                Name:{" "}
              </label>
              <input
                type="text"
                name="name"
                className="from-control inputfield"
                placeholder="Enter Name"
                value={pname}
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
                value={pbreed}
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
                value={pdiscription}
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

export default Update;
