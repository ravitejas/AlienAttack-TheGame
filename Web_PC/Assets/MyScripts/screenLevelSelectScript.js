#pragma strict

private var screenWidth : float;
private var screenHeight : float;
private var xDistance : float;
private var yDistance : float;

var levelButtonStyle : GUIStyle;
var backButtonStyle : GUIStyle;
var levelButtonArtReady : boolean;
var button_level_1_1 : Texture; // Unlocked
var button_level_2_1 : Texture; // Unlocked
var button_level_3_1 : Texture; // Unlocked

private var buttonHeight : float = 100.0f;
private var buttonWidth : float = 100.0f;
private var buttonPadding : float = 100.0f;

private var _nativeWidth : float = 960;
private var _nativeHeight : float = 600;

function Start () {
	screenWidth = Screen.currentResolution.width;
	screenHeight = Screen.currentResolution.height;	
	xDistance = 200;
	yDistance = 225;	
	PlayerPrefs.SetInt("isRetry", 0);	
}

function OnGUI () {
	//set up scaling
	var rx : float = Screen.width / _nativeWidth ;
	var ry : float = Screen.height / _nativeHeight ;
	GUI.matrix = Matrix4x4.TRS (Vector3.zero, Quaternion.identity, new Vector3 (rx, ry, 1));
	
	if(!levelButtonArtReady)
	{
		GUI.Box(Rect(xDistance, yDistance, buttonHeight, buttonWidth), "");
		if (GUI.Button (Rect(xDistance, yDistance, buttonHeight, buttonWidth), "Level\n<size=40>1</size>",levelButtonStyle))
		{
			PlayerPrefs.SetInt("GameOver",0);
			Application.LoadLevel(5);
			
		}
		
		GUI.Box(Rect(xDistance + buttonWidth + buttonPadding , yDistance,buttonHeight, buttonWidth), "");
		if (GUI.Button (Rect(xDistance + buttonWidth + buttonPadding , yDistance,buttonHeight, buttonWidth),"Level\n<size=40>2</size>\nLOCKED",levelButtonStyle))
		{
			PlayerPrefs.SetInt("GameOver",0);
			Application.LoadLevel(6);
		}
		
		GUI.Box(Rect(xDistance, yDistance + buttonHeight + buttonPadding/2,buttonHeight, buttonWidth), "");
		if (GUI.Button (Rect(xDistance, yDistance + buttonHeight + buttonPadding/2,buttonHeight, buttonWidth), "Level\n<size=40>3</size>\nLOCKED",levelButtonStyle))
		{
			PlayerPrefs.SetInt("GameOver",0);
			Application.LoadLevel(7);
		}
		
		GUI.Box(Rect(xDistance + buttonWidth + buttonPadding, yDistance + buttonHeight + buttonPadding/2,buttonHeight, buttonWidth), "");
		if (GUI.Button (Rect(xDistance + buttonWidth + buttonPadding, yDistance + buttonHeight + buttonPadding/2,buttonHeight, buttonWidth), "Level\n<size=40>4</size>\nLOCKED",levelButtonStyle))
		{
			PlayerPrefs.SetInt("GameOver",0);
		}
	}
	else
	{
		//Level 1
		if (GUI.Button (Rect(xDistance, yDistance + buttonPadding/4, buttonHeight, buttonWidth),button_level_1_1))
		{
			PlayerPrefs.SetInt("GameOver",0);
			Application.LoadLevel(5);
		}

		//Level 2
		if (GUI.Button (Rect(xDistance + buttonWidth + buttonPadding , yDistance + buttonPadding/4,buttonHeight, buttonWidth),button_level_2_1))
		{
			PlayerPrefs.SetInt("GameOver",0);
			Application.LoadLevel(6);
		}
		
		//Level 3
		if (GUI.Button (Rect(xDistance+ 2.0f * (buttonWidth + buttonPadding), yDistance + buttonPadding/4,buttonHeight, buttonWidth), button_level_3_1))
		{
			PlayerPrefs.SetInt("GameOver",0);
			Application.LoadLevel(7);		
		}		
	}
	
	if (GUI.Button (Rect(800, 500,buttonHeight + 100, buttonWidth), "BACK", backButtonStyle))
	{		
		Application.LoadLevel(0);
		PlayerPrefs.SetInt("GameOver",1);
	}
}