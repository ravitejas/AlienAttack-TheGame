#pragma strict
public enum State{preGame,inGame,winGame,loseGame,invincible};

public var playerDirection : int; //0 is x, 2 is z
public var playerOnObjectType : int; //0 is platform, 1 is ledge, 2 is pole
public var playerObObjectTag; //Tag can be x, z or corner.
public var playerOnObjectName : String;
public var playerCoinScore : int; //number of coins collected
public var playerSpecialScore : int; //number of special collectibles found
public var myState : State;	//State of the player throughout the game
public var playerHasPowerUp : boolean;	//Set when player picks up power up in the game
private var powerPressed : boolean;		//Set when power activated power
private var powerEnd : float;			//Time power ends
private var particle : ParticleSystem;

private var screenWidth : float; 
private var screenHeight : float;
private var buttonHeight : float = 250.0f;
private var buttonWidth : float = 250.0f;

var shieldImage : Texture;
var shieldTextureStyle : GUIStyle;

function Start () {
	playerDirection = 0;
	playerOnObjectType = 0;
	playerObObjectTag = "x";
	playerOnObjectName = "Platform_F1_SF_1";
	playerCoinScore = 0;
	playerSpecialScore = 0;
	playerHasPowerUp = false;
	powerPressed = false;
	myState = State.preGame;
	particle = transform.GetComponent(ParticleSystem);
	
	 screenWidth = Screen.currentResolution.width;
	 screenHeight = Screen.currentResolution.height;	
}

function Update(){
	//Ensures state is correct when activating power up
	if(powerPressed){
		if(Time.time < powerEnd){
			myState = State.invincible;
			particle.Play();
		}else{
			myState = State.inGame;
			particle.Clear();
			particle.Stop();
		}
	}
}

//Method is called when player wishes to activate power up
function ActivatePowerUp(){
	//Ensure player has a powerup
	if(playerHasPowerUp){
		//Player has used the power up, set it to false
		playerHasPowerUp = false;
		//Activate powerup
		powerPressed = true;
		//Power lasts for 10 seconds
		powerEnd = Time.time + 10.0f;
	}
}

function OnGUI ()
{
		Debug.Log("has powerup : " + playerHasPowerUp);
		if(playerHasPowerUp)
		{
			if (GUI.Button (Rect(750,600,buttonHeight - 180, buttonWidth - 180), shieldImage,shieldTextureStyle ))
			{
				ActivatePowerUp();
			}
		}
		
		/*
		if (GUI.Button (Rect(screenWidth - 180,screenHeight - 250 ,buttonHeight - 180, buttonWidth - 180), "<size=15>SPL 2</size>"))
		{
			
		}
		*/
}