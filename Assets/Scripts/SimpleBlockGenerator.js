#pragma strict

var prefab:GameObject;
var parent:GameObject;

private var gridX:Number = 1;
private var gridY:Number = 1;
private var spacing:Number = 0.1;
var terrainArray =
[[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
 [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
 [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
 [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
 [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

function Start () {
	CreateRandomPlacements();
	GenerateFromArray();
	prefab.SetActive(false);
	Reset();
}

function Update () {
	if (Input.GetMouseButtonDown(0)) {
		Reset();
	}
}

function Reset() {
	//Destroy EVERYTHING
	for(var child:Transform in parent.transform) {
		GameObject.Destroy(child.gameObject);
	}
	CreateRandomPlacements();
	prefab.SetActive(true);
	GenerateFromArray();
	prefab.SetActive(false);
}

function CreateRandomPlacements() {
	for (var row in terrainArray) {
		for (var c in (row as int[])) {
			c = Random.Range(0,3);
		}
	}
}

function GenerateFromArray() {
	//Loop Array
	// Instantiate
	var startX:Number = 0;
	var startY:Number = gridY* terrainArray.length;
	var currentX:Number = 0;
	var currentY:Number = startY;
	
	for(var row = 0; row < terrainArray.length; row ++) {
		currentX = startX;
		for (var i = 0; i < (terrainArray[row] as int[]).length; i ++) {
			
			if ((terrainArray[row] as int[])[i] != 0) {
				var item = GameObject.Instantiate(prefab);
				item.transform.SetParent(parent.transform);
				item.transform.localPosition = Vector3(currentX,currentY,0);
				if ((terrainArray[row] as int[])[i] == 2) {
					item.transform.localScale.y *= 0.5;	
					item.transform.localPosition.y -= item.transform.localScale.y*0.5;
				}
			}
			
			currentX += gridX + spacing;
		}
		currentY -= gridY + spacing;
	}

}