var GameModule = (function(){

	var Life = 3;//кол-во жизней у мыши
	var PauseFlag = 1; //следит, нажата ли пауза
	var Game = false; //является флагом по нажатию на пробел - новая игра

	var ShowLife = function(){
		return Life;
	}
	var DecreaseLife = function(){
		Life--;
	}
	var ShowPauseFlag = function(){
		return PauseFlag;
	}
	
	var ShowGameFlag = function(){
		return Game;	
	}
	var ChangeGameFlag = function(newValue){
			Game = newValue;
	}

	//приостанавливает работу всех функций - Пауза
	var Pause = function(){
		PauseFlag = PauseFlag*(-1);
	}

	var WinLos = false; //Флаг - победил или проиграл, возращает истину в случае победы

	//новая игра
	var NewGame = function(){
		if (WinLos)
			Pause();
		Life = 3;
		cheesCount = 0;
		WinLos = false;
		MoveTomatoModule.changeZ(false);
		for(var i=0; i<Cats.length + Chees.length; i++){
			drawRandomCoordinates(i);
		} 
		for (var i=0; i< QtCats; i++){
			ClashCatsTomato[i] = false;
		}
		for (var i=0; i< QtChees; i++){
			CheesClash[i] = false;
		}  
		Mouse.positionX = 100;
		Mouse.positionY = 460;
	};


	//следит за тем, была проиграна игра или пройдена
	var WinLose = function(){
		if (Life<=0){
			context.font="40px Verdana";
			context.fillStyle = "black";
			context.fillText('YOU LOSE', 200, 200);
			if (!WinLos)
				Pause();
			WinLos = true;	
		}
		else if (cheesCount == 3){
			if (!WinLos)
				Pause();
			WinLos = true;
			context.font="40px Verdana";
			context.fillStyle = "black";
			context.fillText('YOU WIN', 200, 200);	
		}
	};
	
	//запускает цикл игры
	var gameEngine = function () {
		if (PauseFlag == 1){
	 		Area(); //отрисовывает поле
    		MoveMouse(); //запускает перемещение мыши
    		MouseClashModule.incrementBlikingMouse(); //счетчик для мигания мыши
        
    		for(var i=0; i<Cats.length; i++){
    			if (!ClashCatsTomato[i]) {//если кот не умер, не столкнулся с помидорой
    				MoveCatModule.move(i); //запускаем его перемещение
    				MoveCatModule.towardMouse(i); //проверяем нет ли рядом мыши, если да - преследуем ее
    			}
    		}
      	if (ClashCatsTomato.indexOf(false)!= -1) //пока остался хотя бы один кот
    			MouseClashModule.clash(); //проверяем на столкновение с мышью
    		if (!MoveCatModule.clash()) //
    			MoveCatModule.changeClash();
    		if (MoveTomatoModule.showZ()){//если нажата клавиша Z
    			MoveTomatoModule.move();//запускаем передвижение помидоры
    			ClashTomatoCats(); //запускаем проверку на столкновение помидоры и кота
    		}
    		ClashCheesMouse();//запускаем проверку на столкновение сыра и мыши
    	}
    	WinLose(); //проверка на статус пройденности игры
    	requestAnimationFrame(gameEngine);
};
	return{
		NewGame: NewGame,
		WinLose: WinLose,
		Pause: Pause,
		DecreaseLife: DecreaseLife,
		ShowPauseFlag: ShowPauseFlag,
		ShowLife: ShowLife,
		ChangeGameFlag: ChangeGameFlag,
		ShowGameFlag: ShowGameFlag,
		GameEngine: gameEngine
		}
})();
