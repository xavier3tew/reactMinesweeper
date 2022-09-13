function Reveal(grid,x,y,nonMineCount){
    // find the cells that are adjacent to a zero cell, repeat if new zero cell is found
    let adjacent=[];
    adjacent.push(grid[x][y]);
    while(adjacent.length > 0){
        let cell =adjacent.pop();
        let x= cell.x;
        let y=cell.y;
        let row =grid.length;
        let column= grid[0].length;
        //check if it is already revealed
        if(!cell.revealed){
            nonMineCount--;
            cell.revealed=true;
        }
        //if it is not zero stop 
        if (cell.value !== 0){
            break;
        }
        //checking for 0s to push into stack 
        //top-left
        if ((x-1)>=0 && (y-1)>=0 && grid[x-1][y-1].value === 0 && !grid[x-1][y-1].revealed){
            adjacent.push(grid[x-1][y-1]);
        }
        //top
        if ((x-1)>=0 && grid[x-1][y].value === 0 && !grid[x-1][y].revealed){
            adjacent.push(grid[x-1][y]);
        }
        //top-right
        if ((x-1)>=0 && (y+1)<column && grid[x-1][y+1].value === 0 && !grid[x-1][y+1].revealed){
            adjacent.push(grid[x-1][y+1]);
        }
        //left
        if ((y-1)>=0 && grid[x][y-1].value === 0 && !grid[x][y-1].revealed){
            adjacent.push(grid[x][y-1]);
        }
        //right
        if ((y+1)<column && grid[x][y+1].value === 0 && !grid[x][y+1].revealed){
            adjacent.push(grid[x][y+1]);
        }
        //bottom-left
        if ((x+1)<row && (y-1)>=0 && grid[x+1][y-1].value === 0 && !grid[x+1][y-1].revealed){
            adjacent.push(grid[x+1][y-1]);
        }
        //bottom
        if ((x+1)<row && grid[x+1].value === 0 && !grid[x+1][y].revealed){
            adjacent.push(grid[x+1][y]);
        }
        //bottom-right
        if ((x+1)<row && (y+1)<column && grid[x+1][y+1].value === 0 && !grid[x+1][y+1].revealed){
            adjacent.push(grid[x+1][y+1]);
        }

        //revealing all adjacent cells of 0
        //top-left
        if ((x-1)>=0 && (y-1)>=0 && !grid[x-1][y-1].revealed){
            (grid[x-1][y-1].revealed=true);
            nonMineCount--;
        }
        //top
        if ((x-1)>=0 && !grid[x-1][y].revealed){
            (grid[x-1][y].revealed=true);
            nonMineCount--;
        }
        //top-right
        if ((x-1)>=0 && (y+1)<column && !grid[x-1][y+1].revealed){
            (grid[x-1][y+1].revealed=true);
            nonMineCount--;
        }
        //left
        if ((y-1)>=0 && !grid[x][y-1].revealed){
            (grid[x][y-1].revealed=true);
            nonMineCount--;
        }
        //right
        if ((y+1)<column && !grid[x][y+1].revealed){
            (grid[x][y+1].revealed=true);
            nonMineCount--;
        }
        //bottom-left
        if ((x+1)<row && (y-1)>=0  && !grid[x+1][y-1].revealed){
            (grid[x+1][y-1].revealed=true);
            nonMineCount--;
        }
        //bottom
        if ((x+1)<row && !grid[x+1][y].revealed){
            (grid[x+1][y].revealed=true);
            nonMineCount--;
        }
        //bottom-right
        if ((x+1)<row && (y+1)<column  && !grid[x+1][y+1].revealed){
            (grid[x+1][y+1].revealed=true);
            nonMineCount--;
        }
    }
    return {board:grid,nonMine: nonMineCount}
}
export default Reveal