#pragma strict

var target:GameObject;
var followHorizontal:boolean;
var followVertical:boolean;
var followSpeed:Number = 0.5;
private var startPosition:Vector3;

function Start () {
	startPosition = this.transform.position;
}

function Update () {
	FollowX();
	FollowY();
}

function FollowX () {
	if(!followHorizontal){
		return;
	}
	
	this.transform.position.x = target.transform.position.x + 4;
}

function FollowY () {
	if(!followVertical){
		return;
	}

	// Move Camera Y
	this.transform.position.y -= (this.transform.position.y - target.transform.position.y)*followSpeed;
	
	if (this.transform.position.y < startPosition.y) {
		this.transform.position.y = startPosition.y;
	}	
}

function OnCollisionEnter(collision : Collision) {
		print("Colliding");
	}

