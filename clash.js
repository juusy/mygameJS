
var MouseClashModule = (function(){

	var ClashMouseCat = false;//столкнулась ли мышь с котом
	
	var BlikingMouse = 0;//для мигания мыши во время потери жизни
	
	
	var IncrementBlikingMouse = function(){
		BlikingMouse++;
	}
	var ShowBlikingMouse = function(){
		return BlikingMouse;
	}
	var ChangeBlikingMouse = function(value){
		BlikingMouse = value;
	} 
	//столкновение мыши и кота
	var Clash = function () {
		var iMouse = Position(Mouse.positionX);
		var jMouse = Position(Mouse.positionY);

		for (var i=0; i< Cats.length; i++)
		{
			//если координаты кота и мыши совпали
			if (((Position(Cats[i].positionX)) == iMouse) && (jMouse==(Position(Cats[i].positionY)))){
				ClashMouseCat = true;//помечаем, что мышь врезалась в кота
				BlikingMouse=0;//обнуляем счетчик, за счет которого делаю мигание мыши
				Mouse.positionX = 100;//перемещаем мышь в начальные координаты
				Mouse.positionY = 460;
				GameModule.DecreaseLife();
			}
		}	
	};
	
	return{
		clash: Clash,
		incrementBlikingMouse: IncrementBlikingMouse,
		showBlikingMouse: ShowBlikingMouse,
		changeBlikingMouse: ChangeBlikingMouse
	}
})();



var ClashCatsTomato = new Array();//массив, отвечающий за то, столкнулся ли кот с помидоркой.
											//Индексы массива сопоставлены индексам в массиве Cats

for (var i=0; i< QtCats; i++){
	ClashCatsTomato[i] = false;
} 



//столкновение tomato и кота
var ClashTomatoCats = function () {
	var iTomato = Position(Tomato.positionX);
	var jTomato = Position(Tomato.positionY);
	
	for(var i=0; i<Cats.length; i++){
		//если координаты помидорки и кота совпали
		if ((Position(Cats[i].positionX) == iTomato) && (jTomato== Position(Cats[i].positionY))){
			ClashCatsTomato[i] = true;//помечаем, что этот кот, столкнулся с помидорой (умер)
			Cats[i].positionX = -1; //снимаем позиции кота, чтобы не мешали в прохождении мыши
			Cats[i].positionY = -1; //иначе, хоть кот и не рисуется мышь может попасться в эти координаты
			MoveTomatoModule.changeZ(false);//снимаем блок на запуск помидор
			//MoveTomatoModule.primaryPosition();
		}
	}
};



var CheesClash = new Array(); //массив, отвечающий за то, столкнулась ли мышь с сыром.
										//Индексы массива сопоставлены индексам в массиве Chees
//столкновение сыра и мыши
var ClashCheesMouse = function () {
		var iMouse = Position(Mouse.positionX);
		var jMouse = Position(Mouse.positionY);
	for (var i=0; i<Chees.length; i++){
		if ((Position(Chees[i].positionX) == iMouse) && (Position(Chees[i].positionY)==jMouse)){
			CheesClash[i] = true;
			Chees[i].positionX = -1;
			Chees[i].positionY = -1;
			cheesCount++;//увеличиваем число сыра, которое мышь собрала
		}
	}
};



