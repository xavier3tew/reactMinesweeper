import { useEffect,useState } from "react";
import CreateBoard from "../Actions/CreateBoard";
import Cell from "./Cell";
import Reveal from "../Actions/Reveal";

function Board(){
    let [grid,setGrid]= useState([]);
    let [mineLocation,setMineLocation]=useState([]);
    let [nonMineCount,setNonMine]=useState();
    let [gameState,setGameState]=useState()
    let [difficulty,setDifficulty]=useState('beginner');
    
    //0 --> ongoing
    //1 --> failed
    //2 --> success
    useEffect(()=>{
        newBoard();
    },[difficulty])

    function newBoard(){
        let x ,y, bomb;
        if (difficulty === "beginner"){
            x=9;
            y=9;
            bomb=10;
        }
        if (difficulty === "intermediate"){
            x=16;
            y=16;
            bomb=40;
        }
        if (difficulty === "expert"){
            x=16;
            y=30;
            bomb=99;
        }
        const newBoard=CreateBoard(x,y,bomb)
        setGrid(newBoard.board)
        setNonMine(x*y-bomb)
        setMineLocation(newBoard.mineLocation)
        setGameState(0)
    }

    function updateFlag(e,x,y){
        e.preventDefault();
        console.log("Right Click");
        let newGrid=JSON.parse(JSON.stringify(grid));
        if (!newGrid[x][y].revealed){
            newGrid[x][y].flagged=!newGrid[x][y].flagged;
        }
        
        console.log(newGrid[x][y]);
        setGrid(newGrid);
        
    }

    function revealCell(x,y){
        let newGrid=JSON.parse(JSON.stringify(grid));
        if(newGrid[x][y].flagged){
            return
        }
        if(newGrid[x][y].value===-1){
            alert("clicked on mine");
            for (let mine of mineLocation){
                newGrid[mine[0]][mine[1]].revealed=true;
            }
            setGrid(newGrid);
            setGameState(1);
        }
        else{
            let revealedBoard=Reveal(newGrid,x,y,nonMineCount)
            setGrid(revealedBoard.board);
            setNonMine(revealedBoard.nonMine);
            if (nonMineCount === 0){
                setGameState(2);
            }
        }
    }
    const handleChange=(event)=>{
        setDifficulty(event.target.value)
    }
    return(
        <div className="parent">
            <div>
             <label>
                difficulty
                <select value={difficulty} onChange={handleChange}>
                 <option value="beginner"> Beginner </option>
                 <option value="intermediate"> Intermediate </option>
                 <option value="expert"> Expert </option>
                </select>
             </label>
            <button className='refresh'onClick={()=>newBoard()}> new game </button>
            </div>
            <div>{
        gameState === 1 ? 
        "Game Over": 
        gameState === 2 ? 
        "Congratulations":"" 
        }</div>
            {grid.map((singlerow,indexr)=>{
                return (
                    <div style={{ display : 'flex',
                    flexDirection : 'row',}} key={indexr}>
                        {singlerow.map((singlecol,indexc)=>{
                                return <Cell key={indexc} details={singlecol} updateFlag={updateFlag} revealCell={revealCell} gamestate={gameState}/>
                        })}
                    </div>
                )
            })}
            
        </div>
        
    )
}
export default Board