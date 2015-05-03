#pragma strict

function Start () {

}

function Update () {

}

function Refresh(lvl:int) {

}

function OnTriggerEnter2D ( other : Collider2D) {
	print("s");
	if (other.gameObject.tag == "Player") {
		other.gameObject.GetComponent.<NewPlayerControl>().Hit(this.transform.position);
	}
}