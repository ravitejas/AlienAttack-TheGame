#pragma strict

var horizontalRunThreshold : float; // max distance of wall run
var horizontalReachThreshold : float; //max distance of player from wall to start wall run

private var player : GameObject;
private var playerStatescript : PlayerState;

function Start () {
	horizontalRunThreshold = 6.5f;
	horizontalReachThreshold = 1.5f;
	player = GameObject.Find("Player");
	playerStatescript = player.GetComponent("PlayerState");	
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

function OnMouseDown()
{	
	updateTag();
	var latDistanceBetweenPlayerAndWall = Mathf.Abs( (player.transform.position - transform.position)[playerStatescript.playerDirection] ) - transform.renderer.bounds.size[playerStatescript.playerDirection]/2;
	var verticalDistanceBetweenPlayerAndWall = Mathf.Abs(player.transform.position.y - transform.position.y);
	var runDistance = transform.renderer.bounds.size[playerStatescript.playerDirection];
	
	Debug.Log(name + ":- Hor dist: " + latDistanceBetweenPlayerAndWall + ", Reach thresh: " + horizontalReachThreshold +
				  ", Ver dist: " + verticalDistanceBetweenPlayerAndWall + ", Wall height: " + transform.renderer.bounds.size.y/2 +
				  ", Run dist: " + runDistance + ", Run threshold: " + horizontalRunThreshold);
	
	//check conditions
	if( playerStatescript.playerOnObjectType == 0 && 	//player is on a platform
		verticalDistanceBetweenPlayerAndWall <= transform.renderer.bounds.size.y/2 && 	//player is at the same height as the wall
		runDistance <= horizontalRunThreshold && 		//Wall is short enough to run across
		latDistanceBetweenPlayerAndWall <= horizontalReachThreshold //player is horizontally close enough to start running
	  )
	{
		Debug.Log(name + ":- Player is on platform: " + playerStatescript.playerOnObjectName);
		//Determine the direction of the wall run
		if( (player.transform.position - transform.position)[playerStatescript.playerDirection] < 0 )
		{
			//Left wall run
			if(playerStatescript.playerDirection == 0) {
				player.transform.position.x = transform.position.x + transform.renderer.bounds.size.x/2 + player.transform.renderer.bounds.size.x;
			}
			else if(playerStatescript.playerDirection == 2) {
				player.transform.position.z = transform.position.z + transform.renderer.bounds.size.z/2 + player.transform.renderer.bounds.size.z;
			}	
		}
		else
		{
			//Right wall run
			if(playerStatescript.playerDirection == 0) {
				player.transform.position.x = transform.position.x - transform.renderer.bounds.size.x/2 - player.transform.renderer.bounds.size.x;
			}
			else if(playerStatescript.playerDirection == 2) {
				player.transform.position.z = transform.position.z - transform.renderer.bounds.size.z/2 - player.transform.renderer.bounds.size.z;
			}
		}
		Debug.Log(name + ":- Hor wall run succeeded");
		playerStatescript.playerObObjectTag = tag;
		//TODO update new platform name for playerOnObjectName
	}
	else
	{
		Debug.Log(name + ":- Hor wall run failed");
	}
	
}