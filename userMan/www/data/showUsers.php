<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST,GET,OPTIONS');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

$mysql_host = "localhost";
$mysql_database = "angularcode_auth";
$mysql_user = "root";
$mysql_password = "";

// Creer connexion
$conn = new mysqli($mysql_host, $mysql_user, $mysql_password,$mysql_database);

// verifier la connexion
if ($conn->connect_error) {
    die("connexion failed: " . $conn->connect_error);
} 

$sql = "SELECT * FROM users";
$result = $conn->query($sql);
$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
	$outp .= '{"uid":"'  . $rs["uid"] . '",';
    $outp .= '"name":"'  . $rs["name"] . '",';
	$outp .= '"email":"'  . $rs["email"] . '",';
	$outp .= '"pass":"'  . $rs["pass"] . '",';
	$outp .= '"phone":"'  . $rs["phone"] . '",';
    $outp .= '"address":"'   . $rs["address"] . '"}'; 
}
$outp ='{ "records":[ '.$outp.' ]}';
$conn->close();
echo($outp);
?>