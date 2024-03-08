
let boardPiecesPositions = [
            [1,2,3,4,5,6,7,8],
            [1,2,3,4,5,6,7,8],
            [1,2,3,4,5,6,7,8],
            [1,2,3,4,5,6,7,8],
            [1,2,3,4,5,6,7,8],
            [1,2,3,4,5,6,7,8],
            [1,2,3,4,5,6,7,8],
            [1,2,3,4,5,6,7,8],
            [1,2,3,4,5,6,7,8],
            [1,2,3,4,5,6,7,8]
            ]; //pieces values position

let boardCoordinates = [
            [1,2,3,4,5,6,7,8],
            [1,2,3,4,5,6,7,8],
            [1,2,3,4,5,6,7,8],
            [1,2,3,4,5,6,7,8],
            [1,2,3,4,5,6,7,8],
            [1,2,3,4,5,6,7,8],
            [1,2,3,4,5,6,7,8],
            [1,2,3,4,5,6,7,8],
            [1,2,3,4,5,6,7,8],
            [1,2,3,4,5,6,7,8]
        ]

let pieceTypesRed = [1,2,3,4,5,6,7,8];
let pieceTypesBlue = [1,2,3,4,5,6,7,8];


for(let i = 0; i < 8; i++){
    pieceTypesRed[i]= (i+1)*2;
}

for(let i = 0; i < 8; i++){
    
    pieceTypesBlue[i]= (pieceTypesBlue.length-i) * 2 + 1;
}

for(let i =0; i < 10; i++){
    for(let j = 0; j <8; j++){
      let cell =  document.getElementById("r"+(i+1) + "c"+(j+1));
      boardPiecesPositions[i][j] = cell;
      boardCoordinates[i][j] = 0;
    }
}


for(let i = 0; i < 8; i++){
    for(let j= 0; j < 1; j++){
        boardCoordinates[j][i] = pieceTypesRed[i];

    }
}

for(let i = 9; i < 10; i++){
    for(let j= 0; j < 8; j++){
        boardCoordinates[i][j] = pieceTypesBlue[j];
        
    }
}

function isBluePiece(value){
    if(value == 0){
        return false;
    }
    return value %2 == 1;
}
function isRedPiece(value){
    if(value == 0){
        return false;
    }
    return value %2==0;
}

function getPieceValue(value){
    return Math.floor(value/2);
}



function move(oldParent, newParent ) {  
    newParent.innerHTML= ''; 
    while (oldParent.childNodes.length > 0) { 
            newParent.appendChild(oldParent.childNodes[0]);  
             
    } 
}

function isItAdjacent(row1,col1,row2,col2){
    return Math.abs(row1-row2) <= 1 && Math.abs(col1 - col2) <=1;
}

function battleArithmetic(piece1Value, piece2Value){
    const value1OfPiece1 = getPieceValue(piece1Value);
    const value2OfPiece2 = getPieceValue(piece2Value);
    if(value1OfPiece1 > value2OfPiece2){
        return piece1Value
    }else if(value1OfPiece1 < value2OfPiece2){
        return piece2Value;
    }else{
        return 0;
    }
}

function updateTurnCaption(){
    const turnIndicator = document.getElementById("turn-indicator");
    if(isBlueTurn){
        turnIndicator.textContent = "BLUES TURN";

    }else{
        turnIndicator.textContent= "REDS TURN";
    }
}






