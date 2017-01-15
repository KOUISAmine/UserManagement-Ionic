<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST,GET,OPTIONS');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

$data=json_decode(file_get_contents('php://input'));
$con = mysqli_connect("localhost", "root", "", "angularcode_auth");

if(isset($data) && !empty($data))
{
    $uid = $data->uid;
    $sql = "DELETE FROM users WHERE uid = '".$uid."'";

    mysqli_query($con,$sql);
}
?>