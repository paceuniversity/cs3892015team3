#pragma strict

var speed:Number = 10;
var jumps:Number = 2;
var jumpHeight:Number = 1;
private var jumpCount:Number = 0;
public var currentNumber:Number = 0;

function Start () {
	score.text = "0/15";
	//both numbers (numerator and denominator) should reset after each checkpoint
}

function Update () {
	// Detects Mouse Click or Touch Screen Tap
	if (Input.GetMouseButtonDown(0)) {
		print("TAPPED");
		// Jump Detection Will Need to be Modified when we add a Pause Button or other Clickable Elements to the screen
		Jump();
	}
	
	// Bad & Hacky Way to Check if Player Has Landed on a Platform
	// Checks if player's y-velocity is 0
	if ( Mathf.Abs(GetVelocity().y) < 1) {
		LandedOnPlatform();
	}
	
	// Run Forward
	Move(1);
}

function Move(direction:Number) {
	// Move Character at Constant Speed
	
	(this.GetComponent.<Rigidbody2D>() as Rigidbody2D).velocity.x = speed * direction;
}

function Jump() {
	// If Maxed Out Amount of Jumps, Do Nothing, Can't Jump.
	if (jumpCount >= jumps-1) {
		return;
	}
	// Checks if Falling Down. Can't Jump if Falling
	if (GetVelocity().y < 0) {
		return;
	} 
	Animate("jump");
	// Else:
	// Increment Jump Counter
	jumpCount ++;
	// Make Player Jump
	this.GetComponent.<Rigidbody2D>().AddForce(Vector2(0,200*jumpHeight));
}

function LandedOnPlatform() {
	// Reset Jumps
	jumpCount = 0;
	// Play the Running Animation
	Animate("run");
}

function GetVelocity():Vector2 {
	// Shortcut Function
	return (this.GetComponent(Rigidbody2D) as Rigidbody2D).velocity;
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
	print(currentNumber);
}

//changed Start function up top
private var points : int = 0;
var score : GUIText;
//need to copy and paste Goal_Text from UI onto the script of the character

function AcquireAtom(col : Collision) {
	if(col.collider.name == "Atom") {
		Destroy(col.gameObject);
		//points += val.gameObject;
		score.text = points + "/15";
	}
}
