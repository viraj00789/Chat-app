import React, { useState } from "react";
import "./AddModel.sass";
import { IoCloseCircleSharp } from "react-icons/io5";
import { randomData } from "../data";
import { useChat } from "../../store/ChatContext";

const AddModel = ({ handleModel,handleNewData}) => {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
  });
  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const {data, handleData} = useChat();



  const handleSubmitForm = (e) => {
    e.preventDefault();

    const newUser = {
      ...formData,
      date: new Date().toISOString().split("T")[0],
      id: (randomData.length + 1).toString(),
      chat: "",
    };
    console.log(newUser);

    const updatedChatData = [...data, newUser];
    console.log(updatedChatData);
    handleData(updatedChatData);
    handleNewData(updatedChatData)
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
