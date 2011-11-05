<?php

error_reporting(-1);

class Utils {
	public static function getGet($name, $default = null) {
		if(!array_key_exists($name, $_GET))
			return $default;

		return $_GET[$name];
	}


	public static function getKml() {
		return unserialize(file_get_contents('db.dat'));
	}

}

