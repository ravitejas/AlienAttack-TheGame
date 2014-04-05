#pragma strict

private var screenWidth : float;
private var screenHeight : float;
private var xDistance : float;
private var yDistance : float;

var levelButtonStyle : GUIStyle;
var backButtonStyle : GUIStyle;

var cityButtonArtReady : boolean;

var button_City_1_1 : Texture;

var button_City_2_0 : Texture;
var button_City_2_1 : Texture;

var button_City_3_0 : Texture;
var button_City_3_1 : Texture;

var button_City_4_0 : Texture;
var button_City_4_1 : Texture;

var city2Locked : boolean;
var city3Locked : boolean;
var city4Locked : boolean;

private var buttonHeight : float = 200.0f;
private var buttonWidth : float = 200.0f;

private var buttonPadding : float = 100.0f;

private var _nativeWidth : float = 1280;
private var _nativeHeight : float = 800;

function Start () {

	screenWidth = Screen.currentResolution.width;
	screenHeight = Screen.currentResolution.height;
	
	xDistance = 250;
	yDistance = 150;
	
	PlayerPrefs.SetInt("isRetry", 0);
	
	city2Locked = city3Locked = city4Locked = true;
}

function OnGUI () {

	//set up scaling
	var rx : float = Screen.width / _nativeWidth ;
	var ry : float = Screen.height / _nativeHeight ;
	GUI.matrix = Matrix4x4.TRS (Vector3.zero, Quaternion.identity, new Vector3 (rx, ry, 1));

	if(!cityButtonArtReady)
	{
		GUI.Box(Rect(xDistance, yDistance, buttonHeight, buttonWidth), "");
		if (GUI.Button (Rect(xDistance, yDistance, buttonHeight, buttonWidth), "<size=60>FB</size>",levelButtonStyle))
		{
			PlayerPrefs.SetInt("GameOver",0);
			Application.LoadLevel("screenLevelSelect");
		}
		
		GUI.Box(Rect(xDistance + buttonWidth + buttonPadding , yDistance,buttonHeight, buttonWidth), "");
		if (GUI.Button (Rect(xDistance + buttonWidth + buttonPadding , yDistance,buttonHeight, buttonWidth),"<size=60>TZ</size>\nLOCKED",levelButtonStyle))
		{
			PlayerPrefs.SetInt("GameOver",0);
		}
		
		GUI.Box(Rect(xDistance, yDistance + buttonHeight + buttonPadding/2,buttonHeight, buttonWidth), "");
		if (GUI.Button (Rect(xDistance, yDistance + buttonHeight + buttonPadding/2,buttonHeight, buttonWidth), "<size=60>KS</size>\nLOCKED",levelButtonStyle))
		{
			PlayerPrefs.SetInt("GameOver",0);
		}
		
		GUI.Box(Rect(xDistance + buttonWidth + buttonPadding, yDistance + buttonHeight + buttonPadding/2,buttonHeight, buttonWidth), "");
		if (GUI.Button (Rect(xDistance + buttonWidth + buttonPadding, yDistance + buttonHeight + buttonPadding/2,buttonHeight, buttonWidth), "<size=60>RS</size>\nLOCKED",levelButtonStyle))
		{
			PlayerPrefs.SetInt("GameOver",0);
		}
	}
	else
	{	
		//City 1 is never locaked.
		if (GUI.Button (Rect(xDistance, yDistance, buttonHeight, buttonWidth),button_City_1_1))
		{
			PlayerPrefs.SetInt("GameOver",0);
			Application.LoadLevel("screenLevelSelect");
		}
		
		if(city2Locked)
		{
			if (GUI.Button (Rect(xDistance + buttonWidth + buttonPadding , yDistance,buttonHeight, buttonWidth),button_City_2_0))
			{
				PlayerPrefs.SetInt("GameOver",0);
				Application.LoadLevel("screenLevelSelect");
			}
		}
		else
		{
			if (GUI.Button (Rect(xDistance + buttonWidth + buttonPadding , yDistance,buttonHeight, buttonWidth),button_City_2_1))
			{
				PlayerPrefs.SetInt("GameOver",0);
				Application.LoadLevel("screenLevelSelect");
			}
		}
		
		if(city3Locked)
		{
			if (GUI.Button (Rect(xDistance, yDistance + buttonHeight + buttonPadding/2,buttonHeight, buttonWidth),button_City_3_0))
			{
				PlayerPrefs.SetInt("GameOver",0);
				Application.LoadLevel("screenLevelSelect");
			}
		}
		else
		{
			if (GUI.Button (Rect(xDistance, yDistance + buttonHeight + buttonPadding/2,buttonHeight, buttonWidth),button_City_3_1))
			{
				PlayerPrefs.SetInt("GameOver",0);
				Application.LoadLevel("screenLevelSelect");
			}
		}
		
		if(city4Locked)
		{
			if (GUI.Button (Rect(xDistance + buttonWidth + buttonPadding, yDistance + buttonHeight + buttonPadding/2,buttonHeight, buttonWidth),button_City_4_0))
			{
				PlayerPrefs.SetInt("GameOver",0);
				Application.LoadLevel("screenLevelSelect");
			}
		}
		else
		{
			if (GUI.Button (Rect(xDistance + buttonWidth + buttonPadding, yDistance + buttonHeight + buttonPadding/2,buttonHeight, buttonWidth),button_City_4_1))
			{
				PlayerPrefs.SetInt("GameOver",0);
				Application.LoadLevel("screenLevelSelect");
			}
		}
	}
	
	if (GUI.Button (Rect(80,670,buttonHeight - 100, buttonWidth -100), "BACK",backButtonStyle))
	{
		Application.LoadLevel(0);
	}
}