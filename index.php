<?php
/**
 * Text Parser
 */ 
?>
<!DOCTYPE html> 
<html> 
<head> 
	<title>Custom Text Parser</title> 
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" type="text/css" href="style.css"/>
	<script src="//code.jquery.com/jquery-1.8.2.min.js"></script>
	<script src="parse.js"></script>
</head> 
<body> 
<h1>Text Parser</h1>
<a href="#" class="settings top"><img src="settings.png"/></a>
<form action="" method="post">
	<fieldset class="settingContainer">
		<legend>Settings</legend>
		<!--
		<span><input type="checkbox" value="newlines" name="newlines"/> <label>Strip Newlines</label></span>
		<span><input type="checkbox" value="htmlentities" name="htmlentities"/> <label>HTML Entities</label></span>
		<span><input type="checkbox" value="addslashes" name="addslashes"/> <label>Add Slashes</label></span>
		-->
	</fieldset>
	<div class="history">
		<input type="button" class="prev button slim" value="&lt;"/>
		<input type="button" class="next button slim" value="&gt;"/>
	</div>
	<input type="submit" value="parse" class="button parse"/>
	<label class="strlength">Length <span id="char_length">0</span></label>
	<textarea name="data" id="text_input"></textarea>
</form>
</body>
</html>
