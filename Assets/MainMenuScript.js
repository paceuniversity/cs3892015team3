#pragma strict
import System.Collections.Hashtable;
import UnityEngine.Canvas;
import UnityEngine.CanvasRenderer;
import Holoville.HOTween;
//import Pixelplacement.iTween;

var overlay:GameObject;
var menuCanvas:UnityEngine.Canvas;
var canvasRenderers = new Array();
var scoreText:UnityEngine.UI.Text;
var characterImage:UnityEngine.UI.Image;
var characterSprites:UnityEngine.Sprite[];
public static var canvasAlpha:Number = 1;
private var selectedCharacter:int = 0;
private var sound:boolean = true;
var tracks:Transform[];

function Start () {
	GetData();
	
	scoreText.text = PlayerPrefs.GetInt("Highscore").ToString();
	selectedCharacter = PlayerPrefs.GetInt("Character");
	characterImage.sprite = characterSprites[selectedCharacter];
	///////////////////
	
	Time.timeScale = 1;
	canvasAlpha = 1;
	for (var r in menuCanvas.GetComponentsInChildren.<CanvasRenderer>()) {
		canvasRenderers.push(r);
	}

	(overlay.GetComponent.<Image>() as UnityEngine.UI.Image).enabled = true;
	(overlay.GetComponent.<Image>() as UnityEngine.UI.Image).color.a = 1;
	for (var f = 0; f < 20; f ++) {
    	(overlay.GetComponent.<Image>() as UnityEngine.UI.Image).color.a -= 0.05;
        yield;
    }
    (overlay.GetComponent.<Image>() as UnityEngine.UI.Image).enabled = false;
    
}

function GetData() {
	if (!PlayerPrefs.HasKey("Highscore") ) {
		PlayerPrefs.SetInt("Highscore",0);
	}
	if (!PlayerPrefs.HasKey("Sound") ) {
		PlayerPrefs.SetInt("Sound",1);
	}
	if (!PlayerPrefs.HasKey("Character") ) {
		PlayerPrefs.SetInt("Character",0);
	}
}

function begin () {
	print("begin");
	StartTransition();
}

function StartTransition () {
	print(canvasAlpha);
	var ht = new System.Collections.Hashtable();
	ht.Add("from",1.0);
	ht.Add("to",0.0);
	ht.Add("onupdate","UpdateAlpha");
	ht.Add("oncomplete","StartGame");
	ht.Add("time",0.5);
	ht.Add("easetype","spring");
	
	iTween.ValueTo(this.gameObject,ht);
	//var tween = HOTween.To(this,0.5,new TweenParms().Prop("canvasAlpha", 0).Ease(EaseType.EaseOutQuad).OnUpdate(UpdateAlpha).OnComplete(StartGame).AutoKill(true));    
	//tween.Play();
}

public function NextCharacter() {
	ChangeCharacter(1);
}
public function PreviousCharacter() {
	ChangeCharacter(-1);
}
public function ChangeCharacter (dir:int) {
	selectedCharacter += dir;
	
	if (selectedCharacter < 0) {
		selectedCharacter = 1;
	}
	if (selectedCharacter > 1) {
		selectedCharacter = 0;
	}
	
	PlayerPrefs.SetInt("Character",selectedCharacter);
	characterImage.sprite = characterSprites[selectedCharacter];
}


private function UpdateAlpha (val:Number) {
	
	for (var r in this.canvasRenderers) {
		(r as CanvasRenderer).SetAlpha(val);
	}
	for (var t in this.tracks) {
		t.localPosition.y = 12 - (2 - (val*2));
	}
}

private function StartGame () {
	print("startgame");
	Application.LoadLevel("GravityScene");
}
