import React from 'react';
import logo from './logo.svg';
import './App.css';
import Counter from './components/counterView';
import counter from './reducers/counter';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const store = createStore(counter);

function App() {
   return (
		<Provider store={store}>
			<Counter
				value={store.getState()}
				onIncrement={() => store.dispatch({ type: 'INCREMENT' })}
				onDecrement={() => store.dispatch({ type: 'DECREMENT' })}
			/>
		</Provider>
   );
}

export default App;