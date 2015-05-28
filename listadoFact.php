<?php
include_once("lib/bd.php"); 
 extract ($_REQUEST);
							/*extract ($_REQUEST);
							$qry="SELECT idmun AS VALUE ,nombre AS label FROM municipios WHERE dueno=".$cve;					
							$noAnuncios=$bd->ExecuteE($qry);*/
switch ($_GET['oper'])
{
	
		case 1: //if($query !=''){$where=' and clave like "%'.$query .'%"';}  
		//$qrys="SELECT cveCotizacion FROM ordencompra WHERE cveOrden=".$cve;	
		//echo 	$qrys;			
							//$t=$bd->ExecuteE($qrys);
							
							$qry="SELECT cveCotizacion,cotizacion.cveCliente,cotizacion.estatus,cotizacion.cveContacto,cotizacion.cveDireccion,cotizacion.fecha,vigencia,observaciones,razonSocial,CONCAT(contacto.nombre,' ',apellidoP,' ',apellidoM) AS contacto
,direccion.nombre,CONCAT( direccion.calle,' No. Int. ', direccion.numeroInterior,' No. Ext. ', direccion.numeroExterior,' Colonia ', direccion.colonia) AS dir,correo,(SELECT COUNT(cveDetalle) FROM detallecotizacion WHERE cveCotizacion=3) AS cuantos
FROM pedidos
INNER JOIN cotizacion ON pedidos.cvecotz=cotizacion.cveCotizacion
LEFT JOIN clientes ON clientes.cveCliente=cotizacion.cveCliente
LEFT JOIN contacto ON contacto.cveContacto=cotizacion.cveContacto
LEFT JOIN direccion ON direccion.cveDireccion=cotizacion.cveDireccion  
WHERE idped=".$cve;;					
							$noAnuncios=$bd->ExecuteE($qry);
							$qry="SELECT detallecotizacion.cveProducto, detalleped.cantidad FROM detalleped 
INNER JOIN detallecotizacion ON cveDetalle=idPed
WHERE detalleped.cveCotizacion=".$cve;					
							$nos=$bd->ExecuteE($qry);
							$i=1;
							foreach($nos as $no)
							{
								$prod.=$i.'!';$i++;
								$cant.=$no['cantidad'].'!';
								}
							$noAnuncios[0]['vigencia']=date('d/m/Y',$noAnuncios[$i]['vigencia']);
							$noAnuncios[0]['fecha']=date('d/m/Y',$noAnuncios[$i]['fecha']);
							$noAnuncios[0]['prods']=$prod;	
							$noAnuncios[0]['cant']=$cant;								
							$grid=$noAnuncios;
							
		break;
		
	
	}								
			if($_GET['oper']==1 )
			{
				 $var=json_encode($grid);
				 $var=str_replace('[','',$var); 
				  $var=str_replace(']','',$var); 
			 echo  $var;
				}	else{	
			 $var=json_encode($grid); 
			 echo  $var;
				}
			
?>
