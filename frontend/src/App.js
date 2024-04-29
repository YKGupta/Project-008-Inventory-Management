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
import Alert from './Components/Alert';
import LoadingBar from 'react-top-loading-bar';
import { useContext } from 'react';
import ProgressContext from './Context/ProgressContext';
import CartProvider from './Context/CartProvider';
import Cart from './Components/Cart';
import Orders from './Components/Orders';

function App() {

	const { progress, setProgress } = useContext(ProgressContext);

	return (
		<Router>
			<ItemsProvider>
				<CartProvider>
					<LoadingBar
						color='#2D3436'
						progress={progress}
						onLoaderFinished={() => setProgress(0)}
					/>
					<Alert />
					<Navbar />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/login" element={<Login />} />
						<Route path="/signup" element={<Signup />} />
						<Route path="/cart" element={<Cart />} />
						<Route path="/orders" element={<Orders />} />
					</Routes>
				</CartProvider>
			</ItemsProvider>
		</Router>
	);
}

export default App;
