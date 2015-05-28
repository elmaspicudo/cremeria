<?php
include_once("lib/bd.php"); 
 
  switch ($_GET['listado']) {
					case 1:
							extract ($_REQUEST);
							$qry="SELECT cveDireccion, pa_cvePais,edo_cveEstado,mun_cveMunicipio,calle,colonia,numeroInterior,numeroExterior,localidad,codigoPostal,cvePersona,tipoPersona
										 FROM direccion WHERE cveDireccion=";					
							$noAnuncios=$bd->ExecuteE($qry);								
																
							$grid=array('total_reg'=>count($noAnuncios),'data'=>$noAnuncios);	
						break;
					case 2:
							if(isset($_POST['query'])){$where=' AND descripcion LIKE "%'.$_POST['query'].'%"';}else{$where='';}					
							$qry="SELECT cveProducto,descripcion FROM producto WHERE activo=1".$where;					
							$noAnuncios=$bd->ExecuteE($qry);																		
							$grid=array('success'=>true,'total_reg'=>count($noAnuncios),'data'=>$noAnuncios);	
						break;
					case 3: if(isset($_POST['query'])){$where=' AND razonSocial LIKE "%'.$_POST['query'].'%"';}else{$where='';}	
							$qry="SELECT cveCliente,razonSocial FROM clientes WHERE activo=1".$where;					
							$noAnuncios=$bd->ExecuteE($qry);																		
							$grid=array('success'=>true,'total_reg'=>count($noAnuncios),'data'=>$noAnuncios);	
						break;
						
					case 4: extract ($_REQUEST);
							$qry="SELECT cveProveedor,PrazonSocial,Prfc FROM proveedores WHERE cveProveedor=".$cve;					
							$noAnuncios=$bd->ExecuteE($qry);																		
							$grid=array('success'=>true,'total_reg'=>count($noAnuncios),'data'=>$noAnuncios);	
						break;
					case 5: if(isset($_POST['cve'])){$where=' AND cveProducto = '.$_POST['cve'];}else{$where='';}	
							$qry="SELECT precioUnitario,unidad,cveProducto FROM producto WHERE activo=1".$where;					
							$noAnuncios=$bd->ExecuteE($qry);																		
							$grid=array('success'=>true,'total_reg'=>count($noAnuncios),'data'=>$noAnuncios);	
						break;	
					}
					
					echo  json_encode($grid); 
?>
