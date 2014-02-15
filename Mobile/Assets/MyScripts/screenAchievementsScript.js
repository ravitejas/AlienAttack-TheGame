#pragma strict

private var screenWidth : float;
private var screenHeight : float;
private var xDistance : float;

public var yDistance : float;
public var backButtonStyle : GUIStyle;

//private var buttonHeight : float = 400.0f;
//private var buttonWidth : float = 200.0f;

//private var buttonPadding : float = 240.0f;

// ----- TEMP ----- // 

private var buttonHeight : float = 250.0f;
private var buttonWidth : float = 250.0f;

private var buttonPadding : float = 40.0f;

// ----- TEMP ----- //
 
//when you will draw the button use this code:
//GUI.Button(new Rect(a,b,c,d), "btnTEXT", guiStyle);

function Start () {

	screenWidth = Screen.currentResolution.width;
	screenHeight = Screen.currentResolution.height;
	
	xDistance = 300;
	yDistance = 670;
}

function OnGUI () {
	
	if (GUI.Button (Rect(40,yDistance,buttonHeight - 150, buttonWidth -150), "BACK",backButtonStyle))
	{
		Application.LoadLevel(0);
	}
}