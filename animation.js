/**
 * Created by Administrator on 2015/4/23.
 */
function showNumberAnimation(i,j,randnumber){
    var numberCell=$('#number-cell-'+i+"-"+j);
    numberCell.css("background-color",getBackgroundColor(randnumber));
    numberCell.css("color",getNumberColor(randnumber));
    numberCell.text(randnumber);
    numberCell.animate({
       width:gridCellWidth+'px',
        height:gridCellWidth+'px',
        top:getTopPos(i,j),
        left:getLeftPos(i,j)
    },50);
}

function showMoveAnimation(row1,col1,row2,col2){
    var numberCells=$('#number-cell-'+row1+"-"+col1);

     numberCells.animate({
         top:getTopPos(row2,col2),
         left:getLeftPos(row2,col2)
     },500);

}

function showScoreAnimation(){
    var scoreIt=$('#score');
    scoreIt.animate({
            top:"125px",
            height:"612px"
        },50
    )
}