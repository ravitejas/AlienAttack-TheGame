#pragma strict

public var dropSpeed :float;			//Speed at which the object will fall
private var playerState : PlayerState;	//State of the player
public var rotate : boolean;			//Toggles object rotation

function Start () {
	playerState = GameObject.Find("Player").GetComponent(PlayerState);
}

function Update () {
	//Check if object is rotated
	if(rotate){
		transform.Translate(-Time.deltaTime*dropSpeed,0f,0f);
	}else{
		transform.Translate(0f,-Time.deltaTime*dropSpeed,0f);
	}
}

function OnTriggerEnter(collider: Collider){
	if(collider.gameObject.transform.name.Equals("Player")){
		//Drop item only kills if player is not invincible
		if(playerState.myState != State.invincible){
			//Player got hit with falling object, change state to losing state
			Debug.Log("Falling Object Hit Player");
			playerState.myState = State.loseGame;
			PlayerPrefs.SetInt("GameOver",1);
		}
	}
}