#pragma strict

//Content for button controls.
//exposed to editor
var leftButtonTexture : Texture;
var leftButtonStyle : GUIStyle;
var rightButtonTexture : Texture;
var rightButtonStyle : GUIStyle;
var jumpButtonTexture : Texture;
var jumpButtonStyle : GUIStyle;
private var playerJumpSpeed : float;

private var player : GameObject;
private var playerStatescript : PlayerState;
private var playerHorizontalMoveSpeed : float;
private var playerControllerVelocity : Vector3 = Vector3.zero;
private var playerController : CharacterController;
private var playerCamera : GameObject;
private var playerCameraScript : PlayerCameraMovement;
private var rotateCamAtCornersScript : RotateCamAtCorners;
private var bodyRotation : Transform;
private var lastButton : String;
private var timeSincePlayerBeingGrounded : float; //how long has it been since player was grounded
private var midAirTimeJumpThreshold : float; //length of time player can be in midair after leaving ground and still jump
private var timeSinceLastJump : float;

private var screenGameOverPauseScript : screenGameOverPause;
private var gravity : float;
private final var GRAVITY = 20.0f;
private var xzAxisPolarity : int;

private var currentPlayerOnObjectTag;
private var poleClimbVelocity : Vector3;
private var distanceFromPoleOrLedgeThreshold : float;
private var currentPoleObject : GameObject;
private var currentLedgeObject : GameObject;
private var poleClimbEndVerticalPosition : float;	  //height to climb to
private var climbPoleSet : boolean; //whether to climb the pole. is the variable set?

//Player movement controls on screen
private var screenWidth : float;
private var screenHeight : float;
private var buttonHeight : float = 250.0f;
private var buttonWidth : float = 250.0f;

private var leftMovePressed : boolean;
private var rightMovePressed : boolean;
private var jumpPressed : boolean;
private var leftMoveButton : Rect;
private var rightMoveButton : Rect;
private var jumpButton : Rect;
private var anim : Animation;

private var _nativeWidth : float = 1280;
private var _nativeHeight : float = 800;

function Start () {
	playerHorizontalMoveSpeed = 6f;	
	playerJumpSpeed = 12.0f;
	gravity = GRAVITY;	
	climbPoleSet = false;
	currentPlayerOnObjectTag = "null";
	xzAxisPolarity = 1;
	poleClimbVelocity = new Vector3(0, 4, 0);
	distanceFromPoleOrLedgeThreshold = 0.5f;
	screenWidth = Screen.currentResolution.width;
	screenHeight = Screen.currentResolution.height;	
	leftMovePressed = false;
	rightMovePressed = false;
	jumpPressed = false;
	Input.multiTouchEnabled = true;	
	leftMoveButton = Rect(30,680, buttonHeight - 150, buttonWidth -150);
	rightMoveButton = Rect(30 + buttonWidth -140, 680, buttonHeight - 150, buttonWidth -150);
	jumpButton = Rect(1100,640 ,buttonHeight - 100, buttonWidth - 100);
		
	player = GameObject.Find("Player");	
	playerStatescript = player.GetComponent("PlayerState");
	screenGameOverPauseScript = player.GetComponent("screenGameOverPause");
	playerCamera = GameObject.Find("PlayerCamera");
	playerController = GetComponent(CharacterController);	
	playerCameraScript = playerCamera.GetComponent("PlayerCameraMovement");
	rotateCamAtCornersScript = GameObject.Find("PlayerCamera").GetComponent("RotateCamAtCorners");
	timeSincePlayerBeingGrounded = 0;
	midAirTimeJumpThreshold = 0.2;
	timeSinceLastJump = 0;
	
	bodyRotation = player.transform.FindChild("Body");
	bodyRotation.Rotate(Vector3.up,180.0f);
	lastButton = "Right";
	anim = bodyRotation.GetComponent(Animation);
}


