#pragma strict
var fullStarTexture : Texture;
var emptyStarTexture : Texture;
var gameOverFinishGUI : GUIStyle;
var showGameOverScreen : boolean;
var gameOverButtonStyle : GUIStyle;
var gamepausedStyle : GUIStyle;

var gameOverFinishContent : GUIContent;
var gameOverCoinCollectALLContent : GUIContent;
var gameOverCompleteBeforeTimeContent : GUIContent;

var levelCompleted : boolean;

public var coinChallenge : int;
public var timeChallenge : int;

private var gamePaused : boolean;

private var TRUE : int = 1;
private var FALSE : int = 0;

private var modalGameOverWindowRect : Rect;

private var screenWidth : float;
private var screenHeight : float;

private var buttonWidth : float = 100.0f;
private var buttonHeight : float = 200.0f;
private var buttonPadding : float = 100.0f;

private var playerStateScript : PlayerState;
private var guiButtonsScript : GUIButtons;

private var _nativeWidth : float = 1280;
private var _nativeHeight : float = 800;

 var starCount : int;

function Start () {

	screenWidth = Screen.currentResolution.width;
	screenHeight = Screen.currentResolution.height;

	showGameOverScreen = false;
	
	PlayerPrefs.SetInt("GameOver",0);
	
	playerStateScript = GameObject.Find("Player").GetComponent("PlayerState");
	guiButtonsScript =  GameObject.Find("Player").GetComponent("GUIButtons");
	
	gamePaused = levelCompleted = false;
	
	switch (Application.loadedLevel)
	{
		case 5:
			coinChallenge = PlayerPrefs.GetInt("coinCountLevel_1");
			timeChallenge = PlayerPrefs.GetInt("timeChallengeLevel_1");
			break;
		case 6:
			coinChallenge = PlayerPrefs.GetInt("coinCountLevel_2");
			timeChallenge = PlayerPrefs.GetInt("timeChallengeLevel_2");
			break;
		case 7:
			coinChallenge = PlayerPrefs.GetInt("coinCountLevel_3");
			timeChallenge = PlayerPrefs.GetInt("timeChallengeLevel_3");
			break;
		case 8:
			coinChallenge = PlayerPrefs.GetInt("coinCountLevel_4");
			timeChallenge = PlayerPrefs.GetInt("timeChallengeLevel_4");
			break;
	}
}

function Update () {

	//Check the status of the game.
	//If the game is over, then show the GameOverScreen
	
	if(PlayerPrefs.GetInt("GameOver") == TRUE || levelCompleted == true)
	{
		showGameOverScreen = true;
	}
	else
	{
		playerStateScript.myState = State.inGame;
	}

}

function OnGUI ()
{

	//set up scaling
	var rx : float = Screen.width / _nativeWidth ;
	var ry : float = Screen.height / _nativeHeight ;
	GUI.matrix = Matrix4x4.TRS (Vector3.zero, Quaternion.identity, new Vector3 (rx, ry, 1));
	
	if(gamePaused == false)// && guiButtonsScript.showGameStartMessage == false)
	{
		if(GUI.Button(Rect(screenWidth - 750,10,60,60), "<size=30>||</size>"))
		{
			Debug.Log("Pause button clicked.");
			
			gamePaused = true;
			
			Time.timeScale = 0.0;
			
			showGameOverScreen = true;
		}
	}
	
	if(showGameOverScreen == true || levelCompleted == true)
	{
		//GUI.Box(Rect (450,300,550, 250),"");
		
		Time.timeScale = 0.0;
		
		modalGameOverWindowRect = Rect (screenWidth/4 - 100,screenHeight/7,800, screenHeight/1.5);
		GUI.Box(modalGameOverWindowRect,"");
		
		modalGameOverWindowRect = GUI.ModalWindow (0, modalGameOverWindowRect, showGameOverContent,"");
		
	}
	else
	{
		Time.timeScale = 1.0;
	}
}

