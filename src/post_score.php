<?php include('config.php') ?>
<?php

	$query = 'INSERT INTO score (name,score,level) VALUES ("'.$_POST['name'].'",'.$_POST['score'].','.$_POST['level'].')';
	// echo $query;
	$query = mysql_query($query) or die(mysql_error());
	echo $query;
?>