function Update () 
{
	DetectPlayerInput();
	SetCameraRotation();
	SetHorizontalMoveVelocity();
	SetVerticalMoveVelocity();
	SetAnimation();
	
	// Move the controller
    if(currentPlayerOnObjectTag == "Pole" && climbPoleSet)
       	playerController.Move( new Vector3(playerControllerVelocity.x, poleClimbVelocity.y, playerControllerVelocity.z) * Time.deltaTime);
    else
       	playerController.Move(playerControllerVelocity * Time.deltaTime); 
}

function OnControllerColliderHit (hit : ControllerColliderHit) {
    var collidedObject : GameObject = hit.collider.gameObject;
        
    if(collidedObject.tag == "Platform") //always keep object in the middle of the platform
	{
		if(collidedObject.transform.name.StartsWith("Platform") || collidedObject.transform.name.StartsWith("Corner"))
		   	playerStatescript.playerOnObjectName = collidedObject.transform.name;
	    else if( collidedObject.transform.parent != null && collidedObject.transform.parent.name.StartsWith("Platform") )
	    	playerStatescript.playerOnObjectName = collidedObject.transform.parent.name;				   		
	}
        
    if(collidedObject.tag != currentPlayerOnObjectTag)
    {
    	currentPlayerOnObjectTag = collidedObject.tag;
    	    	   	
    	if(currentPlayerOnObjectTag == "Corner" || currentPlayerOnObjectTag == "CornerReverse")
    	{
    		if(playerStatescript.playerDirection == 0) {
    			Debug.Log("Moving to X position of corner");
    			player.transform.position.x = collidedObject.transform.position.x;
		 	}
		 	else if(playerStatescript.playerDirection == 2) {
		 		Debug.Log("Moving to Z position of corner");
		 		player.transform.position.z = collidedObject.transform.position.z;		 		
		 	}
    	}
    	else if(collidedObject.tag == "Platform") //always keep object in the middle of the platform
		{
			if(playerStatescript.playerDirection == 0)
				player.transform.position.z = collidedObject.transform.position.z;
			else if(playerStatescript.playerDirection == 2)
				player.transform.position.x = collidedObject.transform.position.x;    		   		
		}
    	else if(currentPlayerOnObjectTag == "Ledge")
    	{
    		currentLedgeObject = collidedObject;
    	}
    	else if(currentPlayerOnObjectTag == "Pole")
    	{
    		Debug.Log("Collided with a pole");
    		currentPoleObject = collidedObject;
	    }
    	else if(currentPlayerOnObjectTag == "Coin")
    	{
    		Debug.Log("Collided with a coin");    		
    		playerStatescript.playerCoinScore +=1;
    		Destroy(collidedObject);
    	}
    	else if(currentPlayerOnObjectTag == "Enemy" || currentPlayerOnObjectTag == "Ground")
    	{
    		Debug.Log("Collided with an enemy or fallen on the ground");
    		playerStatescript.myState = State.loseGame;
    		PlayerPrefs.SetInt("GameOver",1);
    	}
    	else if(currentPlayerOnObjectTag == "Invincibility")
    	{
    		Debug.Log("Picked up invincibility");
        	playerStatescript.playerHasPowerUp = true;
        	Destroy(collidedObject);
        }    	
    	else if(currentPlayerOnObjectTag == "Finish")
    	{
    		Debug.Log("Level Complete!");
    		playerStatescript.myState = State.winGame;
    		screenGameOverPauseScript.levelCompleted = true;
    	}
    }
}

function OnGUI () 
{
	//set up scaling
	var rx : float = Screen.width / _nativeWidth ;
	var ry : float = Screen.height / _nativeHeight ;
	GUI.matrix = Matrix4x4.TRS (Vector3.zero, Quaternion.identity, new Vector3 (rx, ry, 1));
	
	if(!screenGameOverPauseScript.showGameOverScreen)
	{
		GUI.Box(rightMoveButton, rightButtonTexture,rightButtonStyle);
		GUI.Box(leftMoveButton, leftButtonTexture, leftButtonStyle);
		GUI.Box(jumpButton, jumpButtonTexture, jumpButtonStyle);
	}
}

