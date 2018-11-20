//определяет по координате объета его индекс на карте поля
var Position = function(a) {
	return Math.floor((a)/cellSize);

}

//свободна ли ячейка [i][j]
var freeCells = function (i, j, x, y) {
	if (x<canvas.width && y<canvas.height && x>=0 && y>=0){
		if(map[i][j] == 0){
			return true;
		}
		else {
			return false;
		}
	}
	else
		return false;
}



//можно ли двугаться объекту дальше
var Free = function (obj, a, b) {
	return ((freeCells(Position(b), Position(a), a, b))&& (freeCells(Position(b+obj.size), Position(a), a, b+obj.size))&&(freeCells(Position(b), Position(a+obj.size), a+obj.size, b))&&(freeCells(Position(b+obj.size), Position(a+obj.size), a+obj.size, b+obj.size)));
}


var napravl = 0; //направление мыши, которое является и направлением помидоры

function MoveMouse () {    
		  	if (isKeyDown('W')){
		  		if (Free(Mouse, Mouse.positionX, Mouse.positionY-1)){
        			Mouse.positionY -= 1;
        			if (!MoveTomatoModule.showZ()) //пока движется помидорка, направление не меняем 
        				napravl = -2;
        		}
        	}
        	if (isKeyDown('A')){
        		if (Free(Mouse, Mouse.positionX-1, Mouse.positionY)){
        			Mouse.positionX -= 1;
					if (!MoveTomatoModule.showZ()) //пока движется помидорка, направление не меняем 
        				napravl = -1;
        		}
        	}
        	if (isKeyDown('S')){
        		if (Free(Mouse, Mouse.positionX, Mouse.positionY+1)){
        			Mouse.positionY += 1;
        			if (!MoveTomatoModule.showZ()) //пока движется помидорка, направление не меняем 
        				napravl = 2;
        		}
        	}
        	if (isKeyDown('D')){
       
        		if (Free(Mouse, Mouse.positionX+1, Mouse.positionY)){
        		Mouse.positionX += 1;
        		if (!MoveTomatoModule.showZ()) //пока движется помидорка, направление не меняем 
        			napravl = 1;
        		}
        	}
        	if (isKeyDown('Z')){
        		if (!MoveTomatoModule.showZ()) {//пока движется помидорка, помечаем что
        			
         		MoveTomatoModule.changeZ(true); //нажата клавиша Z
       			MoveTomatoModule.changeMoving(); //помидорка движется
        			MoveTomatoModule.move(); //запускаем движение
        		}
        }
}






