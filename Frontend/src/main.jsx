import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import './styles/index.css';
import { BrowserRouter as Router} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Provider } from "react-redux";
import { legacy_createStore as createStore } from "redux";
import myReducers from './context/reducers';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const myStore = createStore(myReducers, 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    <Router>
      <AnimatePresence >
        <Provider store={myStore}>
          <App />
        </Provider>
      </AnimatePresence>
        
    </Router>
  </React.StrictMode>,
)
