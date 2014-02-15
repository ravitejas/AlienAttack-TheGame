#pragma strict

public var showTextToggle : boolean;
private var showText : String;
var errorButtonTexture : Texture;
private var textArea = new Rect(0,0,Screen.width, Screen.height);

function Start () {
	showTextToggle = false;
	showText = "The Villan is getting bored. \nMove into the camera. QUICK!!!";
}

//Show GameOver message
function OnGUI()
{ 
    if(showTextToggle)
    {
   		//GUI.Button (Rect(10,10, 160,160), errorButtonTexture); 
   		//TODO: Reset level
    }
}