<?php
include_once 'lib/mnpBD.class.php';
$usr=new mnpBD('producto');
			extract ($_REQUEST);	
				$datos=array($descripcionpro,$clavepro,$cveLinea,$clavepro2);
				$campos='descripcion,clave,cveLinea,clave2';
				switch ($operacionD) {
					case 1:if( $usr->insertar($campos,$datos)==true){ echo'{"success":true}';}
 							else{echo utf8_encode("{success:false, errors:{reason:'Ocurrió un error al guardar los datos...' }}");} 
						break;
					case 2:$where="cveProducto=".$cveProducto;
							if( $usr->actualizar($campos,$datos,$where)==true){ echo'{"success":true}';}
 							else{echo utf8_encode("{success:false, errors:{reason:'Ocurrió un error al guardar los datos...' }}");} 
						break;
					case 3: $usr->eliminar($where);
						break;
						
					}
?>