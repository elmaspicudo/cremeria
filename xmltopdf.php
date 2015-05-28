<?php
//require('convierteNumLetra.php');
require('lib/bd.php');


echo '<table border="0">';
include_once("lib/mnpBD.class.php");
$x=1; 
echo '<tr>
		<td>Numero</td>
		<td>Producto</td>
		<td>Cantidad</td> 
		<td>Precio</td>
	</tr>
';
for($i=0;$i< $_GET['cunatpi']; $i++)
{
	if($_GET['cveprod'.$i]!=''){
$sql="SELECT descripcion FROM producto WHERE cveProducto=".$_GET['cveprod'.$i];
$datos=$bd->Execute($sql);
echo '<tr>
		<td>'.$x.'</td>
		<td>'.$datos[0][0].'</td>
		<td>'.$_GET['unidades'.$i].'</td> 
		<td>$'.number_format($_GET['txtTotal'.$i],2).'</td>
	</tr>
';
$total+=$_GET['txtTotal'.$i];
$x++;
	}
}
echo '<tr>
		<td></td>
		<td></td>
		<td>Total</td> 
		<td>$'.number_format($total,2).'</td>
	</tr>
	</table>
';
?>






