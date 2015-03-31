#pragma strict

var numberValue:Number = 2;

function Start () {
	SetRandomValue();
	// Change Text to Input Number
	var text = this.GetComponentInChildren.<TextMesh>();
	text.text = numberValue.ToString();
}

function SetRandomValue() {
	// Random Between 1 - 3
	numberValue = Random.Range(1,4);
	
	// Chance of Being Negative
	if (Random.value < 0.2) {
		numberValue *= -1;
	}
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
	var player:GameObject = gameObject.FindGameObjectWithTag("Player");
	// Tell Player to Add
	(player.GetComponent.<PlayerControl>() as PlayerControl).Collected(numberValue);
	
	//Animate
	//
	
	// Remove GameObject From World
	GameObject.Destroy(this.gameObject);
}