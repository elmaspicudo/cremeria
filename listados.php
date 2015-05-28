<?php
session_start();
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
	$listadoe=$_POST['listado'];
	}else{$listadoe=$_GET['listado'];} 
	extract ($_REQUEST);
  
  switch ($listadoe) {
					case 1:
					     		$cond=" AND ".$consulta." like '%".$where."%'";					
							if($cond ==" AND 0 like '%0%'" || $cond == " AND  like '%%'"){$cond="";}			
								$fin=$start+$limit;
								$qry="SELECT CONCAT(PASSWORD,' ',cveCliente) AS cveCliente,cveUsuario,cveCliente AS id,clave,razonSocial,rfc,CONCAT(users.nombre,' ',users.apellidop,' ',users.apellidom) AS UNS FROM clientes
INNER JOIN users ON idUsers=cveUsuario
WHERE clientes.activo=1".$cond." ORDER BY ".$sort." ".$dir." LIMIT $start,$fin";					
								$noAnuncios=$bd->ExecuteE($qry);								
								for($i=0;$i < count($noAnuncios);$i++)
								{		
									if($noAnuncios[$i]['cveUsuario']==$_SESSION["usuario_valido"] || $noAnuncios[$i]['cveUsuario']==1)	{	
									$noAnuncios[$i]['razonSocial']='<a href="#" onclick="cargarClientes('.$noAnuncios[$i]['id'].');" title="Modificar">'.$noAnuncios[$i]['razonSocial'].'</a>';}else
									{
										$noAnuncios[$i]['razonSocial']=$noAnuncios[$i]['razonSocial'];
										}
								}
								
								$qry="SELECT count(*) AS algo FROM clientes
INNER JOIN users ON idUsers=cveUsuario
WHERE clientes.activo=1";					
								$ss=$bd->ExecuteE($qry);
								
								$grid=array('totalReg'=>$ss[0]['algo'],'data'=>$noAnuncios);	
						break;
					case 2:$cond=" AND ".$consulta." like '%".$where."%'";
					
							if($cond ==" AND 0 like '%0%'" || $cond == " AND  like '%%'"){$cond="";}	//AND  like '%%'cveProveedor
										$fin=$start+$limit;
								$qry="SELECT CONCAT(usr,' ',cveProveedor) AS cveProveedor,cveProveedor as id,clave,razonSocial,rfc FROM proveedores
WHERE proveedores.activo=1".$cond." ORDER BY ".$sort." ".$dir ." LIMIT $start,$fin";
					
								$noAnuncios=$bd->ExecuteE($qry);								
								for($i=0;$i < count($noAnuncios);$i++)
								{				
									$noAnuncios[$i]['razonSocial']='<a href="#" onclick="cargaPorveedores('.$noAnuncios[$i]['id'].');" title="Modificar">'.$noAnuncios[$i]['razonSocial'].'</a>';
								}
								$qry="SELECT count(*) AS algo FROM proveedores WHERE activo=1";					
								$ss=$bd->ExecuteE($qry);
								
								$grid=array('totalReg'=>$ss[0]['algo'],'data'=>$noAnuncios);
						break;
					case 3: $cond=" AND producto.descripcion LIKE '%".$where."%'";
							if($cond ==" AND producto.descripcion LIKE '%0%'"){$cond="";}else{
								$posicion = strrpos($where, "°");
									if ($posicion === false) {$cond=$cond;}else{
								$strlw=explode('°',$where);
								$cond=" AND producto.descripcion LIKE '%".$strlw[0]."%' AND producto.descripcion LIKE '%".$strlw[1]."%'";  }
							}
					$fin=$start+$limit;	
								
								$qry="SELECT producto.descripcion,producto.clave,clave2 as clavepro2,lineas.clave AS 'cveLinea',cveProducto FROM producto
LEFT JOIN lineas ON lineas.cveLinea=producto.cveLinea WHERE producto.activo=1".$cond." ORDER BY ".$sort." ".$dir." LIMIT $start,$fin";					
								$noAnuncios=$bd->ExecuteE($qry);	
								//echo $qry;	
								//print_r($noAnuncios);						
								for($i=0;$i < count($noAnuncios);$i++)
								{				
									$noAnuncios[$i]['precio']='<div onclick="winProductos('.$noAnuncios[$i]['cveProducto'].');" class="btnEditar" title="Agregar precio" ></div><div onclick="traerListado()" class="btnlistado" title="Ver precios" ></div>';
									$noAnuncios[$i]['descripcion']='<a href="JavaScript:void(0);" onclick="cargarProducto('.$noAnuncios[$i]['cveProducto'].');" title="Modificar">'.utf8_encode($noAnuncios[$i]['descripcion']).'</a>';
									$noAnuncios[$i]['operaciones']='<div onclick="eliminardTodo('.$noAnuncios[$i]['cveProducto'].',3);" class="btnEliminar" title="Eliminar Registro" ></div>';
								}		
								$qrys="SELECT count(*) AS algo FROM producto
LEFT JOIN lineas ON lineas.cveLinea=producto.cveLinea WHERE producto.activo=1".$cond;					
								$ss=$bd->ExecuteE($qrys);						
								$grid=array('totalReg'=>$ss[0]['algo'],'data'=>$noAnuncios,'sql'=>$qry);
						break;
						case 4: if($consulta === 0 && $where === 0){$cond="";}else{$cond=" AND ".$consulta." like '%".$where."%'";}					
								$qry="SELECT cveFactura,folioFactura,cli_cveCliente,totalIva,subtotal,total,razonSocial FROM factura
										INNER JOIN clientes ON cveCliente=cli_cveCliente".$cond." ORDER BY ".$sort." ".$dir;					
								$noAnuncios=$bd->ExecuteE($qry);								
								for($i=0;$i < count($noAnuncios);$i++)
								{				
									
									$noAnuncios[$i]['operaciones']='<input type="button" value="PDF" /><input type="button"  value="CFD" />';
								}							
								$grid=array('total_reg'=>count($noAnuncios),'data'=>$noAnuncios);
						break;
						
						case 5:	if($where ==""){$cond="";}if($where !=""){$cond=" AND nombre like '%".$where."%'";}		
								if($cond ==" AND nombre like '%0%'"){$cond='';}				
								$qry="SELECT CONCAT(nombre,' ',apellidoP,' ',apellidoM) AS nombre,cveContacto,telefono,correo FROM contacto WHERE activo=1 and tipoc=".$consulta."".$cond." and cvePadre=".$cvepadre." ORDER BY ".$sort." ".$dir."";					
								$noAnuncios=$bd->ExecuteE($qry);								
								for($i=0;$i < count($noAnuncios);$i++)
								{				
									$noAnuncios[$i]['operaciones']='<a href="#" onclick="cargarContacto('.$noAnuncios[$i]['cveContacto'].');" title="Modificar"><img width="16" height="16" src="images/tools_32.png" class="png_bg" alt="Modificar"></a><a href="#" onclick="eliminardTodo('.$noAnuncios[$i]['cveCliente'].',1);" title="Eliminar"><img width="16" height="16" src="images/bol.png" class="png_bg" alt="Eliminar"></a>';
								}
								
								$grid=array('total_reg'=>count($noAnuncios),'data'=>$noAnuncios,'sql'=>$qry);	
						break;
						case 6: extract ($_REQUEST);
								$qry="SELECT cveDireccion,direccion.nombre as nombreDir,CONCAT(calle,' No int. ', numeroInterior,' No. ext.',numeroExterior) AS cal, colonia AS col,municipios.nombre AS mun,estados.nombre AS pais
									 FROM direccion
									 LEFT JOIN municipios ON municipios.idmun=mun_cveMunicipio
									 LEFT JOIN estados ON estados.idedo=edo_cveEstado WHERE cvePersona=".$cvepadre ." and tipoPersona=".$consulta;//." ORDER BY ".$sort." ".$dir;	;					
							$noAnuncios=$bd->ExecuteE($qry);
							for($i=0;$i < count($noAnuncios);$i++)
								{				
									$noAnuncios[$i]['mun']=reem($noAnuncios[$i]['mun']);
									$noAnuncios[$i]['pais']=reem($noAnuncios[$i]['pais']);
									$noAnuncios[$i]['operaciones']='<a href="#" onclick="cargarDireccion('.$noAnuncios[$i]['cveDireccion'].');" title="Modificar"><img width="16" height="16" src="images/tools_32.png" class="png_bg" alt="Modificar"></a><a href="#" onclick="eliminardTodo('.$noAnuncios[$i]['cveDireccion'].',1);" title="Eliminar"><img width="16" height="16" src="images/bol.png" class="png_bg" alt="Eliminar"></a>';
								}																		
							$grid=array('total_reg'=>count($noAnuncios),'data'=>$noAnuncios);	
						break;
						case 7: extract ($_REQUEST);
							$fin=$start+$limit;
								if($_SESSION['permisos']==1){$wher='';}else{$wher="and cotizacion.cveUsuario=".$_SESSION["usuario_valido"];}
								$qry="SELECT cveCotizacion,folio,razonSocial,CONCAT(nombre,' ',apellidoP,' ',apellidoM) AS contacto,fecha,vigencia,estatus FROM cotizacion
	INNER JOIN clientes ON clientes.cveCliente=cotizacion.cveCliente
	INNER JOIN contacto ON contacto.cveContacto=cotizacion.cveContacto WHERE estatus < 4 $wher LIMIT $start,$fin";;//." ORDER BY ".$sort." ".$dir;	;					
							$noAnuncios=$bd->ExecuteE($qry);
							for($i=0;$i < count($noAnuncios);$i++)
								{
									$algo=$noAnuncios[$i]['cveCotizacion'];
									$noAnuncios[$i]['cveCotizacion']='<a href="#" onclick="cargaCotz('.$noAnuncios[$i]['cveCotizacion'].')" >'.$noAnuncios[$i]['folio'].'</a>';
									 switch ($noAnuncios[$i]['estatus']) {
										 	case 1:	$noAnuncios[$i]['estatus']='<img src="img/paloma.png" width="18" height="18" />';										
											break;
										 	case 2:	$noAnuncios[$i]['estatus']='<img src="img/interroga.png" width="18" height="18" />';										
											break;
											case 3:$noAnuncios[$i]['estatus']='<img src="img/tache.png" width="18" height="18" />';									
											break;
										 }
										 $noAnuncios[$i]['fecha']=date('d/m/Y',$noAnuncios[$i]['fecha']);
									if($_SESSION["permisos"] ==1 ){
									$noAnuncios[$i]['oper'].='<a href="#" onclick="cambiarStatus('.$algo.',0)" >Eliminar</a>';
									}
									}	
								$qry="SELECT cveCotizacion,folio,razonSocial,CONCAT(nombre,' ',apellidoP,' ',apellidoM) AS contacto,fecha,vigencia,estatus FROM cotizacion
	INNER JOIN clientes ON clientes.cveCliente=cotizacion.cveCliente
	INNER JOIN contacto ON contacto.cveContacto=cotizacion.cveContacto WHERE estatus < 4 and cotizacion.cveUsuario=".$_SESSION["usuario_valido"];					
								$ss=$bd->ExecuteE($qry);
								
								$grid=array('totalReg'=>$ss[0]['algo'],'data'=>$noAnuncios);	
						break;
						case 8: extract ($_REQUEST);
						$fin=$start+$limit;
										$qry="SELECT nada,todo,producto.descripcion as prod,ctlunidades.descripcion as uni FROM 
(SELECT cveProducto AS bprod,UnidadMedida AS bunidad,SUM(existencia) AS nada FROM inventario WHERE direccion=1 GROUP BY cveProducto, unidadMedida) AS b
INNER JOIN  
(SELECT cveProducto AS cprod,UnidadMedida AS cunidad,SUM(existencia) AS todo FROM inventario WHERE direccion=0 GROUP BY cveProducto, unidadMedida) AS c
ON bprod=cprod AND bprod=cprod
INNER JOIN ctlunidades ON bunidad=ctlunidades.cveUnidadm
INNER JOIN producto ON bprod=producto.cveProducto"." LIMIT $start,$fin";//." ORDER BY ".$sort." ".$dir;	;					
							$noAnuncios=$bd->ExecuteE($qry);
							foreach($noAnuncios as $data)
							{
								$data['total']=$data['nada']-$data['todo'];
								if($data['total'] < 20)
								{
									$data['bandera']='<div style="background-color:#ffff00; width:16px; height:16px" title="quedan pocos productos"></div>';
									}
								else{$data['bandera']='<div style="background-color:red; width:16px; height:16px"></div>';}
								$todos[]=$data;
								}							
																								
							$qry="SELECT nada,todo,producto.descripcion,ctlunidades.descripcion FROM 
(SELECT cveProducto AS bprod,UnidadMedida AS bunidad,SUM(existencia) AS nada FROM inventario WHERE direccion=1 GROUP BY cveProducto, unidadMedida) AS b
INNER JOIN  
(SELECT cveProducto AS cprod,UnidadMedida AS cunidad,SUM(existencia) AS todo FROM inventario WHERE direccion=0 GROUP BY cveProducto, unidadMedida) AS c
ON bprod=cprod AND bprod=cprod
INNER JOIN ctlunidades ON bunidad=ctlunidades.cveUnidadm
INNER JOIN producto ON bprod=producto.cveProducto";					
								$ss=$bd->ExecuteE($qry);
								$m=count($ss);
								$grid=array('totalReg'=>$m,'data'=>$todos);	
						break;
						case 9: extract ($_REQUEST);
								$qry="SELECT idped,razonSocial,CONCAT(nombre,' ',apellidoP,' ',apellidoM) AS contacto,pedidos.fecha,vigencia,pedidos.estatus,folio FROM pedidos
INNER JOIN cotizacion ON cotizacion.cveCotizacion=pedidos.cvecotz
	INNER JOIN clientes ON clientes.cveCliente=cotizacion.cveCliente
	INNER JOIN contacto ON contacto.cveContacto=cotizacion.cveContacto WHERE pedidos.estatus=1 ";//." ORDER BY ".$sort." ".$dir;	;					
							$noAnuncios=$bd->ExecuteE($qry);
							for($i=0;$i < count($noAnuncios);$i++)
								{
									$noAnuncios[$i]['folio']='<a href="#" onclick="realPedido('.$noAnuncios[$i]['idped'].')" >'.$noAnuncios[$i]['idped'].'</a>';
									 	$noAnuncios[$i]['vigencia']=date('d/m/Y',$noAnuncios[$i]['vigencia']);
										 $noAnuncios[$i]['fecha']=date('d/m/Y',$noAnuncios[$i]['fecha']);
										 $noAnuncios[$i]['user']='Miguel Pantaleon';
									}	
																								
							$grid=array('total_reg'=>count($noAnuncios),'data'=>$noAnuncios);	
						break;
						case 10: extract ($_REQUEST);
								$qry="SELECT cvePrecio,ctlunidades.descripcion as razonSocial, producto.descripcion, precioprod.precio FROM precioprod
INNER JOIN ctlunidades ON ctlunidades.cveUnidadm= precioprod.cveProvedor
INNER JOIN producto ON producto.cveProducto=precioprod.cveProducto WHERE precioprod.cveProducto=".$_POST['where'];//." ORDER BY ".$sort." ".$dir;	;					
							$noAnuncios=$bd->ExecuteE($qry);
							for($i=0;$i < count($noAnuncios);$i++)
								{
									$noAnuncios[$i]['descripcion']='<a href="#" onclick="traerDatos('.$noAnuncios[$i]['cvePrecio'].')" >'.$noAnuncios[$i]['descripcion'].'</a>';
									 	$noAnuncios[$i]['operaciones']='<a href="#" onclick="eliminar('.$noAnuncios[$i]['cvePrecio'].')" >Eliminar</a>';
									}
																														
							$grid=array('total_reg'=>count($noAnuncios),'data'=>$noAnuncios);	
						break;
						case 11: extract ($_REQUEST);
						if($sort==''){$sort='cveLinea';}
								$qry="SELECT cveLinea,clave,descripcion FROM lineas where activo=1 ORDER BY ".$sort;				
							$noAnuncios=$bd->ExecuteE($qry);
							for($i=0;$i < count($noAnuncios);$i++)
								{
									$noAnuncios[$i]['clave']='<a href="#" onclick="traerDatoslinea('.$noAnuncios[$i]['cveLinea'].')" >'.$noAnuncios[$i]['clave'].'</a>';
									 	$noAnuncios[$i]['operaciones']='<a href="#" onclick="eliminarLinea('.$noAnuncios[$i]['cveLinea'].',7)" >Eliminar</a>';
									}
																														
							$grid=array('total_reg'=>count($noAnuncios),'data'=>$noAnuncios);	
						break;
						case 12:
					     		if($consulta == 0 && $where == 0){$cond="";}else{$cond=" WHERE ".$consulta." like '%".$where."%'";}					
								$qry="SELECT idUsers AS cveCliente,username AS id,CONCAT(nombre,' ',apellidop,' ',apellidom) AS razonSocial FROM users".$cond." ORDER BY ".$sort." ".$dir;					
								$noAnuncios=$bd->ExecuteE($qry);								
								for($i=0;$i < count($noAnuncios);$i++)
								{				
									$noAnuncios[$i]['razonSocial']='<a href="#" onclick="cargarClientes('.$noAnuncios[$i]['cveCliente'].');" title="Modificar">'.$noAnuncios[$i]['razonSocial'].'</a>';
								}
								
								$grid=array('total_reg'=>count($noAnuncios),'data'=>$noAnuncios);	
						break;
						case 13: extract ($_REQUEST);
								$qry="SELECT cveCotizacion,folio,razonSocial,CONCAT(nombre,' ',apellidoP,' ',apellidoM) AS contacto,fecha,vigencia,estatus FROM cotizacion
	INNER JOIN clientes ON clientes.cveCliente=cotizacion.cveCliente
	INNER JOIN contacto ON contacto.cveContacto=cotizacion.cveContacto WHERE estatus > 4 and cotizacion.cveUsuario=".$_SESSION["usuario_valido"];//." ORDER BY ".$sort." ".$dir;	;					
							$noAnuncios=$bd->ExecuteE($qry);
							for($i=0;$i < count($noAnuncios);$i++)
								{
									
									$noAnuncios[$i]['oper']='<a href="#" onclick="traerDev('.$noAnuncios[$i]['cveCotizacion'].')" >Devolucion </a><a href="#" onclick="copiar('.$noAnuncios[$i]['cveCotizacion'].')" >copiar</a>';
									if($_SESSION["permisos"] ==1 ){
									$noAnuncios[$i]['oper'].='<a href="#" onclick="cambiarStatus('.$noAnuncios[$i]['cveCotizacion'].',0)" >Eliminar</a>';}
									
										$noAnuncios[$i]['vigencia']=date('d/m/Y',$noAnuncios[$i]['vigencia']);
										 $noAnuncios[$i]['fecha']=date('d/m/Y',$noAnuncios[$i]['fecha']);
									}	
																								
							$grid=array('total_reg'=>count($noAnuncios),'data'=>$noAnuncios);	
						break;
						case 14: extract ($_REQUEST);
								$qry="SELECT folio,cveCotizacion,razonSocial,CONCAT(contacto.nombre,' ',contacto.apellidoP,' ',contacto.apellidoM) AS contacto,cotizacion.fecha,cotizacion.estatus
 FROM cotizacion
INNER JOIN clientes ON clientes.cveCliente=cotizacion.cveCliente
INNER JOIN contacto ON contacto.cveContacto=cotizacion.cveContacto 
WHERE cotizacion.estatus=1";//." ORDER BY ".$sort." ".$dir;	;					
							$noAnuncios=$bd->ExecuteE($qry);
							for($i=0;$i < count($noAnuncios);$i++)
								{
									$id=$noAnuncios[$i]['folio'];
									$noAnuncios[$i]['cveCotizacion']='<a href="#" onclick="abrirFactura('.$id.',1)" >'.$id.'</a>';
									 	 $noAnuncios[$i]['fecha']=date('d/m/Y',$noAnuncios[$i]['fecha']);
										$noAnuncios[$i]['user']='Caja';
										 
									}	
																								
							$grid=array('total_reg'=>count($noAnuncios),'data'=>$noAnuncios);	
						break;
						case 15: extract ($_REQUEST);
								$qry="SELECT cveOrden,razonSocial,CONCAT(nombre,' ',apellidoP,' ',apellidoM) AS contacto,fechaC,fechaExp,estatus FROM ordencompra
	left JOIN proveedores ON proveedores.cveProveedor=ordencompra.cveOrden
	left JOIN contacto ON contacto.cveContacto=ordencompra.cveContacto WHERE estatus=1";//." ORDER BY ".$sort." ".$dir;	;					
							$noAnuncios=$bd->ExecuteE($qry);
							for($i=0;$i < count($noAnuncios);$i++)
								{
									$id=$noAnuncios[$i]['cveOrden'];
									$noAnuncios[$i]['cveOrden']='<a href="#" onclick="pagar('.$id.')" >'.$id.'</a>';
									 	$noAnuncios[$i]['vigencia']=date('d/m/Y',$noAnuncios[$i]['vigencia']);
										 $noAnuncios[$i]['fecha']=date('d/m/Y',$noAnuncios[$i]['fecha']);
										 $noAnuncios[$i]['user']='Miguel Pantaleon';
										
									}	
																								
							$grid=array('total_reg'=>count($noAnuncios),'data'=>$noAnuncios);	
						break;
						case 16: extract ($_REQUEST);
								$qry="SELECT cveOrden,razonSocial,CONCAT(nombre,' ',apellidoP,' ',apellidoM) AS contacto,fechaC,fechaExp,estatus FROM ordencompra
	left JOIN proveedores ON proveedores.cveProveedor=ordencompra.cveOrden
	left JOIN contacto ON contacto.cveContacto=ordencompra.cveContacto WHERE estatus=2";//." ORDER BY ".$sort." ".$dir;	;					
							$noAnuncios=$bd->ExecuteE($qry);
							for($i=0;$i < count($noAnuncios);$i++)
								{
									$id=$noAnuncios[$i]['cveCotizacion'];
									$noAnuncios[$i]['cveCotizacion']='<a href="#" onclick="realPedido('.$id.')" >'.$id.'</a>';
									 	$noAnuncios[$i]['vigencia']=date('d/m/Y',$noAnuncios[$i]['vigencia']);
										 $noAnuncios[$i]['fecha']=date('d/m/Y',$noAnuncios[$i]['fecha']);
										 $noAnuncios[$i]['user']='Miguel Pantaleon';
										 $noAnuncios[$i]['operaciones']='
										 <a href="#" onclick="setStatus(5,'.$id.')" >Facturar</a>
										 <a href="#" onclick="setStatus(1,'.$id.')" >Regresar Ventas </a>';
									}	
																								
							$grid=array('total_reg'=>count($noAnuncios),'data'=>$noAnuncios);	
						break;
							case 17: extract ($_REQUEST);
								extract ($_REQUEST);
								$qry="SELECT cveFactura,folioFactura,factura.razonSocial,CONCAT(contacto.nombre,' ',contacto.apellidoP,' ',contacto.apellidoM) AS contacto,CONCAT(users.nombre,' ',users.apellidop,' ',users.apellidom) AS USER,factura.fecha,serie FROM factura
INNER JOIN cotizacion ON cotizacion.cveCotizacion=factura.cveCotizacion
LEFT JOIN clientes ON clientes.cveCliente=cotizacion.cveCliente
INNER JOIN contacto ON contacto.cveContacto=cotizacion.cveContacto
INNER JOIN users ON users.idUsers=cotizacion.cveUsuario WHERE tipodoc=3";//." ORDER BY ".$sort." ".$dir;	;					
							$noAnuncios=$bd->ExecuteE($qry);
							for($i=0;$i < count($noAnuncios);$i++)
								{
									$id=$noAnuncios[$i]['cveFactura'];
									$noAnuncios[$i]['cveCotizacion']='<a href="#" onclick="abrirFactura('.$id.',2)" >'.$noAnuncios[$i]['folioFactura'].'</a>';
										 $noAnuncios[$i]['fecha']=date('d/m/Y',$noAnuncios[$i]['fecha']);
										 $noAnuncios[$i]['operaciones']='<a href="#" onclick="realPedido('.$id.')" >PDF</a>'.'<a href="#" onclick="realPedido('.$id.')" >XML</a>';
										 
									}	
																								
							$grid=array('total_reg'=>count($noAnuncios),'data'=>$noAnuncios,'sql'=>$qry);	
						break;
						case 18: extract ($_REQUEST);
								extract ($_REQUEST);
								$qry="SELECT cveFactura,folioFactura,factura.razonSocial,CONCAT(contacto.nombre,' ',contacto.apellidoP,' ',contacto.apellidoM) AS contacto,CONCAT(users.nombre,' ',users.apellidop,' ',users.apellidom) AS USER,factura.fecha,serie FROM factura
INNER JOIN cotizacion ON cotizacion.cveCotizacion=factura.cveCotizacion
LEFT JOIN clientes ON clientes.cveCliente=cotizacion.cveCliente
INNER JOIN contacto ON contacto.cveContacto=cotizacion.cveContacto
INNER JOIN users ON users.idUsers=cotizacion.cveUsuario WHERE tipodoc=2";//." ORDER BY ".$sort." ".$dir;	;					
							$noAnuncios=$bd->ExecuteE($qry);
							for($i=0;$i < count($noAnuncios);$i++)
								{
									$id=$noAnuncios[$i]['cveFactura'];
										 $noAnuncios[$i]['fecha']=date('d/m/Y',$noAnuncios[$i]['fecha']);
										 $noAnuncios[$i]['operaciones']='<a href="#" onclick="realPedido('.$id.')" >PDF</a>';
										 
									}	
																								
							$grid=array('total_reg'=>count($noAnuncios),'data'=>$noAnuncios);	
						break;
						case 19: extract ($_REQUEST);
								extract ($_REQUEST);
								$qry="SELECT cveFactura,folioFactura,factura.razonSocial,CONCAT(contacto.nombre,' ',contacto.apellidoP,' ',contacto.apellidoM) AS contacto,CONCAT(users.nombre,' ',users.apellidop,' ',users.apellidom) AS user,factura.fecha,serie FROM factura
	INNER JOIN cotizacion ON cotizacion.cveCotizacion=factura.cveCotizacion
	INNER JOIN clientes ON clientes.cveCliente=factura.cveCliente
	INNER JOIN contacto ON contacto.cveContacto=cotizacion.cveContacto
	INNER JOIN users ON users.idUsers=cotizacion.cveUsuario WHERE tipodoc=1";//." ORDER BY ".$sort." ".$dir;	;					
							$noAnuncios=$bd->ExecuteE($qry);
							for($i=0;$i < count($noAnuncios);$i++)
								{
									$id=$noAnuncios[$i]['cveFactura'];
										 $noAnuncios[$i]['fecha']=date('d/m/Y',$noAnuncios[$i]['fecha']);
										 $noAnuncios[$i]['operaciones']='<a href="#" onclick="realPedido('.$id.')" >PDF</a>'.'<a href="#" onclick="realPedido('.$id.')" >XML</a>';
										 
									}	
																								
							$grid=array('total_reg'=>count($noAnuncios),'data'=>$noAnuncios);	
						break;
						case 20: extract ($_REQUEST);
								extract ($_REQUEST);
								$qry="SELECT cveFactura,folioFactura,razonSocial,CONCAT(contacto.nombre,' ',contacto.apellidoP,' ',contacto.apellidoM) AS contacto,CONCAT(users.nombre,' ',users.apellidop,' ',users.apellidom) AS USER,factura.fecha,serie 
	FROM factura
	LEFT JOIN (SELECT factura.cveCotizacion AS cotz,factura.cveFactura AS idf FROM factura WHERE tipodoc=1 ) AS fact ON idf=idFact
	LEFT JOIN cotizacion ON cotizacion.cveCotizacion=fact.cotz
	LEFT JOIN clientes ON clientes.cveCliente=factura.cveCliente
	LEFT JOIN contacto ON contacto.cveContacto=cotizacion.cveContacto
	LEFT JOIN users ON users.idUsers=cotizacion.cveUsuario WHERE tipodoc=4";//." ORDER BY ".$sort." ".$dir;	;					
							$noAnuncios=$bd->ExecuteE($qry);
							for($i=0;$i < count($noAnuncios);$i++)
								{
									$id=$noAnuncios[$i]['cveFactura'];
										 $noAnuncios[$i]['fecha']=date('d/m/Y',$noAnuncios[$i]['fecha']);
										 $noAnuncios[$i]['operaciones']='<a href="#" onclick="realPedido('.$id.')" >PDF</a>'.'<a href="#" onclick="realPedido('.$id.')" >XML</a>';
										 
									}	
																								
							$grid=array('total_reg'=>count($noAnuncios),'data'=>$noAnuncios);	
						break;
						case 21: extract ($_REQUEST);
								$qry="SELECT cveCotizacion,folio,razonSocial,CONCAT(nombre,' ',apellidoP,' ',apellidoM) AS contacto,fecha,vigencia,estatus FROM cotizacion
	INNER JOIN clientes ON clientes.cveCliente=cotizacion.cveCliente
	INNER JOIN contacto ON contacto.cveContacto=cotizacion.cveContacto WHERE estatus = 4 and cotizacion.cveUsuario=".$_SESSION["usuario_valido"];//." ORDER BY ".$sort." ".$dir;	;					
							$noAnuncios=$bd->ExecuteE($qry);
							for($i=0;$i < count($noAnuncios);$i++)
								{
									
									$noAnuncios[$i]['oper']='<a href="#" onclick="copiar('.$noAnuncios[$i]['cveCotizacion'].')" >copiar</a> ';
									if($_SESSION["permisos"] ==1 ){
									$noAnuncios[$i]['oper'].='<a href="#" onclick="cambiarStatus('.$noAnuncios[$i]['cveCotizacion'].',0)" >Eliminar</a>';}
									
										$noAnuncios[$i]['vigencia']=date('d/m/Y',$noAnuncios[$i]['vigencia']);
										 $noAnuncios[$i]['fecha']=date('d/m/Y',$noAnuncios[$i]['fecha']);
									}	
																								
							$grid=array('total_reg'=>count($noAnuncios),'data'=>$noAnuncios);	
						break;
						case 22: extract ($_REQUEST);
								$qry="SELECT cveCotizacion,idped AS folio,razonSocial,CONCAT(nombre,' ',apellidop,' ',apellidom) AS usern,cotizacion.fecha,vigencia,pedidos.estatus,total FROM cotizacion
INNER JOIN pedidos ON cvecotz=cveCotizacion
	INNER JOIN clientes ON clientes.cveCliente=cotizacion.cveCliente
	INNER JOIN users ON users.idUsers=cotizacion.cveUsuario WHERE pedidos.estatus=1";//." ORDER BY ".$sort." ".$dir;	;					
							$noAnuncios=$bd->ExecuteE($qry);
							for($i=0;$i < count($noAnuncios);$i++)
								{
									$id=$noAnuncios[$i]['folio'];
									$noAnuncios[$i]['folio']='<a href="#" onclick="abrirFactura('.$id.',1)" >'.$noAnuncios[$i]['folio'].'</a>';
									 	
									}	
																								
							$qry="SELECT count(*) AS algo FROM cotizacion
INNER JOIN pedidos ON cvecotz=cveCotizacion
	INNER JOIN clientes ON clientes.cveCliente=cotizacion.cveCliente
	INNER JOIN users ON users.idUsers=cotizacion.cveUsuario WHERE pedidos.estatus=1";					
								$ss=$bd->ExecuteE($qry);						
								$grid=array('totalReg'=>$ss[0]['algo'],'data'=>$noAnuncios);	
						break;
						case 23: extract ($_REQUEST);
								$qry="SELECT idcobro,banco,fecha,monto,cveCotizacion FROM depositos WHERE cveCotizacion=".$where;//." ORDER BY ".$sort." ".$dir;	;					
							$noAnuncios=$bd->ExecuteE($qry);
							for($i=0;$i < count($noAnuncios);$i++)
								{
									$id=$noAnuncios[$i]['cveCotizacion'];
									$noAnuncios[$i]['monto']='<a href="#" onclick="cargarProducto('.$noAnuncios[$i]['cveCotizacion'].','.$noAnuncios[$i]['idcobro'].')" >'.$noAnuncios[$i]['monto'].'</a>';
									 	$noAnuncios[$i]['fecha']=date('d/m/Y',$noAnuncios[$i]['fecha']);
									}	
																								
							$qry="SELECT count(*) AS algo FROM depositos WHERE cveCotizacion=".$where;					
								$ss=$bd->ExecuteE($qry);						
								$grid=array('totalReg'=>$ss[0]['algo'],'data'=>$noAnuncios);	
						break;
						case 24: extract ($_REQUEST);
								$qry="SELECT nombre,idmun FROM municipios WHERE dueno=".$cvepadre;//." ORDER BY ".$sort." ".$dir;	;					
							$noAnuncios=$bd->ExecuteE($qry);
							for($i=0;$i < count($noAnuncios);$i++)
								{
									$noAnuncios[$i]['nombre']='<a href="#" onclick="traerDatos('.$noAnuncios[$i]['idmun'].')" >'.$noAnuncios[$i]['nombre'].'</a>';
									 	
									}	
																								
							$qry="SELECT count(*) AS algo FROM municipios WHERE dueno=".$where;					
								$ss=$bd->ExecuteE($qry);						
								$grid=array('totalReg'=>$ss[0]['algo'],'data'=>$noAnuncios);	
						break;
					}
					
					
					echo  json_encode($grid); 
?>
