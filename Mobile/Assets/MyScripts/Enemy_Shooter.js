#pragma strict
var fireSound : AudioClip;


public var fireRate : float;			//Duration between each shot
public var projectile : GameObject;		//Projectile object being shot
private var nextFire : float;			//Time at which the next projectile will be created
private var playerState : PlayerState;	//State of the player

function Start () {
	//Initialize time to zero
	nextFire = .5f;
	//Get the state of the player
	playerState = GameObject.Find("Player").GetComponent(PlayerState);
}

function Update () {
	//Only shoot things when the player is in game
	if(playerState.myState == State.inGame || playerState.myState == State.invincible){
		//If enough time has passed since the last shot
		if(Time.time > nextFire) {
			//Update the fire time
	   		nextFire = Time.time + fireRate;
	   		//Create the projectile
	        var projectile : GameObject = Instantiate (projectile, transform.position, transform.rotation);
	        
	        if(fireSound)
	        {
	        	//playing audio
	        	audio.PlayOneShot(fireSound,1);
	        }
	        //Destroy the projectile
	        Destroy(projectile,fireRate);
	   }
	}
}