var MoveCatModule = (function(){
	var Random = new Array(); //массив направлений котов, которые выбираются рандомно

	for (var i=0; i< Cats.length; i++){
		Random[i] = getRandomInt(1, 4);
	}
	
	var ShowRouteRandom = function(){
		return Random;
	}
	
	var ClashMouse = true;//произошло столкновение мыши с котом
	    
	 var ClashMvC = function(){
	 	return ClashMouse;
	 	};
	 var ReverseClash = function(){
	 	ClashMouse = !ClashMouse;
	 	};
	//высчитаеи, сколько существует вариантов пути, если больше 2х, то возращает истину
	var variot = function (obj) {
		var count = 0;
		if (Free(obj, obj.positionX, obj.positionY+1))
			count+=1;
		if (Free(obj, obj.positionX, obj.positionY-1))
			count+=1;	
		if (Free(obj, obj.positionX-1, obj.positionY))
			count+=1;
		if (Free(obj, obj.positionX+1, obj.positionY))
			count+=1;
		if (count>=3){
			return true;
		}
		else 
			return false;	
	}


	var TowardMouse = function(j){
	//если мышь и кот находятся на одной прямой, то кот начинает двигаться к мыши
	if (Position(Mouse.positionX) == Position(Cats[j].positionX)){
      if (Mouse.positionY>Cats[j].positionY){
      	if (Free(Cats[j], Cats[j].positionX, Cats[j].positionY+1))
        		Random[j] = 1;//меняем направление кота
      }
      else
      	if (Free(Cats[j], Cats[j].positionX, Cats[j].positionY-1))
        		Random[j] = 2; //меняем направление кота
    }
    if (Position(Mouse.positionY) == Position(Cats[j].positionY)){
      if (Mouse.positionX>Cats[j].positionX){
      	if (Free(Cats[j], Cats[j].positionX+1, Cats[j].positionY))
        		Random[j] = 4; //меняем направление кота
      }
      else
      	if (Free(Cats[j], Cats[j].positionX-1, Cats[j].positionY))
        		Random[j] = 3; //меняем направление кота
     }	
	};
	
	//перемещение кота    	
	var moveCat = function(j){
		switch(Random[j]) {
		case 1:
			if (Free(Cats[j], Cats[j].positionX, Cats[j].positionY+1)){
        		Cats[j].positionY += 0.5;
        		if (!ClashMouse)	
        			if (variot(Cats[j])) {
        				Random[j] = getRandomInt(1, 4);
        				TowardMouse(j);
        			}
        	}
        	else {
        		Random[j] = getRandomInt(1, 4);
        		TowardMouse(j);
        }
      break;
      case 2:
        if (Free(Cats[j], Cats[j].positionX, Cats[j].positionY-1)){
       		Cats[j].positionY -= 0.5;
        		if (!ClashMouse)
        			if (variot(Cats[j])) {
        				Random[j] = getRandomInt(1, 4);
        				TowardMouse(j);
        			}
        }
        else {
        		Random[j] = getRandomInt(1, 4);
				TowardMouse(j);
        }
      break;
      case 3:
        if (Free(Cats[j], Cats[j].positionX-1, Cats[j].positionY)){
        		Cats[j].positionX -= 0.5;
        		if (!ClashMouse)
        			if (variot(Cats[j])) {
        				Random[j] = getRandomInt(1, 4);
						TowardMouse(j);        
        			}
        }
        else {
        		Random[j] = getRandomInt(1, 4);
				TowardMouse(j);     
        }
      break;
      case 4:
        if (Free(Cats[j], Cats[j].positionX+1, Cats[j].positionY)){
        		Cats[j].positionX += 0.5;
        		if (!ClashMouse)   
        			if (variot(Cats[j])) {
        				Random[j] = getRandomInt(1, 4);
						TowardMouse(j);
        			}     
        }
        else {
        		Random[j] = getRandomInt(1, 4);
				TowardMouse(j);       
        }
      break;
      }
}
	return{
		move: moveCat,
		clash: ClashMvC,
		changeClash: ReverseClash,
		route: ShowRouteRandom,
		towardMouse: TowardMouse
		
	}
})();




var MoveTomatoModule = (function(){
	var Moving = false; //двигается ли помидор

	var PressZ = false; //нажата ли клавиша Z

		
	var ReverseMoving = function(){//изменяет значение переменной Moving
		Moving = !Moving;
	}
	
	var ShowMoving = function(){
		return Moving;
	}
	
	var ShowZ = function(){
		return PressZ;
	}
	var ChangeZ = function(newValue){//изменяет PressZ на newValue
		PressZ = newValue;
	}
	
	
	//убирает томат с поля игры
	var PrimaryPosition = function(){
		Tomato.positionX = -10;
		Tomato.positionY = -10;
	}
	
	//перемещение помидорки
	var moveTomato = function(){
		if (!Moving){
			Tomato.positionX = Mouse.positionX;
			Tomato.positionY = Mouse.positionY;
			Moving = true;
		}
		switch(napravl) {
			case 2:
				if (Free(Tomato, Tomato.positionX, Tomato.positionY+2)){
        			Tomato.positionY += 2;
        			Moving = true;
   			 }
    			else{
      			PressZ = false;
      			PrimaryPosition();
     			}
    		break;
        	case (-2):
        		if (Free(Tomato, Tomato.positionX, Tomato.positionY-2)){
        			Tomato.positionY -= 2;
        			Moving = true;	
        		}
				else{
      			PressZ = false;
      			PrimaryPosition();
      		}
      	
        break;
        case (-1):
        		if (Free(Tomato, Tomato.positionX-2, Tomato.positionY)){
        			Tomato.positionX -= 2;
		  			Moving = true;
		  		}
		  		else{
      			PressZ = false;
      			PrimaryPosition();
      		}
        break;
        case 1:
        		if (Free(Tomato, Tomato.positionX+2, Tomato.positionY)){
        			Tomato.positionX += 2;
		  			Moving = true;
		  		}
		  		else{
      			PressZ = false;
      			PrimaryPosition();
      		}
        break;
        }
	};
	return{
		move: moveTomato,
		changeMoving: ReverseMoving,
		changeZ: ChangeZ,
		showZ: ShowZ,
		primaryPosition: PrimaryPosition,
		showMoving: ShowMoving
		}
})();