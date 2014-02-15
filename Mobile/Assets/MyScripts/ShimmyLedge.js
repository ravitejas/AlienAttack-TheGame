#pragma strict

var verticalJumpThreshold : float; //jump from platform to ledge
var ledgeReachThreshold : float; //reach from one ledge to another ledge
var horizontalReachTreshold : float; //reach from platform to ledge

private var playerStatescript : PlayerState;
private var player : GameObject;
private var ledgeName;

function Start () {
	verticalJumpThreshold = 3.0f;
	ledgeReachThreshold = 3.5f;
	horizontalReachTreshold = 3.5f;
	
    player = GameObject.Find("Player");
    playerStatescript = player.GetComponent("PlayerState");
    
    if(name.StartsWith("Ledge")) {
    	ledgeName = name;
    }
    else if( transform.parent != null && transform.parent.name.StartsWith("Ledge") ) {
    	ledgeName = transform.parent.name;
    }
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

	//player is on a ledge
	if(playerStatescript.playerOnObjectType == 1)
	{
		Debug.Log(ledgeName + ":- Player is on a ledge");
		if(playerStatescript.playerOnObjectName == ledgeName)
		{
			Debug.Log(ledgeName + ":- Player is on this ledge. Translating horizontally");
			if(playerStatescript.playerDirection == 0) {
	 			player.transform.position.x = transform.position.x;
	 		}
	 		else if(playerStatescript.playerDirection == 2) {
	 			player.transform.position.z = transform.position.z;
	 		}
	 		playerStatescript.playerObObjectTag = tag;
		}
		else 
		{
			Debug.Log(ledgeName + ":- Player is on another ledge: " + playerStatescript.playerOnObjectName);
			var ledgeVerticalDistance = Mathf.Abs( (player.transform.position - transform.position).y );
			var ledgeHorizontalDistance = Mathf.Abs( (player.transform.position - transform.position)[playerStatescript.playerDirection] );
			
			Debug.Log(ledgeName + ":- Vert dist from ledge: " + ledgeVerticalDistance + ", Hor dist from ledge: " + ledgeHorizontalDistance + 
	    			  ", Ledge reach threshold: " + ledgeReachThreshold);
	    			  
			if( ledgeVerticalDistance <= ledgeReachThreshold && ledgeHorizontalDistance <= ledgeReachThreshold )
	    	{
	    		player.transform.position.y = transform.position.y;
	    		if(playerStatescript.playerDirection == 0) {
	 			player.transform.position.x = transform.position.x;
		 		}
		 		else if(playerStatescript.playerDirection == 2) {
		 			player.transform.position.z = transform.position.z;
		 		}
	    		playerStatescript.playerOnObjectName = ledgeName;
	    		Debug.Log(ledgeName + ":- Reached ledge.");
	    		playerStatescript.playerObObjectTag = tag;
	    	}
	    	else {
	    		Debug.Log(ledgeName + ":- Could not reach ledge.");
	    	}
		}
	}
	else //player is not on a ledge. check conditions and reach to it.
	{
		Debug.Log(ledgeName + ":- Player is not on a ledge");
		var horizontalDistance = Mathf.Abs( (player.transform.position - transform.position)[playerStatescript.playerDirection] );
		var verticalDistance = Mathf.Abs( (player.transform.position - transform.position).y );
		
		Debug.Log(ledgeName + ":- Hor dist: " + horizontalDistance + ", Hor thresh: " + horizontalReachTreshold +
				  ", Ver dist: " + verticalDistance + ", Ver thresh: " + verticalJumpThreshold);
		
		if(horizontalDistance <= horizontalReachTreshold && verticalDistance <= verticalJumpThreshold)
		{
    		Debug.Log(ledgeName + ":- The ledge is reachable.");
    		player.rigidbody.useGravity = false; //since player has to hang off of the ledge
    		player.rigidbody.constraints = RigidbodyConstraints.FreezeAll;
    		
    		player.transform.position.y = transform.position.y;
    		
    		if(playerStatescript.playerDirection == 0) {
	 			player.transform.position.x = this.transform.position.x;
	 		}
	 		else if(playerStatescript.playerDirection == 2) {
	 			player.transform.position.z = this.transform.position.z;
	 		}
    		
    		//player is on ledge now
    		playerStatescript.playerOnObjectType = 1; 
    		playerStatescript.playerOnObjectName = ledgeName;
    		playerStatescript.playerObObjectTag = tag;
	    }
		else
		{
			Debug.Log(ledgeName + ":- Cannot reach ledge");
		}
	}	
	
}