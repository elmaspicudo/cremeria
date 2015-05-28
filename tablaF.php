<?php 
include_once 'lib/bd.php';
$ids= $_GET['data'];
$vals= $_GET['can'];
$id= $_GET['cont'];
//echo  setFila($ids,$vals,$bd);
switch($_GET['oper'])
{
	case 1 : echo setFila($_GET['id'],$bd);			
	break;
	case 2 : $grid =setFila($ids,$bd);
			//$grid=array('total_reg'=>count($noAnuncios),'data'=>$noAnuncios);	
			echo  json_encode($grid); 			
	break;
	case 3 : $grid =todaTabla($bd,$_GET['id']);
			//$grid=array('total_reg'=>count($noAnuncios),'data'=>$noAnuncios);	todaTabla($bd,$id)
			echo  $grid; 			
	break;
	}


function setFila($ids, $bd)
{
	$sql='SELECT producto.cveProducto,producto.descripcion,lineas.descripcion AS linea,producto.moneda,producto.clave,unidad,detalleped.cantidad,precioF,descuento,total,tEntrega,comentario 
FROM detalleped
INNER JOIN detallecotizacion ON detallecotizacion.cveDetalle= detalleped.cveProducto
INNER JOIN producto ON producto.cveProducto = detallecotizacion.cveProducto 
INNER JOIN lineas ON lineas.cveLinea=producto.cveLinea 
WHERE detalleped.cveCotizacion='.$ids;
//echo $sql;
	$records=$bd->ExecuteE($sql);
	
	/*$sqld='SELECT total FROM tipocambio ORDER BY cveTipo DESC LIMIT 1';
	$t=$bd->ExecuteE($sqld);*/
	$tt=0;
	$id=0;
	$ttd=0;
	foreach($records as $record)
	{
		$sql='SELECT SUM(cantidad) FROM detfactura 
INNER JOIN factura ON factura.cveFactura=detfactura.cveFactura
WHERE cveCotizacion='.$ids.' AND cveProducto ='.$record['cveProducto'];
	$cant=$bd->Execute($sql);
	if($record['cantidad'] > $cant[0][0]){
	$totalp=number_format($record['total'],2);
	$to=$record['total'];
	$precio=number_format($record['precioF'],2);
	$read='readonly';
	
	if($record['moneda']==2)
	{
		
		$m='D';
		$totalp=number_format($record['total'],2);
		$tod=$record['total'];
		$precio=number_format($record['precioF'],2);
		$ttd+=$tod;
		$oper='';
	if($_GET['tip']==2){$oper='<td style="width:80px;text-align:left;"><a href="#" onclick="elimiarTr('.$id.',\''.$m.'\')" >Quitar</a></td>'; $read='';}
		$tabD.='
	<tr id="btn'.$id.'">
		<td style="width:80px;text-align:left;"><input type="hidden" id="txtPClave'.$m.$id.'" name="txtPClave'.$m.$id.'" value="'.$record['cveProducto'].'" />'.$record['clave'].'</td>
		<td style="width:82px;text-align:left;">'.$record['unidad'].'</td>
		<td style="width:182px;text-align:left;">'.$record['linea'].'</td>
		<td style="width:182px;text-align:left;">'.$record['descripcion'].' '.$record['comentario'].'</td>
		<td style="width:182px;text-align:left;"><input type="text" name="txtCant'.$m.$id.'" style="border: 0;width:75px; text-align:right" id="txtCant'.$m.$id.'" onchange="calcular(\''.$m.'\','.$id.');" value="'.$record['cantidad'].'" /></td>
		<td style="width:80px;text-align:left;"><input type="text" name="txtPPrecio'.$m.$id.'" style="border: 0;width:75px; text-align:right" id="txtPPrecio'.$m.$id.'" '.$read.' value="'.$precio.'" /></td>		
		<td style="width:80px;text-align:left;"><input type="hidden" id="txtDes'.$m.$id.'" name="txtDes'.$m.$id.'" value="'.$record['descuento'].'" />'.$record['descuento'].'</td>
		<td style="width:80px;text-align:left;"><input type="text" name="txtPTotal'.$m.$id.'" style="border: 0;width:75px; text-align:right" id="txtPTotal'.$m.$id.'" '.$read.' value="'.$totalp.'" /></td>'.$oper.'
			
		</tr>';	
		}else{
			$m='P';
			$tt+=$to;
			$oper='';
	if($_GET['tip']==2){$oper='<td style="width:80px;text-align:left;"><a href="#" onclick="elimiarTr('.$id.',\''.$m.'\')" >Quitar</a></td>'; $read='';}	
			$tabP.='
	<tr id="btn'.$id.'">
		<td style="width:80px;text-align:left;"><input type="hidden" id="txtPClave'.$m.$id.'" name="txtPClave'.$m.$id.'" value="'.$record['cveProducto'].'" />'.$record['clave'].'</td>
		<td style="width:82px;text-align:left;">'.$record['unidad'].'</td>
		<td style="width:182px;text-align:left;">'.$record['linea'].'</td>
		<td style="width:182px;text-align:left;">'.$record['descripcion'].' '.$record['comentario'].'</td>
		<td style="width:182px;text-align:left;"><input type="text" name="txtCant'.$m.$id.'" style="border: 0;width:75px; text-align:right" id="txtCant'.$m.$id.'" onchange="calcular(\''.$m.'\','.$id.');" value="'.$record['cantidad'].'" /></td>
		<td style="width:80px;text-align:left;"><input type="text" name="txtPPrecio'.$m.$id.'" style="border: 0;width:75px; text-align:right" id="txtPPrecio'.$m.$id.'" '.$read.' value="'.$precio.'" /></td>		
		<td style="width:80px;text-align:left;"><input type="hidden" id="txtDes'.$m.$id.'" name="txtDes'.$m.$id.'" value="'.$record['descuento'].'" />'.$record['descuento'].'</td>
		<td style="width:80px;text-align:left;"><input type="text" name="txtPTotal'.$m.$id.'" style="border: 0;width:75px; text-align:right" id="txtPTotal'.$m.$id.'" '.$read.' value="'.$totalp.'" /></td>'.$oper.'
			
		</tr>';	
		}
		$id++;
	}
	}
$iva=$tt*.16;
$ttt=$iva+$tt;
$ivad=$ttd*.16;
$tttd=$ivad+$ttd;
return '<form id="frmEnvia" >'.cabz('Moneda Nacional').$tabP.elpie($tt,$iva,$ttt,'P').cabz('Dolares').$tabD.elpie($ttd,$ivad,$tttd,'D').'</form>';
}

