#pragma strict
public var backButtonStyle : GUIStyle;

private var buttonHeight : float = 100.0f;
private var buttonWidth : float = 100.0f;
private var buttonPadding : float = 100.0f;

private var _nativeWidth : float = 960;
private var _nativeHeight : float = 600;

function OnGUI () {

	//set up scaling
	var rx : float = Screen.width / _nativeWidth ;
	var ry : float = Screen.height / _nativeHeight ;
	GUI.matrix = Matrix4x4.TRS (Vector3.zero, Quaternion.identity, new Vector3 (rx, ry, 1));
	
	if (GUI.Button (Rect(600, 500,buttonHeight + 100, buttonWidth), "BACK",backButtonStyle))
	{
		Application.LoadLevel(0);
	}
}