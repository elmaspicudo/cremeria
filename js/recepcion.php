// JavaScript Document
<?php
include "../lib/mnpBD.class.php";
$sql='SELECT folio AS id FROM folioscot where tipo=2 ';
$misd=$bd->Execute($sql);
$folio=$misd[0]['id'];
$usrUP=new mnpBD('folioscot');
$datosU=array($folio+1);
$usrUP->actualizar('folio',$datosU,'tipo=2');

?>
function abrir(id,oper)
{
	var el = document.getElementById('dv'+id); 
	var otro= document.getElementById('dc'+id); 
	if(oper==1)
	{
			el.style.display ='none'
			otro.style.display ='block'
		}
	if(oper==2)
	{
			el.style.display ='block'
			otro.style.display ='none'
		}
	}
var miformul
function operaciones()
{
	var prod=Ext.get('Productos').getValue();
	var cant=Ext.get('cantidades').getValue();
	var divs=Ext.get('porcentaje').getValue();
	lista = prod.split("!"); 
	var j=0;
	var x=0;
	var subtotalD=0;
	var subtotalP=0;
	for(i=0;i<lista.length;i++)
	{
		var contenedord = document.getElementById("txtCostoD"+lista[i]);
		if(contenedord != null) {	
			document.getElementById("txtPorcentajeD"+lista[i]).value=divs;
			document.getElementById("txtPrecioD"+lista[i]).value= (contenedord.value/divs).toFixed(2);
			var des=Ext.get('txtDescD'+lista[i]).getValue();
			if(des !='' && des >0)
			{
				var porc=(document.getElementById("txtPrecioD"+lista[i]).value*des)/100;		
				document.getElementById("txtTotalD"+lista[i]).value=porc;
				}else{document.getElementById("txtTotalD"+lista[i]).value=document.getElementById("txtPrecioD"+lista[i]).value;}
			subtotalD+=parseFloat(document.getElementById("txtTotalD"+lista[i]).value);	
			x++;	 		
		}
		var contenedorp = document.getElementById("txtCostoP"+lista[i]);
		if(contenedorp != null) {
			document.getElementById("txtPorcentajeP"+lista[i]).value=divs;
		  document.getElementById("txtPrecioP"+lista[i]).value= (contenedorp.value/divs).toFixed(2);
		  var des=Ext.get('txtDescP'+lista[i]).getValue();
			if(des !='' && des >0)
			{
				var porc=(document.getElementById("txtPrecioP"+lista[i]).value*des)/100;		
				document.getElementById("txtTotalP"+lista[i]).value=porc;
				}else{document.getElementById("txtTotalP"+lista[i]).value=document.getElementById("txtPrecioP"+lista[i]).value;}
		 subtotalP+=parseFloat(document.getElementById("txtPrecioP"+lista[i]).value);
		  j++;
		}		
		}
	if(j >0)
	{
		document.getElementById("txtsubP").value=subtotalP;
		document.getElementById("txtTotalP").value=(subtotalP*.16)+subtotalP;
		}
	if(x >0)
	{
		document.getElementById("txtsubD").value=subtotalD;
		document.getElementById("txtTotalD").value=(subtotalD*.16)+subtotalD;
		}
		
	}
	
function calculaD(tipo,id)
{
	var div=parseFloat(Ext.get('txtPrecio'+tipo+id).getValue());
	var des=parseFloat(Ext.get('txtDesc'+tipo+id).getValue());
	var porc=(div*des)/100;	
	porc=parseFloat(div)-porc;	
		document.getElementById("txtTotal"+tipo+id).value=porc.toFixed(2);
		
	var prod=Ext.get('Productos').getValue();
	lista = prod.split("!"); 
	var total=0;
	for(i=0;i<lista.length;i++)
	{
			var contenedord = document.getElementById("txtCosto"+tipo+lista[i]);
			if(contenedord != null) {
				total+=parseFloat(document.getElementById("txtTotal"+tipo+lista[i]).value)
				}			
		}	
		document.getElementById("txtsub"+tipo).value=total.toFixed(2);
		document.getElementById("txtTotal"+tipo).value=((total*.16)+total).toFixed(2);		
	}	
