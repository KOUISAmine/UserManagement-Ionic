<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST,GET,OPTIONS');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

$data=json_decode(file_get_contents('php://input'));

$uid = $data->uid;
$name = $data->name;
$email = $data->email;
$pass = $data->pass;
$phone = $data->phone;
$address = $data->address;

/*
$uid = "102";
$name = "ddddd";
$email = "dddddd@ddddddda";
$pass = "dddddd";
$phone = "000000000";
$address = "0000000000000";
*/

$con = mysqli_connect("localhost", "root", "", "angularcode_auth");

if(!empty($uid) && !empty($name) && !empty($email) && !empty($pass) && !empty($phone) && !empty($address)){
    $qry_res = mysqli_query($con,'select count(*) as cnt from users where uid  ="' . $uid . '"');

    $res = mysqli_fetch_assoc($qry_res);

    if($res['cnt']==1){
        $qry_res = mysqli_query($con,"UPDATE users SET name ='".$name."', pass ='".$pass."',email = '".$email."',phone ='".$phone."',address ='".$address."' WHERE uid = '".$uid."' ");
        if ($qry_res) {
            print $res['cnt'];
            // $arr = array('msg' => "User Created Successfully!!!", 'error' => '');
            // $jsn = json_encode($arr);
            // print_r($jsn);
        } else {
            print $res['cnt'];
            // $arr = array('msg' => "", 'error' => 'Error In inserting record');
            // $jsn = json_encode($arr);
            // print_r($jsn);
        }
    }
    else
    {
        print $res['cnt'];
        // $arr = array('msg' => "", 'error' => 'User Already exists with same email');
        // $jsn = json_encode($arr);
        // print_r($jsn);
    }
}else{
    print "erreur";
}

?>