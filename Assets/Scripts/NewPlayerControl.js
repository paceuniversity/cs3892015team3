#pragma strict
import UnityEngine.UI;
import Holoville.HOTween;
import Holoville.HOTween.Plugins;

var speed:Number = 10;
var scoreText:UnityEngine.UI.Text;
var checkpointText:UnityEngine.UI.Text;
var penaltyMeterSlider:UnityEngine.UI.Slider;
var pauseMenu:GameObject;
var sprites:UnityEngine.Sprite[];
private var tempScore:int = 0;
public static var myRigidbody:Rigidbody2D;

private var currentNumber:int = 0;
public var goalNumber:int = 10;

private var penaltyNumber:int = 0;
private var maxPenalty:int = 20;

private var topLimit:Number = 11.4;
private var bottomLimit:Number = 1;
private var alignedBottom:boolean = true;
private var startGravity:Number = 0;
private var checkpointLevel:int = 0;
private var tempGravity:Number=0;
private var moving:boolean = true;

function Start () {
	GetComponent.<SpriteRenderer>().sprite = sprites[PlayerPrefs.GetInt("Character")];
	
	myRigidbody = this.GetComponent.<Rigidbody2D>();
	Application.targetFrameRate = 60;
	//this.GetComponent.<Rigidbody2D>().gravityScale = 0;
	startGravity = myRigidbody.gravityScale;
	penaltyMeterSlider.maxValue = maxPenalty;
	UpdateText();
}

function tester(){
	print("click?");
}

function Update () {
	// Detects Mouse Click or Touch Screen Tap
	if (Input.GetMouseButtonDown(0)) {
		//SwitchGravity();
	}
	
	// Run Forward
	Move(1);

}

function FixedUpdate() {
	//Magnetize();
}

function Move(direction:Number) {
	// Move Character at Constant Speed
	if (moving) {
		myRigidbody.velocity.x = speed*direction;
	}
	//(this.GetComponent.<Rigidbody2D>() as Rigidbody2D).velocity.x = speed * direction;
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
	var target = 0;
	if (myRigidbody.gravityScale < 0) {
		target = -180;
	}
	
	var ht = System.Collections.Hashtable();
	ht.Add("from",myRigidbody.rotation);
	ht.Add("to",target);
	ht.Add("time",0.6);
	ht.Add("easetype","easeOutQuad");
	ht.Add("onupdate","UpdateRotation");
	iTween.ValueTo(this.gameObject,ht);
	//HOTween.To(myRigidbody,0.4,new TweenParms().Prop("rotation", target).Ease(EaseType.EaseInQuad));
}

function UpdateRotation(val:Number) {
	myRigidbody.rotation = val;
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
    // Check GameOver
	if (penaltyNumber >= maxPenalty) {
		//Game Over Menu Transition
		if (tempScore > PlayerPrefs.GetInt("Highscore")){
			PlayerPrefs.SetInt("Highscore",tempScore);
		}
		this.moving = false;
		pauseMenu.GetComponent.<PauseMenu>().GameOver(tempScore,checkpointLevel);
	}
}
/// C H E C K P O I N T S

var cP:Transform;
function PullIntoCheckpoint(cp:Transform) {
	ReachedCheckpoint();
	return;

//	this.cP = cp;
//	this.tempGravity = myRigidbody.gravityScale;
//	myRigidbody.gravityScale = 0;
//	//myRigidbody.velocity = Vector3.zero;
//	
//	this.moving = false;
//	
//	var ht = new System.Collections.Hashtable();
//	ht.Add("time", 0.3);
//	ht.Add("from",0);
//	ht.Add("to",1);
//	ht.Add("easetype","easeInQuad");
//	ht.Add("onupdate","UpdatePull");
//	ht.Add("oncomplete","ReachedCheckpoint");
//	iTween.ValueTo(this.gameObject,ht);
//	 //ReachedCheckpoint();
}

function UpdatePull() {
	var xForce = this.cP.position.x-myRigidbody.transform.position.x;
	var yForce = this.cP.transform.position.y - myRigidbody.transform.position.y;
	myRigidbody.AddForce(Vector2(xForce*10,yForce*18));
}

function ReachedCheckpoint() {

	this.moving = true;

	//myRigidbody.gravityScale = this.tempGravity;
	//myRigidbody.AddForce(Vector2(100,0));
	// Increment Level
	checkpointLevel++;
	speed += 0.5;
	// Tally Penalties
	var difference:int = Mathf.Abs(currentNumber - goalNumber);
	penaltyNumber += difference;
	UpdateUI();
	
	AnimatePenaltyMeter();
	
	tempScore += goalNumber - difference;
	
	// Create New Goal
	currentNumber = 0;
	goalNumber += 1;
	UpdateText();
}


// O B S T A C L E S 

function Hit(pos:Vector3) {
	var direction:Number;
	
	if (pos.y < myRigidbody.transform.position.y) {
		direction = -1;
	} else {
		direction = 1;
	}

	penaltyNumber += 2;
	AnimatePenaltyMeter();
	
	myRigidbody.velocity.y = 0;
	myRigidbody.AddForce(Vector2(0,direction * 500));
}


