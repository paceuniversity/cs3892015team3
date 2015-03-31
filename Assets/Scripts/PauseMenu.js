#pragma strict
import UnityEngine.UI;

var overlay:GameObject;

function Start () {

}

function Update () {

}

function Pause() {
//	var colorA:UnityEngine.Color;
//	var colorB:UnityEngine.Color;
//	colorA = ((overlay as GameObject).GetComponent.<Image>() as UnityEngine.UI.Image).color;
//	colorB = ((overlay as GameObject).GetComponent.<Image>() as UnityEngine.UI.Image).color;
//	colorB.a = 0.5;
	
	if (Time.timeScale == 0) {
		Time.timeScale = 1;
		((overlay as GameObject).GetComponent.<Image>() as UnityEngine.UI.Image).color.a = 0;
	} else {
		Time.timeScale = 0;
		((overlay as GameObject).GetComponent.<Image>() as UnityEngine.UI.Image).color.a = 0.5;
	}
}