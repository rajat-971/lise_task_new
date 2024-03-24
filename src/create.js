import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "./userReducer";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";
import pokemonImage from "./pokemon-pictures.jpg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Create = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const unique_id = uuid();
  const small_id = unique_id.slice(0, 5);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !breed || !description || !image) {
      toast.error("Please fill in all fields and upload an image.", {
        position: "top-center",
      });
      return;
    }
    let data = {
      id: small_id,
      name: name,
      breed: breed,
      description: description,
      image: image,
    };
    dispatch(addUser(data));
    toast.success("Data Added successfully", {
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
        <h3 className="addpokemon text-center mb-3">Add New Pokemon</h3>
        <form onSubmit={handleSubmit}>
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
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Create;
