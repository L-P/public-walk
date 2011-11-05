<?php
require_once 'base.inc.php';

$lat	= Utils::getGet('lat');
$lng	= Utils::getGet('lng');
$radius	= Utils::getGet('radius', 0.005);

if(empty($lat) OR empty($lng))
	throw new \Exception("Missing parameter lat or lng.");

$pos = (object) array(
	'lat' => $lat,
	'lng' => $lng,
);

$kml = Utils::getKml();

$ok = array();
foreach($kml as $v) {
	$x = abs($v->lat - $pos->lat);
	$y = abs($v->lng - $pos->lng);
	$y *= .6; // Try to get a circle, the original longitude gives an oval.

	if(($x > $radius) OR ($y > $radius) OR (sqrt($x*$x + $y*$y) > $radius))
		continue;

	$ok[] = $v;
}

header('Content-Type: application/json; charset=UTF-8');
echo json_encode($ok);
