import { useEffect,useState } from "react";
import CreateBoard from "../Actions/CreateBoard";
import Cell from "./Cell";
import Reveal from "../Actions/Reveal";
function Board(){
    let [grid,setGrid]= useState([]);
    let [mineLocation,setMineLocation]=useState([]);
    let [nonMineCount,setNonMine]=useState(0);
    useEffect(()=>{
        const newBoard=CreateBoard(10,10,20)
        setGrid(newBoard.board)
        setNonMine(10*10-20)
        setMineLocation(newBoard.mineLocation)
    },[])

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
        }
        else{
            let revealedBoard=Reveal(newGrid,x,y,nonMineCount)
            setGrid(revealedBoard.board);
            setNonMine(revealedBoard.nonMine);
        }
    }

    return(
        <div className="parent">
            {grid.map((singlerow,indexr)=>{
                //console.log(singlerow)
                return (
                    <div style={{ display : 'flex',
                    flexDirection : 'row',}} key={indexr}>
                        {singlerow.map((singlecol,indexc)=>{
                                //console.log(singlecol)
                                return <Cell key={indexc} details={singlecol} updateFlag={updateFlag} revealCell={revealCell}/>
                        })}
                    </div>
                )
            })}
        </div>
    )
}
export default Board