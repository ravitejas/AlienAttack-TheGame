#pragma strict
private var currentMusicTime:float;
private static var instance:MusicManager;

public static function GetInstance() : MusicManager 
{
	return instance;
}
 
function Awake() 
{
	if (instance != null && instance != this) 
	{
		Destroy(this.gameObject);
		return;
	} 
	else 
	{
		instance = this;
	}
	
	DontDestroyOnLoad(this.gameObject);
}

function Start () {

	if(!PlayerPrefs.HasKey("toggleMusic"))
	{
		//The key is not in player preference.
		//Add it.
		PlayerPrefs.SetInt("toggleMusic",1);
		
		if(audio.clip)
		{
			//audio.Play();
		}
		
		audio.Play();
	}
	else
	{
		var toggleMusic = PlayerPrefs.GetInt("toggleMusic");

		if(toggleMusic == 1)
		{
			//Play music
			if(audio.clip)
			{
				audio.Play();
			}
		}
		else
		{
			//Diable music
			audio.Stop();
		}
	}

	
}

function Update(){
	currentMusicTime=audio.time;
	
		
}
 
function OnLevelWasLoaded(lvl:int){
	if(lvl == 0)
	{
		audio.time=currentMusicTime;
	}
}