#pragma strict

private var g : float;
private var platformName;
private var destination : Vector3;
private var jumpSpeed : float;
private var dropDownThreshold : float; //max height player can jump down and land safely.
private var horizontalReachThreshold : float; //how close player must be to the wall to initiate vertical wall run
private var verticalWallRunHeightThreshold : float; //max height of wall player can run up
private var playerStatescript : PlayerState;
private var player : GameObject;
private var horizontalThresholdForDroppingFromLedge : float = 2.0f;


function Start() {
	jumpSpeed = 7.0f;
	dropDownThreshold = 25.0f;
	horizontalReachThreshold = 1.5f;
	verticalWallRunHeightThreshold = 4.5f;
	
    g = Mathf.Abs(Physics.gravity.y);
	player = GameObject.Find("Player");
    playerStatescript = player.GetComponent("PlayerState");
    if(name.StartsWith("Platform")) {
    	platformName = name;
    }
    else if( transform.parent != null && transform.parent.name.StartsWith("Platform") ) {
    	platformName = transform.parent.name;
    }
    destination = new Vector3(transform.position.x, transform.position.y + transform.localScale.y, transform.position.z);
}

function updateTag()
{
	if(playerStatescript.playerObObjectTag == "x" && (tag == "x" || tag == "corner") )
 	{
 		playerStatescript.playerDirection = 0;
 	}
 	else if(playerStatescript.playerObObjectTag == "z" && (tag == "z" || tag == "corner") )
 	{
 		playerStatescript.playerDirection = 2;
 	}
 	else if(playerStatescript.playerObObjectTag == "corner" && tag == "z" )
 	{
 		playerStatescript.playerDirection = 2;
 	}
 	else if(playerStatescript.playerObObjectTag == "corner" && tag == "x" )
 	{
 		playerStatescript.playerDirection = 0;
 	}
}

function OnMouseDown ()
{
	updateTag();
	if(playerStatescript.playerOnObjectType == 0) //player is on a platform
	{	
		Debug.Log(platformName + ":- Player is on platform: " + playerStatescript.playerOnObjectName );
		if(playerStatescript.playerOnObjectName == platformName) { //player is on this platform			
			if(playerStatescript.playerDirection == 0) {
		 		player.transform.position.x = transform.position.x;
		 	}
		 	else if(playerStatescript.playerDirection == 2) {
		 		player.transform.position.z = transform.position.z;
		 	}
		 	playerStatescript.playerObObjectTag = tag;
		}
		else
		{   
			Debug.Log(platformName + ":- Player is on a different platform. Trying to jump");
			if( TryJump() )
			{
				player.transform.position = destination;
				playerStatescript.playerOnObjectName = platformName;
				playerStatescript.playerObObjectTag = tag;
			}
			else
			{
				Debug.Log(platformName + ":- Cannot jump. Trying to do a vertical wall run");
				if( TryVerticalWallRun() )
				{
					player.transform.position = destination;
					playerStatescript.playerOnObjectName = platformName;
					playerStatescript.playerObObjectTag = tag;
				}				
			}
		}
	}
	else //if(playerStatescript.playerOnObjectType == 1) // player is on a ledge or pole
	{
		//Debug.Log(platformName + ":- Player is on ledge: " + playerStatescript.playerOnObjectName);
		var horizontalDistance = Mathf.Abs( (player.transform.position - transform.position)[playerStatescript.playerDirection] );
		var verticalDistance = (player.transform.position - transform.position)[1];
		Debug.Log(platformName + ":- Hor dist from ledge/pole to platform: " + horizontalDistance + ", Hor threshold: " + horizontalThresholdForDroppingFromLedge +
				  ", Vert dist from ledge to platform: " + verticalDistance + ", Vert threshold: " + dropDownThreshold);
		
		if( horizontalDistance <= horizontalThresholdForDroppingFromLedge && 
			verticalDistance >=0 && verticalDistance <= dropDownThreshold ) //ledge is within hor and vert limits of platform location
		{
			player.transform.position.y = transform.position.y + transform.localScale.y/2 + player.transform.localScale.y/2;
			
			if(playerStatescript.playerDirection == 0) {
		 		player.transform.position.x = transform.position.x;
		 	}
		 	else if(playerStatescript.playerDirection == 2) {
		 		player.transform.position.z = transform.position.z;
		 	}
		 	
		 	Debug.Log(platformName + ":- Reached this platform");
		 	playerStatescript.playerOnObjectType = 0;
			playerStatescript.playerOnObjectName = platformName;
			player.rigidbody.constraints = RigidbodyConstraints.None;
			player.rigidbody.constraints = RigidbodyConstraints.FreezeRotation;
    		player.rigidbody.useGravity = true; //drop down from ledge or pole  		
    		playerStatescript.playerObObjectTag = tag;
		}
		else
		{
			Debug.Log(platformName + ":- Cannot reach this platform. Ledge/Pole is too far");
		}
	}
}

function TryJump()
{
	var destHeight = destination[1];	
	var currentHeight = player.transform.position.y;
	var latDistance = Mathf.Abs( (player.transform.position - destination)[playerStatescript.playerDirection] );
	var jumpMaxHeight = jumpSpeed * jumpSpeed / (2 * g) + currentHeight;
	var timeToReachMaxHeight = jumpSpeed /g;
	var maxLateralDistance = jumpSpeed * 2 * timeToReachMaxHeight;	

	Debug.Log(platformName + ":- Current height: " + currentHeight + ", Destination height: " + destHeight +
				  ", Max jump height: " + jumpMaxHeight + ", Distance: " + latDistance + ", Max distance: " + maxLateralDistance);
	
	if( (jumpMaxHeight >= destHeight) && (currentHeight - destHeight <= dropDownThreshold) && (latDistance <= maxLateralDistance) )
	{
		Debug.Log(platformName + ":- Jump succeeded");
		return true;
	}
	else
	{
		Debug.Log(platformName + ":- Jump failed");
		return false;
	}
}

function TryVerticalWallRun()
{
	var destHeight = destination[1];
	var currentHeight = player.transform.position.y;
	var distanceOfPlayerFromWall = Mathf.Abs( (player.transform.position - destination)[playerStatescript.playerDirection] ) - transform.renderer.bounds.size[playerStatescript.playerDirection]/2;
	
	Debug.Log(platformName + ":- Player distance from wall: " + distanceOfPlayerFromWall +
				  ", Max wall distance: " + horizontalReachThreshold + ", Current height: " + currentHeight +
				  ", Destination height: " + destHeight + ", Vertical threshold: " + verticalWallRunHeightThreshold);
				  
	if( (distanceOfPlayerFromWall <= horizontalReachThreshold) && (currentHeight <= destHeight) && (destHeight - currentHeight <= verticalWallRunHeightThreshold) ) {
		Debug.Log(platformName + ":- Vertical wall run succeeded");
		return true;
	}
	else {
		Debug.Log(platformName + ":- Vertical wall run failed");
		return false;
	}
}

//when player drops from a pole or ledge to this platform, set the player location.
/*
function OnCollisionEnter(collision : Collision)
{
    if (collision.gameObject.tag == "Player")
    {
        Debug.Log(platformName + ":- Player collided with this platform");
		playerStatescript.playerOnObjectType = 0;
		playerStatescript.playerOnObjectName = platformName;
		playerStatescript.playerObObjectTag = tag;
    }
}*/