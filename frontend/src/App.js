import './App.css';
import NavBar from './components/nav';
import Shop from './components/shop';
import { HashRouter as Router, Route, Redirect } from 'react-router-dom';
import Login from './components/login';
import Cart from './components/cart';
import { useState } from 'react';
import Footer from './components/footer';

const USER = 'foodShopUser';

function App() {
  const [loggedIn, logIn] = useLocalStorage(USER, null);

  const logout = () => logIn(null);

  return (
    <>
      <Router basename='/'>
        <NavBar user={loggedIn} setUser={logIn} logOut={logout} />
        <Route exact path='/'>
          <Redirect to='/login' />
        </Route>
        <Route path='/login'><Login logIn={logIn} user={loggedIn} /></Route>
        <Route exact path='/shop'><Shop setUser={logIn} user={loggedIn} /></Route>
        <Route exact path='/cart'><Cart setUser={logIn} user={loggedIn} /></Route>
        <Footer />
      </Router>
    </>
  );
}

export default App;

// Hook
function useLocalStorage(key, initialValue) {
	// State to store our value
	// Pass initial state function to useState so logic is only executed once
	const [storedValue, setStoredValue] = useState(() => {
		try {
		// Get from local storage by key
		const item = window.localStorage.getItem(key);
		// Parse stored json or if none return initialValue
		return item ? JSON.parse(item) : initialValue;
		} catch (error) {
		// If error also return initialValue
		console.log(error);
		return initialValue;
		}
	});
	
	// Return a wrapped version of useState's setter function that ...
	// ... persists the new value to localStorage.
	const setValue = value => {
		try {
		// Allow value to be a function so we have same API as useState
		const valueToStore =
			value instanceof Function ? value(storedValue) : value;
		// Save state
		setStoredValue(valueToStore);
		// Save to local storage
		window.localStorage.setItem(key, JSON.stringify(valueToStore));
		} catch (error) {
		// A more advanced implementation would handle the error case
		console.log(error);
		}
	};
	
	return [storedValue, setValue];
}
