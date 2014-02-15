#pragma strict

var worldCamera : Camera;
var playerCamera : Camera;
var cameraLookAt : GameObject;

private var playerStatescript : PlayerState;
private var player : GameObject;

player = GameObject.Find("Player");
playerStatescript = player.GetComponent("PlayerState");

function Start () {

}

function Update () {

	if(playerStatescript.playerOnObjectName == "Ledge_F3_SR_2")
	{
		print("The player has reached the roof!!!");
		
		playerCamera.enabled = false;
		worldCamera.enabled = true;
		
		worldCamera.transform.RotateAround(cameraLookAt.transform.position,-Vector3.up,45 * Time.deltaTime);
	}

}