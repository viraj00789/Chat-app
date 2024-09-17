import { MdAddCircle } from "react-icons/md";
const Header = () => {
  return (
    <>
      <div className="message-header">
        <h1 className="message-heading">Messages</h1>
        <div>
          <MdAddCircle size={30} color="#9568dd" />
        </div>
      </div>
    </>
  );
};
export default Header;
