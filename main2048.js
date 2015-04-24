/**
 * Created by Administrator on 2015/4/21.
 */


var board=[];
var score=0;
var record=[];
var startx=0;
var starty=0;
var endx=0;
var endy=0;

$(document).ready(function(){
    prepareForMobile();
    newgame();
});

function newgame(){
    //初始化格子
    init();
    //随机初始两个格子填入数字

    generateOneNumber();
    generateOneNumber();

}

function prepareForMobile(){
    if(documentWidth>500){
        gridCellWidth=100;
        containerWidth=500;
        cellSpace=20;
    }

    $('#container').css('width',containerWidth-2*cellSpace);
    $('#container').css('height',containerWidth-2*cellSpace);
    $('#container').css('padding',cellSpace);
    $('#container').css('border-radius',0.02 * containerWidth);

    $('.grid-cell').css('width',gridCellWidth);
    $('.grid-cell').css('height',gridCellWidth);
    $('.grid-cell').css('border-radius',0.15 * gridCellWidth);




}


$(document).keydown(function(event){
    switch(event.keyCode){
        case 37:
            if(moveLeft()){
                setTimeout('generateOneNumber()',210);
                setTimeout('isgameover()',210);

            };
            break;
        case  38:
            if(moveTop()){
                setTimeout('generateOneNumber()',210);
                setTimeout('isgameover()',210);
            };
            break;
        case 39:
            if(moveRight()){
                setTimeout('generateOneNumber()',210);
                setTimeout('isgameover()',210);
            };
            break;
        case 40:  if(moveDown()){
            setTimeout('generateOneNumber()',210);
            setTimeout('isgameover()',210);
        };
            break;
        default:break;

    }
});

document.addEventListener('touchstart',function(event){
    startx=event.touches[0].pageX;
    starty=event.touches[0].pageY;
});

document.addEventListener('touchend',function(event){
    endx=event.changedTouches[0].pageX;
    endy=event.changedTouches[0].pageY;
    var deltax=endx-startx;
    var deltay=endy-starty;

    if(Math.abs(deltax)>Math.abs(deltay)){
        if(deltax>0){
            if(moveRight()){
                setTimeout('generateOneNumber()',210);
                setTimeout('isgameover()',210);
            };
        }
        else{
            if(moveLeft()){
                setTimeout('generateOneNumber()',210);
                setTimeout('isgameover()',210);

            };
        }
    }else{
        if(deltay>0){
            if(moveDown()){
                setTimeout('generateOneNumber()',210);
                setTimeout('isgameover()',210);
            };
        }else{
            if(moveTop()){
                setTimeout('generateOneNumber()',210);
                setTimeout('isgameover()',210);
            }
        }
    }

});

function init(){
    score=0;

    $('#score').text('score:'+score);
    for(var i=0;i<4;i++)
        for(var j=0;j<4;j++){
            var gridCell=$("#grid-cell-"+i+"-"+j);
            gridCell.css('top',getTopPos(i,j));
            gridCell.css('left',getLeftPos(i,j));
        }

    for(var i=0;i<4;i++) {
        board[i] = [];
        record[i]= [];
       // alert(board[p]);
        for (var j = 0; j < 4; j++) {
            board[i][j] = 0;
            record[i][j]=false;
        }
    }
    updateBoardView();
}

