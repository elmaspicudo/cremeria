<?php
include_once 'lib/bd.php';
$v=explode('/',$_GET['ini']);
$dia=$v[0];//-1;
$vign=mktime(0,0,0,$v[1],$dia,$v[2]);
$vign=$vign-86400;

$v=explode('/',$_GET['fin']);
$dia=$v[0];//+1; 86400
$vig=mktime(0,0,0,$v[1],$v[0],$v[2]);
$vig+=86400;
$unw='cotizacion.cveUsuario='. $_GET['usr'] .' AND';
if($_GET['usr']==''){$unw='';}

$qry='SELECT clientes.razonSocial,producto.descripcion as prod,detallecotizacion.cveProducto,cantidad,precioF,detallecotizacion.total,detallecotizacion.cveCotizacion,ctlunidades.descripcion FROM detallecotizacion
LEFT JOIN producto ON producto.cveProducto=detallecotizacion.cveProducto
LEFT JOIN ctlunidades ON detallecotizacion.unidadMedida=ctlunidades.cveUnidadm
INNER JOIN cotizacion ON detallecotizacion.cveCotizacion=cotizacion.cveCotizacion
LEFT JOIN clientes ON cotizacion.cveCotizacion=clientes.cveCliente
WHERE '. $unw.' fecha >'.$vign.' AND fecha < '.$vig;
$partidas=$bd->ExecuteE($qry);
	if(count($partidas)>0)
	{
		foreach($partidas as $partida)
		{
			if($partida['razonSocial']==''){$des='Mostrador';}else{$des=$partida['razonSocial'];}
			$tabla.='<tr>
						<td>'.$des.'</td>
						<td>'.$partida['cveCotizacion'].'</td>
						<td>'.$partida['prod'].'</td>
						<td>'.$partida['cantidad'].'</td>
						<td>'.$partida['descripcion'].'</td>
						<td>'.$partida['precioF'].'</td>
						<td>'.$partida['total'].'</td>
						
						</tr>
			';
			$total+=$partida['total'];
			}
		
		}

$tod='<div class="x-grid3" style="overflow:auto; height:300px;" >
	<table cellspacing="0" cellpadding="0" >
<thead>
<tr class="x-grid3-hd-row x-grid3-header" id="unt0">
	<th style="width: 182px; text-align: left; height:20px" >        
                Cliente
        </th>
    <th style="width: 182px; text-align: left;">    	
        	Tiket
        </th>
    <th style="width: 182px; text-align: left;" >
    	     	Producto
        </th>
	 <th style="width: 182px; text-align: left;" >   		
        	Cantidad
        </th>
		  <th style="width: 182px; text-align: left;" >   		
        	Unidad Medida
        </th>
   <th style="width: 182px; text-align: left;" >   		
        	Precio
        </th>
   <th style="width: 182px; text-align: left;" >   	
        	Total
        </th>
   
</tr></thead>
<tbody >'.$tabla.'</tbody>
<tfoot><tr><td colspan="5"></td><td>Total</td><td>'.$total.'</td></tr></tfoot>
</table>';
echo $tod;
?>