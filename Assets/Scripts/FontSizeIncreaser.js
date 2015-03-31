#pragma strict

var rootObject:GameObject;

function Start () {
	// Check if running on a Mobile Device
	// If Not, Return. No Need to Increase Font Size
	if (SystemInfo.deviceType != DeviceType.Handheld) {
		return;
	}
	
	//Loop Each Text script in the rootObject
	for (var t in rootObject.GetComponentsInChildren(UnityEngine.UI.Text)) {
		// Double the Font Size
		// (mobile screens display fonts smaller than Unity Editor)
		(t as UnityEngine.UI.Text).fontSize *= 2;
	}
}