function updateBoardView(){
    $(".number-cell").remove();
   for(var i=0;i<4;i++)
    for(var j=0;j<4;j++){
        $("#container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
        var numberCell=$('#number-cell-'+i+'-'+j);
        if(board[i][j]===0){
            numberCell.css('width','0px');
            numberCell.css('height','0px');
            numberCell.css('top',getTopPos(i,j)+gridCellWidth/2);
            numberCell.css('left',getLeftPos(i,j)+gridCellWidth/2);
        }
        else{
            numberCell.css('width',gridCellWidth);
            numberCell.css('height',gridCellWidth);
            numberCell.css('top',getTopPos(i,j));
            numberCell.css('left',getLeftPos(i,j));
            numberCell.css('background-color',getBackgroundColor(board[i][j]));
            numberCell.css('color',getNumberColor(board[i][j]));
            numberCell.text(board[i][j]);
        }
        record[i][j]=false;
    }
    $('.number-cell').css('line-height',gridCellWidth+'px');
    $('.number-cell').css('font-size',0.6*gridCellWidth+'px');
    $('.number-cell').css('border-radius',0.15*gridCellWidth);

}

function generateOneNumber(){
    if(noSpace(board))
        return false;
    var x=parseInt(Math.floor(Math.random()*4));
    var y=parseInt(Math.floor(Math.random()*4));
    var time=0;
    while(time<50){
        if(board[x][y]===0)
            break;
         x=parseInt(Math.floor(Math.random()*4));
         y=parseInt(Math.floor(Math.random()*4));
    }
    if(time===50){
        for(var i=0;i<4;i++){
            for(var j=0;j<4;j++){
                if(board[i][j]===0){
                    x=i;
                    y=j;
                }
            }
        }
    }
    var numberh=Math.random() <0.5 ? 2 : 4 ;
    board[x][y]=numberh;
    showNumberAnimation(x,y,numberh);
    return true;
}



function moveLeft(){

    if(!canMoveLeft(board)){
        return false;
    }
    for(var i=0;i<4;i++){
        for(var j=1;j<4;j++){

            if(board[i][j] !==0){
                for(var k=0;k<j;k++){

                    if(board[i][k]===0 && noBlockH(i,k,j,board) && !record[i][k]){
                       // move
                        showMoveAnimation(i,j,i,k);
                        board[i][k]=board[i][j];
                        board[i][j]=0;
                        record[i][k]=true;
                        continue;
                    }
                    else if(board[i][k]===board[i][j] && noBlockH(i,k,j,board) && !record[i][k]){
                        //move
                        showMoveAnimation(i,j,i,k);
                        //add
                        board[i][k]+=board[i][j];
                        score+=board[i][k];
                        $('#score').text('score:'+score);
                        board[i][j]=0;
                        record[i][k]=true;
                        continue;
                    }

                }
            }
        }
    }


/*   window.setTimeout(function(){
       updateBoardView();
   },1000);*/

    setTimeout("updateBoardView()",550);
    return true;

}

function moveTop(){
    if(!canMoveTop(board)){
        return false;
    }
    for(var i=1;i<4;i++) {
        for (var j = 0; j < 4; j++) {
            if(board[i][j]!==0){
                for(var k=0;k<i;k++){
                    if(board[k][j]===0 && noBlockV(j,k,i,board) && !record[k][j]){
                        showMoveAnimation(i,j,k,j);
                        board[k][j]=board[i][j];
                        board[i][j]=0;
                        record[k][j]=true;
                    }
                    else if(board[k][j]===board[i][j] && noBlockV(j,k,i,board) && !record[k][j]){
                        showMoveAnimation(i,j,k,j);
                        board[k][j]+=board[i][j];
                        score+=board[k][j];
                        $('#score').text('score:'+score);
                        board[i][j]=0;
                        record[k][j]=true;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()",500);
    return true;
}

function moveRight(){
    if(!canMoveRight(board)){
        return false;
    }
    for(var i=0;i<4;i++)
        for(var j=0;j<3;j++){
            if(board[i][j]!==0){
                for(var k=4;k>j;k--){
                    if(board[i][k]===0 && noBlockH(i,j,k,board) && !record[i][k]){
                        showMoveAnimation(i,j,i,k);
                        board[i][k]=board[i][j];
                        board[i][j]=0;
                        record[i][k]=true;
                    }else if(board[i][k]===board[i][j] && noBlockH(i,j,k,board) && !record[i][k]){
                        showMoveAnimation(i,j,i,k);
                        board[i][k]+=board[i][j];
                        score+=board[i][k];
                        $('#score').text('score:'+score);
                        board[i][j]=0;
                        record[i][k]=true;
                    }
                }
            }
        }
    setTimeout("updateBoardView()",500);
    return true;
}

function moveDown(){

    if(!canMoveDown(board)){
        return false;
    }
    for(var i=0;i<3;i++)
        for(var j=0;j<4;j++){
            if(board[i][j]!==0){
                for(var k=3;k>i;k--){
                    if(board[k][j]===0 && noBlockV(j,i,k,board) && !record[k][j]){
                        showMoveAnimation(i,j,k,j);
                        board[k][j]=board[i][j];
                        board[i][j]=0;
                        record[k][j]=true;
                    }else if(board[k][j]===board[i][j] && noBlockV(j,i,k,board) && !record[k][j]){
                        showMoveAnimation(i,j,k,j);
                        board[k][j]+=board[i][j];
                        score+=board[k][j];
                        $('#score').text('score:'+score);
                        board[i][j]=0;
                        record[k][j]=true;
                    }
                }
            }
        }
    setTimeout("updateBoardView()",500);
    return true;

}

function isgameover(){
    for(var i=0;i<4;i++)
        for(var j=0;j<4;j++){
            if(board[i][j]===0){
                return;
            }
        }
    alert("gameover");
}