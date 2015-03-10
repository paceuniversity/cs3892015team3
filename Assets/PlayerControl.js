#pragma strict

function Start () {

}

function Update () {

	if (Input.GetMouseButtonDown(0)) {
		Jump();
	}
	
	
}

function Jump() {
	//Make it Jump
	this.rigidbody.AddForce(Vector3(0,400,0));
}