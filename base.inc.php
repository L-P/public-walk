<?php

error_reporting(-1);

class Utils {
	public static function getGet($name, $default = null) {
		if(!array_key_exists($name, $_GET))
			return $default;

		return $_GET[$name];
	}


	public static function getKml() {
		return array(
			array(
				'name'	=> 'Test 1',
				'lat'	=> '48.92940908174700000',
				'lng'	=> '2.15374071253510000',
			),
		);
	}

}

