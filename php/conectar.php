<?php
 
//Server
$servidor = "127.0.0.1";
 
//Username
$user = "root";
 
//Password
$senha = "bhxpro";
 
//DB name
$db = "extjscurd";
 
$conexao = mysql_connect($servidor,$user,$senha) or die (mysql_error());
 
$banco = mysql_select_db($db, $conexao) or die(mysql_error());
 
?>