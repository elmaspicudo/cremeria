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
if($_POST['listado']>0){
	$listado=$_POST['listado'];
	}else{$listado=$_GET['listado'];}
  
  switch ($_POST['listado']) {
					case 1:
							extract ($_REQUEST);
							$qry="SELECT cveDireccion,direccion.nombre AS nombreDir  ,pa_cvePais,edo_cveEstado,mun_cveMunicipio AS muncd,municipios.nombre AS mun_cveMunicipio, calle,colonia,numeroInterior,numeroExterior,localidad,codigoPostal,cvePersona,tipoPersona
FROM direccion
LEFT JOIN municipios ON municipios.idmun=mun_cveMunicipio WHERE cveDireccion=".$cve;					
							$noAnuncios=$bd->ExecuteE($qry);								
																
							$grid=array('success'=>true,'total_reg'=>count($noAnuncios),'data'=>$noAnuncios);	
						break;
					case 2:extract ($_REQUEST);
							$qry="SELECT producto.descripcion AS descripcionpro,producto.clave AS clavepro, producto.cveLinea as unid,cveProducto, lineas.descripcion as linea,producto.clave2 as clavepro2
FROM producto LEFT JOIN lineas ON lineas.cveLinea = producto.cveLinea WHERE cveProducto=".$cve;					
							$noAnuncios=$bd->ExecuteE($qry);	
								$noAnuncios[0]['descripcionpro']=utf8_encode($noAnuncios[0]['descripcionpro']);														
							$grid=array('success'=>true,'data'=>$noAnuncios);	
						break;
					case 3: extract ($_REQUEST);
							$qry="SELECT cveCliente,clave,razonSocial,rfc,calle AS clcCalle,noInterior AS clcInterior,noExterior AS clcExterior,cp AS clcPostal, colonia AS clccolonia, estado AS cveEstado, mun AS munc,nombre AS mun,usr as perfm  FROM clientes  LEFT JOIN municipios ON municipios.idmun=clientes.mun
 WHERE cveCliente=".$cve;					
							$noAnuncios=$bd->ExecuteE($qry);	
							
							for($i=0;$i < count($noAnuncios);$i++)
								{
									$noAnuncios[$i]['mun']=reem($noAnuncios[$i]['mun']);
									//$noAnuncios[$i]['label']=utf8_encode($noAnuncios[$i]['label']);
								}																	
							$grid=array('success'=>true,'data'=>$noAnuncios);
								
						break;
						
					case 4: extract ($_REQUEST);
							$qry="SELECT cveProveedor,nomCom,clave,razonSocial,rfc,calle AS clcCalle,noInterior AS clcInterior,noExterior AS clcExterior,cp AS clcPostal, colonia AS clccolonia,
estado AS cveEstado, mun AS munc,nombre AS mun FROM proveedores
 LEFT JOIN municipios ON municipios.idmun=proveedores.mun WHERE cveProveedor=".$cve;					
							$noAnuncios=$bd->ExecuteE($qry);																		
							$grid=array('success'=>true,'total_reg'=>count($noAnuncios),'data'=>$noAnuncios);	
						break;
						
					case 5: extract ($_REQUEST);
							$qry="SELECT nombre AS txtNombre ,apellidoP AS txtApaterno,apellidoM AS txtMaterno,telefono AS txtTelefono,correo AS txtCorreo  ,cveContacto AS cveContacto,tipoc AS tipoCon,cvePadre AS cvepadre,celular as txtCelular,fax as txtFax,telb as txtTelefonob,nextel as txtNextel FROM contacto WHERE cveContacto=".$cve;					
							$noAnuncios=$bd->ExecuteE($qry);																	
							$grid=array('success'=>true,'data'=>$noAnuncios);	
						break;
					case 6: extract ($_REQUEST);
							$qry="SELECT CONCAT(calle,' No int. ', numeroInterior,' No. ext.',numeroExterior) AS cal, colonia AS col, localidad AS del,municipios.nombre AS mun,estados.nombre AS edo
 FROM direccion
 LEFT JOIN municipios ON municipios.idmun=mun_cveMunicipio
 LEFT JOIN estados ON estados.idedo=edo_cveEstado WHERE cveContacto=".$cve;					
							$noAnuncios=$bd->ExecuteE($qry);																		
							$grid=array('success'=>true,'data'=>$noAnuncios);	
						break;
						case 7: extract ($_REQUEST);
							$qry="SELECT idedo AS VALUE ,nombre AS label FROM estados";					
							$noAnuncios=$bd->ExecuteE($qry);																		
							$grid=array('success'=>true,'data'=>$noAnuncios);	
						break;
						case 8: extract ($_REQUEST);
							$qry="SELECT  cveProvedor AS country,cveProducto AS cvePersona,precio AS codigoPostal, cvePrecio AS cvePrecio FROM precioprod WHERE cvePrecio=".$cve;					
							$noAnuncios=$bd->ExecuteE($qry);																		
							$grid=array('success'=>true,'data'=>$noAnuncios);	
						break;
						case 9: extract ($_REQUEST);
							$qry="SELECT cveLinea AS cvePersona,clave AS codigoPostal,descripcion FROM lineas WHERE cveLinea=".$cve;					
							$noAnuncios=$bd->ExecuteE($qry);																		
							$grid=array('success'=>true,'data'=>$noAnuncios);	
						break;
						case 10: extract ($_REQUEST);
							$qry="SELECT username AS clcExterior,PASSWORD AS clccolonia,nombre AS rfc,apellidom AS clcCalle,apellidop AS clave,permisos AS user,nivel FROM users WHERE idUsers=".$cve;					
							$noAnuncios=$bd->ExecuteE($qry);																		
							$grid=array('success'=>true,'data'=>$noAnuncios);	
						break;
						case 11: extract ($_REQUEST);
							$qry="SELECT razonSocial as razonSocialf,rfc as rfcf,calle AS clcCallef,noInterior AS clcInteriorf,noExterior AS clcExteriorf,cp AS clcPostalf, colonia AS clccoloniaf,
estado AS cveEstadof, mun AS cveMunicipiof  FROM clientes
 WHERE cveCliente=".$cve;					
							$noAnuncios=$bd->ExecuteE($qry);																		
							$grid=array('success'=>true,'data'=>$noAnuncios);
								
						break;
						case 12: extract ($_REQUEST);
							$qry="SELECT cveCotizacion,idped AS folio,razonSocial,CONCAT(nombre,' ',apellidop,' ',apellidom) AS usern,total FROM pedidos
INNER JOIN cotizacion ON pedidos.cvecotz=cveCotizacion
	INNER JOIN clientes ON clientes.cveCliente=cotizacion.cveCliente
	INNER JOIN users ON users.idUsers=cotizacion.cveUsuario WHERE idped=".$cve;	
							if($pag > 0){
								$qry="SELECT cotizacion.cveCotizacion,folio,razonSocial,CONCAT(nombre,' ',apellidop,' ',apellidom) AS usern,total,idcobro,banco,depositos.fecha,monto AS cantidad FROM cotizacion
INNER JOIN clientes ON clientes.cveCliente=cotizacion.cveCliente
INNER JOIN users ON users.idUsers=cotizacion.cveUsuario
INNER JOIN depositos ON depositos.cveCotizacion=cotizacion.cveCotizacion
WHERE cotizacion.cveCotizacion=".$cve." AND idcobro=".$pag;	
								}				
							$noAnuncios=$bd->ExecuteE($qry);
								$noA=$bd->ExecuteE($qry);
							if($noAnuncios[0]['fecha']>0){$noAnuncios[0]['fecha']=date('d/m/Y',$noAnuncios[0]['fecha']);}																	
							$grid=array('success'=>true,'data'=>$noAnuncios);
								
						break;
						case 13: extract ($_REQUEST);
							$qry="SELECT cveOrden AS idOrden,cveCotizacion AS idcot,folio,fechaC,hora,fechaExp,proveedores.razonSocial AS idCont,formaEntrega as formah,tipoEntrega as hdn_id_busqueda,estatus,telefono as telContacto,correo as emailC,CONCAT(nombre,' ',apellidoP,'',apellidoM) AS cont FROM ordencompra
LEFT JOIN proveedores ON proveedores.cveProveedor=ordencompra.cveProvedor
LEFT JOIN contacto ON contacto.cveContacto=ordencompra.cveContacto where cveOrden=".$cve;	
										
							$noAnuncios=$bd->ExecuteE($qry);	
							for($i=0;$i < count($noAnuncios);$i++)
								{
										$noAnuncios[$i]['fecD']=date('d/m/Y',$noAnuncios[$i]['fechaExp']);
										$noAnuncios[$i]['entrega']=date('d/m/Y',$noAnuncios[$i]['fechaC']);	
										
								}
							$grid=array('success'=>true,'data'=>$noAnuncios);
								
						break;
						case 14: extract ($_REQUEST);
							$qry="SELECT salidaalmacen.estatus,factura.cveFactura,cveSalida as hdnidEnr,cotizacion.folio as vigencia, factura.folioFactura AS factura,razonSocial AS cliente,CONCAT(nombre,' ',apellidop,' ',apellidom) AS telContacto,
responsable AS emailC,salidaalmacen.folio,salidaalmacen.fecha,monbrec AS nombrecom,tipodoc AS losradio FROM salidaalmacen
INNER JOIN factura ON factura.cveFactura=salidaalmacen.cveFactura
INNER JOIN cotizacion ON factura.cveCotizacion=cotizacion.cveCotizacion
INNER JOIN clientes ON clientes.cveCliente =cotizacion.cveCliente 
INNER JOIN users ON users.idUsers=cotizacion.cveUsuario WHERE cveSalida=".$cve;					
							$noAnuncios=$bd->ExecuteE($qry);	
							
							for($i=0;$i < count($noAnuncios);$i++)
								{
									$qrys="SELECT COUNT(*) FROM detalleentrada
LEFT JOIN producto ON producto.cveProducto=detalleentrada.cveProducto
LEFT JOIN lineas ON lineas.cveLinea=producto.cveLinea WHERE cveEntrada=".$cve." AND tipoO=2";	
										
							$noAnuncioss=$bd->Execute($qrys);
								$noAnuncios[$i]['fecha']=date('d/m/Y',$noAnuncios[$i]['fecha']);
								$noAnuncios[$i]['hdncont']=$noAnuncioss[0][0];
								}																	
							$grid=array('success'=>true,'data'=>$noAnuncios);
								
						break;
						case 15: extract ($_REQUEST);
							$qry="SELECT nombre as codigoPostal,idmun,dueno as country FROM municipios WHERE idmun=".$cve;					
							$noAnuncios=$bd->ExecuteE($qry);																		
							$grid=array('success'=>true,'data'=>$noAnuncios);	
						break;
					} 
					//
			 $var=json_encode($grid); 
			 $var=str_replace('[','',$var);
			 $var=str_replace(']','',$var);
			 echo  $var;
?>
