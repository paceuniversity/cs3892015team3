#pragma strict
import UnityEngine.UI;

var overlay:GameObject;
var screenOverlay:GameObject;

function Start () {
	//Pause();
	(screenOverlay.GetComponent.<Image>() as UnityEngine.UI.Image).enabled = true;
	(screenOverlay.GetComponent.<Image>() as UnityEngine.UI.Image).color.a = 1;
	for (var f = 0; f < 10; f ++) {
    	(screenOverlay.GetComponent.<Image>() as UnityEngine.UI.Image).color.a -= 0.1;
        yield;
    }
    (screenOverlay.GetComponent.<Image>() as UnityEngine.UI.Image).enabled = false;
    //Pause();
}

function Update () {

}

function Pause() {	
	if (Time.timeScale == 0) {
		Time.timeScale = 1;
		((overlay as GameObject).GetComponent.<Image>() as UnityEngine.UI.Image).color.a = 0;
	} else {
		Time.timeScale = 0;
		((overlay as GameObject).GetComponent.<Image>() as UnityEngine.UI.Image).color.a = 0.5;
	}
}

function TransitionToMenu () {
	
	for (var w = 0; w < 15; w ++) {
    	// Wait
        yield;
    }
	
	(screenOverlay.GetComponent.<Image>() as UnityEngine.UI.Image).enabled = true;
	(screenOverlay.GetComponent.<Image>() as UnityEngine.UI.Image).color.a = 0;
	
	Pause();
	
	for (var f = 0; f < 20; f ++) {
    	(screenOverlay.GetComponent.<Image>() as UnityEngine.UI.Image).color.a += 0.05;
        yield;
    }
    Application.LoadLevel("MainMenu");
}