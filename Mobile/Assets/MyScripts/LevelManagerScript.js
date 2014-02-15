#pragma strict

var coinCountLevel_1 : int;
var timeChallengeLevel_1 : int; // in Seconds

var coinCountLevel_2 : int;
var timeChallengeLevel_2 : int;

var coinCountLevel_3 : int;
var timeChallengeLevel_3 : int;

var coinCountLevel_4 : int;
var timeChallengeLevel_4 : int;

function Start () {

	//Set all this data to PlayerPrefs 
	//so the data can be taken based on level.
	
	PlayerPrefs.SetInt("coinCountLevel_1",coinCountLevel_1);
	PlayerPrefs.SetInt("timeChallengeLevel_1",timeChallengeLevel_1);

	PlayerPrefs.SetInt("coinCountLevel_2",coinCountLevel_2);
	PlayerPrefs.SetInt("timeChallengeLevel_2",timeChallengeLevel_2);
	
	PlayerPrefs.SetInt("coinCountLevel_3",coinCountLevel_3);
	PlayerPrefs.SetInt("timeChallengeLevel_3",timeChallengeLevel_3);
	
	PlayerPrefs.SetInt("coinCountLevel_4",coinCountLevel_4);
	PlayerPrefs.SetInt("timeChallengeLevel_4",timeChallengeLevel_4);	
	
}

function Update () {


}