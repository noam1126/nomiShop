import { useState } from "react";
const axios = require("axios");

function Form() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/data");
      console.log("data sent seccesfully:", response.data);
    } catch (error) {
      console.log("error sending data", error);
    }
  };

  return (
    <div className="Form">
      <form onSubmit={handleSubmit}>
        <button type="subit">SignUp</button>
      </form>
    </div>
  );
}

export default Form;
