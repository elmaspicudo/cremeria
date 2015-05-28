<?php 
include_once 'lib/bd.php';
$ids= $_GET['data'];
$vals= $_GET['can'];
$id= $_GET['cont'];
$umd= $_GET['umd'];
$cad= $_GET['cad'];
//echo  setFila($ids,$vals,$bd);
switch($_GET['oper'])
{
	case 1 : echo cabz('p').creaPie('P');	
			
	break;
	case 2 :$grid =setFila($ids,$vals,0,0,$bd,$id,$umd,$cad);
			echo  json_encode($grid); 
			//echo  $grid; 			
	break;
	case 3 : $sql='
SELECT detalleentrada.cveProducto,cantidad,producto.descripcion,precioUnitario,lineas.descripcion AS linea,moneda,producto.clave,unidad FROM detalleentrada
LEFT JOIN producto ON producto.cveProducto=detalleentrada.cveProducto
LEFT JOIN lineas ON lineas.cveLinea=producto.cveLinea WHERE cveEntrada='.$ids.' AND tipoO=2';
	$records=$bd->ExecuteE($sql);
	for($i=0;$i < count($records);$i++){
	$record=$records[$i]; 
			$grid .=setFila($ids,$record['cantidad'],$bd,$i,$record);
	}
			//$grid=array('total_reg'=>count($noAnuncios),'data'=>$noAnuncios);	
			echo cabz('p'). $grid.creaPie('P').'<script>document.getElementById("hdncont").value='.count($records).';</script>';	
	break;
	}


function setFila($ids , $vals , $precios=0 ,$totales=0 ,$bd,$id,$umd,$cad)
{
	$sql='SELECT producto.cveProducto,producto.descripcion,producto.clave, ctlunidades.descripcion as unidad,precioprod.precio as precioUnitario , precioprod.cveProvedor FROM precioprod
INNER JOIN ctlunidades ON ctlunidades.cveUnidadm= precioprod.cveProvedor
INNER JOIN producto ON producto.cveProducto=precioprod.cveProducto WHERE
clave="'.$ids.'" and cveProvedor='.$umd.' ORDER BY cveProducto ASC';
//echo $sql;
	$records=$bd->ExecuteE($sql);
	$cuant=count($records);
	$record=$records[0];
	/*$precio=$record['precioUnitario'];
	if($umd==4){
		$elsql='SELECT precio FROM precioprod WHERE cveProvedor=1 AND cveProducto='.$record["cveProducto"];
//echo $sql;
		$recs=$bd->ExecuteE($elsql);
		$rec=$recs[0]['precio'];
		$precio=$rec/1000;
		
		}*/
		
	$sub=$precio*$vals;
	if($cad !=''){
		$f= explode('/',$cad);
				$fechas=mktime(0,0,0,$f[1],$f[0],$f[2]);
		
		}
	if($record['moneda']==1){$m='MNX';} else{$m='USD';}
	$fila='<tr id="trnew'.$id.'">
	<td style="text-align:left;" class="trinicio"><input type="text" id="txtCodigo'.$id.'" value="'.$record['clave'].'" class="sinborded"/>
	<input type="hidden" id="txtclave'.$id.'" value="'.$record['cveProducto'].'"/><input type="hidden" id="txtumd'.$id.'" value="'.$umd.'"/></td>
    <td style="text-align:left;" class="trinicio"><input type="text" id="txtUnidades'.$id.'" value="'.$vals.'" class="sinborded"/>
	</td>
	 <td class="trinicio">'.$cad.'</td>
	<td class="trinicio">'.$record['unidad'].'<input type="hidden" id="txtcadu'.$id.'" value="'.$fechas.'"/></td>
    <td class="trinicio">'.$record['descripcion'].'</td>
    <td class="trinicio"><input type="text" id="txtCosto'.$id.'" value="0" class="sinborded"/></td>
	<td class="trinicio"><div onclick="elimiarTr('.$id.');" class="btnEliminar" title="Eliminar Registro" ></div></td>
</tr>';
if($oper==2)
{
	$fil=$fila;
	}else{
$fil=array('mon'=>$m,'data'=>$fila,'total'=>$precio,'sql'=>$sql,'cuant'=>$cuant);	}
return $fil;
}

function cabz($mon)
{
	$hd='<h1>Recepcion de productos</h1>';$id='tblPesos';
	$cab='<div class="x-grid3" style="overflow:auto;">
'.$hd.'
<table cellspacing="0" cellpadding="0" border="0" class="x-grid3-row-table" id="'.$id.'" >
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
   <th style="width: 70px; text-align: left;" >
        	Operacion
        </th>
</tr></thead>
<tbody id="b'.$id.'">
';
	return $cab;
	}
function creaPie($mon)
{
	$pie='</tbody></table>';
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

