import { ToastContainer } from "react-toastify";
import "./App.css";
import TODODB from "./TODODB";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      {/* <CRUDNode /> */}
      <TODODB />

      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default App;
