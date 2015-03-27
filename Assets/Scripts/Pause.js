#pragma strict

 var paused: boolean;

	function OnGUI() {
		// Show a message if the game is paused.
		if (paused) {
			GUI.Label(new Rect(100, 100, 50, 30), "Game paused");
		}
	}

	function OnApplicationPause(pauseStatus: boolean) {
		paused = pauseStatus;
	}
}