#pragma strict

var horizontalReachThreshold : float; //max distance of player from pole to start climbing
var poleClimbSpeed : float; //speed of going up or down the pole

private var player : GameObject;
private var performClimb : boolean;
private var climbStartHeight : float; //height (Y coordinate value) to start climbing from
private var climbEndHeight : float;	  //height to climb to
private var climbStartHorizontalPosition : float; //horizontal (X or Z coordinate) value of player before starting climb
private var climbEndHorizontalPosition : float; //horizontal value at end of climb
private var playerStatescript : PlayerState;
	
function Start()
{
	horizontalReachThreshold = 2.0f;
	poleClimbSpeed = 4.0f;
	player = GameObject.Find("Player");
	playerStatescript = player.GetComponent("PlayerState");
	performClimb = false;
}

function updateTag()
{
	if(playerStatescript.playerObObjectTag == "x" && (tag == "x" || tag == "corner") )
 	{
 		playerStatescript.playerDirection = 0;
 	}
 	else if(playerStatescript.playerObObjectTag == "z" && (tag == "z" || tag == "corner") )
 	{
 		playerStatescript.playerDirection = 2;
 	}
 	else if(playerStatescript.playerObObjectTag == "corner" && tag == "z" )
 	{
 		playerStatescript.playerDirection = 2;
 	}
 	else if(playerStatescript.playerObObjectTag == "corner" && tag == "x" )
 	{
 		playerStatescript.playerDirection = 0;
 	}
}

function OnMouseDown ()
 { 
 	updateTag();
 	Debug.Log(name + ":- Player is currently on: " + playerStatescript.playerOnObjectName + ", object type: " + playerStatescript.playerOnObjectType);
	var horizontalDistance = (player.transform.position - transform.position)[playerStatescript.playerDirection];
	if( Mathf.Abs(horizontalDistance) <= horizontalReachThreshold )
	{	
		climbStartHeight = player.transform.position.y;
		climbStartHorizontalPosition = transform.position[playerStatescript.playerDirection]; //player starts climbing from near the pole
		climbEndHorizontalPosition = transform.position[playerStatescript.playerDirection];
		
		//Calculate player start and end positions (vertical and horizontal)
		if(player.transform.position.y < transform.position.y) 	{			//player is below pole			
			climbEndHeight = transform.position.y + renderer.bounds.size.y/2;
		}
		else {		//player is above pole
			climbEndHeight = transform.position.y - renderer.bounds.size.y/2 + player.renderer.bounds.size.y/2;
		}
		if( horizontalDistance < 0 ) { //player is to the left of pole
			if(climbStartHeight < climbEndHeight) { //climbing up. Reach the pole and start climb
				climbStartHorizontalPosition -= (renderer.bounds.size + player.renderer.bounds.size)[playerStatescript.playerDirection]/2;
			}
			else { //climbing down. Go to other side of pole, then start climbing down
				climbStartHorizontalPosition += (renderer.bounds.size + player.renderer.bounds.size)[playerStatescript.playerDirection]/2;
			}
			climbEndHorizontalPosition += (renderer.bounds.size + player.renderer.bounds.size)[playerStatescript.playerDirection]/2;
		}
		else {  //player is to the right of pole
			if(climbStartHeight < climbEndHeight) { //climbing up. Reach the pole and start climb
				climbStartHorizontalPosition += (renderer.bounds.size + player.renderer.bounds.size)[playerStatescript.playerDirection]/2;
			}
			else { //climbing down. Go to other side of pole, then start climbing down
				climbStartHorizontalPosition -= (renderer.bounds.size + player.renderer.bounds.size)[playerStatescript.playerDirection]/2;
			}
			climbEndHorizontalPosition -= (renderer.bounds.size + player.renderer.bounds.size)[playerStatescript.playerDirection]/2;
		}
				
		Debug.Log(name + ":- Pole climb valid. Hor start: " + climbStartHorizontalPosition + ", Hor end: " + climbEndHorizontalPosition +
				  ", Vert start: " + climbStartHeight + ", Vert end: " + climbEndHeight);
		
		player.rigidbody.useGravity = false;
		player.rigidbody.constraints = RigidbodyConstraints.FreezeAll;
		//Reach start horizontal position
		if(playerStatescript.playerDirection == 0) {
			player.transform.position.x = climbStartHorizontalPosition;
		}
		else if(playerStatescript.playerDirection == 2) {
			player.transform.position.z = climbStartHorizontalPosition;
		}
		yield WaitForSeconds(0.3);		
		player.transform.position.y = climbEndHeight;
		yield WaitForSeconds(0.3);
		if(playerStatescript.playerDirection == 0) {
			player.transform.position.x = climbEndHorizontalPosition;
		}
		else if(playerStatescript.playerDirection == 2) {
			player.transform.position.z = climbEndHorizontalPosition;
		}
		playerStatescript.playerOnObjectType = 2;
		playerStatescript.playerObObjectTag = tag;
		//performClimb = true;		
	}
	else 
	{
		Debug.Log(name + ":- Player not close enough to the pole. Distance of pole to player: " + Mathf.Abs(horizontalDistance) + ". Hor threshold: " + horizontalReachThreshold);
	}
}

/*function Update()
{
	if(performClimb)
	{
		var direction : int = 0;
		if(climbStartHeight < climbEndHeight)
		{
			direction = 1;
		}
		else if(climbStartHeight > climbEndHeight)
		{
			direction = -1;
		}
		
		player.transform.position.y += direction * Time.deltaTime * poleClimbSpeed;
		
		//Debug.Log("Player coordinates. x: " + player.transform.position.x + ", y: " + player.transform.position.x
		Debug.Log(name + ":- Player coordinates: " + player.transform.position);
		//after climb is finished
		if( (direction == 1 && player.transform.position.y >= climbEndHeight)
			|| (direction == -1 && player.transform.position.y <= climbEndHeight) )
		{
			performClimb = false;			
			//Reach end horizontal position
			if(playerStatescript.playerDirection == 0) {
				player.transform.position.x = climbEndHorizontalPosition;
			}
			else if(playerStatescript.playerDirection == 2) {
				player.transform.position.z = climbEndHorizontalPosition;
			}
			Debug.Log(name + ":- Pole climb finished");
			//player.rigidbody.collider.enabled = true;
			//player.rigidbody.useGravity = true;
		}
  	}  
}*/