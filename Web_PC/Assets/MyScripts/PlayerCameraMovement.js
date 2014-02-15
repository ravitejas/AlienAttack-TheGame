#pragma strict

public var cameraYOffsetFromPlayer : float;

private var rotationSpeed : float;
private var rotationDirection : int;
private var player : GameObject;
private var playerStatescript : PlayerState;
private var cameraLookAt : GameObject;
private var cameraMoveSpeed : float;
private var cameraSlack : float;
private var cameraDistanceFromPlayer : float;
private var moveInPerpendicularAxis : int; //0 : don't move. 1 : move away from player. -1 : move towards player
private var perpendicularAxisMovementSpeed : float;


function Start () {
	player = GameObject.Find("Player");
	cameraLookAt = GameObject.Find("CameraLookAt");
	playerStatescript = player.GetComponent(PlayerState);

	rotationSpeed = 8.0f;
	cameraMoveSpeed = 5.0f;
	cameraSlack = 0.5;
	perpendicularAxisMovementSpeed = 0.2;
}

function Update ()
{
	MoveTowardsOrAwayFromPlayer();
	FollowPlayerInVerticalAxis();
	FollowAlongPlayerMovementAxis();
	
	//rotate camera in x-z plane
	//this.transform.RotateAround(cameraLookAt.transform.position, -Vector3.up, rotationDirection * rotationSpeed * Time.deltaTime);	
}


function MoveTowardsOrAwayFromPlayer()
{
	var currentDistance : float;
	var newDistance : float;
	
	moveInPerpendicularAxis = 0;
	if(SystemInfo.deviceType == DeviceType.Desktop)
    {
	    if(Input.GetKey(KeyCode.C))
	      	moveInPerpendicularAxis = -1;
	    	
	    else if(Input.GetKey(KeyCode.V))
	      	moveInPerpendicularAxis = 1;	    
	}
	
	if( moveInPerpendicularAxis != 0)
	{
		if(playerStatescript.playerDirection == 0) {
			currentDistance = Mathf.Abs(this.transform.position.z - player.transform.position.z);
			newDistance = Mathf.Abs(this.transform.position.z + perpendicularAxisMovementSpeed - player.transform.position.z);
			
			if( (moveInPerpendicularAxis == 1 && newDistance > currentDistance)
				||
				(moveInPerpendicularAxis == -1 && newDistance < currentDistance)
				)
	 			this.transform.position.z += perpendicularAxisMovementSpeed;
	 		else
	 			this.transform.position.z -= perpendicularAxisMovementSpeed;
	 	}
	 	else if(playerStatescript.playerDirection == 2) {
	 		currentDistance = Mathf.Abs(this.transform.position.x - player.transform.position.x);
	 		newDistance = Mathf.Abs(this.transform.position.x + perpendicularAxisMovementSpeed - player.transform.position.x);
			
			if( (moveInPerpendicularAxis == 1 && newDistance > currentDistance)
				||
				(moveInPerpendicularAxis == -1 && newDistance < currentDistance)
				)
	 			this.transform.position.x += perpendicularAxisMovementSpeed;
	 		else
	 			this.transform.position.x -= perpendicularAxisMovementSpeed;
	 	}
 	}
	
}

function FollowPlayerInVerticalAxis()
{
	var heightDifference : float;
	heightDifference = this.transform.position.y - player.transform.position.y - cameraYOffsetFromPlayer;
	if(heightDifference < 0)
	{
		this.transform.position.y += cameraMoveSpeed * Time.deltaTime;
	}
	else if	(heightDifference > cameraSlack)
	{
		this.transform.position.y -= cameraMoveSpeed * Time.deltaTime;
	}
}

function FollowAlongPlayerMovementAxis()
{
	if(playerStatescript.playerDirection == 0) {
 		this.transform.position.x = player.transform.position.x;  		
 	}
 	else if(playerStatescript.playerDirection == 2) {
 		this.transform.position.z = player.transform.position.z;
 	}	
}
