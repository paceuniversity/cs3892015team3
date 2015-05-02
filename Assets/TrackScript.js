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
	
	if(lvl > obstacleAmountPerLevel.Length){
		lvl = obstacleAmountPerLevel.Length;
	}
	// Choose Amount of Numbers
	for(var i=0;i < numberAmountPerLevel[lvl];i++){
		(numberArray[i] as GameObject).SetActive(true);
		(numberArray[i] as GameObject).GetComponent.<CollectableNumber>().Refresh(
	}
	for(var i=numberAmountPerLevel[lvl];i < numberArray.Length;i++){
		(numberArray[i] as GameObject).SetActive(false);
	}
}

function RandomizedArray(a:[GameObject]) -> [GameObject]{
	
}

