#pragma strict

private var numberCollection:[GameObject] = [];
private var obstacleCollection:[GameObject] = [];

private var numberCurrentAmount:int = 0;
private var obstacleCurrentAmount:int = 0;

private var numberAmountPerLevel = [5,6,8,10]
private var obstacleAmountPerLevel = [0,1,2,4,6]

private var player:GameObject;

function Start () {
	player = GameObject.FindWithTag("Player");
}

function Update () {

}

function OnTrackSwitch() {
	
}

function RandomActivate() {
	var numberArray = RandomizedArray(this.numberCollection);
	var obstacleArray = RandomizedArray(this.obstacleCollection);
	
	var lvl = player.GetComponent.<PlayerScript>().checkpointLevel;
	var playerNum = player.GetComponent.<PlayerScript>().currentNumber;
	var playerGoal = player.GetComponent.<PlayerScript>().goalNumber;
	
	if(lvl > obstacleAmountPerLevel.Length){
		lvl = obstacleAmountPerLevel.Length;
	}
	// Choose Amount of Numbers
	for(var i=0;i < numberAmountPerLevel[lvl];i++){
		(numberArray[i] as GameObject).SetActive(true);
		(numberArray[i] as GameObject).GetComponent.<CollectableNumber>().Refresh(playerNum,playerGoal);
	}
	for(var i=numberAmountPerLevel[lvl];i < numberArray.Length;i++){
		(numberArray[i] as GameObject).SetActive(false);
	}
	
	// Choose Amount of Obstacles
	for(var i=0;i < obstacleAmountPerLevel[lvl];i++){
		(obstacleArray[i] as GameObject).SetActive(true);
		(obstacleArray[i] as GameObject).GetComponent.<StaticObstacle>().Refresh(lvl);
	}
	for(var i=numberAmountPerLevel[lvl];i < numberArray.Length;i++){
		(numberArray[i] as GameObject).SetActive(false);
	}
}



function RandomizedArray(a:[GameObject]) -> [GameObject]{
	var b:[GameObject] = [];
	
	for (var o in a) {
		b += o;
	}
	
	return b;
}

