#pragma strict
import UnityEngine.UI;
import Holoville.HOTween;
import Holoville.HOTween.Plugins;
import System.Collections.Hashtable;

var overlay:GameObject;
var screenOverlay:GameObject;
var menuCanvas:GameObject;
public static var time = 0.01;
public static var overlayAlpha:Number = 1;
private var canvasRenderers = new Array();
public static var canvasAlpha:Number = 0;

function Start () {

	for (var r in menuCanvas.GetComponentsInChildren.<CanvasRenderer>()) {
		r.SetAlpha(0);
		canvasRenderers.push(r);
	}
	print(canvasRenderers.length);

	Time.timeScale = 0.01;
	
	(screenOverlay.GetComponent.<Image>() as UnityEngine.UI.Image).enabled = true;
	(screenOverlay.GetComponent.<Image>() as UnityEngine.UI.Image).color.a = 1;
	
	
	var ht = new System.Collections.Hashtable();
	ht.Add("from",0);
	ht.Add("to",1);
	ht.Add("delay",1.8);
	ht.Add("easetype","spring");
	ht.Add("onupdate","UpdateCanvasAlpha");
	ht.Add("time",0.6);
	iTween.ValueTo(this.gameObject,ht);
	HOTween.To(this,0.5,new TweenParms().Prop("time",1).Ease(EaseType.EaseOutQuad).OnUpdate(ChangeTime).UpdateType(UpdateType.Update));
	
}

private function UpdateCanvasAlpha (val:Number) {
	for (var r in this.canvasRenderers) {
		(r as CanvasRenderer).SetAlpha(val);
		
	}
}

function OnApplicationPause(pauseStatus: boolean) {
	if (pauseStatus) {
		if (Time.timeScale != 0) {
			Pause();
		}
	}
}

private function ChangeTime () {
	Time.timeScale = time;
}
private function ChangeOverlay () {
	print(overlayAlpha);
	(screenOverlay.GetComponent.<Image>() as UnityEngine.UI.Image).color.a = overlayAlpha;
}
private function RemoveOverlay () {
	(screenOverlay.GetComponent.<Image>() as UnityEngine.UI.Image).enabled = false;
}

function Update () {

}

function Pause() {	
	if (Time.timeScale == 0) {
		Time.timeScale = 1;
		overlay.active = false;
		//((overlay as GameObject).GetComponent.<Image>() as UnityEngine.UI.Image).color.a = 0;
	} else {
		Time.timeScale = 0;
		overlay.active = true;
		iTween.FadeTo(overlay,0,2);
		//iTween.FadeTo(overlay,1,0.5);
		//((overlay as GameObject).GetComponent.<Image>() as UnityEngine.UI.Image).color.a = 0.5;
	}
}

function Quit() {
	TransitionToMenu();
}

public function TransitionToMenu() {
	screenOverlay.active = true;
	(screenOverlay.GetComponent.<Image>() as UnityEngine.UI.Image).enabled = true;
	(screenOverlay.GetComponent.<Image>() as UnityEngine.UI.Image).color.a = 0;
	
	for (var f = 0; f < 20; f ++) {
    	(screenOverlay.GetComponent.<Image>() as UnityEngine.UI.Image).color.a += 0.05;
        yield;
    }
    Application.LoadLevel("MainMenu");
}