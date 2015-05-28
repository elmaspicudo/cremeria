<?php
//instanciar un objeto global a todos los php que incluyan este archivo
$bd = new BD;

class BD{
	//datos de conexion
	var $host = "localhost";
	var $user = "net2010_bdrui";
	var $password = "admin";
	var $database = "net2010_bdrui";
	var $conn;

	//Abre la base de datos

	function  open(){
		$this->conn = mysql_connect($this->host, $this->user, $this->password) or die(mysql_error());
		mysql_select_db($this->database, $this->conn) or die (mysql_error());
	}

	// cierra la base de datos
	function close() {
		mysql_close($this->conn);
	}

	//De Aqui en adelante se definen los tipos de consultas que pueden haber

	/* Ejecuta una consulta que no devuelve resultados
	*
	*	@param string $sql  consulta SQL
	*/

	public function ExecuteNonQuery($sql){
		$this->open();
		$rs = mysql_query($sql, $this->conn);
		if($rs===false)
		{
			$error = mysql_errno($this->conn);
			return $error;
		}
		else
		{
		settype($rs, "null");
		return true;
		}
	}

	/*Ejecuta una consulta SQL
	*
	*	@param string $query Consulta SQL
	*	@return un array de registros, cada uno siendo un array asociativo de campos
	*/

	function Execute($query){

	$this->open();
	$rs = mysql_query($query, $this->conn);
	//se pasa el recordset a un array asociativo
     $my_error1 = mysql_error( $this->conn);
    if(!empty($my_error1)){
        echo $query ."<br/>";
        echo "Error: Sintaxis MySql, verifique";
        echo "Error: $my_error1";

      }
      else
      {
	$registros = array();
	while($reg=mysql_fetch_array($rs)){
	$registros[] = $reg;
	}

	return $registros;
    }
	$this->close();
	}
	function ExecuteE($query){

	$this->open();
	$rs = mysql_query($query, $this->conn);
	//se pasa el recordset a un array asociativo
     $my_error1 = mysql_error( $this->conn);
    if(!empty($my_error1)){
        echo $query ."<br/>";
        echo "Error: Sintaxis MySql, verifique";
        echo "Error: $my_error1";

      }
      else
      {
	$registros = array();
	while($reg=mysql_fetch_assoc($rs)){
	$registros[] = $reg;
	}

	return $registros;
    }
	$this->close();
	}
	/* Ejecuta una consulta devolviendo una fila (registro) con todos sus campos
	*	@param string $tableName Nombre de la tabla
	*	@param string $filter Filtro SQL para el where
	*	@return un array asociativo de campos
	*/

	function ExecuteRecord($tableName, $filter){
	$todos = $this->Execute("SELECT * FROM $tableName WHERE $filter");
	return $todos[0];
	}

	/*Ejecuta una consulta que devuelve una columna con todos sus registros
	*	@param string $tableName Nombre de la tabla
	*	@param string $field Nombre de campo a traer
	*	@param string $filter Filtro del where (por lo menos debe ser 1=1)
	*	@return un array asociativo de valores de cada registro
	*/

	function ExecuteField($tableName, $field,  $filter){
	$todos = $this->Execute("SELECT DISTINCT $field FROM $tableName WHERE $filter");
	$aux = array();
	foreach ($todos as $uno){
	$aux[] = $uno[0];
	}
	return $aux;
	}
	function ExecuteFieldf($sql){
	$todos = $this->Execute($sql);
	$aux = array();
	foreach ($todos as $uno){
	$aux[] = $uno[0];
	}
	return $aux;
	}

	/* Trae todos los registros de una tabla
	*	@param string $tableName Nombre de la tabla
	*	@param string $orden Campo por el cual ordenar (opcional)
	*	@return un array de registros, cada uno un array asociativos
	*/

	function ExecuteTable($tableName, $orden = ""){
	if($orden!="")
			return $this->Execute("SELECT * FROM ".$tableName." ORDER BY ". $orden);
	else
			return $this->Execute("SELECT * FROM ".$tableName);
	}

	/* Trae un solo valor de la base de datos
	*	@param string $query Consulta SQL (1x1)
	*	@return el valor devuelto por la consulta
	*/

	function ExecuteScalar($query){
	$this->open();
	$rs = mysql_query($query, $this->conn);
	$reg = mysql_fetch_array($rs);
	return $reg[0];
	}

	/* Devuelve la cantidad de registros de una tabla
	*	@param string $tableName Nombre de la  tabla
	*	@return Cantidad de registros
	*/

	function RecordCount($tableName, $filter=''){

	return $this->ExecuteScalar("SELECT COUNT(*) FROM ".$tableName." ".$filter);
	}

}

?>