function cabz($m)
{
	$oper='';
	if($_GET['tip']==2)$oper='<th style="width:80px;text-align:left;">Operacion</th>';
	$cab='<div class="x-grid3" style="overflow:auto; height:300px;">
<h1>Productos de la factura en '. $m .'</h1>
<table cellspacing="0" cellpadding="0" border="0" class="x-grid3-row-table" id="table'.$m.'" >
<thead>
<tr class="x-grid3-hd-row x-grid3-header" id="unt0">
	<th style="width: 80px; text-align: left; height:20px" >        
                Clave
        </th>    
    <th style="width: 80px; text-align: left;" >
    	     	U. Medida
        </th>
	 <th style="width: 182px; text-align: left;" >   		
        	Linea
        </th>
   <th style="width: 182px; text-align: left;" >   		
        	Nombre
        </th>
	<th style="width: 80px; text-align: left;">    	
        	Unidades
        </th>
   <th style="width: 80px; text-align: left;" >   	
        	Precio
        </th>
   <th style="width: 80px; text-align: left;" >
        	Descuento
        </th>
   <th style="width: 80px; text-align: left;" >
        	Total
        </th>'.$oper.'
    
</tr></thead>
<tbody ">
';
	return $cab;
	}
	function elpie($tt,$iva,$ttt,$mon)
	{
		$pie='</tbody></table>
<div class="x-grid3-row x-grid3-row" >
	<table cellspacing="0" cellpadding="0" border="0" class="x-grid3-row-table"><tbody><tr>
	<td style="width:600px"></td><td style="width:80px;text-align:left;">Subtotal</td><td style="width:80px;text-align:left;"><input type="text" name="txtsub'.$mon.'" style="border: 0;width:75px; text-align:right" id="txtsub'.$mon.'" readonly value="'.number_format($tt,2).'" /></td><td></td>
			
		</tr></tbody></table></div>
		<div class="x-grid3-row x-grid3-row" >
	<table cellspacing="0" cellpadding="0" border="0" class="x-grid3-row-table"><tbody><tr>
	<td style="width:600px"></td><td style="width:80px;text-align:left;">I.V.A.</td><td style="width:80px;text-align:left;"><input type="text" name="txtiva'.$mon.'" style="border: 0;width:75px; text-align:right" id="txtiva'.$mon.'" readonly value="'.number_format($iva,2).'" /></td><td></td>
			
		</tr></tbody></table></div>
		
		<div class="x-grid3-row x-grid3-row" ><table cellspacing="0" cellpadding="0" border="0" class="x-grid3-row-table"><tbody><tr><td style="width:600px">Observaciones:<textarea name="txaOng'.$mon.'" id="txaOng'.$mon.'" style=" height:20px; width:80%;"></textarea></td><td style="width:80px;text-align:left;">Total</td><td style="width:80px;text-align:left;"><input type="text" name="txtTotal'.$mon.'" style="border: 0;width:75px; text-align:right" id="txtTotal'.$mon.'" readonly  value="'.number_format($ttt,2).'" /><input type="hidden" id="hdnCuant" name="hdnCuant" value="'.$m.$id.'" /></td>
		
		</tr></tbody></table></div>
</div>';
return $pie;
		}
function todaTabla($bd,$id)
{
	$sql='SELECT cveProducto,cantidad,moneda from detallecotizacion WHERE cveCotizacion='.$id;
	$records=$bd->ExecuteE($sql);
	$i=1;
	foreach($records as $record){		
		if($record['moneda']==1)
		{
			$tablaP.=setFila($record['cveProducto'],$record['cantidad'], $bd,$i,2);
			}else{
			$tablaD.=setFila($record['cveProducto'],$record['cantidad'], $bd,$i,2);
			}
		$i++;
		}
		
		$tabla= cabz('P').$tablaP.creaPie('P').'<div style="height:40px"></div>'.cabz('D').$tablaD.creaPie('D');
	return $tabla;
	}
?>

