import styles from "./App.modules.css";
import Home from "./pages/Home.jsx";
import { BrowserRouter as Router, Route, Routes  } from "react-router-dom";
import Header from "./components/Header";


function App() {
  return (
    <div className={styles.all}>
	  <link href="https://fonts.googleapis.com/css2?family=Advent+Pro:wght@100;400&family=Aguafina+Script&family=Amatic+SC&family=Barrio&family=Bellota:wght@300&family=Black+Ops+One&family=Caveat&family=Chakra+Petch:ital,wght@1,300&family=Cinzel&family=Cookie&family=Croissant+One&family=Dancing+Script&family=Faster+One&family=Fuggles&family=Gugi&family=Hammersmith+One&family=Homemade+Apple&family=Itim&family=Lilita+One&family=Montserrat+Alternates:wght@100&family=Nothing+You+Could+Do&family=Orbitron&family=Playball&family=Rajdhani&family=Satisfy&family=Sedgwick+Ave+Display&family=Shadows+Into+Light&family=Space+Mono&family=Tilt+Prism&family=Yellowtail&display=swap" rel="stylesheet" />
	  <Header />
	  <Router>
	  	  <Routes>
	  	  	<Route index element={<Home />} />
	  	  </Routes>
	  	  </Router>
    </div>
  );
}

export default App;
