#pragma strict

private var screenWidth : float;
private var screenHeight : float;
private var xDistance : float;
private var yDistance : float;

private var TRUE : int = 1;
private var FALSE : int = 0;

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
	yDistance = 150;
}

function OnGUI () {

	if(PlayerPrefs.GetInt("GameOver") == FALSE)
	{
		if (GUI.Button (Rect(40,screenHeight - 200 ,buttonHeight - 150, buttonWidth -150), "<size=30><<--</size>"))
		{
		
		}
		
		if (GUI.Button (Rect(40 + buttonWidth -140,screenHeight - 200 ,buttonHeight - 150, buttonWidth -150), "<size=30>-->></size>"))
		{
			
		}
		
		if (GUI.Button (Rect(screenWidth - 280,screenHeight - 150 ,buttonHeight - 180, buttonWidth - 180), "<size=15>SPL 1</size>"))
		{
			
		}
		
		if (GUI.Button (Rect(screenWidth - 180,screenHeight - 250 ,buttonHeight - 180, buttonWidth - 180), "<size=15>SPL 2</size>"))
		{
			
		}
		
		if (GUI.Button (Rect(screenWidth - 190,screenHeight - 160 ,buttonHeight - 100, buttonWidth - 100), "<size=40>JUMP</size>"))
		{
			
		}
	}
}