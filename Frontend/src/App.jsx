import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
// import axios from "axios";

function App() {
  const [count, setCount] = useState(0);
  axios.get('')

  return (
    <>
      <div className="rounded-xl bg-slate-600 items-center justify-center flex text-center h-dvh w-dvw">
        Hello
      </div>
    </>
  );
}

export default App;
