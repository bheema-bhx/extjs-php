<?php
	
	include("conectar.php");

	$start = $_REQUEST['start'];
	$limit = $_REQUEST['limit'];

	$queryString = "SELECT * FROM contact LIMIT $start,  $limit";

	//Contacts sql
	$query = mysql_query($queryString) or die(mysql_error());

	//contacts looping
	$contatos = array();
	while($contato = mysql_fetch_assoc($query)) {
	    $contatos[] = $contato;
	}

	//contacts total
	$queryTotal = mysql_query('SELECT count(*) as num FROM contact') or die(mysql_error());
	$row = mysql_fetch_assoc($queryTotal);
	$total = $row['num'];

	//JSON format
	echo json_encode(array(
		"success" => mysql_errno() == 0,
		"total" => $total,
		"contatos" => $contatos
	));
?>