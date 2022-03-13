import logo from './logo.svg';
import './App.css';
import Header from './components/header';
import Chatbox from './components/chatbox';

const App=()=> {
  
  return (
    <div className="App">
      <header className="App-header">
      <Header/>
        <div className='chatbox'>
       <Chatbox/>
       </div>

      </header>
  
    </div>
  );
}

export default App;
