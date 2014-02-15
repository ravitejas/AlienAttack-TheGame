#pragma strict

private var screenWidth : float;
private var screenHeight : float;
private var xDistance : float;
private var yDistance : float;

var levelButtonStyle : GUIStyle;
var backButtonStyle : GUIStyle;

var levelButtonArtReady : boolean;

//var button_level_1_0 : Texture; Locked
var button_level_1_1 : Texture; // Unlocked
var button_level_1_2 : Texture;	// 1 Star
var button_level_1_3 : Texture;	// 2 Star
var button_level_1_4 : Texture;	// 3 Star

var button_level_2_0 : Texture; //Locked
var button_level_2_1 : Texture; // Unlocked
var button_level_2_2 : Texture;	// 1 Star
var button_level_2_3 : Texture;	// 2 Star
var button_level_2_4 : Texture;	// 3 Star

var button_level_3_0 : Texture; //Locked
var button_level_3_1 : Texture; // Unlocked
var button_level_3_2 : Texture;	// 1 Star
var button_level_3_3 : Texture;	// 2 Star
var button_level_3_4 : Texture;	// 3 Star

var button_level_4_0 : Texture; //Locked
var button_level_4_1 : Texture; // Unlocked
var button_level_4_2 : Texture;	// 1 Star
var button_level_4_3 : Texture;	// 2 Star
var button_level_4_4 : Texture;	// 3 Star

private var starLevel_1 : int;
private var starLevel_2 : int;
private var starLevel_3 : int;
private var starLevel_4 : int;

//private var buttonHeight : float = 400.0f;
//private var buttonWidth : float = 200.0f;

//private var buttonPadding : float = 240.0f;

// ----- TEMP ----- // 

private var buttonHeight : float = 200.0f;
private var buttonWidth : float = 200.0f;

private var buttonPadding : float = 100.0f;

// ----- TEMP ----- //
 
//when you will draw the button use this code:
//GUI.Button(new Rect(a,b,c,d), "btnTEXT", guiStyle);

function Start () {

	screenWidth = Screen.currentResolution.width;
	screenHeight = Screen.currentResolution.height;
	
	xDistance = 250;
	yDistance = 150;
	
	PlayerPrefs.SetInt("isRetry", 0);
	
	if(levelButtonArtReady)
	{
		if(PlayerPrefs.HasKey("Star_Level_1"))
		{
			starLevel_1 = PlayerPrefs.GetInt("Star_Level_1");
		}
		else
		{
			PlayerPrefs.SetInt("Star_Level_1",1);
			starLevel_1 = 1;
		}
		
		if(PlayerPrefs.HasKey("Star_Level_2"))
		{
			starLevel_2 = PlayerPrefs.GetInt("Star_Level_2");
			
			if(starLevel_1 >= 2 && starLevel_2 == 0)
			{
				starLevel_2 = 1;
			}
		}
		else
		{
			PlayerPrefs.SetInt("Star_Level_2",0);
			starLevel_2 = 0;
		}
		
		if(PlayerPrefs.HasKey("Star_Level_3"))
		{
			starLevel_3 = PlayerPrefs.GetInt("Star_Level_3");
			
			if(starLevel_2 >= 2 && starLevel_3 == 0)
			{
				starLevel_3 = 1;
			}
		}
		else
		{
			PlayerPrefs.SetInt("Star_Level_3",0);
			starLevel_3 = 0;
		}
		
		if(PlayerPrefs.HasKey("Star_Level_4"))
		{
			starLevel_4 = PlayerPrefs.GetInt("Star_Level_4");
			
			if(starLevel_3 >= 2 && starLevel_4 == 0)
			{
				starLevel_4 = 1;
			}
		}
		else
		{
			PlayerPrefs.SetInt("Star_Level_4",0);
			starLevel_4 = 0;
		}
	}
}

