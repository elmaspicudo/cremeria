
<?php 
include_once 'lib/bd.php';
$ids= $_GET['data'];
$vals= $_GET['can'];
$id= $_GET['cont'];
$umd= $_GET['umd'];
$otroid=$_GET['elunid'];
//echo  setFila($ids,$vals,$bd);
switch($_GET['oper'])
{
	case 1 : echo cabz('p').creaPie('P').'<div style="height:40px"></div>'.cabz('D').creaPie('D').'';			
	break;
	case 2 : $grid =setFila($ids,$vals,0,0,$bd,$id,$umd,$otroid);
			//$grid=array('total_reg'=>count($noAnuncios),'data'=>$noAnuncios);	
			echo  json_encode($grid); 			
	break;
	case 3 : $grid = todaTabla($bd,$_GET['id']);
			 //$grid=array('total_reg'=>count($noAnuncios),'data'=>$noAnuncios);	todaTabla($bd,$id);
			echo  json_encode($grid); 			
	break;
	}
error_reporting('E_ALL & ~E_NOTICE');

function setFila($ids , $vals , $precios=0 ,$totales=0 ,$bd,$id,$umd,$otroid)
{
	if($otroid==''){$where='and clave="'.$ids.'"';}else{$where='and producto.cveProducto='.$otroid.'';}
	$sql='SELECT producto.cveProducto,producto.descripcion,producto.clave, ctlunidades.descripcion as unidad,precioprod.precio as precioUnitario , precioprod.cveProvedor FROM precioprod
INNER JOIN ctlunidades ON ctlunidades.cveUnidadm= precioprod.cveProvedor
INNER JOIN producto ON producto.cveProducto=precioprod.cveProducto WHERE
cveProvedor=3 '.$where.' ORDER BY cveProducto ASC';
//echo $sql;
	$records=$bd->ExecuteE($sql);
	$cuant=count($records);
	$record=$records[0];
	$precio=$record['precioUnitario'];
	
		$elsql='SELECT precio,cveProvedor FROM precioprod WHERE cveProducto='.$record["cveProducto"];
//echo $sql;
		$recs=$bd->ExecuteE($elsql);
		foreach($recs as $rec)
		{
			switch($rec['cveProvedor']){
				case 1: $preciomy=$rec['precio'];
				break;
				case 2:$preciomd=$rec['precio'];
				break;
				case 3:$preciomn=$rec['precio'];
				break;
			}
		}
		
		
	$sub = $precio*$vals;
	if($record['moneda']==1){$m='MNX';} else{$m='USD';}
	$fila='<tr id="trnew'.$id.'">
	<td style="text-align:left;" class="trinicio"><input type="text" id="txtCodigo'.$id.'" value="'.$record['clave'].'" class="sinborded"/>
	<input type="hidden" id="txtclave'.$id.'" value="'.$record['cveProducto'].'"/></td>
	<td class="trinicio" colspan="2">'.$record['descripcion'].'</td>
    <td style="text-align:left;" class="trinicio"><input type="text" id="txtUnidades'.$id.'" value="'.$vals.'" class="sinborded"/>
	</td><td class="trinicio"><input type="hidden" id="txtumd'.$id.'" value="3"/><input type="text" id="txtDestip'.$id.'" value="'.$record['unidad'].'" readonly="readonly" class="sinborded"/></td>
    
    <td class="trinicio" style="text-align:left"><input type="hidden" id="txtPrecio'.$id.'" value="'.$precio.'"/><div class="dock-item" ><span id="spPrecio'.$id.'">'.$precio.'</span>
			<ul>
				<li><a href="JavaScript:void(0);" onclick="cambiardat('.$id.','.$preciomy.',1)">Mayoreo :'.$preciomy.'</a><li>
				<li><a href="JavaScript:void(0);" onclick="cambiardat('.$id.','.$preciomd.',2)">Mediomayoreo :'.$preciomd.'</a><li>
				<li><a href="JavaScript:void(0);" onclick="cambiardat('.$id.','.$preciomn.',3)">Menudeo :'.$preciomn.'</a><li>
			</ul>
		</div>
	</td>
	<td class="trinicio">0</td>
    <td class="trinicio"><input type="text" id="txtSubtotal'.$id.'" value="'.$sub.'" readonly="readonly" class="sinborded" /></td>
	  <td class="trinicio"><input type="checkbox" id="txtCheck'.$id.'" class="sinborded" /></td>
	<td class="trinicio"><div onclick="elimiarTr('.$id.');" class="btnEliminar" title="Eliminar Registro" ></div></td>
</tr>';
if($oper==2)//recupera los registros //ORDER BY cveDetalle ASC
{	
	$fil=$fila;
	}else{
		$fil=array('mon'=>$m,'data'=>$fila,'total'=>$precio,'sql'=>$sql,'cuant'=>$cuant);	
	}
return $fil;
}

function todaTabla($bd,$id)
{
		$sql = 'SELECT detallecotizacion.cveProducto,cantidad,detallecotizacion.moneda,total,precioF,costo,descuento,cveDetalle,clave,detallecotizacion.unidadMedida,descripcion,detallecotizacion.total as precioUnitario
FROM detallecotizacion
INNER JOIN producto ON producto.cveProducto=detallecotizacion.cveProducto WHERE detallecotizacion.cveCotizacion='.$id;

	$records=$bd->ExecuteE($sql);
	$id=1;
	$fila='';
	$tatalsd=0;
	foreach($records as $record){
		
		$precio=$record['precioUnitario'];	
		$sub=$record['total'];
		$tatalsd+=$sub;
		if($record['moneda']==1){$m='MNX';} else{$m='USD';}
		$fila.='<tr id="trnew'.$id.'">
		<td style="text-align:left;" class="trinicio"><input type="text" id="txtCodigo'.$id.'" value="'.$record['clave'].'" class="sinborded"/>
		<input type="hidden" id="txtclave'.$id.'" value="'.$record['cveProducto'].'"/>
		
		<td style="text-align:left;" class="trinicio"><input type="text" id="txtUnidades'.$id.'" value="'.$record['descripcion'].'" class="sinborded"/>
		</td><td class="trinicio">'.$record['unidad'].'</td>
		</td><td class="trinicio">'.$record['cantidad'].'</td>
		</td><td class="trinicio">Mostrador</td>
		</td><td class="trinicio">'.$record['precioUnitario'].'</td>
		</td><td class="trinicio">0</td>
		</td><td class="trinicio"><input type="text" id="txtSubtotal'.$id.'" value="'.$record['total'].'" class="sinborded" /></td>	
		</td><td class="trinicio"><a class="btnEliminar" href="" onclick="onClick="elimiarTr('.$id.');"></a> </td>
		<td class="trinicio"><a class="btnEliminar" href="" onclick="onClick="elimiarTr('.$id.');"></a> </td>
			</tr>';
		$id++;
	}
	$iva=$tatalsd*.16;
	$tatalsds=$tatalsd+$iva;
	$fil=array('iva'=>$iva,'data'=>$fila,'subtotal'=>$tatalsd,'total'=>$tatalsds,'reg'=>$id);		
	return $fil;
	}
?>

