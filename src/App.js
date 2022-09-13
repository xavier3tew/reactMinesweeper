import Board from './Components/Board';
import CreateBoard from './Actions/CreateBoard';
import './App.css';


function App() {
  return (
    <div className="App">
      <div className="Title"> MINESWEEPER </div>
      <div className= "Board">
        <Board/>
      </div>
    </div>
  );
}


export default App;
