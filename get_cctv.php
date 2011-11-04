<?php

require_once 'base.inc.php';

$lat = Utils::getGet('lat');
$lng = Utils::getGet('lng');

if(empty($lat) OR empty($lng))
	throw new \Exception("Missing parameter lat or lng.");

$kml = Utils::getKml();
foreach($kml as &$v)  {
	$v = array_map('floatval', $v);
} unset($v);

