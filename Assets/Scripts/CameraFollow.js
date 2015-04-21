#pragma strict

var target:GameObject;
var followHorizontal:boolean;
var followVertical:boolean;
var followSpeed:Number = 0.5;
private var xLimit:Number = -12.42;
private var startPosition:Vector3;
private var myTransform:Transform;
private var targetTransform:Transform;

function Start () {
	myTransform = this.transform;
	targetTransform = target.transform;
	startPosition = this.transform.position;
	
}

function Update () {
	FollowX();
	//FollowY();
}

function FollowX () {
	if(!followHorizontal){
		return;
	}
	
	myTransform.position.x = targetTransform.position.x + 4;
	
	//this.transform.position.x -= (this.transform.position.x - target.transform.position.x)*followSpeed;
	
	if (myTransform.localPosition.x < xLimit) {
		myTransform.localPosition.x = xLimit;
		//print(this.transform.position.x);
	}
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

