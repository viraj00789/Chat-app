import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chat from "./Pages/Chat";
import { ChatProvider } from "./store/ChatContext";
import { ThemeProvider } from "./store/ThemeContext";
import Status from "./Pages/Status";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider>
          <ChatProvider>
            <Routes>
              <Route path="/" element={<Chat />} />
              <Route path="/status" element={<Status/>}/>
            </Routes>
          </ChatProvider>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
