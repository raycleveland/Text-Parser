<?php

//htmlentities
if(isset($_REQUEST['htmlentities'])) {
	die(htmlentities($_REQUEST['htmlentities']));
}