import React, { useEffect, useState } from "react";
import "./AddModel.sass";
import { IoCloseSharp } from "react-icons/io5";
import { useChat } from "../../store/ChatContext";
import Input from "./Input";
import Button from "./Button";

const AddModel = ({ handleModel, handleNewData }) => {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
  });
  const [text, setText] = useState();
  const { data, handleData } = useChat();
  const [errData, setErrData] = useState({});
  const [touched,setTouched] = useState({
    name:false,
    image:false
  })

  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

  };
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
  };
  
  const isValid = (url) => {
    const regex = /^(http|https)?:\/\//;
    console.log(regex.test(url));
    return regex.test(url);
  };
  
  const namedata = data.map((items) => items.name.toLowerCase());
  
  const validateForm = (data) => {
    console.log(data);
    const erros = {};

    console.log(data.name, data.image);

    if (!data.name.trim()) {
      erros.name = "Name feild is Required";
    }
    if (!data.image.trim()) {
      erros.image = "Image field is required";
    } else if (!isValid(data.image)) {
      erros.image = "Invalid image link";
    }
    return erros;
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const newErrors = validateForm(formData);
    setErrData(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted successfully!");
    } else {
      console.log("Form submission failed due to validation errors.");
      setTouched({name:true,image:true})
      return;
    }
   

    if (namedata.includes(formData.name.toLowerCase())) {
      console.log("inn");
      setText("User Already Exist");
      alert("User alredy Exist")
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
    handleModel(false);
  };

  useEffect(() => {
    const closeOnEscapePressed = (e) => {
      if (e.key === "Escape") {
        handleModel(false);
      }
    };
  
    window.addEventListener("keydown", closeOnEscapePressed);
    return () => window.removeEventListener("keydown", closeOnEscapePressed);

  }, [formData, handleModel]);

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
            <div className="add-user-header-1">
              <p className="add-user-header">Enter name</p>
              <Input
                type="text"
                name="name"
                placeholder="Enter your name"
                className="modal-input"
                value={formData.name}
                onChange={handleChangeForm}
              />
              {errData.name && (
                <span className="error-message">{errData.name}</span>
              )}
            </div>
            <div className="add-image-header">
              <p className="add-user-header">Add image</p>
              <Input
                type="text"
                name="image"
                placeholder="Enter your imageurl"
                className="modal-input"
                value={formData.image}
                onChange={handleChangeForm}
              />
            </div>
            {errData.image && (
              <span className="error-message">{errData.image}</span>
            )}
            <div className="modal-div-btn" >
              <Button
                text={"Close"}
                className={"model-btn-1"}
                onClick={() => handleModel(false)}
              />
              <Button
                text={"Submit"}
                className={"model-btn-2"}
                // type={"submit"}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddModel;
