
<?php 
include_once 'lib/bd.php';
$ids= $_GET['data'];
$vals= $_GET['can'];
$id= $_GET['cont'];
//echo  setFila($ids,$vals,$bd);
switch($_GET['oper'])
{
	case 1 : echo '<div style="height:40px"></div>';			
	break;
	case 2 : $grid =setFila($ids,$vals,0,0,$bd,$id);
			//$grid=array('total_reg'=>count($noAnuncios),'data'=>$noAnuncios);	
			echo  json_encode($grid); 			
	break;
	case 3 : $grid =todaTabla($bd,$_GET['id']);
			//$grid=array('total_reg'=>count($noAnuncios),'data'=>$noAnuncios);	todaTabla($bd,$id)
			echo  $grid; 			
	break;
	}
error_reporting('E_ALL & ~E_NOTICE');

function setFila($ids , $vals , $precios=0 ,$totales=0 ,$bd,$id,$oper=1,$costos=0, $desc='' , $entret='' , $obs='',$por='')
{
	$sql='SELECT cveProducto,producto.descripcion,precioUnitario,lineas.descripcion AS linea,moneda,producto.clave,unidad FROM  producto 
INNER JOIN lineas ON lineas.cveLinea=producto.cveLinea
WHERE cveProducto='.$ids.' ORDER BY cveProducto ASC';
//echo $sql;
	$records=$bd->ExecuteE($sql);
	$record=$records[0];
	$precio=$record['precioUnitario'];	
	$totalp=($precio*$vals)/.80;
	//$totalp=($precio*$vals)/$record['porcentaje'];
	$precio=$record['precioUnitario'];
	$sub=$precio/.80;
	$porct='.80';
	if($oper==2)
	{
		$totalp=$totales;
		$sub=$precios;
		$precio=$costos;
		$porct=$por;
	}
	
	if($record['moneda']==1)
	{
		$tabP.='
	<tr id="btnor'.$id.'">
		<td style="width:60px;text-align:left; border-right:solid 1px #e0e1e1;	border-bottom:solid 1px #e0e1e1; text-align:center;">'.$record['clave'].'<input type="hidden" id="cvePrecioPO'.$id.'" value="'.$record['cveProducto'].'"/>
		</td>
		<td style="width:54px;text-align:left; border-right:solid 1px #e0e1e1;	border-bottom:solid 1px #e0e1e1; text-align:center;"><input type="text" id="cantidadPO'.$id.'" value="'.$vals.'" style="border: 0;width:54px; text-align:right" onchange="calculaOP(\'P\','.$id.');"/></td>
		
		<td style="width:40px;text-align:left; border-right:solid 1px #e0e1e1;	border-bottom:solid 1px #e0e1e1; text-align:center;">'.$record['unidad'].'</td>
		<td style="width:130px;text-align:left; border-right:solid 1px #e0e1e1;	border-bottom:solid 1px #e0e1e1; text-align:center;">'.$record['linea'].'</td>
		<td style="width:320px;text-align:left; border-right:solid 1px #e0e1e1;	border-bottom:solid 1px #e0e1e1; text-align:center;">'.utf8_encode(stripslashes($record['descripcion'])).'</td>
		<td style="width:80px;text-align:left; border-right:solid 1px #e0e1e1;	border-bottom:solid 1px #e0e1e1; text-align:center;">
		<input type="hidden" name="txtCostoPO'.$id.'"  id="txtCostoPO'.$id.'" value="'.$precio.'" />
		$'.number_format($precio,2).'</td>
		<td style="width:40px;text-align:left; border-right:solid 1px #e0e1e1;	border-bottom:solid 1px #e0e1e1; text-align:center;">
		<input type="hidden" name="txtPorcentajePO'.$id.'" id="txtPorcentajePO'.$id.'" value="'.$porct.'" />'.$porct.'</td>		
		<td style="width:80px;text-align:left; border-right:solid 1px #e0e1e1;	border-bottom:solid 1px #e0e1e1; text-align:center;">
		<input type="hidden" name="txtPrecioPO'.$id.'"  id="txtPrecioPO'.$id.'" value="'.$sub.'" />'.$sub.'</td>
		<td style="width:64px;text-align:left; border-right:solid 1px #e0e1e1;	border-bottom:solid 1px #e0e1e1; ">
		<input type="hidden" name="txtDescPO'.$id.'" style="border: 0;width:64px; " id="txtDescPO'.$id.'" value="'.$desc.'" />'.$desc.'</td>
		<td style="width:80px;text-align:left; border-right:solid 1px #e0e1e1;	border-bottom:solid 1px #e0e1e1; ">
		<input type="text" readonly="readonly" name="txtTotalPO'.$id.'"  id="txtTotalPO'.$id.'" value="$'.$totalp.'" style="border: 0;width:75px; text-align:right"/></td>
		<td style="width:80px;text-align:left; border-right:solid 1px #e0e1e1;	border-bottom:solid 1px #e0e1e1; ">'.$entret.'</td>
		<td style="width:70px;text-align:left; border-right:solid 1px #e0e1e1;	border-bottom:solid 1px #e0e1e1; text-align:center;">   
		<input type="button" value="Quitar" id="btn'.$id.'" onClick="elimiarTro(\'P\','.$id.')" /></td>
		
		</tr>';	
		$fila=$tabP;
		$m=1;	
		}
	else
	{ 
	$tabD.='
	<tr id="btnor'.$id.'">
		<td style="width:60px;text-align:left; border-right:solid 1px #e0e1e1;	border-bottom:solid 1px #e0e1e1; text-align:center;">'.$record['clave'].'<input type="hidden" id="cvePrecioDO'.$id.'" value="'.$record['cveProducto'].'"/>
		</td>
		<td style="width:54px;text-align:left; border-right:solid 1px #e0e1e1;	border-bottom:solid 1px #e0e1e1; text-align:center;"><input type="text" id="cantidadDO'.$id.'" value="'.$vals.'" style="border: 0;width:54px; text-align:right" onchange="calculaOP(\'D\','.$id.');"/></td>
		
		<td style="width:40px;text-align:left; border-right:solid 1px #e0e1e1;	border-bottom:solid 1px #e0e1e1; text-align:center;">'.$record['unidad'].'</td>
		<td style="width:130px;text-align:left; border-right:solid 1px #e0e1e1;	border-bottom:solid 1px #e0e1e1; text-align:center;">'.$record['linea'].'</td>
		<td style="width:320px;text-align:left; border-right:solid 1px #e0e1e1;	border-bottom:solid 1px #e0e1e1; text-align:center;">'.utf8_encode(stripslashes($record['descripcion'])).'</td>
		<td style="width:80px;text-align:left; border-right:solid 1px #e0e1e1;	border-bottom:solid 1px #e0e1e1; text-align:center;">
		<input type="hidden" name="txtCostoDO'.$id.'"  id="txtCostoDO'.$id.'" value="'.$precio.'" />
		$'.number_format($precio,2).'</td>
		<td style="width:40px;text-align:left; border-right:solid 1px #e0e1e1;	border-bottom:solid 1px #e0e1e1; text-align:center;">
		<input type="hidden" name="txtPorcentajeDO'.$id.'" style="border: 0;width:40px; text-align:right" id="txtPorcentajeDO'.$id.'" value="'.$porct.'" />'.$porct.'</td>		
		<td style="width:80px;text-align:left; border-right:solid 1px #e0e1e1;	border-bottom:solid 1px #e0e1e1; text-align:center;">
		<input type="hidden" name="txtPrecioDO'.$id.'"  id="txtPrecioDO'.$id.'" value="'.$sub.'" />'.$sub.'</td>
		<td style="width:64px;text-align:left; border-right:solid 1px #e0e1e1;	border-bottom:solid 1px #e0e1e1; ">
		<input type="hidden" name="txtDescDO'.$id.'" style="border: 0;width:64px; " id="txtDescDO'.$id.'" value="'.$desc.'" />'.$desc.'</td>
		<td style="width:80px;text-align:left; border-right:solid 1px #e0e1e1;	border-bottom:solid 1px #e0e1e1; ">
		<input type="text" readonly="readonly" name="txtTotalDO'.$id.'"  id="txtTotalDO'.$id.'" value="$'.$totalp.'" style="border: 0;width:75px; text-align:right" /></td>
		<td style="width:80px;text-align:left; border-right:solid 1px #e0e1e1;	border-bottom:solid 1px #e0e1e1; ">'.$entret.'</td>
		<td style="width:70px;text-align:left; border-right:solid 1px #e0e1e1;	border-bottom:solid 1px #e0e1e1; text-align:center;">   
		<input type="button" value="Quitar" id="btn'.$id.'" onClick="elimiarTro(\'D\','.$id.')" /></td>
		
		</tr>';
		$fila=$tabD;
		
		$m=2;	
	}
if($oper==2)
{
	$fil=$fila;
	}else{
$fil=array('mon'=>$m,'data'=>$fila,'total'=>$precio);	}
return $fil;
}

