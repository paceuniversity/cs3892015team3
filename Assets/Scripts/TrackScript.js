#pragma strict

var collectables:GameObject;
var obstacles:GameObject;
private var numberCollection = new Array();
private var obstacleCollection = new Array();

private var numberCurrentAmount:int = 0;
private var obstacleCurrentAmount:int = 0;

private var numberAmountPerLevel = [6,8,10,12,14,16];
private var obstacleAmountPerLevel = [0,1,2,2,4,5];

private var player:GameObject;
private var playerScript:NewPlayerControl;

function Start () {
	player = GameObject.FindWithTag("Player");
	GetObjects();
	OnTrackSwitch();
}

function GetObjects () {
	for(var child : Transform in collectables.transform){
    	if(child.gameObject.tag == "Number"){
        	numberCollection.Push(child.gameObject);
    	}
    	
 	}
 	for(var child2 : Transform in obstacles.transform){
 		if(child2.gameObject.tag == "Obstacle"){
        	obstacleCollection.Push(child2.gameObject);
    	}
 	}
 	
 	print(numberCollection.length);
 	print(obstacleCollection.length);
}

function Update () {
//	if (Input.GetMouseButton(0)) {
//		player.GetComponent.<NewPlayerControl>().checkpointLevel ++;
//		OnTrackSwitch();
//	}
}

function OnTrackSwitch() {
	print("Refreshing");
	RandomActivate();
}

function RandomActivate() {
	playerScript = player.GetComponent.<NewPlayerControl>();
	var numberArray = RandomizedArray(this.numberCollection);
	var obstacleArray = RandomizedArray(this.obstacleCollection);
	
	print(obstacleArray.length);
	
	var lvl = playerScript.checkpointLevel;
	var playerNum = playerScript.currentNumber;
	var playerGoal = playerScript.goalNumber;
	
	if(lvl > obstacleAmountPerLevel.Length-1){
		lvl = obstacleAmountPerLevel.Length-1;
	}
	// Choose Amount of Numbers
	for(var i=0;i < numberAmountPerLevel[lvl];i++){
		(numberArray[i] as GameObject).SetActive(true);
		(numberArray[i] as GameObject).GetComponent.<CollectableNumber>().Refresh(playerNum,playerGoal);
	}
	for(var i2=numberAmountPerLevel[lvl];i2 < numberArray.length;i2++){
		(numberArray[i2] as GameObject).SetActive(false);
	}
	
	print("Finished Nums");
	
	// Choose Amount of Obstacles
	for(var i3=0;i3 < obstacleAmountPerLevel[lvl];i3++){
		print("inside loop");
		(obstacleArray[i3] as GameObject).SetActive(true);
		
		(obstacleArray[i3] as GameObject).GetComponent.<StaticObstacle>().Refresh(lvl);
	}
	print("Past loop");
	for(var i4=obstacleAmountPerLevel[lvl];i4 < obstacleArray.length;i4++){
		print("inside another loop");
		print("i4: " + i4 + " , length: " + obstacleArray.length);
		(obstacleArray[i4] as GameObject).SetActive(false);
	}
	
	print("Finished Obstacles");
}




function RandomizedArray(a:Array){
	var array = new Array();
	
	for (var o in a) {
		array.push(o);
	}
	
    for (var i = array.length - 1; i > 0; i--) {
        var j = Mathf.Floor(Random.value * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
	
	return array;
}

