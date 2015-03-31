#pragma strict
import System.Collections.Generic;
//import System.Array.Copy;
var includeCollectables:boolean;
var includePlatforms:boolean;
var groundPrefab:GameObject;
var platformPrefab:GameObject;
var collectablePrefab:GameObject;
var checkpointPrefab:GameObject;
var parent:GameObject;
private var currentBlockNumber:Number = 0;
private var currentBlockX:Number = 0;

var tempgrid = createEmptyGrid();

function Start () {

	for (var i = 0; i < 8; i++) {
		CreateBlock();
		currentBlockNumber++;
	}
	
}

function Update () {

}

function CreateBlock () {
	if (currentBlockNumber > 3) {
		currentBlockNumber = 0;
	}
	
	var grid = createEmptyGrid();
	var type = currentBlockNumber;

	
	tempgrid = createEmptyGrid();
	
	var platformRange = [grid.Length-3,grid.Length-6];
	var platformSpacing = 1;
			
	if (type == 0) {
		//Create Ground
			for (var i0 = 0; i0 < grid[grid.length-1].length; i0++) {
				grid[grid.length-1][i0] = "G";
			}
	}
	if (type == 1 || type == 2) {
			//Create Ground
			for (var i12 = 0; i12 < grid[grid.length-1].length; i12++) {
				grid[grid.length-1][i12] = "G";
			}
			//Create Platforms
			// Loop Column
			if (includePlatforms) {
				for (var c1 = platformRange[1]; c1 <= platformRange[0]; c1++) {
					// Loop Row
					for (var r1 = 0; r1 < grid[0].length; r1++) {
						if (RandomBool()) {
							grid[c1][r1] = "P";
						}
					}
				}
			}
			// Create Collectables
			if (includeCollectables) {
				for (var c2 = 0; c2 <= grid.Length-2; c2++) {
					// Loop Row
					for (var r2 = 0; r2 < grid[0].length; r2++) {
						if (grid[c2][r2] == " " && RandomBool()){
							grid[c2][r2] = "C";
						}
					}
				}
			}
	}
	if (type == 3) {
		print("CHECKPOINT");
			//Create Ground
			for (var i3 = 0; i3 < grid[grid.length-1].length; i3++) {
				grid[grid.length-1][i3] = "G";
			}
			//Create Platforms
			if (includePlatforms) {
				// Loop Column
				for (var c4 = platformRange[1]; c4 <= platformRange[0]; c4++) {
					// Loop Row
					for (var r4 = 0; r4 < grid[grid.length-1].length-5; r4++) {
						if (RandomBool()) {
							grid[c4][r4] = "P";
						}
					}
				}
			}
			// Create Collectables
			if (includeCollectables) {
				for (var c5 = 0; c5 <= grid.Length-2; c5++) {
					// Loop Row
					for (var r5 = 0; r5 < grid[grid.length-1].length-5; r5++) {
						if (grid[c5][r5] == " " && RandomBool()){
							grid[c5][r5] = "C";
						}
					}
				}
			}
			// Create Checkpoint at Last Point in Grid at y='1'
			grid[grid.length-2][grid[0].length-1] = "X";
	}
	
	System.Array.Copy(grid,tempgrid,grid.Length);
	GenerateBlock();
	
}

function GenerateBlock () {
	var grid = createEmptyGrid();
	var startX = currentBlockX;
	
	System.Array.Copy(tempgrid,grid,tempgrid.Length);
	// Loop Column
	for (var c = 0; c < grid.length; c++) {
		// Loop Row
		for (var r = 0; r < grid[0].length; r++) {
			var item:String = grid[c][r];
			
			if (item == "G") {
				var gObj = GameObject.Instantiate(groundPrefab);
				gObj.transform.parent = parent.transform;
				gObj.transform.localPosition = Vector3(r + startX,-c,0);
			} else if (item == "P") {
				var pObj = GameObject.Instantiate(platformPrefab);
				pObj.transform.parent = parent.transform;
				pObj.transform.localPosition = Vector3(r + startX,-c,0);
			} else if (item == "C") {
				var cObj = GameObject.Instantiate(collectablePrefab);
				cObj.transform.parent = parent.transform;
				cObj.transform.localPosition = Vector3(r + startX,-c,0);
			} else if (item == "X") {
				var xObj = GameObject.Instantiate(checkpointPrefab);
				xObj.transform.parent = parent.transform;
				xObj.transform.localPosition = Vector3(r + startX,-c,0);
			}
		}
	}
	currentBlockX += grid[0].length;
}

function RandomBool():boolean {
	return (Mathf.RoundToInt(Random.value) == 0);
}

function createEmptyGrid() {
	return [
[" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "],
[" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "],
[" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "],
[" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "],
[" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "],
[" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "]
];
}