function cabz($mon)
{
	if($mon=="D")
	{ $hd='<h1>Productos en dólares</h1>';$id='tblDls'; }else {$hd='<h1>Productos en moneda nacional</h1>';$id='tblPesos';}
	$cab='<div class="x-grid3" style="overflow:auto; height:300px;" >
'.$hd.'
<table cellspacing="0" cellpadding="0" id="'.$id.'"  >
<thead>
<tr class="x-grid3-hd-row x-grid3-header" id="unt0">
	<th style="width: 60px; text-align: left; height:20px" >        
                Clave
        </th>
    <th style="width: 54px; text-align: left;">    	
        	Unidades
        </th>
    <th style="width: 40px; text-align: left;" >
    	     	U. Medida
        </th>
	 <th style="width: 130px; text-align: left;" >   		
        	Línea
        </th>
   <th style="width: 182px; text-align: left;" >   		
        	Nombre
        </th>
   <th style="width: 80px; text-align: left;" >   	
        	Precio
        </th>
   <th style="width: 40px; text-align: left;" >   		
        	% Venta
        </th>
   <th style="width: 80px; text-align: left;" >
        	Precio Final
        </th>
   <th style="width: 64px; text-align: left;" >
        	Descuento
        </th>
   <th style="width: 80px; text-align: center;" >
        	Total
        </th>
    <th style="width: 80px; text-align: left;" >
        	Tiempo E.
        </th>
   <th style="width: 70px; text-align: left;" >
        	Operación
        </th>
</tr></thead>
<tbody id="b'.$id.'">
';
	return $cab;
	}
