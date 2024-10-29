import React, { useEffect, useState } from "react";
import "./AddModel.sass";
import { IoCloseSharp } from "react-icons/io5";
import { useChat } from "../../store/ChatContext";
import Input from "../CommonComp/Input";
import Button from "../CommonComp/Button";
import { useTheme } from "../../store/ThemeContext";

const AddModel = ({ handleModel, handleNewData }) => {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
  });

  const [text, setText] = useState();
  const [err, setErr] = useState(false);
  const { data, handleData } = useChat();
  const [errData, setErrData] = useState({});
  const [isValidForm, setIsValidForm] = useState(false);
  const { isDark } = useTheme();

  const isValid = (url) => {
    const regex = /^(http|https)?:\/\//;
    return regex.test(url);
  };

  const validateForm = (data) => {
    const errors = {};
    if (!data.name.trim()) {
      errors.name = "Name field is required.";
    }
    if (!data.image.trim()) {
      errors.image = "Image field is required.";
    } else if (!isValid(data.image)) {
      errors.image = "Invalid image link.";
    }
    return errors;
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const newErrors = validateForm(formData);
    setErrData(newErrors);

    if (Object.keys(newErrors).length !== 0) {
      setIsValidForm(false);
      return;
    }

    const namedata = data.map((items) => items.name.toLowerCase());
    if (namedata.includes(formData.name.toLowerCase())) {
      setText("User already exists");
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

    const updatedChatData = [newUser,...data];
    handleData(updatedChatData);
    handleNewData(updatedChatData);

    setFormData({ name: "", image: "" });
    setErr(false);
    handleModel(false);
  };

  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    const newErrors = { ...errData, [name]: "" };
    setErrData(newErrors);
    setIsValidForm(Object.values(newErrors).every((err) => err === ""));
  };

  useEffect(() => {
    const closeOnEscapePressed = (e) => {
      if (e.key === "Escape") {
        handleModel(false);
      }
    };
    window.addEventListener("keydown", closeOnEscapePressed);
    return () => {
      window.removeEventListener("keydown", closeOnEscapePressed);
    };
  }, []);

  return (
    <>
      <div className="model-overlay"></div>

      <div className={`add-chat-model ${isDark ? "active" : "inactive"}`}>
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
              <p className="add-user-header">
                Enter name <span className="req">*</span>
              </p>

              <Input
                focus={true}
                type="text"
                name="name"
                placeholder="Enter your name"
                className={`modal-input ${isDark ? "active" : "inactive"}`}
                value={formData.name}
                onChange={handleChangeForm}
              />
              {errData.name && (
                <span className="error-message">{errData.name}</span>
              )}
            </div>
            <div className="add-image-header">
              <p className="add-user-header">
                Add image link <span className="req">*</span>
              </p>
              <Input
                type="text"
                name="image"
                placeholder="Enter your image URL"
                className={`modal-input ${isDark ? "active" : "inactive"}`}
                value={formData.image}
                onChange={handleChangeForm}
              />
            </div>
            {errData.image && (
              <span className="error-message">{errData.image}</span>
            )}
            {err && <span className="error-message">{text}</span>}
            <div className="modal-div-btn">
              <Button
                text={"Close"}
                className={"model-btn-1"}
                type={"button"}
                onClick={() => handleModel(false)}
              />
              <Button
                text={"Submit"}
                className={"model-btn-2"}
                type={"submit"}
                disabled={!isValidForm}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddModel;