function OnGUI () {
	
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
		switch (starLevel_1)
		{
			//since level 1 is always unlocked, no need of case 0.
			case 1:
					if (GUI.Button (Rect(xDistance, yDistance, buttonHeight, buttonWidth),button_level_1_1))
					{
						PlayerPrefs.SetInt("GameOver",0);
						Application.LoadLevel(5);
					}
					break;
			
			case 2:
					if (GUI.Button (Rect(xDistance, yDistance, buttonHeight, buttonWidth),button_level_1_2))
					{
						PlayerPrefs.SetInt("GameOver",0);
						Application.LoadLevel(5);
					}
					break;
			
			case 3:
					if (GUI.Button (Rect(xDistance, yDistance, buttonHeight, buttonWidth),button_level_1_3))
					{
						PlayerPrefs.SetInt("GameOver",0);
						Application.LoadLevel(5);
					}
					break;
			
			case 4:
					if (GUI.Button (Rect(xDistance, yDistance, buttonHeight, buttonWidth),button_level_1_4))
					{
						PlayerPrefs.SetInt("GameOver",0);
						Application.LoadLevel(5);
					}
					break;
		
		}
		
		//Level 2
		switch (starLevel_2)
		{
			case 0:
					if (GUI.Button (Rect(xDistance + buttonWidth + buttonPadding , yDistance,buttonHeight, buttonWidth),button_level_2_0))
					{
						if(starLevel_1 >= 2)
						{
							PlayerPrefs.SetInt("GameOver",0);
							Application.LoadLevel(6);
						}
					}
					break;
			case 1:
					if (GUI.Button (Rect(xDistance + buttonWidth + buttonPadding , yDistance,buttonHeight, buttonWidth),button_level_2_1))
					{
						if(starLevel_1 >= 2)
						{
							PlayerPrefs.SetInt("GameOver",0);
							Application.LoadLevel(6);
						}
					}
					break;
			
			case 2:
					if (GUI.Button (Rect(xDistance + buttonWidth + buttonPadding , yDistance,buttonHeight, buttonWidth),button_level_2_2))
					{
						if(starLevel_1 >= 2)
						{
							PlayerPrefs.SetInt("GameOver",0);
							Application.LoadLevel(6);
						}
					}
					break;
			
			case 3:
					if (GUI.Button (Rect(xDistance + buttonWidth + buttonPadding , yDistance,buttonHeight, buttonWidth),button_level_2_3))
					{
						if(starLevel_1 >= 2)
						{
							PlayerPrefs.SetInt("GameOver",0);
							Application.LoadLevel(6);
						}
					}
					break;
			
			case 4:
					if (GUI.Button (Rect(xDistance + buttonWidth + buttonPadding , yDistance,buttonHeight, buttonWidth),button_level_2_4))
					{
						if(starLevel_1 >= 2)
						{
							PlayerPrefs.SetInt("GameOver",0);
							Application.LoadLevel(6);
						}
					}
					break;
		
		}
		
		//Level 3
		switch (starLevel_3)
		{
			case 0:
					if (GUI.Button (Rect(xDistance, yDistance + buttonHeight + buttonPadding/2,buttonHeight, buttonWidth), button_level_3_0))
					{
						if(starLevel_2 >= 2)
						{
							PlayerPrefs.SetInt("GameOver",0);
							Application.LoadLevel(7);
						}
					}
					break;
			case 1:
					if (GUI.Button (Rect(xDistance, yDistance + buttonHeight + buttonPadding/2,buttonHeight, buttonWidth), button_level_3_1))
					{
						if(starLevel_2 >= 2)
						{
							PlayerPrefs.SetInt("GameOver",0);
							Application.LoadLevel(7);
						}
					}
					break;
			
			case 2:
					if (GUI.Button (Rect(xDistance, yDistance + buttonHeight + buttonPadding/2,buttonHeight, buttonWidth), button_level_3_2))
					{
						if(starLevel_2 >= 2)
						{
							PlayerPrefs.SetInt("GameOver",0);
							Application.LoadLevel(7);
						}
					}
					break;
			
			case 3:
					if (GUI.Button (Rect(xDistance, yDistance + buttonHeight + buttonPadding/2,buttonHeight, buttonWidth), button_level_3_3))
					{
						if(starLevel_2 >= 2)
						{
							PlayerPrefs.SetInt("GameOver",0);
							Application.LoadLevel(7);
						}
					}
					break;
			
			case 4:
					if (GUI.Button (Rect(xDistance, yDistance + buttonHeight + buttonPadding/2,buttonHeight, buttonWidth), button_level_3_4))
					{
						if(starLevel_2 >= 2)
						{
							PlayerPrefs.SetInt("GameOver",0);
							Application.LoadLevel(7);
						}
					}
					break;
		
		}
		
		//Level 4
		switch (starLevel_4)
		{
			case 0:
					if (GUI.Button (Rect(xDistance + buttonWidth + buttonPadding, yDistance + buttonHeight + buttonPadding/2,buttonHeight, buttonWidth),button_level_4_0))
					{
						PlayerPrefs.SetInt("GameOver",0);
					}
					break;
			case 1:
					if (GUI.Button (Rect(xDistance + buttonWidth + buttonPadding, yDistance + buttonHeight + buttonPadding/2,buttonHeight, buttonWidth),button_level_4_1))
					{
						PlayerPrefs.SetInt("GameOver",0);
					}
					break;
			
			case 2:
					if (GUI.Button (Rect(xDistance + buttonWidth + buttonPadding, yDistance + buttonHeight + buttonPadding/2,buttonHeight, buttonWidth),button_level_4_2))
					{
						PlayerPrefs.SetInt("GameOver",0);
					}
					break;
			
			case 3:
					if (GUI.Button (Rect(xDistance + buttonWidth + buttonPadding, yDistance + buttonHeight + buttonPadding/2,buttonHeight, buttonWidth),button_level_4_3))
					{
						PlayerPrefs.SetInt("GameOver",0);
					}
					break;
			
			case 4:
					if (GUI.Button (Rect(xDistance + buttonWidth + buttonPadding, yDistance + buttonHeight + buttonPadding/2,buttonHeight, buttonWidth),button_level_4_4))
					{
						PlayerPrefs.SetInt("GameOver",0);
					}
					break;
		
		}		
	}
	
	if (GUI.Button (Rect(80,670,buttonHeight - 100, buttonWidth -100), "BACK", backButtonStyle))
	{
		Application.LoadLevel(1);
		PlayerPrefs.SetInt("GameOver",1);
	}
}