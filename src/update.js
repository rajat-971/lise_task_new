import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateUser } from "./userReducer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import pokemonImage from "./pokemon-pictures.jpg";

const Update = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch the user data from Redux store
  const users = useSelector((state) => state.users);
  const existingUser = users.find((user) => user.id === id);

  // Initialize states with existing user data
  const [name, setName] = useState(existingUser.name);
  const [breed, setBreed] = useState(existingUser.breed);
  const [description, setDescription] = useState(existingUser.description);
  const [image, setImage] = useState(existingUser.image);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileType = file.type;
      const validImageTypes = ["image/jpeg", "image/png", "image/gif"];

      if (validImageTypes.includes(fileType)) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImage(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        toast.error("Please select a valid image file (JPEG, PNG, or GIF).", {
          position: "top-center",
        });
        e.target.value = null;
      }
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    // Validate if all fields are filled
    if (!name || !breed || !description || !image) {
      toast.error("Please fill in all fields and upload an image.", {
        position: "top-center",
      });
      return;
    }

    // Dispatch update action
    dispatch(updateUser({ id, name, breed, description, image }));

    // Display success toast and navigate back to home
    toast.success("Pokemon updated successfully!", {
      position: "top-center",
    });
    navigate("/");
  };

  return (
    <div
      style={{
        backgroundImage: `url(${pokemonImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="w-50 border bg-secondary text-white p-4"
        style={{ borderRadius: "10px" }}
      >
        <h3 className="addpokemon text-center mb-3">Edit Pokemon</h3>
        <form onSubmit={handleUpdate}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label labelshow">
              Name:{" "}
            </label>
            <input
              type="text"
              name="name"
              className="form-control inputfield"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="breed" className="form-label labelshow">
              Breed:{" "}
            </label>
            <input
              type="text"
              name="Breed"
              className="form-control inputfield"
              placeholder="Enter Breed"
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label labelshow">
              Description:{" "}
            </label>
            <input
              type="text"
              name="Description"
              className="form-control inputfield"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="image" className="form-label labelshow">
              Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              className="form-control inputfield"
              onChange={handleImageChange}
            />
          </div>
          <button type="submit" className="btn btn-info">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default Update;
