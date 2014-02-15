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
private var buttonWidth : float = 50.0f;
private var buttonHeight : float = 100.0f;
private var starSize : int = 100;
private var buttonPadding : float = 50.0f;
private var buttonStart : int = 10;

private var playerStateScript : PlayerState;
private var guiButtonsScript : GUIButtons;

 var starCount : int;

function Start () {

	screenWidth = Screen.currentResolution.width;
	screenHeight = Screen.currentResolution.height;

	showGameOverScreen = false;
	
	PlayerPrefs.SetInt("GameOver",0);
	
	playerStateScript = GameObject.Find("Player").GetComponent(PlayerState);
	guiButtonsScript =  GameObject.Find("Player").GetComponent(GUIButtons);
	
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

	if(gamePaused == false)
	{
		if(GUI.Button(Rect(920,30,60,60), "<size=30>||</size>"))
		{			
			gamePaused = true;			
			Time.timeScale = 0.0;			
			showGameOverScreen = true;
		}
	}
	
	if(showGameOverScreen == true || levelCompleted == true)
	{
		Time.timeScale = 0.0;		
		modalGameOverWindowRect = Rect (screenWidth/8 - 50, screenHeight/8, 630, screenHeight/2.5);
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
    	GUI.Label(Rect(40,20,screenWidth/4,200), "<size=30>Game Paused</size>", gamepausedStyle);
    }
    else if(playerStateScript.myState == State.loseGame)
    {
    	GUI.Label(Rect(40,20,screenWidth/4,200), "<size=30>You are DEAD!!</size>", gamepausedStyle);
    }
    else if(playerStateScript.myState == State.winGame)
    {
    	GUI.Label(Rect(40,20,screenWidth/4,200), "<size=30>WoOt! WoOt!</size>", gamepausedStyle);
    }
	
	//------PLAYER INFO------//
	
	if(levelCompleted)
	{
		gameOverFinishContent.image = fullStarTexture;
		gameOverFinishContent.text = "Level\nComplete!";
		
		starCount = 1;
	}
	else
	{
		gameOverFinishContent.image = emptyStarTexture;
		gameOverFinishContent.text = "Level\n NOT Complete!";
	}
	GUI.Label(Rect (40,140,starSize,starSize), gameOverFinishContent, gameOverFinishGUI);
	
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
	GUI.Label(Rect (40 +  starSize + 100,140,starSize,starSize), gameOverCoinCollectALLContent, gameOverFinishGUI);
	
	
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
	GUI.Label(Rect (40 + starSize + 300,140,starSize,starSize), gameOverCompleteBeforeTimeContent, gameOverFinishGUI);
	
	//------PLAYER INFO------//
	
	
	//------ACTION BUTTONS------//
	
    if (GUI.Button (Rect (buttonStart,250,buttonHeight,buttonHeight), "QUIT", gameOverButtonStyle))
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
    
    if (GUI.Button (Rect (buttonStart + 150 + 80,250,buttonHeight,buttonHeight), "RETRY", gameOverButtonStyle))
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
    	if(levelCompleted)
    		buttonContent = "NXT LVL";
    	else
    		buttonContent = "";
    }
    
    if (GUI.Button (Rect (buttonStart + 150*2 + 140,250,buttonHeight,buttonHeight), buttonContent, gameOverButtonStyle))
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