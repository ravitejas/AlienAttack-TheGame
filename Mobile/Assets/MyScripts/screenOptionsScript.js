#pragma strict

var buttonMusicGUI : GUIStyle;
var buttonAudioGUI : GUIStyle;
var buttonResetGameGUI : GUIStyle;
var buttonResetAlertGameGUI : GUIStyle;
var buttonCreditGUI : GUIStyle;
var buttonBackGUI : GUIStyle;
var buttonYesNoGUI : GUIStyle;

var icon : Texture;

var alertWindowTitleContent : GUIContent;

private var xDistance: float;
private var yDistance: float;
private var screenWidth : float;
private var screenHeight : float;

private var toggleMusic : boolean;
private var toggleAudio : boolean;
private var toggleResetGame : boolean;
private var toggleShowCredit: boolean;

private var mManagerScript : MusicManager = MusicManager.GetInstance();

private var modalAlertWindowRect : Rect = Rect (420,300,550, 250);
private var modalCreditWindowRect : Rect = Rect (450,300,550, 250); 

private var buttonWidth : float = 100.0f;
private var buttonHeight : float = 200.0f;
private var buttonPadding : float = 100.0f;

private var toggleMusicTest : String;
private var toggleAudioTest : String;

private var _nativeWidth : float = 1280;
private var _nativeHeight : float = 800;

function Start () {

	screenWidth = Screen.currentResolution.width;
	screenHeight = Screen.currentResolution.height;
	
	xDistance = screenWidth/6 - 60;
	yDistance = screenHeight/6 + 50;
	
	if(!PlayerPrefs.HasKey("toggleMusic"))
	{
		//The key is not in player preference.
		//Add it.
		PlayerPrefs.SetInt("toggleMusic",1);
		
		toggleMusic = true;
		toggleMusicTest = "MUSIC ON";
		//True = 1
		//false = 0
	}
	else
	{
		if(PlayerPrefs.GetInt("toggleMusic") == 1)
		 {
		 	toggleMusic = true;
		 	toggleMusicTest = "MUSIC ON";
		 }
		 else
		 {
		 	toggleMusic = false;
		 	toggleMusicTest = "MUSIC OFF";
		 }
	}
	
	if(!PlayerPrefs.HasKey("toggleAudio"))
	{
		//The key is not in player preference.
		//Add it.
		PlayerPrefs.SetInt("toggleAudio",1);
		
		toggleAudio = true;
		toggleAudioTest = "AUDIO ON";
		//True = 1
		//false = 0
	}
	else
	{
		 if(PlayerPrefs.GetInt("toggleAudio") == 1)
		 {
		 	toggleAudio = true;
		 	toggleAudioTest = "AUDIO ON";
		 }
		 else
		 {
		 	toggleAudio = false;
		 	toggleAudioTest = "AUDIO OFF";
		 }
	}
	
	toggleResetGame = false;
	
	//Turn on the music and audio when game starts
	buttonMusicGUI.normal.textColor = Color.green;
	buttonAudioGUI.normal.textColor = Color.green;
	buttonResetGameGUI.normal.textColor = Color.white;
	
}

