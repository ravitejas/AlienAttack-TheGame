#pragma strict
public var rotationSpeed : float;
public var rotationDirection : int;

private var player : GameObject;
private var playerStatescript : PlayerState;
private var cameraLookAt : GameObject;
private var cameraMoveSpeed : float;
private var cameraSlack : float;
public var cameraYOffsetFromPlayer : float;
private var cameraZOffsetFromCameraLookAt : float;

function Start () {
	player = GameObject.Find("Player");
	cameraLookAt = GameObject.Find("CameraLookAt");
	playerStatescript = player.GetComponent("PlayerState");

	//cameraYOffsetFromPlayer = 15.0f;
	cameraZOffsetFromCameraLookAt = 20.0f;
	rotationSpeed = 8.0f;
	cameraMoveSpeed = 5.0f;
	cameraSlack = 0.5;
}

function Update ()
{
	//move camera in y direction to follow the player
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
	
	if(playerStatescript.playerDirection == 0) {
 		this.transform.position.x = player.transform.position.x;  		
 	}
 	else if(playerStatescript.playerDirection == 2) {
 		this.transform.position.z = player.transform.position.z;
 	}
	
	//rotate camera in x-z plane
	//this.transform.RotateAround(cameraLookAt.transform.position, -Vector3.up, rotationDirection * rotationSpeed * Time.deltaTime);	
}

