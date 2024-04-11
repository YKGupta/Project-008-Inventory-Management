import './App.css';
import {
	BrowserRouter as Router,
	Routes,
	Route
} from "react-router-dom";
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Login from './Components/Login';
import Signup from './Components/Signup';
import ItemsProvider from './Context/ItemsProvider';

function App() {
	return (
		<Router>
			<ItemsProvider>
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
				</Routes>
			</ItemsProvider>
		</Router>
	);
}

export default App;
