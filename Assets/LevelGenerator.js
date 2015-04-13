#pragma strict
import System.Collections.Generic.List;
import System.Collections.ArrayList;

private var objectTypes = 
/*Platforms*/ 	[	["Static","Static_Ground"],
/*Obstacles*/		["Static","Static_Ground","Moving_Horizontally","Moving_Vertically"],
/*Collectables*/	["Number","Mystery"]	
				];
// Grid
private var gridSize:Vector2 = Vector2(10,5);
private var grid:int[,] = new int[gridSize.x,gridSize.y];

// Prefabs
var prefabs:GameObject[];

// Object Arrays
private var availableObjects:ArrayList = new ArrayList();
availableObjects.Add(new ArrayList());
availableObjects.Add(new ArrayList());
availableObjects.Add(new ArrayList());
private var maxObjects:int[] = [5,2,5];

// U n i t y   F u n c t i o n s

function Start () {
	MakeGrid();
}
function Update () {
	if (Input.GetMouseButton(0)) {
		MakeGrid();
	}
}

// C u s t o m   F u n c t i o n s

function ClearGrid() {
	for (var x = 0; x < gridSize.x; x++) {
		for (var y = 0; y < gridSize.y; y++) {
			grid[x,y] = 0;
		}
	}
}

function DequeueObject(type:Number):GameObject {
	
	// Check Invalid Type
	if (type == 0 || type > availableObjects.Count) {
		return;
	}
	
	type -= 1;
	
	if ((availableObjects[type] as ArrayList).Count  < maxObjects[type]) {
	// If Array Isn't Full
		// Instantiate
		var newItem = GameObject.Instantiate(prefabs[type]);
		// Add to Array
		(availableObjects[type] as ArrayList).Add(newItem);
		// Return
		return newItem;
	} else {
	// If Array IS Full
		//Move Item to Back of Array
		var item = (availableObjects[type] as ArrayList)[0] as GameObject;
		(availableObjects[type] as ArrayList).RemoveAt(0);
		(availableObjects[type] as ArrayList).Add(item);
		//Return
		return item;
	}
}

function InstantiateGrid() {
	for (var x = 0; x < gridSize.x; x++) {
		for (var y = 0; y < gridSize.y; y++) {
			// Get Type of Int in Grid Cell & Divide by 10 for Convenience
			var type = (grid[x,y]/10);
			
			if (type != 0) {
				// 'Create' the object
				var item = DequeueObject(type);
				// Set Its Position & 'Restart' It
				item.transform.parent = this.transform;
				item.transform.localPosition = Vector3(-x,-y,0);
			}
		}
	}
}

function MakeGrid() {
	// Clear Temporary Grid
	ClearGrid();
	
	// Loop Types
	for(var t = 0;t<objectTypes.length;t++){
		// Loop Column
		for(var c = 0;c < gridSize.x;c++){
			// Loop Row
			for(var r = 0;r < gridSize.y;r++){
				Try(t,Vector2(c,r));
			}
		}
	}
	
	// Create Objects
	InstantiateGrid();
	
	// Print Grid
	//print(grid);
}

function RandomBool(chance:Number):boolean {
	return (Random.Range(0,chance+1) == 0);
}

function Try(type:Number,cell:Vector2){
	// Check if Cell is Already Full
	if (grid[cell.x,cell.y] != 0) {
		return;
	}
	
	// Rules & Creation
	if (type == 0) {
		// P l a t f o r m
		
		// Random Decide if to Try to Place the Object
		if (!RandomBool(10)) {
			return;
		}		
		
		// Rules
		if (cell.y == 0 || cell.y == gridSize.y-1) {
			return;
		}
		
		print("Platform at: " + cell);
		// Placement
		grid[cell.x,cell.y] = 10;
						
	} else if (type == 1) {
		// O b s t a c l e
		
		// Random Decide if to Try to Place the Object
		if (!RandomBool(30)) {
			return;
		}		
		
		// Rules
		if (cell.y != 0 && cell.y != gridSize.y-1) {
			// If not a Ground Cell, Don't Make
			return;
		}
		
		// Placement
		grid[cell.x,cell.y] = 20;	
	} else if (type == 2) {
		// C o l l e c t a b l e s
		
		// Random Decide if to Try to Place the Object
		if (!RandomBool(8)) {
			return;
		}		
		
		// Rules
		
		
		// Placement
		grid[cell.x,cell.y] = 30;	
	}
}



