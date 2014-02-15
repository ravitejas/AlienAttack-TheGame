#pragma strict

private var rotationSpeed : float = 100.0f;
private var player : GameObject;
private var playerCamera : GameObject;
private var playerStatescript : PlayerState;
private var playerCameraScript : PlayerCameraMovement;

function Start () {
	player = GameObject.Find("Player");
	playerCamera = GameObject.Find("PlayerCamera");
	playerStatescript = player.GetComponent(PlayerState);
	playerCameraScript = playerCamera.GetComponent("PlayerCameraMovement");
}

function Update () {
	transform.Rotate(Vector3.up, rotationSpeed * Time.deltaTime);
}

function OnTriggerEnter (collidedObject : Collider)
{
    if (collidedObject.gameObject.tag == "Player")
    {
        Destroy(gameObject);
        if(this.tag == "Coin") {
        	playerStatescript.playerCoinScore +=1;
        }
        else if(this.tag == "Key") {
        	playerStatescript.playerSpecialScore +=1;
        }
        else if(this.tag == "Invincibility"){
        	playerStatescript.playerHasPowerUp = true;
        	Debug.Log("picked up poweUP");
        }
    }
}