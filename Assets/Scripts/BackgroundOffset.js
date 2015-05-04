#pragma strict

var target:GameObject;
var ratio:Number = 50;

function Start () {
	
}

function LateUpdate () {
	SetOffset();
}

function SetOffset() {
	var yOffset:Number = 0;//( (target.transform.position.y % ratio) / ratio );
	var xOffset:Number = ( (target.transform.position.x) / (ratio*2) ) *0.3;
	var offset:Vector2 = new Vector2(xOffset, yOffset);
    this.GetComponent.<Renderer>().sharedMaterial.SetTextureOffset ("_MainTex", offset);
//    print("Offset  " + xOffset);
}