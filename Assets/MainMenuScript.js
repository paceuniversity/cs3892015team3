#pragma strict

var overlay:GameObject;

function Start () {
	(overlay.GetComponent.<Image>() as UnityEngine.UI.Image).enabled = true;
	(overlay.GetComponent.<Image>() as UnityEngine.UI.Image).color.a = 1;
	for (var f = 0; f < 20; f ++) {
    	(overlay.GetComponent.<Image>() as UnityEngine.UI.Image).color.a -= 0.05;
        yield;
    }
    (overlay.GetComponent.<Image>() as UnityEngine.UI.Image).enabled = false;
}

function begin () {
	StartTransition();
}

function StartTransition () {
	(overlay.GetComponent.<Image>() as UnityEngine.UI.Image).enabled = true;
	for (var f = 0; f < 20; f ++) {
    	(overlay.GetComponent.<Image>() as UnityEngine.UI.Image).color.a += 0.05;
        yield;
    }
    Application.LoadLevel("GravityScene");
}