function SetHorizontalMoveVelocity()
{
	var moveVelocity = xzAxisPolarity * playerHorizontalMoveSpeed;
	playerControllerVelocity.z = 0;
	playerControllerVelocity.x = 0;
		
	if(playerStatescript.playerDirection == 0)
	{
		if(rightMovePressed)		
			playerControllerVelocity.x = moveVelocity;			
		else if(leftMovePressed)
			playerControllerVelocity.x = -moveVelocity;	
	}
	else if(playerStatescript.playerDirection == 2)
	{
		if(rightMovePressed)		
			playerControllerVelocity.z = moveVelocity;
		else if(leftMovePressed)
			playerControllerVelocity.z = -moveVelocity;		
	}
	playerControllerVelocity = transform.TransformDirection(playerControllerVelocity);
}

function SetVerticalMoveVelocity()
{
	if(playerController.isGrounded)
		timeSincePlayerBeingGrounded = 0;
	else
		timeSincePlayerBeingGrounded += Time.deltaTime;
	
	timeSinceLastJump += Time.deltaTime;
	
	//if(jumpPressed && playerController.isGrounded)
	if(jumpPressed && timeSincePlayerBeingGrounded <= midAirTimeJumpThreshold && timeSinceLastJump > midAirTimeJumpThreshold)
	{
		timeSinceLastJump = 0;
		playerControllerVelocity.y = playerJumpSpeed;
		Debug.Log("Jumped");
	}
	else if((playerController.collisionFlags == CollisionFlags.Below)) //touching only below
	{
		playerControllerVelocity.y = 0;		
	}
		
    if(currentPlayerOnObjectTag == "Pole")
    {
    	var horDistanceBetweenPlayerAndPole : float;
    	var horThreshold : float;
    	var verDistanceBetweenPlayerAndPole : float;
    	var verThreshold : float;
    	horDistanceBetweenPlayerAndPole = Mathf.Abs( (currentPoleObject.transform.position - player.transform.position)[playerStatescript.playerDirection] );
    	horThreshold = distanceFromPoleOrLedgeThreshold + player.renderer.bounds.size[playerStatescript.playerDirection]/2;
    	verDistanceBetweenPlayerAndPole = Mathf.Abs( player.transform.position.y - currentPoleObject.transform.position.y );
    	verThreshold = distanceFromPoleOrLedgeThreshold + currentPoleObject.renderer.bounds.size.y/2 + player.renderer.bounds.size.y/2 ;    	    
    	
    	if( (horDistanceBetweenPlayerAndPole > horThreshold) || 
    		(verDistanceBetweenPlayerAndPole > verThreshold) )
    	{
    		Debug.Log("Player has moved away from pole");
    		currentPlayerOnObjectTag = "null";
    		climbPoleSet = false;
    		playerControllerVelocity.y = 0;
    	}
    	else if( (playerController.collisionFlags & CollisionFlags.Above)
    		 	|| (playerController.collisionFlags & CollisionFlags.Below))
    	{
		 	currentPlayerOnObjectTag = "null";
		 	climbPoleSet = false;
		 	Debug.Log("Touching top or bottom of pole");
		 	playerControllerVelocity.y = -0.2; //make player fall down if he collided above
    	}
    	else if( !climbPoleSet && (playerController.collisionFlags & CollisionFlags.Sides) )
    	{
        	print("Touching sides of pole");
        	climbPoleSet = true;
        }
    }
    else 
    {
    	//if(currentPlayerOnObjectTag == "Platform" && (playerController.collisionFlags & CollisionFlags.Above))
    	if((playerController.collisionFlags & CollisionFlags.Above))
    		playerControllerVelocity.y = -1.5; //make player fall down if he collided above
    		
    	playerControllerVelocity.y -= gravity * Time.deltaTime;
    	//Debug.Log("Decreasing y velocity by : " + gravity * Time.deltaTime);
    }
    
}

