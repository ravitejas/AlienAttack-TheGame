#pragma strict

private var player : GameObject;
private var GUILabelsScript : GUILabels;
private var durationOfInvisibility : float;
private var invisibilityDurationThreshold : float; //how many seconds can player be out of view of camera before GameOver

function Start () 
{
	player = GameObject.Find("Player");
	GUILabelsScript = player.GetComponent("GUILabels");
	durationOfInvisibility = 0;
	invisibilityDurationThreshold = 1.5; 
}

//calculate if player is visible from camera.
function Update ()
{
	var screenPos : Vector3 = camera.WorldToScreenPoint (player.transform.position);
	var ray : Ray = camera.ScreenPointToRay(screenPos);
	var hit : RaycastHit;	
	Debug.DrawRay (ray.origin, ray.direction *  50, Color.yellow);
	
	if(Physics.Raycast(ray, hit, 100.0f))
	{
		if(hit.transform.gameObject.tag == "Player")
		{
			durationOfInvisibility = 0;
			GUILabelsScript.showTextToggle = false;			
		}
		else
		{
			durationOfInvisibility += Time.deltaTime;
			if(durationOfInvisibility >= invisibilityDurationThreshold)
			{	
				GUILabelsScript.showTextToggle = true;
			}			
		}
	}	
}