function calculaP(tipo,id)
{
	var div=Ext.get('txtCosto'+tipo+id).getValue();
	var val=Ext.get('txtPorcentaje'+tipo+id).getValue();
	document.getElementById("txtPrecio"+tipo+id).value=(div/val).toFixed(2);
	var des=Ext.get('txtDesc'+tipo+id).getValue();
	if(des !='' && des >0)
	{
		var porc=(document.getElementById("txtPrecio"+tipo+id).value*des)/100;		
		document.getElementById("txtTotal"+tipo+id).value=porc;
		}else{document.getElementById("txtTotal"+tipo+id).value=document.getElementById("txtPrecio"+tipo+id).value;}
		
	var prod=Ext.get('Productos').getValue();
	var cant=Ext.get('cantidades').getValue();
	lista = prod.split("!"); 
	var j=0;
	var x=0;
	var subtotalD=0;
	var subtotalP=0;
	for(i=0;i<lista.length;i++)
	{
		var contenedord = document.getElementById("txtCostoD"+lista[i]);
		if(contenedord != null) {
				subtotalD+=parseFloat(document.getElementById("txtTotalD"+lista[i]).value)
			x++;	 		
		}
		var contenedorp = document.getElementById("txtCostoP"+lista[i]);
		if(contenedorp != null) {
			subtotalP+=parseFloat(document.getElementById("txtTotalP"+lista[i]).value)
		j++;
		}		
		}
	if(j >0)
	{
		document.getElementById("txtsubP").value=subtotalP;
		document.getElementById("txtTotalP").value=(subtotalP*.16)+subtotalP;
		}
	if(x >0)
	{
		document.getElementById("txtsubD").value=subtotalD;
		document.getElementById("txtTotalD").value=(subtotalD*.16)+subtotalD;
		}
		
	}	

	function creaEstores(ids,op){
		var stores = new Ext.data.JsonStore({
			url:'listadoCot.php?id='+ ids+'&oper='+op,
			root:'data',
			fields: ['value','label']
		});
		return stores;
	}

 var falloAjax = function(response, request) {          
         var errMessage = '<b>Error en la petición</b>  '  
                        + ' <b>status</b> ' + response.status + ''  
                        + ' <b>statusText</b> ' + response.statusText + ''  
                        + ' <b>responseText</b> ' + response.responseText + '';  
   
        
     }  
 var terminoAjax = function(response, request) {  
         var jsonData = Ext.util.JSON.decode(response.responseText);     
         if (jsonData.success == true) {  
		 	if(jsonData.oper == 8){ document.getElementById('calleE').value=jsonData.dir}
            if(jsonData.oper == 7){
			 document.getElementById('telContacto').value =jsonData.tel 
			  document.getElementById('emailC').value=jsonData.email      }     
         } else {  
             Ext.MessageBox.alert('Alert', jsonData.data.message );              
         }  
     } 
	 
		
function traerDatos(cve,tipo)
{
	 Ext.Ajax.request({  
             url: 'listadoCot.php?oper='+tipo,  
             method: 'POST',  
             success: terminoAjax,  
             failure: falloAjax,  
             timeout: 10000,  
             headers: {  
                 'cabecera-propia': 'prueba'  
             },  
             params: {  
                 cve: cve
             }  
         });  
}


var frmCoti=	new  Ext.form.FormPanel({  
					         id: 'formPodu', 
							 region: 'north',
                			 height: 150,
							 anchor: '10%',
							 title      : 'Capturar datos',
							 bodyStyle  : 'padding: 10px;',
							 waitMsgTarget: true, 
							 bodyPadding: 20, 	
							 labelWidth:140,				
							 border:true,
							 items: [ { layout:'column',
									 bodyStyle  : ' border:none',							
									  items:[
									  		{
												 columnWidth:.5,
												 layout: 'form',
												  bodyStyle  : ';border:none',	
												  items: [{ xtype:'textfield',
													 name:'folio',   
													 id: 'folio',
													 fieldLabel:'Folio',anchor: '90%',disabled: true, value:'<?php echo $folio; ?>'
													 } ]
												 },
											{
												 columnWidth:.30,
												 layout: 'form',
												 bodyStyle  : ';border:none',	
												 items: [{xtype:'datefield',
													 name:'fecha',   
													 id: 'fecha',
													 fieldLabel:'Fecha',anchor: '90%',allowBlank: false}]
												 }										 
											 ]
									},{xtype:'textarea',
													 name:'obs',   
													 id: 'obs',
													 fieldLabel:'Observaciones de E.',anchor: '80%'},
													{
									  xtype:'hidden',
									  name:'cveEntrada',
									  id:'cveEntrada' 
									  }, {
									  xtype:'hidden',
									  name:'Productos',
									  id:'Productos' 
									  },
									  {
									  xtype:'hidden',
									  name:'cantidades',
									  id:'cantidades' 
									  }
									 
									 ]/*,
									 buttons:[{
												text: 'Guardar',
												handler: function(){
													Guardar(1);
												}}]*/
									
									});
									
