import Homepage from './components/Homepage'
import axios from "axios";

function App() {

// axios.defaults.baseURL = "https://mereja-9txb-api.vercel.app"
axios.defaults.baseURL = "http://localhost:3000"
axios.defaults.withCredentials = true;

  return (
     <Homepage/>
  )
}

export default App
