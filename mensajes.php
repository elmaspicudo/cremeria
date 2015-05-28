<?php 
session_start();
include_once 'lib/mnpBD.class.php';
 
$timestamp1 = mktime(0,0,0,date('m'),date('d'),date('Y'));
//echo $timestamp1;

$qry="SELECT nada,todo,producto.descripcion as prod,ctlunidades.descripcion as uni FROM 
(SELECT cveProducto AS bprod,UnidadMedida AS bunidad,SUM(existencia) AS nada FROM inventario WHERE direccion=1 GROUP BY cveProducto, unidadMedida) AS b
INNER JOIN  
(SELECT cveProducto AS cprod,UnidadMedida AS cunidad,SUM(existencia) AS todo FROM inventario WHERE direccion=0 GROUP BY cveProducto, unidadMedida) AS c
ON bprod=cprod AND bprod=cprod
INNER JOIN ctlunidades ON bunidad=ctlunidades.cveUnidadm
INNER JOIN producto ON bprod=producto.cveProducto";//." ORDER BY ".$sort." ".$dir;	;					
							$noAnuncios=$bd->ExecuteE($qry);
							foreach($noAnuncios as $data)
							{
								$data['total']=$data['nada']-$data['todo'];
								if($data['total'] < 20)
								{
									$data['bandera']='<div style="background-color:#ffff00; width:16px; height:16px" title="quedan pocos productos"></div>';
									$men.="quedan ".$data['total'].' '.$data['prod'].':'.$data['nada']."|";
									}
								
								}							
																								
						
	//$sql='SELECT mensaje FROM avisos WHERE idUsuario='.$_SESSION["usuario_valido"].' AND timer >'.$timestamp1;
	$sql="SELECT mensaje,idAviso FROM avisos WHERE idUsuario='".$_SESSION["usuario_valido"]."' AND actividad=1";
	//echo $sql;
	$records=$bd->ExecuteE($sql);
	$i=1;
	
	foreach($records as $record){		
		$men.=$record['mensaje'].':'.$record['idAviso']."|";
		$usr=new mnpBD('avisos');
				$datos=array(0);				
				$campos='actividad';				
			$usr->actualizar($campos,$datos,"idAviso=".$record['idAviso']);
		
		}
		echo $men;
	
	
?>

