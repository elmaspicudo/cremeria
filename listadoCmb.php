<?php
include_once("lib/bd.php"); 
function reem($texto1) {
$texto1 = str_replace('&aacute;', 'á', $texto1);
$texto1 = str_replace('&eacute;', 'é', $texto1);
$texto1 = str_replace('&iacute;', 'í', $texto1);
$texto1 = str_replace('&oacute;', 'ó', $texto1);
$texto1 = str_replace('&uacute;', 'ú', $texto1);
$texto1 = str_replace('&ntilde;', 'ñ', $texto1);

$texto1 = str_replace('&Aacute;', 'Á', $texto1);
$texto1 = str_replace('&Eacute;', 'É', $texto1);
$texto1 = str_replace('&Iacute;', 'Í', $texto1);
$texto1 = str_replace('&Oacute;', 'Ó', $texto1);
$texto1 = str_replace('&Uacute;', 'Ú', $texto1);
$texto1 = str_replace('&Ntilde;', 'Ñ', $texto1);
return $texto1;

}

							/*extract ($_REQUEST);
							$qry="SELECT idmun AS VALUE ,nombre AS label FROM municipios WHERE dueno=".$cve;					
							$noAnuncios=$bd->ExecuteE($qry);*/								
					if($query !=''){$where=' nombre like "%'.$query .'%"';}
						 extract ($_REQUEST);
						 if($id >0){
							 if($query !=''){$where=' and nombre like "%'.$query .'%"';}
							$qry="SELECT idmun AS 'value', nombre AS label FROM municipios WHERE dueno=".$id.$where;					
							$noAnuncios=$bd->ExecuteE($qry);
							for($i=0;$i < count($noAnuncios);$i++)
								{
									$noAnuncios[$i]['label']=reem($noAnuncios[$i]['label']);
									//$noAnuncios[$i]['label']=utf8_encode($noAnuncios[$i]['label']);
								}
							$grid=array('total'=>count($noAnuncios),'data'=>$noAnuncios);	
						}else{
							$qry="SELECT idedo AS 'value' ,nombre AS label FROM estados".$where;					
							$noAnuncios=$bd->ExecuteE($qry);							
							for($i=0;$i < count($noAnuncios);$i++)
								{
									$noAnuncios[$i]['label']=reem($noAnuncios[$i]['label']);
									//$noAnuncios[$i]['label']=utf8_encode($noAnuncios[$i]['label']);
									//echo $noAnuncios[$i]['label'].'<br/>';
								}
							$grid=array('total'=>count($noAnuncios),'data'=>$noAnuncios);
						}
			
			 $var=json_encode($grid); 
			 echo  $var;
			 
?>
