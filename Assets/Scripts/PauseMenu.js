#pragma strict
import UnityEngine.UI;
import Holoville.HOTween;
import Holoville.HOTween.Plugins;
import System.Collections.Hashtable;

var overlay:GameObject;
var screenOverlay:GameObject;
var bgoverlay:GameObject;
var menuCanvas:GameObject;
var gameoverCanvas:GameObject;
var goScore:UnityEngine.UI.Text;
var goCP:UnityEngine.UI.Text;
var goHighscore:UnityEngine.UI.Text;
var goButton:GameObject;
var indicatorText:GameObject;

public static var time = 0.01;
public static var overlayAlpha:Number = 1;
private var canvasRenderers = new Array();
private var gameoverRenderers = new Array();
public static var canvasAlpha:Number = 0;
private var highScore:int = 0;

function Start () {
	highScore = PlayerPrefs.GetInt("Highscore");
	
	for (var r in menuCanvas.GetComponentsInChildren.<CanvasRenderer>()) {
		r.SetAlpha(0);
		canvasRenderers.push(r);
	}
	
	for (var r in gameoverCanvas.GetComponentsInChildren.<CanvasRenderer>()) {
		r.SetAlpha(0);
		gameoverRenderers.push(r);
	}
	
	//gameoverCanvas.SetActive(false);
	
	//gameoverCanvas.active = false;
	

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
	
	
	var ht2 = new System.Collections.Hashtable();
	ht2.Add("from",0);
	ht2.Add("to",1);
	ht2.Add("delay",0.5);
	ht2.Add("easetype","spring");
	ht2.Add("onupdate","UpdateOverlay");
	ht2.Add("time",1.5);
	iTween.ValueTo(this.gameObject,ht2);
	
	StartIndicator();
	
}

function StartIndicator() {
	var ht3 = new System.Collections.Hashtable();
	ht3.Add("from",0);
	ht3.Add("to",1);
	ht3.Add("delay",1);
	ht3.Add("easetype","spring");
	ht3.Add("onupdate","");
	ht3.Add("oncomplete","HideIndicator");
	ht3.Add("onstart","ShowIndicator");
	ht3.Add("time",2.5);
	iTween.ValueTo(this.gameObject,ht3);
}

private function ShowIndicator() {
	var playerScript = GameObject.FindGameObjectWithTag("Player").GetComponent.<NewPlayerControl>();
	indicatorText.SetActive(true);
	indicatorText.GetComponent.<UnityEngine.UI.Text>().text = "Wormhole #" + (playerScript.checkpointLevel +1).ToString();
	for (var t : Transform in indicatorText.transform) {
		t.gameObject.GetComponent.<UnityEngine.UI.Text>().text = "Get to " + playerScript.goalNumber.ToString();
	}
	//indicatorText.GetComponentInChildren.<UnityEngine.UI.Text>().text = "Get to " + playerScript.goalNumber.ToString();
	
}

private function HideIndicator() {
	indicatorText.SetActive(false);
}


private function UpdateCanvasAlpha (val:Number) {
	for (var r in this.canvasRenderers) {
		(r as CanvasRenderer).SetAlpha(val);
	}
}

private function UpdateOverlay (val:Number) {
	bgoverlay.GetComponent.<SpriteRenderer>().color.a = 1-val;
	//print("Alpha:  " + bgoverlay.GetComponent.<SpriteRenderer>().color.a);
	if (1-val < 0.05) {
		bgoverlay.SetActive(false);
	}
}

private function UpdateGameOverAlpha (val:Number) {
	for (var r in this.gameoverRenderers) {
		(r as CanvasRenderer).SetAlpha(val);	
	}
//	goButton.SetAlpha(0);
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
		iTween.Resume();
		//((overlay as GameObject).GetComponent.<Image>() as UnityEngine.UI.Image).color.a = 0;
	} else {
		Time.timeScale = 0;
		overlay.active = true;
		iTween.Pause();
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
	screenOverlay.GetComponent.<CanvasRenderer>().SetAlpha(1);
	(screenOverlay.GetComponent.<Image>() as UnityEngine.UI.Image).enabled = true;
	(screenOverlay.GetComponent.<Image>() as UnityEngine.UI.Image).color.a = 0;
	
	for (var f = 0; f < 20; f ++) {
    	(screenOverlay.GetComponent.<Image>() as UnityEngine.UI.Image).color.a += 0.05;
        yield;
    }
    Application.LoadLevel("MainMenu");
}