function Guardar(tipo)
{
	if (frmCoti.getForm().isValid()) {
		var fecha=Ext.get('fecha').getValue();
		var folio=Ext.get('folio').getValue();
		var obs=Ext.get('obs').getValue();
		
		var valores="fecha="+fecha +"&ordenC="+folio +"&obs="+obs+"&tipoP=1";
		
		var prod=Ext.get('hdncont').getValue();
		lista =parseInt(prod);
		valores+="&cunatpi="+lista;
		for(i=0;i<lista;i++)
		{
			var contenedord = document.getElementById("txtclave"+i);
				if(contenedord != null) {	
							var prod=Ext.get('txtclave'+i).getValue();
							var cant=Ext.get('txtUnidades'+i).getValue();
							var costo=Ext.get('txtCosto'+i).getValue();
							var umd=Ext.get('txtumd'+i).getValue();
							var cad=Ext.get('txtcadu'+i).getValue();
							valores+="&prod"+i+"="+prod +"&cant"+i+"="+cant+"&costo"+i+"="+costo+"&umd"+i+"="+umd+"&cad"+i+"="+cad;
				}			
		}
		var tipo=1;
		$.ajax({
			url: 'guardarRec.php',
			type: "POST",
			data: valores,
			success: function(datos){
				if(datos > 0){
				Ext.MessageBox.alert('Alert', 'La entrada al almacen se guardó correctamente.' );
				window.location='invRec.php';
                }else{Ext.MessageBox.alert('Alert', 'Ocurrió un error al guardar.' );}
			}
		});		
	}
}

	var panel1 = new Ext.Panel({
			id: 'contenIn',
			title: 'Productos',
			iconCls: 'users',
			region: 'center',
			width    : 650,
			 html:'<table cellspacing="0" cellpadding="0" id="mytable" style="width:98%"><thead><tr class="x-grid3-hd-row x-grid3-header" id="unt0">	<th style="width:10%; text-align: left; height:20px" >Codigo</th><th style="width: 10%; text-align: left;">	Unidades</th><th style="width: 10%; text-align: left;" >Caducidad</th><th style="width: 10%; text-align: left;" >U. Medida</th><th style="width: 30%; text-align: left;">Nombre</th><th style="width: 10%; text-align: left;" >Costo</th><th style="width: 10%; text-align: left;" >Operación</th></tr></thead><tbody id="bdPro"></tbody><tfoot><tr id="trnew"><td style="text-align:left;" class="trinicio"><input type="text" id="txtCodigo" value="" class="sinborded"/><td style="text-align:left;" class="trinicio"><input type="text" id="txtUnidades" value="" class="sinborded"/></td><td class="trinicio" ><div id="tdCad" ></div></td><td class="trinicio" ><div id="tdumd"></div></td><td class="trinicio" ><div id="tdDes" ></div></td><td class="trinicio"></td><td class="trinicio"></td></tr><tr><td colspan="6" ><input type="button" onclick="ejecutarventa();" value="Cerrar Venta" /></td></tr></tfoot></table>'		
		});	
		
	    function ejecutarventa(){
                                                var cot= Ext.get('cveEntrada').getValue();
                                                 if(cot > 0){
                                                 Ext.MessageBox.alert('Alert', 'La entrada ya se registro' );
                                                 }else{
                                               	Guardar(1);                                       
                                                    }
                                                   
												}
		var south =new Ext.Panel({
			xtype	:	"panel",
			region	:	"south",
			height	:	150,
			collapsible: true,
			title	:	"Mensages"
		});
		var centerb = new Ext.Panel({
			xtype	:	"panel",
			region	:	"center",
			layout	:	"border",
			border	:	false,
			items	:	[frmCoti,panel1,
			south			
			]
		});
		var center1 = new Ext.Panel({
			xtype	:	"panel",
			region	:	"center",
			layout	:	"border",
			border	:	false,
			items	:	[{ 			
			xtype: 'tabpanel',
			region: 'center',
			width: 1100,
			tabPosition: 'top',
			collapsible: false,
			activeTab: 0,
			items: [{
			  id:'tabClientes', title:'Capturar Entrada',layout: 'fit',
				items:centerb
			}				
			]}]
		});	 
		
		
function setStatus(status)
{
	var cve=Ext.get('folio').getValue();
		$.ajax({
			url: 'guardarCot.php',
			type: "POST",
			data: "tipoP=2&estatus="+status+"&cve="+cve,
			success: function(datos){
				switch (status)	{
						case 1:alert(1)
						break;
						case 2:alert(2)
						break;
						case 3:alert(3)
						break;			
						case 4:Ext.MessageBox.alert('Alert', 'Venta cerrada exitosamente felicidades.' );	
						break;	
					}			
			}
		});	
	}