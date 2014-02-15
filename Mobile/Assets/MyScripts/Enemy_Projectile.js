#pragma strict

public var speed :float;				//Speed at which the object will travel
private var playerState : PlayerState;	//State of the player

function Start () {
	//Get the state of the player
	playerState = GameObject.Find("Player").GetComponent(PlayerState);
}

function Update () {
	transform.Translate(Vector3.forward * (Time.deltaTime * speed));
}

function OnTriggerEnter(collider: Collider){
	if(collider.gameObject.transform.name.Equals("Player")){
		//Projectile only kills if player is not invincible
		if(playerState.myState != State.invincible){
			//Player got hit with projectile object, change state to losing state
			Debug.Log("Projectile Hit Player");
			playerState.myState = State.loseGame;
			PlayerPrefs.SetInt("GameOver",1);
		}
	}
}