let isBlueTurn = true;
let pieceSelected = false;
let currentSelectedPiece = null;
let currentSelectedPieceValue = 0;
function getClickListener(row,column){
    return function onClickFunction(event){
        console.log('click'+ ' '+ row + ',' + column);  
        var pieceValue = boardCoordinates[row][column]
        if(isBlueTurn == true){
            if(pieceSelected == false){

                if(pieceValue != 0 && isBluePiece(pieceValue)){
                    
                    pieceSelected = true;
                    currentSelectedPieceValue = pieceValue;
                    currentSelectedPiece = {row: row, column:column};
                    return;
                }
            }
           else {
            
            if(isItAdjacent(currentSelectedPiece.row, currentSelectedPiece.column, row , column) && isBluePiece(pieceValue)==false){
                const winner = battleArithmetic(currentSelectedPieceValue, pieceValue);
                if(winner == currentSelectedPieceValue){
                    boardCoordinates[row][column] = currentSelectedPieceValue;
                    boardCoordinates[currentSelectedPiece.row][currentSelectedPiece.column] = 0; 
                    move(boardPiecesPositions[currentSelectedPiece.row][currentSelectedPiece.column], boardPiecesPositions[row][column]);

                }else if(winner == pieceValue){
                    boardCoordinates[currentSelectedPiece.row][currentSelectedPiece.column] = 0; 
                    boardPiecesPositions[currentSelectedPiece.row][currentSelectedPiece.column].innerHTML= ''; 
                    
                }else{
                    boardCoordinates[currentSelectedPiece.row][currentSelectedPiece.column]=0;
                    boardCoordinates[row][column] = 0;
                    boardPiecesPositions[currentSelectedPiece.row][currentSelectedPiece.column].innerHTML= ''; 
                    boardPiecesPositions[row][column].innerHTML= ''; 
                }
                
                pieceSelected = false;
                isBlueTurn = false;
                updateTurnCaption();
                checkEndGame();
            }
            
           }
        }



        else if(isBlueTurn == false){
            if(pieceSelected == false){
                if(pieceValue != 0 && isRedPiece(pieceValue)){
                    pieceSelected = true;
                    currentSelectedPieceValue = pieceValue;
                    currentSelectedPiece = {row: row, column:column};
                    return;
                }
            }
           else {

            
            if(isItAdjacent(currentSelectedPiece.row, currentSelectedPiece.column, row , column)&& isRedPiece(pieceValue)==false) {
                const winner2 = battleArithmetic(currentSelectedPieceValue, pieceValue);
                if(winner2 == currentSelectedPieceValue){
                    boardCoordinates[row][column] = currentSelectedPieceValue;
                    boardCoordinates[currentSelectedPiece.row][currentSelectedPiece.column] = 0; 
                    move(boardPiecesPositions[currentSelectedPiece.row][currentSelectedPiece.column], boardPiecesPositions[row][column]);
                }else if(winner2 == pieceValue){
                    boardCoordinates[currentSelectedPiece.row][currentSelectedPiece.column] = 0; 
                    boardPiecesPositions[currentSelectedPiece.row][currentSelectedPiece.column].innerHTML= ''; 
                
               }else{
                    boardCoordinates[currentSelectedPiece.row][currentSelectedPiece.column]=0;
                    boardCoordinates[row][column] = 0;
                    boardPiecesPositions[currentSelectedPiece.row][currentSelectedPiece.column].innerHTML= ''; 
                    boardPiecesPositions[row][column].innerHTML= ''; 
            }
            
            pieceSelected = false;
            isBlueTurn = true;
            updateTurnCaption();
            checkEndGame();
            }
           }
        }
        
        
    }//end onClickFunction
}//end getClickListener



for(let i =0; i < 10; i++){
    for(let j = 0; j <8; j++){
    let cell =  document.getElementById("r"+(i+1) + "c"+(j+1));
    cell.addEventListener('click',getClickListener(i,j));
    }
}

function movePieces(){
    let pieces = document.querySelectorAll('.pieces .red div, .pieces . blue div')   
}

function countPiecesRemaining(player){
    let count=0;
    for(let row =0; row < boardCoordinates.length; row++){
        for(let col =0; col < boardCoordinates[row].length; col++){
            if (boardCoordinates[row][col] !== 0 && isBluePiece(boardCoordinates[row][col]) === (player === "blue")) {
                count++;
        }
    }
}
    return count;
}

function displayGameOverMessage(winner){
    const message = winner ?'congratulations '+ winner +' wins the game, game over, a pyrrhic victory ':"its a draw a costly battle"
    alert(message);
}   

function checkEndGame(){
    const blueRemaining = countPiecesRemaining("blue");
    const redRemaining = countPiecesRemaining("red");
    if(blueRemaining === 0|| redRemaining ===0){
        const winner = blueRemaining === 0 ? "red": "blue";
        displayGameOverMessage(winner);
    }
}

document.getElementById("start-button").addEventListener("click",function()
{
    document.querySelector(".start-screen").style.display = "none";
    document.querySelector(".board-container").style.display ="block";
});


    

    


