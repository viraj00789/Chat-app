import React, { useEffect, useState } from "react";
import "./AddModel.sass";
import { IoCloseSharp } from "react-icons/io5";
import { useChat } from "../../store/ChatContext";

const AddModel = ({ handleModel, handleNewData }) => {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
  });
  const [text, setText] = useState();
  const [err, setErr] = useState(false);
  const { data, handleData } = useChat();

  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const namedata = data.map((items) => items.name.toLowerCase());
  console.log(namedata.includes(formData.name.toLowerCase()));

  useEffect(() => {
    const closeOnEscapePressed = (e) => {
      if (e.key === "Escape") {
        handleModel(false);
      }
    };
    window.addEventListener("keydown", closeOnEscapePressed);
    return () => window.removeEventListener("keydown", closeOnEscapePressed);
  }, [handleModel]);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (formData.name === "" || formData.image === "") {
      setText("Feild Cant be Empty");
      setErr(true);
      return;
    }

    if (namedata.includes(formData.name.toLowerCase())) {
      console.log("inn");
      setText("User Already Exist");
      setErr(true);
      return;
    }
    const newUser = {
      ...formData,
      date: new Date().toISOString().split("T")[0],
      id: (data.length + 1).toString(),
      chatData: [],
      chatTime: [],
      email: "abc@gmail.com",
    };
    console.log(newUser);

    const updatedChatData = [...data, newUser];
    console.log(updatedChatData);
    handleData(updatedChatData);
    handleNewData(updatedChatData);
    setFormData({ name: "", image: "" });
    setErr(false);
    handleModel(false);
  };
  return (
    <>
      <div className="model-overlay" onClick={() => handleModel(false)}></div>

      <div className="add-chat-model">
        <div className="model-close">
          <div>
            <h2 className="add-user">Add user</h2>
          </div>
          <div className="model-right">
            <IoCloseSharp size={22} onClick={() => handleModel(false)} />
          </div>
        </div>
        <div className="modal-form">
          <form onSubmit={handleSubmitForm}>
            <h2 className="add-user-header">Enter name</h2>
            <input
              type="text"
              name="name"
              placeholder="Enter your Name"
              className="modal-input"
              value={formData.name}
              onChange={handleChangeForm}
            />
            <h2 className="add-user-header">Add image</h2>
            <input
              type="text"
              name="image"
              placeholder="Enter your image URL"
              className="modal-input"
              value={formData.image}
              onChange={handleChangeForm}
            />
            {err && <p style={{ color: "#990000" }}>{text}</p>}
            <div className="modal-div-btn">
              <button className="model-btn" type="submit">
                Submit
              </button>
              <button className="model-btn" onClick={() => handleModel(false)}>
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddModel;
