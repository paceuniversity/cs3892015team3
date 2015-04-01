#pragma strict
import UnityEngine.UI;

var speed:Number = 10;
var scoreText:UnityEngine.UI.Text;
private var myRigidbody:Rigidbody2D;
public var currentNumber:Number = 0;
public var goalNumber:Number = 26;

function Start () {
	myRigidbody = this.GetComponent.<Rigidbody2D>();
	Application.targetFrameRate = 60;
}

function Update () {
	// Detects Mouse Click or Touch Screen Tap
	if (Input.GetMouseButtonDown(0)) {
		SwitchGravity();
	}
	
	// Run Forward
	Move(1);
}

function Move(direction:Number) {
	// Move Character at Constant Speed
	
	(this.GetComponent.<Rigidbody2D>() as Rigidbody2D).velocity.x = speed * direction;
}

function tapped() {
	if (Input.GetMouseButtonDown(0)) {
		SwitchGravity();
	}
}

function SwitchGravity() {	
	print("Switcheroo");
	// If NOT Paused, Siwtch Negate Gravity Scale
	if (Time.timeScale != 0) {
		myRigidbody.gravityScale *= -1;
		myRigidbody.AddForce(Vector3(0,-100*myRigidbody.gravityScale,0));
	} else {
		//print("Paused");
	}
}

function Animate(type:String) {
	// Shortcut Variable for Animator
	var animator:Animator = (this.GetComponent.<Animator>() as Animator);
	
	// Stop All Existing Animations
	animator.StopPlayback();
	
	// Play Animation Depending on Type
	if (type == "run") {
		animator.Play("RunAnimation");
	} else if (type == "jump") {
		animator.Play("JumpAnimation");
	} else if (type == "float") {
		animator.Play("FloatAnimation");
	}
}

function Collected(amount:Number) {
	currentNumber += amount;
	scoreText.text = currentNumber.ToString() + "/" + goalNumber.ToString();
}


