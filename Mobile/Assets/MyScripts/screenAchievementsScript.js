#pragma strict

private var screenWidth : float;
private var screenHeight : float;
private var xDistance : float;

public var yDistance : float;
public var backButtonStyle : GUIStyle;

private var buttonHeight : float = 250.0f;
private var buttonWidth : float = 250.0f;

private var buttonPadding : float = 40.0f;

private var _nativeWidth : float = 1280;
private var _nativeHeight : float = 800;

function Start () {

	screenWidth = Screen.currentResolution.width;
	screenHeight = Screen.currentResolution.height;
	
	xDistance = 300;
	yDistance = 670;
}

function OnGUI () {
	//set up scaling
	var rx : float = Screen.width / _nativeWidth ;
	var ry : float = Screen.height / _nativeHeight ;
	GUI.matrix = Matrix4x4.TRS (Vector3.zero, Quaternion.identity, new Vector3 (rx, ry, 1));
	
	if (GUI.Button (Rect(40,yDistance,buttonHeight - 150, buttonWidth -150), "BACK",backButtonStyle))
	{
		Application.LoadLevel(0);
	}
}