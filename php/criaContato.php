<?php
	
	include("conectar.php");

	$info = $_POST['contatos'];

	$data = json_decode(stripslashes($info));

	$email = $data->email;
	$date1 = $data->date1;
	$date2 = $data->date2;
	$date3 = $data->date3;
	
	$query = sprintf("INSERT INTO contact (email, date1, date2, date3) values ('%s', '%s', '%s', '%s')",
		mysql_real_escape_string($email),
		mysql_real_escape_string($date1),
		mysql_real_escape_string($date2),
		mysql_real_escape_string($date3));

	$rs = mysql_query($query);

	echo json_encode(array(
		"success" => mysql_errno() == 0,
		"contatos" => array(
			"id" => mysql_insert_id(),
			"email" => $email,
			"date1" => $date1,
			"date2" => $date2,
			"date3" => $date3
		)
	));
?>