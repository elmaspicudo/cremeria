<?php 
include_once("bd.php");

class mnpBD{
 //constructor	
 	var $con;
	var $tabla;
	function mnpBD($tabla){
 		$this->con=new BD;
		$this->tabla=$tabla;
 	}

	function insertar($cadCampos,$valor){
	$talValores=count($valor);
	$arrCampos = explode(",",$cadCampos);
	if(count($arrCampos) != $talValores)
	{ echo "imposible continuar el numero de columnas no coincide";}
	else
	{
		for($i=0;$i < $talValores;$i++)
		{
			$valores.="'".addslashes($valor[$i])."',";
		}
		$valores = substr ($valores, 0, strlen($valores) - 1);
		$qry="INSERT INTO ".$this->tabla." (".$cadCampos.") VALUES (".$valores.")";
		//echo $qry;
			if($this->con->ExecuteNonQuery($qry)==true){
				return true;
			}else{return false;}
	}
	}
	
	function actualizar($campos,$valor,$condicion){
		$arrCampos = explode(",",$campos);
	$talValores=count($valor);
	for($i=0;$i < $talValores;$i++)
	{
		$valores.=$arrCampos[$i]." = '".addslashes($valor[$i])."', ";
	}
	$valores = substr ($valores, 0, strlen($valores) - 1);
	$valores = substr ($valores, 0, strlen($valores) - 1);
	$qry="UPDATE ".$this->tabla." SET ".$valores ." Where ".$condicion;
	//echo $qry;
	if($this->con->ExecuteNonQuery($qry)==true){
			return true;
		}else{return false;}
		//if($this->con->conectar()==true){
			//return mysql_query("UPDATE usuarios SET nombre = '".$campos[0]."', apellidoPaterno = '".$campos[1]."', apellidoMaterno = '".$campos[2]."', nick = '".$campos[3]."', PASSWORD = '".$campos[4]."', tipo = '".$campos[5]."', fechaNacimiento = '".$campos[6]."' WHERE cveUsuario = ".$id);
		//}
	}
	
	function mostrar_cliente($id){
		if($this->con->conectar()==true){
			return mysql_query("SELECT nombre,apellidoPaterno,apellidoMaterno,nick,PASSWORD,tipo,fechaNacimiento FROM usuarios WHERE estado=1 AND cveUsuario=".$id);
		}
	}
	function eliminar($where){
		$qry="UPDATE ".$this->tabla." SET activo=0  WHERE ".$where;
		//echo $qry;
		if($this->con->ExecuteNonQuery($qry)==true){
			return true;
		}else{return false;}

	}
	function soloUno($sql){
			$exists = $this->Execute($sql);
				$respuesta = array();
				foreach ($exists as $existe){
				$respuesta[]=$existe[0];
					}
				return $respuesta[0];
			
	}
function repetido($campo, $valor)
{
	$mysql="SELECT COUNT(*) FROM ".$this->tabla." WHERE $campo";
	$val=$this->con->Execute($mysql);
	if($val[0][0] > 0){
			return true;
		}else{return false;}

	}
}
function aumInv($dir,$cveRef, $umd,$prod,$cantidad,$caducidad)
{
	$usr=new mnpBD('inventario');
	$datos=array($cantidad,$dir,$cveRef,$umd,$prod,$caducidad);				
	$campos='existencia,direccion,cveReferencia,unidadMedida,cveProducto,caducidad';
	$usr->insertar($campos,$datos);
	
	}
?>