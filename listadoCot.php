<?php
include_once("lib/bd.php");
session_start();
 extract ($_REQUEST);
							/*extract ($_REQUEST);
							$qry="SELECT idmun AS VALUE ,nombre AS label FROM municipios WHERE dueno=".$cve;
							$noAnuncios=$bd->ExecuteE($qry);*/
switch ($_GET['oper'])
{
	case 1: if($query !=''){$where=' and descripcion like "%'.$query .'%" ';}
	
							$qry="SELECT cveProducto AS 'value', descripcion AS 'label' FROM producto Where activo=1 ".$where." Limit 0,30";					
							$noAnuncios=$bd->ExecuteE($qry);	
							for($i=0;$i < count($noAnuncios);$i++)
								{
									$noAnuncios[$i]['label']=utf8_encode(stripslashes($noAnuncios[$i]['label']));
								}
							$grid=array('total'=>count($noAnuncios),'data'=>$noAnuncios,'sql'=>$qry);
		break;
	case 2:  if($query !=''){$where=' And razonSocial like "%'.$query .'%"';}
							$qry="SELECT cveCliente AS 'value', razonSocial AS label FROM clientes Where cveUsuario=".$_SESSION["usuario_valido"].$where.' order by razonSocial';
							$noAnuncioss=$bd->ExecuteE($qry);
							$z=count($noAnuncioss);
							$x=1;
							
							$noAnuncios[0]['value']=	'0';
							$noAnuncios[0]['label']=	'Agregar';
							for($i=0;$i<$z;$i++)
							{
								$noAnuncios[$x]=$noAnuncioss[$i];
								$x++;
								}
							$grid=array('total'=>count($noAnuncios),'data'=>$noAnuncios);

		break;
	case 3:  if($query !=''){$where=' and nombre like "%'.$query .'%"';}
							$qry="SELECT idmun AS 'value', nombre AS label FROM municipios WHERE dueno=".$id.$where;
							$noAnuncios=$bd->ExecuteE($qry);
							$grid=array('total'=>count($noAnuncios),'data'=>$noAnuncios);
		break;
	case 4:  				$qry="SELECT cveDireccion AS 'value', nombre AS label FROM direccion WHERE  tipoPersona=1 and cvePersona=".$id."";
							$noAnuncios=$bd->ExecuteE($qry);
							$z = count($noAnuncios);
							$noAnuncios[$z]['value']=	'0';
							$noAnuncios[$z]['label']=	'Agregar';
							$grid=array('total'=>count($noAnuncios),'data'=>$noAnuncios);
		break;
	case 5:  if($query !=''){$where=' and nombre like "%'.$query .'%"';}
							$qry="SELECT cveContacto AS 'value', CONCAT(nombre,' ',apellidoP,' ',apellidoM) AS label FROM contacto WHERE tipoc=1 and cvePadre=".$id." ";
							$noAnuncios=$bd->ExecuteE($qry);
							$z = count($noAnuncios);
							$noAnuncios[$z]['value']=	'0';
							$noAnuncios[$z]['label']=	'Agregar';
							$grid=array('total'=>count($noAnuncios),'data'=>$noAnuncios,'sql'=>$qry);
		break;
		case 6:  			if($query !=''){$where='Where clave like "%'.$query .'%"';}
							if($id !='' && $id !=0){$where='Where cveCliente ='.$query;}
							$qry="SELECT cveCliente AS 'value', clave AS label FROM clientes ".$where." limit 0,10";
							$noAnuncios=$bd->ExecuteE($qry);
							$z=count($noAnuncios);
							$noAnuncios[$z]['value']=	'0';
							$noAnuncios[$z]['label']=	'Agregar';
							$grid=array('total'=>count($noAnuncios),'data'=>$noAnuncios);
		break;
		case 7:  			$qry="SELECT telefono,correo FROM contacto WHERE tipoc=1 and cveContacto=".$cve;
							$noAnuncios=$bd->ExecuteE($qry);
							$grid=array('success'=>true,'oper'=>7,'email'=>$noAnuncios[0]['correo'],'tel'=>$noAnuncios[0]['telefono']);
		break;
		case 8:  			$qry="SELECT CONCAT(calle,' No. Int. ',numeroInterior,' No. Ext. ',numeroExterior,' Colonia ',colonia) as dir FROM direccion WHERE tipoPersona=1 and cveDireccion=".$cve." ";
							$noAnuncios=$bd->ExecuteE($qry);
							$grid=array('success'=>true,'oper'=>8,'dir'=>$noAnuncios[0]['dir']);
		break;
		case 9: if($query !=''){$where=' Where clave like "%'.$query .'%" OR clave2 like "%'.$query .'%" ';}
							$qry="SELECT * FROM (SELECT cveProducto AS 'value', clave AS label FROM producto ".$where." Limit 0,15) AS ALGO UNION SELECT * FROM (SELECT cveProducto as value, clave2 as label FROM producto ".$where."  Limit 0,15) AS OTRO
							";
							$noAnuncios=$bd->ExecuteE($qry);
							$grid=array('total'=>count($noAnuncios),'data'=>$noAnuncios,'sql'=>$qry);
		break;
		case 10: 		if($query !=''){$where=' and clave like "%'.$query .'%"';}
							$qry="SELECT cveCotizacion,cotizacion.cveCliente,estatus,cotizacion.cveContacto,cotizacion.cveDireccion,fecha,vigencia,observaciones,estatus,folio,razonSocial,contacto.telefono as telContacto, CONCAT(contacto.nombre,' ',apellidoP,' ',apellidoM) AS contacto
,direccion.nombre,clientes.activo as credito,CONCAT( direccion.calle,' No.11 Int. ', direccion.numeroInterior,' No. Ext. ', direccion.numeroExterior,' Colonia ', direccion.colonia) AS dir,correo,(SELECT COUNT(cveDetalle) FROM detallecotizacion WHERE cveCotizacion=".$cve.") AS cuantos
FROM cotizacion
LEFT JOIN clientes ON clientes.cveCliente=cotizacion.cveCliente
LEFT JOIN contacto ON contacto.cveContacto=cotizacion.cveContacto
LEFT JOIN direccion ON direccion.cveDireccion=cotizacion.cveDireccion
WHERE cveCotizacion=".$cve;
							$noAnuncios=$bd->ExecuteE($qry);
							$qry="SELECT cveProducto,cantidad FROM detallecotizacion WHERE cveCotizacion=".$cve;
							$nos=$bd->ExecuteE($qry);
							$i=1;
							foreach($nos as $no)
							{
								$prod.=$i.'!';$i++;
								$cant.=$no['cantidad'].'!';
								}
							$noAnuncios[0]['vigencia']=date('d/m/Y',$noAnuncios[0]['vigencia']);
							$noAnuncios[0]['fecha']=date('d/m/Y',$noAnuncios[0]['fecha']);
							$noAnuncios[0]['prods']=$prod;
							$noAnuncios[0]['cant']=$cant;
							$grid=$noAnuncios;

		break;
		case 11:  if($query !=''){$where='Where razonSocial like "%'.$query .'%"';}
							$qry="SELECT cveUnidadm AS 'value', descripcion AS label FROM ctlunidades ".$where." ";
							$noAnuncios=$bd->ExecuteE($qry);
							$z=count($noAnuncios);
							/*$noAnuncios[$z]['value']=	'0';
							$noAnuncios[$z]['label']=	'Agregar';*/
							$grid=array('total'=>count($noAnuncios),'data'=>$noAnuncios);

		break;
		case 12: if($query !=''){$where=' and nombre like "%'.$query .'%"';}
							$qry="SELECT cveContacto AS 'value', CONCAT(nombre,' ',apellidoP,' ',apellidoM) AS label FROM contacto WHERE tipoc=2 and cvePadre=".$id." ";
							$noAnuncios=$bd->ExecuteE($qry);
							$grid=array('total'=>count($noAnuncios),'data'=>$noAnuncios);

		break;
		case 13: $where='';if($query !=''){$where=' Where clave like "%'.$query .'%"';}
							$qry="SELECT cveLinea AS 'value', clave AS label FROM lineas ".$where." ";
							$noAnuncios=$bd->ExecuteE($qry);
							$grid=array('total'=>count($noAnuncios),'data'=>$noAnuncios);

		break;
		case 14:  if($query !=''){$where=' and razonSocial like "%'.$query .'%"';}
							$qry = "SELECT cveProveedor AS 'value', razonSocial AS label FROM proveedores
									INNER JOIN precioprod ON precioprod.cveProvedor=proveedores.cveProveedor
									WHERE cveProducto=".$id.$where;
							$noAnuncios=$bd->ExecuteE($qry);
							$z=count($noAnuncios);
							$noAnuncios[$z]['value']=	'0';
							$noAnuncios[$z]['label']=	'Agregar';
							$grid=array('total'=>count($noAnuncios),'data'=>$noAnuncios);

		break;
		case 15: 	$qry="SELECT COUNT(*)AS cuant  FROM detalleped WHERE cveCotizacion=".$cve;
							$noAnuncios=$bd->ExecuteE($qry);
							$grid=$noAnuncios;

		break;
		case 16: 	$qry="SELECT count(producto.cveProducto) as jaja
FROM detallecotizacion 
INNER JOIN producto ON detallecotizacion.cveProducto=producto.cveProducto 
LEFT JOIN lineas ON producto.cveLinea=lineas.cveLinea 
WHERE detallecotizacion.cveCotizacion=".$cve;
							$noAnuncios=$bd->ExecuteE($qry);
							echo $noAnuncios[0]['jaja'];

		break;
		case 17: 	$qry="SELECT CONCAT(nombre,' ',apellidop,' ',apellidom) AS label,idUsers as value FROM users WHERE permisos=4 ORDER BY label";
							$noAnuncios=$bd->ExecuteE($qry);
							$grid=array('total'=>count($noAnuncios),'data'=>$noAnuncios);

		break;
				case 18: //if($query !=''){$where=' and clave like "%'.$query .'%"';}
							$qry="SELECT cveCliente,cveContacto,cveDireccion,razonSocial,contacto.telefono AS telContacto, CONCAT(contacto.nombre,' ',apellidoP,' ',apellidoM) AS contacto
,direccion.nombre,clientes.activo AS credito,CONCAT( direccion.calle,' No. Int. ', direccion.numeroInterior,' No. Ext. ', direccion.numeroExterior,' Colonia ', direccion.colonia) AS dir,correo,(SELECT COUNT(cveDetalle) FROM detallecotizacion WHERE cveCotizacion=".$cve.") AS cuantos
FROM clientes 
LEFT JOIN contacto ON contacto.cveContacto=1
LEFT JOIN direccion ON direccion.cveDireccion=1
WHERE cveCliente=1";
							$noAnuncios=$bd->ExecuteE($qry);
							$noAnuncios[0]['vigencia']=date('d/m/Y');
							$noAnuncios[0]['fecha']=date('d/m/Y');
							$noAnuncios[0]['prods']=$prod;
							$noAnuncios[0]['cant']=$cant;
							$grid=$noAnuncios;

		break;

	}
			if($_GET['oper']==10 || $_GET['oper']==15|| $_GET['oper']==18 )
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
