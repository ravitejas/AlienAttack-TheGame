#pragma strict

private var playerState : PlayerState;	//State of the player
private var warningTrack : WarningTrack; //Warning track
private var nextDrop : float;			//Time at which the next object will drop
public var spawnRate : float;			//Rate at which objects will fall (in seconds)
public var dropItem : GameObject;		//Object that will be dropped by the enemy
public var itemLife : float;			//Time the drop item will be destroyed
public var numDropPoints : int; 		//Number of drop locations on each side
public var rotateObject : boolean;		//Rotate the object

function Start () {
	playerState = GameObject.Find("Player").GetComponent(PlayerState);
	warningTrack = GameObject.Find("WarningTrack").GetComponent(WarningTrack);
	nextDrop = 0f;
	warningTrack.itemLife = this.itemLife - 1.0f;
	warningTrack.numLanes = numDropPoints;
}

function Update () {
	//Only drop things when the player is in game
	if(playerState.myState == State.inGame || playerState.myState == State.invincible){
		//Drop an object if over the next drop time
		if(Time.time > nextDrop){
			//Update the next drop time
			nextDrop  = Time.time + spawnRate;
			//Find which side the player is on
			var playerOn : String[] = playerState.playerOnObjectName.Split("_"[0]);
			var side : String = playerOn[2];
			//Randomly choose 1 of the drop zones on the side
			var dropPosition : int = Mathf.Round(Random.Range(0f,numDropPoints - 1.0f));
			//Light up the warning track
			warningTrack.show = true;
			warningTrack.location = side+"_"+dropPosition;
			//Create a string with that location
			var dropSiteName : String = "DropZone_"+side+"_"+dropPosition;
			//Drop object from that point
			var dropSite : GameObject = GameObject.Find(dropSiteName);
			var dropObject : GameObject = Instantiate(dropItem,dropSite.transform.position, dropSite.transform.rotation);;
			//Rotate the object if needed
			if(rotateObject){
				dropObject.transform.Rotate(Vector3.forward, 90.0f);
				if(playerState.playerDirection == 2){
					dropObject.transform.Rotate(Vector3.right, 90.0f);
				}
				dropObject.GetComponent(DropItem).rotate = true;
				
			}
			//Set the object to be destroyed after a given lifespan
			Destroy(dropObject, itemLife);
		}
	}
}