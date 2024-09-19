import ChatApp from "./Pages/ChatApp";
import { ThemeProvider } from "./store/ThemeContext";

function App() {
  return (
    <div className="App">
      <ThemeProvider>
        <ChatApp />
      </ThemeProvider>
    </div>
  );
}

export default App;
