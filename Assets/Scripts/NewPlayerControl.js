#pragma strict
import UnityEngine.UI;

var speed:Number = 10;
var scoreText:UnityEngine.UI.Text;
var checkpointText:UnityEngine.UI.Text;
var penaltyMeterSlider:UnityEngine.UI.Slider;
var pauseMenu:GameObject;
private var myRigidbody:Rigidbody2D;

private var currentNumber:int = 0;
public var goalNumber:int = 10;

private var penaltyNumber:int = 0;
var maxPenalty:int = 30;

private var topLimit:Number = 11.4;
private var bottomLimit:Number = 1;
private var alignedBottom:boolean = true;
private var startGravity:Number = 0;
private var checkpointLevel:int = 0;

function Start () {
	myRigidbody = this.GetComponent.<Rigidbody2D>();
	Application.targetFrameRate = 60;
	//this.GetComponent.<Rigidbody2D>().gravityScale = 0;
	startGravity = myRigidbody.gravityScale;
	penaltyMeterSlider.maxValue = maxPenalty;
	UpdateText();
}

function Update () {
	// Detects Mouse Click or Touch Screen Tap
	if (Input.GetMouseButtonDown(0)) {
		SwitchGravity();
	}
	
	// Run Forward
	Move(1);

}

function FixedUpdate() {
	//Magnetize();
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
	alignedBottom = !alignedBottom;	
	print("Switcheroo");
	// If NOT Paused, Siwtch Negate Gravity Scale
	if (Time.timeScale != 0) {
		myRigidbody.gravityScale *= -1;
		myRigidbody.AddForce(Vector3(0,-100*myRigidbody.gravityScale,0));
		
		// Flip
//		myRigidbody.rotation += 180;
		FlipCharacter();
		
	} else {
		//print("Paused");
	}
}

function FlipCharacter() {
	var dir = 1;
	if (myRigidbody.gravityScale < 0) {
		dir = -1;
	}
	var target = 18;
	
	for(var i = 0; i < target; i++) {
		myRigidbody.rotation += 10*dir;
		yield WaitForSeconds(0.00001);
	}
}

function Magnetize() {
	// Pull Down
		// Add Force
	var gravity:Number = 1000;
	var force:Number = 0;
	var playerY:Number = this.transform.position.y;
	var sourceY:Number = 0;
	
	
	if (alignedBottom) {
		sourceY = bottomLimit;
	} else {
		sourceY = topLimit;
	}
	
	var distance = sourceY - playerY;
	var dist2:Number = distance;
	
	if (dist2 > 0) {
		dist2*=dist2;
	} else {
		dist2*=-dist2;
	}
	
	if (dist2 == 0) {
		force = gravity;
	} else {
		force = (gravity/(dist2));
	}
	
	this.GetComponent.<Rigidbody2D>().AddForce(Vector2(0,force));
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
	UpdateText();
}

function UpdateText() {
	scoreText.text = currentNumber.ToString() + "/" + goalNumber.ToString();
	checkpointText.text = "Checkpoint #" + checkpointLevel.ToString();
}

function UpdateUI() {
	// Adjust Penalty Meter
		//AnimatePenaltyMeter();
	
}

function AnimatePenaltyMeter() {
	var difference = penaltyNumber - penaltyMeterSlider.value;
    for (var f = 0; f < difference; f ++) {
    	penaltyMeterSlider.value ++;
        yield;
    }
}
/// C H E C K P O I N T S

function ReachedCheckpoint() {
	// Increment Level
	checkpointLevel++;
	speed += 0.5;
	// Tally Penalties
	var difference:int = Mathf.Abs(currentNumber - goalNumber);
	penaltyNumber += difference;
	UpdateUI();
	
	// Check GameOver
	if (penaltyNumber >= maxPenalty) {
		//Game Over Menu Transition
		pauseMenu.GetComponent.<PauseMenu>().TransitionToMenu();
	}
	
	AnimatePenaltyMeter();
	
	// Create New Goal
	currentNumber = 0;
	goalNumber += 1;
	UpdateText();
}


