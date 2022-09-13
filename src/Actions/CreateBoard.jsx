function CreateBoard(row, column, bombs){
let board =[];
let mineLocation=[];


for (let x =0; x < row ; x ++){
    let r=[]
    for(let y=0; y< column; y ++){
        r.push({
            x: x,
            y: y,
            value: 0,
            revealed: false,
            flagged:false,
        })
    }
    board.push(r);
}


let bombCount= 0;
while (bombCount < bombs){
    let x =Math.floor(Math.random()* row);
    let y =Math.floor( Math.random()* column);
    console.log(x)
    if (board[x][y].value === 0){
        board[x][y].value = -1;
        mineLocation.push([x,y]);
        bombCount++
    }
}

for (let mine of mineLocation){
    //+1 value to all cells adjacent and diagonal to the mine
    let x = mine[0]
    let y = mine[1]
    //top-left
    if ((x-1)>=0 && (y-1)>=0 && board[x-1][y-1].value !== -1){
        board[x-1][y-1].value ++
    }
    //top
    if ((x-1)>=0 && board[x-1][y].value !== -1){
        board[x-1][y].value ++
    }
    //top-right
    if ((x-1)>=0 && (y+1)<column && board[x-1][y+1].value !== -1){
        board[x-1][y+1].value ++
    }
    //left
    if ((y-1)>=0 && board[x][y-1].value !== -1){
        board[x][y-1].value ++
    }
    //right
    if ((y+1)<column && board[x][y+1].value !==-1){
        board[x][y+1].value ++
    }
    //bottom-left
    if ((x+1)<row && (y-1)>=0 && board[x+1][y-1].value !== -1){
        board[x+1][y-1].value ++
    }
    //bottom
    if ((x+1)<row && board[x+1][y].value !== -1){
        board[x+1][y].value ++
    }
    //bottom-right
    if ((x+1)<row && (y+1)<column && board[x+1][y+1].value !== -1){
        board[x+1][y+1].value ++
    }
}

return {board,mineLocation}

}
 
export default CreateBoard;