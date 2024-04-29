import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ProgressProvider from './Context/ProgressProvider';
import AlertProvider from './Context/AlertProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<ProgressProvider>
			<AlertProvider>
				<App />
			</AlertProvider>
		</ProgressProvider>
	</React.StrictMode>
);
