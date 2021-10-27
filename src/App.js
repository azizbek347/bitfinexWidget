import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import { DataProvider } from './components/DataProvider';

window.store = store;

function App() {
  return (
    <Provider store={store}>
      <div className='App'>
        <DataProvider />
      </div>
    </Provider>
  );
}

export default App;
