#pragma strict

private var playerX:float = 0;
private var currentTrackNum:String = "1";
private var currentTrack:GameObject;
private var behindTrack:GameObject;
var player:GameObject;

function Start () {
	SetTrack();
	//print(GameObject.Find("Track1").transform.position.x);
	//print(GameObject.Find("Track2").transform.position.x);
}

function Update () {
	playerX = player.transform.position.x;

	if (playerX >= currentTrack.transform.position.x - 2) {
		Layout(true);
	}
}

function RefreshTracks() {
	currentTrack.GetComponent.<TrackScript>().OnTrackSwitch();
	behindTrack.GetComponent.<TrackScript>().OnTrackSwitch();
}

function Layout (forward:boolean) {
	var currentTrackSize:Number = 63;//(currentTrack.GetComponentInChildren.<Collider2D>() as BoxCollider2D).bounds.size.x;
	var behindTrackSize:Number = 63;//(behindTrack.GetComponentInChildren.<Collider2D>() as BoxCollider2D).bounds.size.x;
	
	// Whichever track is Behind, Gets put in front of the frontmost track
	if (currentTrackNum == "1") {
		behindTrack = GameObject.Find("Track2");
	} else {
		behindTrack = GameObject.Find("Track1");
	}
	
	for (var i in behindTrack.GetComponentsInChildren.<CollectableNumber>()) {
		i.Activate();
	}
	
	
	if (forward) {
		behindTrack.transform.position.x = currentTrack.transform.position.x + currentTrackSize*0.5 + behindTrackSize*0.5 -1;
	} else {
		currentTrack.transform.position.x = behindTrack.transform.position.x - currentTrackSize*0.5 - behindTrackSize*0.5 -1;
	}
	// This gets called once Player is 0.5 the width of the current track
	
	// After Layout, Current Track Alternates
	SwitchTrack();
}

function SetTrack () {
	currentTrack = GameObject.Find("Track"+currentTrackNum);
	if (currentTrackNum == "1") {
		behindTrack = GameObject.Find("Track2");
	} else {
		behindTrack = GameObject.Find("Track1");
	}
}

function SwitchTrack () {
	print("Switchin Tracks");
	if (currentTrackNum == "1") {
		currentTrackNum = "2";
	} else {
		currentTrackNum = "1";
	}
	SetTrack();
}