function showGameOverContent (windowID : int) {

	if(gamePaused)
    {
    	GUI.Label(Rect(20,20,screenWidth/1.5,200), "<size=60>Game Paused</size>", gamepausedStyle);
    }
    else if(playerStateScript.myState == State.loseGame)
    {
    	GUI.Label(Rect(10,20,screenWidth/1.5 - 50,200), "<size=60>You are DEAD!!</size>", gamepausedStyle);
    }
    else if(playerStateScript.myState == State.winGame)
    {
    	GUI.Label(Rect(20,20,screenWidth/1.5,200), "<size=60>WoOt! WoOt!</size>", gamepausedStyle);
    }
	
	//------PLAYER INFO------//
	
	if(levelCompleted)//(playerStateScript.myState == State.winGame)
	{
		gameOverFinishContent.image = fullStarTexture;
		gameOverFinishContent.text = "Level\nComplete!";
		
		starCount = 1;
	}
	else
	{
	Debug.Log(playerStateScript.myState);
		gameOverFinishContent.image = emptyStarTexture;
		gameOverFinishContent.text = "Level\n NOT Complete!";
	}
	GUI.Label(Rect (20,140,200,200), gameOverFinishContent, gameOverFinishGUI);
	
	if(playerStateScript.playerCoinScore >= coinChallenge)
	{
		gameOverCoinCollectALLContent.image = fullStarTexture;
		gameOverCoinCollectALLContent.text = "All Coins\nCollected";
		
		if(levelCompleted)
		{
			starCount += 1;
		}
	}
	else
	{
		gameOverCoinCollectALLContent.image = emptyStarTexture;
		gameOverCoinCollectALLContent.text = "You Missed \nSome Coins!!";
	}
	GUI.Label(Rect (20 + 200 +50,140,200,200), gameOverCoinCollectALLContent, gameOverFinishGUI);
	
	
	if(Math.Floor(guiButtonsScript.timer) <= timeChallenge && levelCompleted == true)
	{
		gameOverCompleteBeforeTimeContent.image = fullStarTexture;
		gameOverCompleteBeforeTimeContent.text = "Time to beat\n"+timeChallenge;
		
		starCount += 1;
	}
	else if(gamePaused)
	{
		gameOverCompleteBeforeTimeContent.image = emptyStarTexture;
		gameOverCompleteBeforeTimeContent.text =  "Time \n" +Math.Floor(guiButtonsScript.timer);
	}
	else
	{
		gameOverCompleteBeforeTimeContent.image = emptyStarTexture;
		gameOverCompleteBeforeTimeContent.text = "Too Slow!\n";
	}
	GUI.Label(Rect (20 + 200 *2 + 100,140,200,200), gameOverCompleteBeforeTimeContent, gameOverFinishGUI);
	
	//------PLAYER INFO------//
	
	
	//------ACTION BUTTONS------//
	
    if (GUI.Button (Rect (60,320,150,150), "QUIT", gameOverButtonStyle))
    {
        showGameOverScreen = false;
        PlayerPrefs.SetInt("GameOver",0);
        
        if(levelCompleted)
		{
			switch (Application.loadedLevel)
			{
				case 5:
					//Level 1
					PlayerPrefs.SetInt("Star_Level_1",starCount + 1);
					break;
				case 6:
					//Level 2
					PlayerPrefs.SetInt("Star_Level_2",starCount + 1);
					break;
				case 7:
					//Level 3
					PlayerPrefs.SetInt("Star_Level_3",starCount + 1);
					break;
				case 8:
					//Level 4
					PlayerPrefs.SetInt("Star_Level_4",starCount + 1);
					break;
			}
		}
        
        Application.LoadLevel(2);
    }
    
    if (GUI.Button (Rect (60 + 150 + 80,320,150,150), "RETRY", gameOverButtonStyle))
    {
        showGameOverScreen = false;
        levelCompleted = false;
        PlayerPrefs.SetInt("GameOver",0);
        
        //Reload the level
        PlayerPrefs.SetInt("isRetry",1);
        playerStateScript.myState = State.inGame;
        Application.LoadLevel(Application.loadedLevel);
    }
    
    
    if(gamePaused)
    {
    	var buttonContent : String = "RESUME";
    }
    else
    {
    	buttonContent = "NXT LVL";
    }
    
     if (GUI.Button (Rect (60 + 150*2 + 180,320,150,150), buttonContent, gameOverButtonStyle))
    {
    	if(gamePaused)
    	{
    		gamePaused = false;
    		Time.timeScale = 1.0;
    		showGameOverScreen = false;
    	}
    	else if(!levelCompleted)
    	{
    		
    	}
	    else
	    {
	        showGameOverScreen = false;
	        PlayerPrefs.SetInt("GameOver",0);
	        
	        if((Application.loadedLevel + 1) == Application.levelCount)
	        {
	        	Application.LoadLevel(2);
	        }
	        else
	        {
	        	if(starCount >= 1)
	        	{
	        		 if(levelCompleted)
						{
							switch (Application.loadedLevel)
							{
								case 5:
									//Level 1
									PlayerPrefs.SetInt("Star_Level_1",starCount + 1);
									break;
								case 6:
									//Level 2
									PlayerPrefs.SetInt("Star_Level_2",starCount + 1);
									break;
								case 7:
									//Level 3
									PlayerPrefs.SetInt("Star_Level_3",starCount + 1);
									break;
								case 8:
									//Level 4
									PlayerPrefs.SetInt("Star_Level_4",starCount + 1);
									break;
							}
						}
						
	        		Application.LoadLevel(Application.loadedLevel + 1);
	        	}
	        }
	    }
    }
    
    if(!levelCompleted)
    {
    	GUI.Label(Rect (screenWidth/4 - 150,screenHeight/2 + 300,800, screenHeight/1.5), "You need to complete this level to unlock the next level.");
    }
    
    //------ACTION BUTTONS------//
}