import Homepage from './components/Homepage'
import axios from "axios";

function App() {

axios.defaults.baseURL = "https://mereja-1.onrender.com"
axios.defaults.withCredentials = true;

  return (
     <Homepage/>
  )
}

export default App
