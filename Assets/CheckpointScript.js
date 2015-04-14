#pragma strict

// Destroy everything that enters the trigger

function OnTriggerEnter2D (other : Collider2D) {
	other.gameObject.GetComponent.<NewPlayerControl>().ReachedCheckpoint();
}