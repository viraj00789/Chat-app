import React, { useEffect, useState } from "react";
import "./AddModel.sass";
import { IoCloseCircleSharp } from "react-icons/io5";
import { randomData as initialData } from "../data";

const AddModel = ({ handleModel }) => {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
  });

  const [chatData, setChatData] = useState(() => {
    const savedData = localStorage.getItem("data");
    return savedData ? JSON.parse(savedData) : [];
  });


  useEffect(() => {
    if (chatData.length === 0) {
      setChatData(initialData);
      localStorage.setItem("data", JSON.stringify(initialData));
    }
  }, [chatData.length]);

  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    const newUser = {
      ...formData,
      date: new Date().toISOString().split("T")[0],
      id: (chatData.length + 1).toString(),
      chat: "",
    };

    const updatedChatData = [...chatData, newUser];
    setChatData(updatedChatData);
    localStorage.setItem("data", JSON.stringify(updatedChatData));

    setFormData({ name: "", image: "" });
    handleModel(false);
  };

  return (
    <>
      <div className="model-overlay" onClick={() => handleModel(false)}></div>

      <div className="add-chat-model">
        <div className="model-close">
          <div>{""}</div>
          <div>
            <h1>Add User</h1>
          </div>
          <div className="model-right">
            <IoCloseCircleSharp size={30} onClick={() => handleModel(false)} />
          </div>
        </div>
        <div className="modal-form">
          <form onSubmit={handleSubmitForm}>
            <h2>Enter Name</h2>
            <input
              type="text"
              name="name"
              placeholder="Enter your Name"
              className="modal-input"
              value={formData.name}
              onChange={handleChangeForm}
              required
            />
            <h2>Add Image</h2>
            <input
              type="text"
              name="image"
              placeholder="Enter your image URL"
              className="modal-input"
              value={formData.image}
              onChange={handleChangeForm}
              required
            />
            <button className="model-btn" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddModel;
