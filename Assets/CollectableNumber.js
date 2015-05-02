#pragma strict

var numberValue:Number = 2;
private var player:GameObject;


function Start () {
	player = gameObject.FindGameObjectWithTag("Player");
	SetRandomValue();
	
}

function Refresh() {

}

function SetRandomValue() {
	var changeNegative:Number = 0.2;
//	var playerScript = (player.GetComponent.<NewPlayerControl>() as NewPlayerControl);
//	if (playerScript.currentNumber > playerScript.goalNumber) {
//		changeNegative = 0.7;
//	}

	// Random Between 1 - 3
	numberValue = Random.Range(1,4);
	
	// Chance of Being Negative
	if (Random.value < changeNegative) {
		numberValue *= -1;
	}
	
	// Change Text to Input Number
	var text = this.GetComponentInChildren.<TextMesh>();
	text.text = numberValue.ToString();
}

function Update () {
}

function OnTriggerEnter2D(other: Collider2D) {
	// If Player
	if (other.gameObject.tag == "Player") {
		Collected();
	}
}


function Collected() {
	// Tell Player to Add
	(player.GetComponent.<NewPlayerControl>() as NewPlayerControl).Collected(numberValue);
	
	//Animate
	//
	
	// Remove GameObject From World
	Deactivate();
}

function Deactivate() {
	this.GetComponent.<SpriteRenderer>().enabled = false;
	this.GetComponent.<CircleCollider2D>().enabled = false;
	this.GetComponentInChildren.<MeshRenderer>().enabled = false;
	//GameObject.Destroy(this.gameObject);
}

function Activate() {
	SetRandomValue();
	this.GetComponent.<SpriteRenderer>().enabled = true;
	this.GetComponent.<CircleCollider2D>().enabled = true;
	this.GetComponentInChildren.<MeshRenderer>().enabled = true;
}