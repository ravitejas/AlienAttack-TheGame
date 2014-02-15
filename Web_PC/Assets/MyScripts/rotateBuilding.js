#pragma strict

private var rotationAngle : float = 30.0f;
private var rotationSpeed : float = 0.02f;


function Start () {

}

function Update () {

	transform.RotateAroundLocal(Vector3.up,rotationAngle * rotationSpeed * Time.deltaTime);

}