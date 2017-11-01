<?php


$url = 'https://app.alegra.com/api/v1/contacts/';
$auth = base64_encode('correo:clave');
$header = array("Authorization: Basic $auth");
$opts = array( 'http' => array ('method'=>'GET',
                                           'header'=>$header));
$ctx = stream_context_create($opts);
$result = file_get_contents($url,false,$ctx);
$datos = json_decode($result, true);

$data = '';
  $data = array();
  foreach($datos as $dato) {
   
    array_push($data, array(
    	"id" => $dato["id"],
    	"nombre" => $dato["name"],
    	"ident" =>  $dato["identification"],
    	"phone" =>  $dato["phonePrimary"],
    	"obser" =>  $dato["observations"],
    	));
    
  }
  echo json_encode(
		array(  
		"success"	=> true,
		"data"		=> $data
	));

?>
