<?php 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST,GET,OPTIONS');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

	$user=json_decode(file_get_contents('php://input'));  //get user from 

$upswd = $user->pass;
$uemail = $user->mail;

        $con = mysqli_connect("localhost", "root", "", "angularcode_auth");
        $result = mysqli_query($con,'select count(*) as cnt from users where email ="' . $uemail . '" and pass="' . $upswd .'"');
        $rs = mysqli_fetch_assoc($result);

        if($rs['cnt']==1){
            session_start();
            $_SESSION['uid']=uniqid('ang_');
            print $_SESSION['uid'];
        }
?>