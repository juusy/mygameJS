//рандомное число
function getRandomInt(min, max)
{
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//размер одной клетки поля
	var cellSize = 50,
// Массив карты поля
     map = [
        [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
        [0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1],
        [0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
        [1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1],
        [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0],
        [1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1],
        [0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1]
    ];

//отображаем изображение на канвасе
function drawImage(img, idimg,x, y, w, h) {
    var image = document.getElementById(idimg);
    image.onload = function () {
    	context.drawImage(image, x, y, w, h);
    	image.style.display = 'none';
    }
    image.src = img;
    }
    
    
//рисуем поле    
function drawImageToRepeat(img, idimg, t) {
    var image = document.getElementById(idimg);
    image.onload = function () {
    for (var i = 0; i < canvas.height/cellSize; i++)
		for (var j = 0; j < canvas.width/cellSize; j++) {
    		if (map[i][j] == t)
    				context.drawImage(image, j*cellSize, i*cellSize, cellSize, cellSize);
    				}
    	image.style.display = 'none';
    }
    image.src = img;
}


var QtCats = 3,//количество котов
	 QtChees = 3, //количество кусков сыра

	 Cats = new Array(), //масив котов
	 Chees = new Array(),//массив кусочков сыра
	 ImagesCats = [['cat.png', 'image2'], ['cat2.png', 'image8'], ['cat3.png', 'image9']];//названия изображений котов


var cheesCount = 0;//сколько собрано кусков сыра



var Mouse = {
	positionX : 100,
	positionY : 460,
	size: 30
	}

//Заполняем массив котов
for(var i=0; i<QtCats; i++){
	Cats[i] = {
		positionX : 0,
		positionY : 0,
		size : 49
	}
}

//Заполняем массив сыра
for(var i=0; i<QtChees; i++){
	Chees[i] = {
		positionX : 0,
		positionY : 0,
		size : 20
	}
}


var Tomato = {
	positionX : -1,
	positionY : -1,
	size: 20,
}  


//возвращает истину, если расположение котов и кусков сыра не ближе значения "а"
var PlaceCoordinates = function(x, y, a){
	return (Math.abs(x - Mouse.positionX)>=a || Math.abs(y - Mouse.positionY)>=a)
};

//генерирует рандомную координату свободного поля(на дорожке) и присваивает объекту "Кот" или "Сыр"
//т е определяет позиции котов и кусочков сыра


var drawRandomCoordinates = function(i) {
   r1 = getRandomInt(0,13);//генерируем рандомное значение
	r2 = getRandomInt(0, 9);
	
	//если эта ячейка не является лабиринтом и если она расположена от мыши не ближе, чем значение "400"
	if ((map[r2][r1]==0) && PlaceCoordinates(r1*cellSize, r2*cellSize, 400)) {
		if (i<Cats.length){
			Cats[i].positionX = r1*cellSize;//присваиваем коту координаты
			Cats[i].positionY = r2*cellSize;
		}		
		else{
			Chees[i-Cats.length].positionX = r1*cellSize+15;
			Chees[i-Cats.length].positionY = r2*cellSize+15;
		}
	}
	else {
		drawRandomCoordinates(i);//иначе заново запускаем генерацию чисел
	}
};

for(var i=0; i<Cats.length + Chees.length; i++){
	drawRandomCoordinates(i);
}  

  
//рисуем кусочки сыра
function drawChees(img, idimg,x, y, w, h) {
var image = document.getElementById(idimg);
    image.onload = function () {
    context.drawImage(image, x, y, w, h);
    	for (var i=0; i<Chees.length; i++){
    		if (!CheesClash[i])
    			context.drawImage(image, Chees[i].positionX, Chees[i].positionY, Chees[i].size, Chees[i].size);
    	}
    	image.style.display = 'none';
    }
    image.src = img;
 }


var Area = function () {
	drawImageToRepeat('sand.png', 'image4', 0);
   drawImageToRepeat('grass.jpg', 'image3', 1);
   drawImage('house.png', 'image10', 50, 450, 50, 50);
   for(var i=0; i<Cats.length; i++){
		if (!ClashCatsTomato[i])
			drawImage(ImagesCats[i][0], ImagesCats[i][1], Cats[i].positionX, Cats[i].positionY, Cats[i].size, Cats[i].size);
	}
	
   if (MoveTomatoModule.showZ())
   	drawImage('tomato.png', 'image6', Tomato.positionX, Tomato.positionY, 20, 20);
   
	context.font="20px Verdana";
	drawChees('сыр.png', 'image7', 610, 465, 30, 30);
	context.fillStyle = "#875A27";
	context.fillText(cheesCount, 590, 487);
	context.strokeStyle = "yellow";
	context.lineWidth = 1.5;
	context.strokeText(cheesCount, 590, 487);
   if ((MouseClashModule.showBlikingMouse()==0) ||(MouseClashModule.showBlikingMouse()%6==0) || (MouseClashModule.showBlikingMouse()>=36)){
		   	
   	drawImage('mouse.png', 'image1', Mouse.positionX, Mouse.positionY, 30, 30);
		drawImage('heart.png', 'image5', 670, 470, 20, 20);
		context.fillStyle = "#EDAC21";
		context.fillText(GameModule.ShowLife(), 650, 487);
		context.strokeStyle = "red";
		context.lineWidth = 1.5;
		context.strokeText(GameModule.ShowLife(), 650, 487);
	}
};




