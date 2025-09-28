import React , {useState} from "react";
import './StyleSheet/App.css';
import ListClients from "./component/ListClients";


function App() {
    const [menuAbierto, setMenuAbierto] = useState(false);
    const toggleMenu = () => {
        setMenuAbierto(!menuAbierto);
    };

  return (
    <div className="App">
      <ListClients />
    </div>
  );
}

export default App;
