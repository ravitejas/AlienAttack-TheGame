#pragma strict
var warningSound : AudioClip;


public var location : String;	//Lane that needs to be activated
public var show : boolean;		//Lane switch
public var numFloors : int;		//Number of floors on the building
public var itemLife : float;	//Life of the drop object
public var numLanes : int; 	//Number of warning tracks

function Start () {
	//Don't light up any lanes 
	show = false;
	//Disable all lanes
	Deactivate();
}

function Update () {
	//Only light up the track when item is being dropped
	if(show){
		LightUpTrack();
	}
}

function LightUpTrack(){
	//Set flag so that function only gets called once
	show = false;
	//Light up the specified lane
	for(var i = 1; i <= numFloors; i++){
		GameObject.Find("Warning_F"+i+"_"+location).renderer.enabled = true;
		if(warningSound)
		{
			audio.PlayOneShot(warningSound,1);
		}
	}
	//Wait for the object to fall
	yield WaitForSeconds(itemLife);
	//Disable the lane
	for(i = 1; i <= numFloors; i++){
		GameObject.Find("Warning_F"+i+"_"+location).renderer.enabled = false;
		audio.Stop();
	}
}

function Deactivate(){
	//Side labels
	var sides : String[] = ["_SF_","_SR_","_SB_","_SL_"];
	//For every floor
	for(var i = 1 ; i <= numFloors; i++){
		//For every side
		for(var j = 0 ; j < sides.Length; j++){
			//For every lane
			for(var k = 0 ; k < numLanes; k++){
				//Disable the icon
				GameObject.Find("Warning_F"+i+sides[j]+k).renderer.enabled = false;
			}
		}	
	}
}