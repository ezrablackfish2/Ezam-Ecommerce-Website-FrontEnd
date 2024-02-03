import styles from "./App.modules.css";
import Home from "./pages/Home.jsx";
import { BrowserRouter as Router, Route, Routes  } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";


function App() {
  return (
    <div className={styles.all}>
	  
	  <Header />
	  <Router>
	  	  <Routes>
	  	  	<Route index element={<Home />} />
	  	  </Routes>
	  	  </Router>
	  <Footer />
    </div>
  );
}

export default App;