function OnGUI () {

	//set up scaling
	var rx : float = Screen.width / _nativeWidth ;
	var ry : float = Screen.height / _nativeHeight ;
	GUI.matrix = Matrix4x4.TRS (Vector3.zero, Quaternion.identity, new Vector3 (rx, ry, 1));

	toggleMusic = GUI.Toggle (Rect(xDistance, yDistance, buttonHeight, buttonWidth), toggleMusic, toggleMusicTest, buttonMusicGUI);

	if (toggleMusic)
	{
		// If true, music is ON
		buttonMusicGUI.normal.textColor = Color.green;
		
		PlayerPrefs.SetInt("toggleMusic",1);
		toggleMusicTest = "MUSIC ON";
		
		if(!mManagerScript.audio.isPlaying)
		{
			 mManagerScript.audio.Play();
		}		
	}
	else
	{
		// If false, music is OFF.
		buttonMusicGUI.normal.textColor = Color.white;
		
		PlayerPrefs.SetInt("toggleMusic",0);
		toggleMusicTest = "MUSIC OFF";
		
		if(mManagerScript.audio.isPlaying)
		{
			 mManagerScript.audio.Stop();
		}
		
	}
	
	toggleAudio = GUI.Toggle (Rect(xDistance, yDistance + buttonPadding,buttonHeight, buttonWidth), toggleAudio, toggleAudioTest, buttonAudioGUI);
	
	if (toggleAudio)
	{
	
		// If true, music is ON
		buttonAudioGUI.normal.textColor = Color.green;
		
		PlayerPrefs.SetInt("toggleAudio",1);
		toggleAudioTest = "AUDIO ON";

	}
	else
	{
		// If false, music is OFF.
		buttonAudioGUI.normal.textColor = Color.white;
		
		PlayerPrefs.SetInt("toggleAudio",0);
		toggleAudioTest = "AUDIO OFF";

	}
	
	toggleResetGame = GUI.Toggle (Rect(xDistance, yDistance + buttonPadding*2,buttonHeight, buttonWidth), toggleResetGame, "RESET GAME", buttonResetGameGUI);
	
	if (toggleResetGame)
	{
	
		// If true, Reset
		toggleShowCredit = false;
		
		GUI.Box(Rect (450,300,550, 250),"");
		
		buttonResetGameGUI.normal.textColor = Color.red;
		
		alertWindowTitleContent.text = "You will lose all your saved data, \nincluding points gathered, coins \nand any collectibles that you collected.\nAre you sure?";
		
		modalAlertWindowRect = GUI.ModalWindow (0, modalAlertWindowRect, resetGame, alertWindowTitleContent, buttonResetAlertGameGUI);
		alertWindowTitleContent.image = icon;
		buttonResetAlertGameGUI.normal.textColor = Color.red;
		
		//toggleShowCredit = false;
	}
	else
	{
		// If false, do not reset
		buttonResetGameGUI.normal.textColor = Color.white;
		
		//toggleShowCredit = false;
	}
	
	/*
		toggleShowCredit = GUI.Toggle (Rect(xDistance, yDistance + buttonPadding*3,buttonHeight, buttonWidth), toggleShowCredit, "CREDITS", buttonBackGUI);
	
	if (toggleShowCredit)
	{
		// If true, Reset
		
		alertWindowTitleContent.text = "Created and Developed by\nRavi Teja S\nKarthikeyan S\nTanner Z\nFrank B\n\nSpecial Thanks to\nScott Easley\nJerry Lin";
		alertWindowTitleContent.image = null;
		buttonResetAlertGameGUI.normal.textColor = Color.green;
		
		GUI.Box(Rect (450,300,550, 250),"");
		
		GUI.Label(modalCreditWindowRect,alertWindowTitleContent,buttonCreditGUI);
	}
	else
	{
		// If false, do not reset
		//buttonResetGameGUI.normal.textColor = Color.white;
	}
	*/

	if (GUI.Button (Rect(xDistance, yDistance + buttonPadding*4,buttonHeight, buttonWidth), "BACK", buttonBackGUI))
	{
		//Back to Main Screen
		PlayerPrefs.Save();
		
		Application.LoadLevel(0);
	}
}

// Reset the entire contents of the game.
function resetGame (windowID : int) {
    if (GUI.Button (Rect (150,200,50,50), "YES", buttonYesNoGUI))
    {
    	PlayerPrefs.DeleteAll();
    	
        toggleResetGame = false;
        
        print("Pressed YES");
        
        Application.LoadLevel(0);
    }
    
    if (GUI.Button (Rect (400,200,50,50), "NO", buttonYesNoGUI))
    {
        toggleResetGame = false;
        
        print("Pressed NO");
    }
}