function SetCameraRotation()
{
	if(currentPlayerOnObjectTag == "Corner") 
	{
		if(playerStatescript.playerDirection == 0 && rightMovePressed)
		{
			playerCamera.transform.RotateAround(player.transform.position, -Vector3.up, 90);				
			playerStatescript.playerDirection = 2;
			bodyRotation.Rotate(Vector3.up,-90.0f);
		}		
		else if(playerStatescript.playerDirection == 2 && leftMovePressed)
		{
			playerCamera.transform.RotateAround(player.transform.position, -Vector3.up, -90);			
			playerStatescript.playerDirection = 0;
			bodyRotation.Rotate(Vector3.up,90.0f);
		}
	}
	else if(currentPlayerOnObjectTag == "CornerReverse") 
	{
		if(playerStatescript.playerDirection == 0 && leftMovePressed)
		{	
			playerCamera.transform.RotateAround(player.transform.position, -Vector3.up, -90);
			playerStatescript.playerDirection = 2;	
			xzAxisPolarity = (xzAxisPolarity == 1 ? -1 : 1); //flip move direction
			bodyRotation.Rotate(Vector3.up,90.0f);
		}
		else if(playerStatescript.playerDirection == 2 && rightMovePressed)
		{
			playerCamera.transform.RotateAround(player.transform.position, -Vector3.up, 90);
			playerStatescript.playerDirection = 0;
			xzAxisPolarity = (xzAxisPolarity == 1 ? -1 : 1); //flip move direction
			bodyRotation.Rotate(Vector3.up,-90.0f);
		}
	}	
}

function DetectPlayerInput()
{
	rightMovePressed = false;
	leftMovePressed = false;
	jumpPressed = false;
			
	if(SystemInfo.deviceType == DeviceType.Handheld) 
	{		
		for( var t : Touch in Input.touches )
	    {	    	   	
	    	if ( rightMoveButton.Contains( Vector2(t.position.x, screenHeight - t.position.y) ) )
	           rightMovePressed = true;
	           
	        else if ( leftMoveButton.Contains( Vector2(t.position.x, screenHeight - t.position.y ) ) )
	           leftMovePressed = true;        
	        	        	
	        if ( jumpButton.Contains( Vector2(t.position.x, screenHeight - t.position.y ) ) )
	           jumpPressed = true;
	     }
     }
     else if(SystemInfo.deviceType == DeviceType.Desktop)
     {
	    if(Input.GetKey(KeyCode.D))
	      	rightMovePressed = true;
	    	
	    else if(Input.GetKey(KeyCode.A))
	      	leftMovePressed = true;
	    	
	    if(Input.GetKey(KeyCode.Space))
	      	jumpPressed = true;
	      	
	    if(Input.GetKeyDown(KeyCode.P) && playerStatescript.playerHasPowerUp){
			playerStatescript.ActivatePowerUp();
		}	   
	 }
	 
	 if(rightMovePressed && lastButton == "Left"){
	 	bodyRotation.Rotate(Vector3.up,-180.0f);
	 	lastButton = "Right";
	 }else if (leftMovePressed && lastButton == "Right"){
	 	bodyRotation.Rotate(Vector3.up,180.0f);
	 	lastButton = "Left";
	 }
}

function SetAnimation()
{
	if(!playerController.isGrounded || (jumpPressed && playerController.isGrounded))	
		anim.CrossFade("Jump Position", 0.1);
	else if(playerController.isGrounded && !leftMovePressed && !rightMovePressed)
		anim.CrossFade("Idle");
	else if(playerController.isGrounded && (leftMovePressed || rightMovePressed))
		anim.CrossFade("Run");
}

