#pragma strict

var buttonGUI : GUIStyle;

private var xDistance: float;
private var yDistance: float;
private var screenWidth : float;
private var screenHeight : float;

private var buttonWidth : float = 100.0f;
private var buttonHeight : float = 200.0f;
private var buttonPadding : float = 100.0f;

// ----- TEMP ----- // 
/*
private var buttonHeight : float = 200.0f;
private var buttonWidth : float = 100.0f;

private var buttonPadding : float = 140.0f;
*/
// ----- TEMP ----- //
 
//when you will draw the button use this code:
//GUI.Button(new Rect(a,b,c,d), "btnTEXT", guiStyle);

function Start () {


	screenWidth = Screen.currentResolution.width;
	screenHeight = Screen.currentResolution.height;
	
	xDistance = screenWidth/6 - 50;
	yDistance = screenHeight/6 + 150;
}

function OnGUI () {

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