public function GameOver(score:int,cp:int) {
	print(score);
	print(cp);
	
	goHighscore.text = highScore.ToString();
	//gameoverCanvas.SetActive(true);
	//Time.timeScale = 0;
	//goButton.SetAlpha(0);
	
	
	print("A");
	
	var ht0 = new System.Collections.Hashtable();
	ht0.Add("from",1);
	ht0.Add("to",0);
	ht0.Add("delay",0);
	ht0.Add("easetype","spring");
	ht0.Add("onupdate","UpdateCanvasAlpha");
	ht0.Add("time",0.1);
	iTween.ValueTo(this.gameObject,ht0);
	
	print("B");
	//HOTween.To(this,0.3,new TweenParms().Prop("time",0).Ease(EaseType.EaseOutQuad).OnUpdate(ChangeTime).UpdateType(UpdateType.Update));
	var ht = new System.Collections.Hashtable();
	ht.Add("from",0);
	ht.Add("to",1);
	ht.Add("delay",0.1);
	ht.Add("easetype","spring");
	ht.Add("onupdate","UpdateGameOverAlpha");
	ht.Add("time",0.5);
	iTween.ValueTo(this.gameObject,ht);
	
	print("C");
	// Animate Checkpoint Num
	var ht2 = new System.Collections.Hashtable();
	ht2.Add("from",0);
	ht2.Add("to",cp);
	ht2.Add("delay",0.6);
	ht2.Add("easetype","easeOutQuad");
	ht2.Add("onupdate","UpdateCP");
	ht2.Add("time",0.3);
	iTween.ValueTo(this.gameObject,ht2);
	
	print("D");
	// Animate Score Num
	var ht3 = new System.Collections.Hashtable();
	ht3.Add("from",0);
	ht3.Add("to",score);
	ht3.Add("delay",1.1);
	ht3.Add("easetype","easeOutQuad");
	ht3.Add("onupdate","UpdateScore");
	ht3.Add("time",0.3);
	iTween.ValueTo(this.gameObject,ht3);
	
	print("E");
	// Animate Highscore Num
	var ht4 = new System.Collections.Hashtable();
	ht4.Add("from",highScore*1.0);
	ht4.Add("to",PlayerPrefs.GetInt("Highscore")*1.0);
	ht4.Add("delay",2.1);
	ht4.Add("easetype","easeOutQuad");
	ht4.Add("onupdate","UpdateHighscore");
	ht4.Add("time",0.3);
	iTween.ValueTo(this.gameObject,ht4);
	
	print("F");
	// Animate Continue
	var ht5 = new System.Collections.Hashtable();
	ht5.Add("from",0.0);
	ht5.Add("to",1.0);
	ht5.Add("delay",2.4);
	ht5.Add("onupdate","UpdateNothing");
	ht5.Add("oncomplete","UpdateButton");
	ht5.Add("time",0.3);
	iTween.ValueTo(this.gameObject,ht5);
	
	print("G");
}

public function click(){
	TransitionToMenu();
}

private function UpdateNothing(val:float) {
}

private function UpdateCP(val:Number){
	goCP.text = "#" + Mathf.RoundToInt(val).ToString();
}

private function UpdateScore(val:Number){
	goScore.text = Mathf.RoundToInt(val).ToString();
}

private function UpdateHighscore(val:float){
	goHighscore.text = Mathf.RoundToInt(val).ToString();
}

private function UpdateButton(){
	print("Update de button");
	goButton.SetActive(true);
	overlay.SetActive(false);
	GameObject.Find("Clicker").SetActive(false);
	GameObject.Find("UI_Canvas").SetActive(false);
	//goButton.SetAlpha(val);
}