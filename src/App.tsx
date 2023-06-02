import { useState } from "react";
import st from "./App.module.scss";

function App() {
  const [count, setCount] = useState(0);

  return <div className={st.App}></div>;
}

export default App;
