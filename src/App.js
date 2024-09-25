import ChatApp from "./Pages/ChatApp";
import { ChatProvider } from "./store/ChatContext";
import { ThemeProvider } from "./store/ThemeContext";

function App() {
  return (
    <div className="App">
      <ThemeProvider>
        <ChatProvider>
          <ChatApp />
        </ChatProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
