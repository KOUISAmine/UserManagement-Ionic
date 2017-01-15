<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST,GET,OPTIONS');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

$data=json_decode(file_get_contents('php://input'));


$usrname = $data->username;
$upswd = $data->userpassword;
$uemail = $data->useremail;
$phone = $data->phone;
$address = $data->address;

/*
$usrname = "sss";
$upswd = "sss";
$uemail = "sss@sadada";
$phone = "565464545";
$address = "dsdsdsddd";
*/
$con = mysqli_connect("localhost", "root", "", "angularcode_auth");

if(!empty($usrname) && !empty($upswd) && !empty($uemail) && !empty($phone) && !empty($address)){
    $qry_res = mysqli_query($con,'select count(*) as cnt from users where email ="' . $uemail . '"');

    $res = mysqli_fetch_assoc($qry_res);

    if($res['cnt']==0){
        $qry_res = mysqli_query($con,'INSERT INTO users (name,pass,email,phone,address) values ("' . $usrname . '","' . $upswd . '","' . $uemail . '","' . $phone . '","' . $address . '")');
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