function creaPie($mon,$total=0,$iva=0,$sub=0,$Obs='')
{
	if($mon=='D'){$btn='';}
	$pie='</tbody></table>
<div class="x-grid3-row x-grid3-row" >
	<table cellspacing="0" cellpadding="0" border="0" class="x-grid3-row-table"><tbody><tr>
	<td style="width:600px"></td><td style="width:80px;text-align:left;">Subtotal</td><td style="width:80px;text-align:left;"><input type="text" name="txtsubO'.$mon.'" style="border: 0;width:75px; text-align:right; font-weight:bold;" id="txtsubO'.$mon.'" readonly value="'.$sub.'" /></td><td></td>
			
		</tr></tbody></table></div>
		<div class="x-grid3-row x-grid3-row" >
	<table cellspacing="0" cellpadding="0" border="0" class="x-grid3-row-table"><tbody><tr>
	<td style="width:600px"></td><td style="width:80px;text-align:left;">I.V.A.</td><td style="width:80px;text-align:left;"><input type="text" name="txtivaO'.$mon.'" style="border: 0;width:75px; text-align:right; font-weight:bold;" id="txtivaO'.$mon.'" readonly value="'.$iva.'" /></td><td></td>
			
		</tr></tbody></table></div>
		
		<div class="x-grid3-row x-grid3-row" ><table cellspacing="0" cellpadding="0" border="0" class="x-grid3-row-table"><tbody><tr><td style="width:600px">Observaciones:<textarea name="txaOng'.$mon.'" id="txaOng'.$mon.'" style=" height:20px; width:80%;">'.$Obs.'</textarea></td><td style="width:80px;text-align:left;">Total</td><td style="width:80px;text-align:left;"><input type="text" name="txtTotalO'.$mon.'" style="border: 0;width:75px; text-align:right; font-weight:bold;" id="txtTotalO'.$mon.'" readonly value="'.number_format($total).'" /></td><td>'.$btn.'</td>
		
		</tr></tbody></table></div>
</div>';
return $pie;
	}	
function todaTabla($bd,$id)
{
	$sql='SELECT cveDetalle,cantidad,moneda,total,precioF,costo,descuento,tEntrega,comentario,porcentaje from detallecotizacion WHERE cveCotizacion='.$id.' ORDER BY cveDetalle ASC';
	$records=$bd->ExecuteE($sql);
	$i=1;
	foreach($records as $record){	
		$sqls='SELECT SUM(cantidad) as alf FROM detalleped WHERE cveProducto='.$record['cveDetalle'];
	$cant=$bd->ExecuteE($sqls);
		if($cant[0]['alf']!='')
		{$cantidad=$record['cantidad']-$cant[0]['alf'];}else{$cantidad=$record['cantidad'];}
		if($cantidad > 0){
		if($record['moneda']==1)
		{
			$tablaP.=setFila($record['cveDetalle'],$record['cantidad'],$record['precioF'],$record['total'], $bd,$i,2,$record['costo'],$record['descuento'],$record['tEntrega'],$record['comentario'],$record['porcentaje']);
				$totaP+=$record['total'];
			}else{
			$tablaD.=setFila($record['cveDetalle'],$record['cantidad'],$record['precioF'],$record['total'], $bd,$i,2,$record['costo'],$record['descuento'],$record['tEntrega'],$record['comentario'],$record['porcentaje']);
				$totaD+=$record['total'];
			}
	}
		
		$i++;
		}
		$ivad=$totaD*.16;
		$ivap=$totaP*.16;
		$sql='SELECT obsd,observaciones from cotizacion WHERE cveCotizacion='.$id;
	$rec=$bd->ExecuteE($sql);
		$t=$totaP+$ivap;
		$td=$totaD+$ivad;
		
		$tabla= '<div style="height:30px"><input type="button" value="Ordenar pedido" onclick="enviarOrden('.$id.')" /></div>'.cabz('P').$tablaP.creaPie('P',$t,number_format($ivap,2),number_format($totaP,2),$rec[0]['observaciones']).'<div style="height:40px"></div>'.cabz('D').$tablaD.creaPie('D',$td,number_format($ivad,2),number_format($totaD,2),$rec[0]['obsd']);
	return $tabla.'<input type="hidden" id="tolPar" value="'.$i.'" />';
	}
?>

