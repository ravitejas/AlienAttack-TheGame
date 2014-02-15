#pragma strict

private var rotateCam : boolean;

private var player : GameObject;
private var playerCamera : GameObject;
private var rotationDirection : int;
private var rotationSpeed : float;
private var angleCounter : float;
private var yRotation : float;
private var cameraLookAt : GameObject;
private var playerStatescript : PlayerState;
private var cameraYOffsetFromPlayer : float;

function Start () {

	rotateCam = false;
	
	player = GameObject.Find("Player");	
	playerCamera = GameObject.Find("PlayerCamera");
	playerStatescript = player.GetComponent("PlayerState");
	cameraLookAt = GameObject.Find("CameraLookAt");
	
	rotationDirection = 90;
	rotationSpeed = 45.0f;
	angleCounter = 0.0f;
	yRotation = 0.0;
	cameraYOffsetFromPlayer = 10.0f;
}

public function setRotationParameters(rD : int)
{
	rotationDirection = rD;
	rotateCam = true;
}

function OnControllerColliderHit (hit : ControllerColliderHit) 
{
    var collidedObject : GameObject = hit.collider.gameObject;
    
    if(collidedObject.tag == "CameraColloider")
    {
    Debug.Log("Camera Collision Detected!!");
    	rotateCam = false;
    }
}

function Update () 
{
	if(rotateCam == true)
	{
		//this.transform.position.y = player.transform.position.y + cameraYOffsetFromPlayer;
		//this.transform.RotateAround(cameraLookAt.transform.position,-Vector3.up,rotationSpeed * Time.deltaTime);
    }
	
	/*
	if(rotateCam == true)
	{
		if(angleCounter <= 90)
		{
			angleCounter += rotationSpeed;
			if(rotationDirection < 0)
			{
				yRotation += rotationSpeed;
			}
			else
			{
				yRotation -= rotationSpeed;
			}
			
	    	playerCamera.transform.eulerAngles = Vector3(0, yRotation, 0);
	    	
	    	if(playerStatescript.playerDirection == 0) {
		 		this.transform.position.x = player.transform.position.x + 20;  		
		 	}
		 	else if(playerStatescript.playerDirection == 2) {
		 		this.transform.position.z = player.transform.position.z + 20;
		 	}
	    }
	    else
	    {
	    	angleCounter = 0.0;
	    	rotateCam = false;
	    }
    }
	*/
}