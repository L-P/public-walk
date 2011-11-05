<?php
require_once 'base.inc.php';

$lat	= Utils::getGet('lat');
$lng	= Utils::getGet('lng');
$radius	= Utils::getGet('radius', 0.01);

if(empty($lat) OR empty($lng))
	throw new \Exception("Missing parameter lat or lng.");

$pos = (object) array(
	'lat' => $lat,
	'lng' => $lng,
);

$kml = Utils::getKml();

$ok = array();
foreach($kml as $v) {
	if(abs($v->lat-$pos->lat) > $radius)
		continue;
	if(abs($v->lng-$pos->lng) > $radius)
		continue;

	$ok[] = $v;
}

header('Content-Type: application/json; charset=UTF-8');
echo json_encode($ok);
