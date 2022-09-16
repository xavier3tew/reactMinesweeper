function Cell({details,updateFlag,revealCell,gamestate}){
    const style={
        cellStyle:{
            width:40,height:40,backgroundColor:'lightgrey',border:'1px solid white',
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            fontSize:'20px',
            cursor:'pointer',
        },
        clickedCell:{
            width:40,height:40,backgroundColor:'dimgrey',border:'1px solid white',
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            fontSize:'20px',
            cursor:'pointer',
        }
    }
    
    return (
        <div style={details.revealed?style.clickedCell:style.cellStyle} 
        onClick={(gamestate===0)? ()=>revealCell(details.x,details.y) : undefined} onContextMenu={(e)=>updateFlag(e,details.x,details.y)}>
            {(!details.revealed && details.flagged)? 
            "🚩":
            (details.revealed && details.value === -1) ?
            "💣":
            (details.revealed && details.value > 0) ?
            details.value:""}
            
        </div>
    )
}

export default Cell;