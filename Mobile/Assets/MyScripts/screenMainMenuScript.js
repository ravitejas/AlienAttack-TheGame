#pragma strict

var buttonGUI : GUIStyle;

private var xDistance: float;
private var yDistance: float;
private var screenWidth : float;
private var screenHeight : float;

private var buttonWidth : float = 100.0f;
private var buttonHeight : float = 200.0f;
private var buttonPadding : float = 100.0f;

private var _nativeWidth : float = 1280;
private var _nativeHeight : float = 800;

function Start () {


	screenWidth = Screen.currentResolution.width;
	screenHeight = Screen.currentResolution.height;
	
	xDistance = screenWidth/6 - 50;
	yDistance = screenHeight/6 + 150;
}

function OnGUI () 
{
	//set up scaling
	var rx : float = Screen.width / _nativeWidth ;
	var ry : float = Screen.height / _nativeHeight ;
	GUI.matrix = Matrix4x4.TRS (Vector3.zero, Quaternion.identity, new Vector3 (rx, ry, 1));

	if (GUI.Button (Rect(xDistance, yDistance, buttonHeight, buttonWidth), "PLAY", buttonGUI))
	{
		Application.LoadLevel("screenCitySelect");
	}
	
	if (GUI.Button (Rect(xDistance, yDistance + buttonPadding,buttonHeight, buttonWidth), "OPTIONS", buttonGUI))
	{
		Application.LoadLevel("screenOptions");
	}
	
	if (GUI.Button (Rect(xDistance, yDistance + buttonPadding*2,buttonHeight, buttonWidth), "CREDITS", buttonGUI))
	{
		Application.LoadLevel("screenAchievement");
	}
}