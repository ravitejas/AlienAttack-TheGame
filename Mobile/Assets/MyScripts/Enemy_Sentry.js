#pragma strict

public var patrolPoints : Transform[];	//Points the agent will patrol between
public var patrolSpeed : float;			//Speed the agent will move
public var zAxis : boolean;				//Check when agent needs to be translated across z-axis
public var setRotation:boolean = true;	//Toggles enemy rotation
private var numPoints : int;			//Number of patrol points	
private var currPoint : int;			//Current patrol point being moved towards
private var playerState : PlayerState;	//State of the player
private var isTriggered : boolean;		//Ensures multiple collision calls can't happen
private var anim : Animation;			//Sentry animation
	

function Start () {
	//Get the player state script
	playerState = GameObject.Find("Player").GetComponent(PlayerState);
	//Get the number of patrol points set
	numPoints = patrolPoints.Length;
	//Set the current patrol point
	currPoint = 0;
	//Set the intial trigger
	isTriggered = false;
	//Get the animation
	anim = transform.FindChild("alien").GetComponent(Animation);
}

function Update () {
	//Only patrol when the player is playing the game
	if(playerState.myState == State.inGame || playerState.myState == State.invincible){
		//Calculate the distance between the agent and the current patrol point 
	 	var dist : float;
	 	if(zAxis){
	 		dist = transform.position.z - patrolPoints[currPoint].position.z;
	 	}else{
			dist = transform.position.x - patrolPoints[currPoint].position.x;
		}
		//Check if you have reached the patrol point
		if(Mathf.Abs(dist) > .1f){
			//Translate the player based on speed
			var translate : float = Time.deltaTime * patrolSpeed;
			//Ensure agent translates in the right direction
			if(dist > 0f){
				translate *= -1.0f;
			}
			//Translate the player on the axis specified
			if(zAxis){
				transform.Translate(transform.forward*translate);
			}else{
				transform.Translate(transform.right*translate);
			}
		}else{
			//Reached the current point, updated the current patrol point counter
			currPoint++;
			//Check if you have reached the end of the patrol points
			if(currPoint == numPoints){
				//Reset patrol point counter
				currPoint = 0;
			}
			//Rotate the agent to face the correct way
			if(setRotation){
				if(transform.rotation.y == 180.0f){
					transform.Rotate(transform.up,-180.0f);
				}else{
					transform.Rotate(transform.up,180.0f);
				}
			}
		}
		anim.CrossFade("Walk");
	}
}

function OnTriggerEnter(collider: Collider){
	//Check that collision happened between a sentry and the player, and hasn't already been detected
	if(collider.gameObject.transform.name.Equals("Player") && !isTriggered){
		//Set the flag
		isTriggered = true;
		//Perform the action
		SentryAction();
	}
}

function SentryAction(){
	//Action only occurs if player is not invincible
	if(playerState.myState != State.invincible){
		//Player got collided with enemy sentry, change state to losing state
		Debug.Log("Sentry Hit Player");
		playerState.myState = State.loseGame;
		PlayerPrefs.SetInt("GameOver",1);
	}
	//Reset the flag
	isTriggered = false;
}