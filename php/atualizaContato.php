<?php
	
	include("conectar.php");

	$info = $_POST['contatos'];

	$data = json_decode(stripslashes($info));

	$email = $data->email;
	$date1 = $data->date1;
	$date2 = $data->date2;
	$date3 = $data->date3;
	$id = $data->id;

	

	//contact update sql
	$query = sprintf("UPDATE contact SET email = '%s', date1 = '%s', date2 = '%s', date3 = '%s' WHERE id=%d",
		
		mysql_real_escape_string($email),
		mysql_real_escape_string($date1),
		mysql_real_escape_string($date2),
		mysql_real_escape_string($date3),
		mysql_real_escape_string($id));

	$rs = mysql_query($query);

	echo json_encode(array(
		"success" => mysql_errno() == 0,
		"contatos" => array(
			"id" => $id,
			"email" => $email,
			"date1" => $date1,
			"date2" => $date2,
			"date3" => $date3
		)
	));
?>