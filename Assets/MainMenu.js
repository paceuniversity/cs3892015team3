#pragma strict

var overlay:GameObject;

// Unity Functions
function Start () {
}
function Update () {
} 

//Custom Functions
//function GoToLevel () {
//	// Load the level.
//	var async : AsyncOperation = Application.LoadLevelAsync ("GravityScene");
//	yield async;
//	Debug.Log ("Loading complete");
//}

function begingame(){
	print("begin");
	 //Load the level.
//		var async : AsyncOperation = Application.LoadLevelAsync ("GravityScene");
//		yield async;
//		Debug.Log ("Loading complete");
	//overlay.active = true;
	for (var i = 0; i < 10; i++) {
		(overlay.GetComponent.<Image>() as UnityEngine.UI.Image).color.a = ((10-i)/10);
		yield WaitForEndOfFrame ();
	}

	//Application.LoadLevel ("GravityScene");

}