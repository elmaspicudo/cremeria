// JavaScript Document
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
			var costo=contenedord.value.replace(',', '');
			costo=parseFloat(costo);
			document.getElementById("txtPrecioD"+lista[i]).value= (costo/divs).toFixed(2);
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
			var costo=contenedorp.value.replace(',', '');
			costo=parseFloat(costo);
		  document.getElementById("txtPrecioP"+lista[i]).value= (costo/divs).toFixed(2);
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
	var div=Ext.get('txtPrecio'+tipo+id).getValue();
	var des=Ext.get('txtDesc'+tipo+id).getValue();	
	div=div.replace(',', '');
	des=des.replace(',', '');
	des=parseFloat(des);
	div=parseFloat(div)
	var porc=(div*des)/100;	
	porc=parseFloat(div)-porc;	
		document.getElementById("txtTotal"+tipo+id).value=porc.toFixed(2);
		
	var prod=Ext.get('Productos').getValue();
	lista = prod.split("!"); 
	var total=0;
	var lim=parseInt(lista.length)+1;
	for(i=0;i<lim;i++)
	{
			var contenedord = document.getElementById("txtCosto"+tipo+lista[i]);
			if(contenedord != null) {
				var tol=document.getElementById("txtTotal"+tipo+lista[i]).value.replace(',', '');
				total+=parseFloat(tol)
				}			
		}	
		document.getElementById("txtsub"+tipo).value=total.toFixed(2);
		document.getElementById("txtiva"+tipo).value=total*.16;
		document.getElementById("txtTotal"+tipo).value=((total*.16)+total).toFixed(2);		
	}	
function calculaP(tipo,id)
{
	var div=Ext.get('txtCosto'+tipo+id).getValue();
	var val=Ext.get('txtPorcentaje'+tipo+id).getValue();
	div=div.replace(',', '');
	val=val.replace(',', '');
	document.getElementById("txtPrecio"+tipo+id).value=(div/val).toFixed(2);
	var des=Ext.get('txtDesc'+tipo+id).getValue();
	if(des !='' && des >0)
	{
		var porc=document.getElementById("txtPrecio"+tipo+id).value.replace(',', '');
		porc=(porc*des)/100;		
		document.getElementById("txtTotal"+tipo+id).value=porc;
		}else{document.getElementById("txtTotal"+tipo+id).value=document.getElementById("txtPrecio"+tipo+id).value;}
		
	var prod=Ext.get('Productos').getValue();
	var cant=Ext.get('cantidades').getValue();
	lista = prod.split("!"); 
	var j=0;
	var x=0;
	var subtotalD=0;
	var subtotalP=0;
	var lim=parseInt(lista.length)+1;
	for(i=0;i<lim;i++)
	{
		var contenedord = document.getElementById("txtCostoD"+lista[i]);
		if(contenedord != null) {
			var tot=document.getElementById("txtTotalD"+lista[i]).value.replace(',', '');
				subtotalD+=parseFloat(tot)
			x++;	 		
		}
		var contenedorp = document.getElementById("txtCostoP"+lista[i]);
		if(contenedorp != null) {
			var tot=document.getElementById("txtTotalP"+lista[i]).value.replace(',', '');
			subtotalP+=parseFloat(tot)
		j++;
		}		
		}
	if(j >0)
	{
		document.getElementById("txtsubP").value=subtotalP;
		document.getElementById("txtivaP").value=subtotalP*.16;
		document.getElementById("txtTotalP").value=(subtotalP*.16)+subtotalP;
		}
	if(x >0)
	{
		document.getElementById("txtsubD").value=subtotalD;
		document.getElementById("txtivaD").value=subtotalP*.16;
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
var prod = creaEstores(0,1);
var dire = creaEstores(0,4);
var clien = creaEstores(0,2);
var cvecon = creaEstores(0,5);
var cveclie = creaEstores(0,6);
var cveProd= creaEstores(0,9);

var productos = new Ext.form.ComboBox({
			store: prod,
			id: 'producto',
			hiddenName: 'cveProducto', 
			valueField: 'value',
			displayField: 'label',
			triggerAction: 'all',
			emptyText: 'Seleccione producto',
			fieldLabel: 'Productos',
			anchor: '90%',
			editable: true		
		});
var cvePro = new Ext.form.ComboBox({
			store: cveProd,
			id: 'cveprod',
			 hiddenName: 'cveProd', 
			valueField: 'value',
			displayField: 'label',
			triggerAction: 'all',
			emptyText: 'Seleccione producto',
			fieldLabel: 'Clave Producto',
			anchor: '90%',
			editable: true		
		});
		
var clientes = new Ext.form.ComboBox({
			store: clien,
			hiddenName: 'nombreCli', 
			id: 'idCont',
			valueField: 'value',
			displayField: 'label',
			triggerAction: 'all',
			emptyText: 'Seleccione cliente',
			fieldLabel: 'Cliente',
			anchor: '90%',
			editable: true
		});
	clientes.on('select',function(cmb,record,index){
		if(record.get('value')==0)
		{
			winClientes();
		}
		else
		{
			cveclientes.disable();
			cveclientes.clearValue();
			cveclie.load({params:{id:record.get('value')}});
			
			direcciones.enable();
			direcciones.clearValue();
			dire.load({params:{id:record.get('value')}});
			contacto.enable();
			contacto.clearValue();
			cvecon.load({params:{id:record.get('value')}});		
			
			}
		});
var cveclientes = new Ext.form.ComboBox({
			store: cveclie,
			hiddenName: 'cveCliente', 
			id: 'client',
			valueField: 'value',
			displayField: 'label',
			triggerAction: 'all',
			emptyText: 'Seleccione cliente',
			fieldLabel: 'Clave',
			anchor: '90%',
			editable: true
		});

		
var direcciones = new Ext.form.ComboBox({
			store: dire,
			hiddenName: 'cveDireccion', 
			disabled: true,
			id: 'direccion',
			valueField: 'value',
			displayField: 'label',
			triggerAction: 'all',
			mode: 'local',
			emptyText: 'Seleccione obra',
			fieldLabel: 'Proyecto / Obra',
			anchor: '90%',
			editable: true
		});
direcciones.on('select',function(cmb,record,index){
			traerDatos(record.get('value'),8);
			});
var contacto = new Ext.form.ComboBox({
			store: cvecon,
			hiddenName: 'cveContacto', 
			disabled: true,
			id: 'cont',
			valueField: 'value',
			displayField: 'label',
			triggerAction: 'all',
			emptyText: 'Seleccione contacto',
			fieldLabel: 'Contacto',
			anchor: '90%',
			mode: 'local',
			editable: true
		});
contacto.on('select',function(cmb,record,index){
			traerDatos(record.get('value'),7);
			});
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
					         id: 'formPodu', region: 'north',
                			 height: 285,
							 anchor: '10%',
							 title      : 'Capturar datos',
							 bodyStyle  : 'background-color: #DFE8F6',
							 waitMsgTarget: true, 
							 bodyPadding: 20, 					
							 border:true,
							 items: [ { layout:'column',
									 bodyStyle  : 'padding: 10px; border:none',							
									  items:[
									  		{
												 columnWidth:.5,
												 layout: 'form',
												  bodyStyle  : 'background-color: #DFE8F6;border:none',	
												  items: [clientes,contacto,{xtype:'textfield',
													 name:'emailC',   
													 id: 'emailC',
													 fieldLabel:'Email',anchor: '90%',disabled: true},direcciones,{xtype:'textfield',
													 name:'calleE',   
													 id: 'calleE',
													 fieldLabel:'Dir. Entrega',anchor: '90%',disabled: true} ]
												 },
											{
												 columnWidth:.25,
												 layout: 'form',
												 bodyStyle  : 'background-color: #DFE8F6;border:none',	
												 items: [cveclientes,{xtype:'textfield',
													 name:'telContacto',   
													 id: 'telContacto',
													 fieldLabel:'Teléfono',disabled: true,anchor: '90%'},{
														xtype: 'radiogroup',
														fieldLabel: 'Crédito',
														cls: 'x-check-group-alt',
														anchor: '90%',
														items: [
															{boxLabel: 'Act.', name: 'credito', inputValue: 1},
															{boxLabel: 'Susp.', name: 'credito', inputValue: 2}
															
														]
													},{ xtype:'textfield',
													 name:'porcentaje',   
													 id: 'porcentaje',
													 fieldLabel:'% General.',anchor: '90%'
													 } ]
												 },
												 {
												 columnWidth:.25,
												 layout: 'form',
												 bodyStyle  : 'background-color: #DFE8F6;border:none',	
												 items: [{ xtype:'textfield',
													 name:'folio',   
													 id: 'folio',
													 fieldLabel:'Folio',anchor: '90%'
													 },{xtype:'datefield',
													 name:'fecha',   
													 id: 'fecha',
													 fieldLabel:'Fecha',anchor: '90%'},{ xtype:'datefield',
													 name:'vigencia',   
													 id: 'vigencia',
													 fieldLabel:'Vigencia',anchor: '90%'
													 } ]
												 }
												 
											 ]
									},
									 { layout:'column',
									 bodyStyle  : 'padding: 10px; border:none',							
									  items:[{
												 columnWidth:.3,
												 layout: 'form',
												  bodyStyle  : 'background-color: #DFE8F6;border:none',	
												  labelWidth:140,
												 items: [cvePro ]
												 },
												 {
												 columnWidth:.4,
												 layout: 'form',
												  bodyStyle  : 'background-color: #DFE8F6;border:none',	
												  //labelWidth:140,
												 items: [productos]
												  },{
												 columnWidth:.3,
												 layout: 'form',
												  bodyStyle  : 'background-color: #DFE8F6;border:none',	
												  //labelWidth:140,
												 items: [{ xtype:'textfield',
													 name:'cantidad',   
													 id: 'cantidad',
													 fieldLabel:'Cantidad',
													 handler: function(){bloquearEnter();}
													 }]}
												  
												  
											 ]
									},{
									  xtype:'hidden',
									  name:'Productos',
									  id:'Productos' 
									  },
									  {
									  xtype:'hidden',
									  name:'cantidades',
									  id:'cantidades', 
									  },{
									  xtype:'hidden',
									  name:'idcot',
									  id:'idcot' 
									  },{
									  xtype:'hidden',
									  name:'opercot',
									  value:1,
									  id:'opercot' 
									  }
									 
									 ],
									 buttons:[{
												text: 'Guardar',
												handler: function(){
													Guardar(1);
												}},{
												text: 'Guardar y Nuevo',
												handler: function(){
													Guardar(2);
												}},{
												text: 'Enviar por email',
												id:'btnenviarm',
												handler: function(){
													enviaremail();
												}},{
												text: 'Imprimir',
												id:'btnimp',
												handler: function(){
													imprimir();
												}},{
												text: 'Cancelar cot.',
												handler: function(){
													setStatus(2);
												}},{
												text: 'Suspender Cot.',
												handler: function(){
													setStatus(3);
												}},{
												text: 'Ordenar pedido',
												handler: function(){
													setStatus(4);
												}}]
									
									});
function bloquearEnter()
{
document.getElementById('cantidad').onkeydown=function(e){
    var e=window.event || e;
    if (e.keyCode == 13) window.alert('hola');
}
	}									
									
function imprimir()
{
	
	var cve=Ext.get('folio').getValue();
if(cve==''){alert('Necesitas guardar para imprimir')}
else{
	newwindow2=window.open('xmltopdf.php?id='+cve,'name','height=600,width=750');
}
	}
function enviaremail()
{
	
	var cve=Ext.get('folio').getValue();

	if(cve==''){alert('Necesitas guardar para enviar')}
else{
	newwindow2=window.open('submit.php?id='+cve,'name','height=600,width=750');
}
	
	}									
function Guardar(op)
{
	if (frmCoti.getForm().isValid()) {
		var cveCliente=Ext.get('nombreCli').getValue();
		var cveContacto=Ext.get('cveContacto').getValue();
		var cveDireccion=Ext.get('cveDireccion').getValue();
		var fecha=Ext.get('vigencia').getValue();
		var vigencia=Ext.get('fecha').getValue();
		var observacionesP='hola';//Ext.get('txaOngD').getValue();
		var observacionesD=Ext.get('txaOngP').getValue();
		var idcot=Ext.get('idcot').getValue();
		var tipo=Ext.get('opercot').getValue();
		var valores="idcot="+idcot+"&tipoP="+tipo+"&cveCliente="+cveCliente +"&cveContacto="+cveContacto +"&cveDireccion="+cveDireccion +"&fecha="+fecha +"&vigencia="+vigencia+"&observacionesP="+observacionesP +"&observacionesD="+observacionesD;
		
		var prod=Ext.get('Productos').getValue();
		var un=Ext.get('cantidades').getValue();
		unidades =un.split("!");
		lista =prod.split("!");
		var h=0; 
		valores+="&cunatpi="+lista.length;
		for(i=0;i<lista.length;i++)
		{
			var contenedord = document.getElementById("txtCostoD"+lista[i]);
				if(contenedord != null) {	
							var txtCostoP=Ext.get('txtCostoD'+lista[i]).getValue();
							var txtPorcentaje=Ext.get('txtPorcentajeD'+lista[i]).getValue();
							var txtDesc=Ext.get('txtDescD'+lista[i]).getValue();
							var txtPrecio=Ext.get('txtPrecioD'+lista[i]).getValue();
							var txtTotal=Ext.get('txtTotalD'+lista[i]).getValue();							
							var txtTienpo=Ext.get('txtTienpoD'+lista[i]).getValue();
							var txtcom=Ext.get('txtcomD'+lista[i]).getValue();	
							var prod=Ext.get('cvePrecio'+lista[i]).getValue();						
							valores+="&unidades"+i+"="+unidades[i] +"&cveprod"+i+"="+prod+"&txtCosto"+i+"="+txtCostoP +"&txtPorcentaje"+i+"="+txtPorcentaje+"&txtDesc"+i+"="+txtDesc+"&txtPrecio"+i+"="+txtPrecio+"&txtTotal"+i+"="+txtTotal+"&txtTienpo"+i+"="+txtTienpo+"&txtcom"+i+"="+txtcom+"&txtmon"+i+"=2";
				}
			var contenedorp = document.getElementById("txtCostoP"+lista[i]);
			if(contenedorp != null) {	
							var txtCostoP=Ext.get('txtCostoP'+lista[i]).getValue();
							var txtPorcentaje=Ext.get('txtPorcentajeP'+lista[i]).getValue();
							var txtDesc=Ext.get('txtDescP'+lista[i]).getValue();
							var txtPrecio=Ext.get('txtPrecioP'+lista[i]).getValue();
							var txtTotal=Ext.get('txtTotalP'+lista[i]).getValue();
							var txtTienpo=Ext.get('txtTienpoP'+lista[i]).getValue();
							var txtcom=Ext.get('txtcomP'+lista[i]).getValue();	
								var prod=Ext.get('cvePrecio'+lista[i]).getValue();								
							valores+="&unidades"+i+"="+unidades[i] +"&cveprod"+i+"="+prod+"&txtCosto"+i+"="+txtCostoP +"&txtPorcentaje"+i+"="+txtPorcentaje+"&txtDesc"+i+"="+txtDesc+"&txtPrecio"+i+"="+txtPrecio+"&txtTotal"+i+"="+txtTotal+"&txtTienpo"+i+"="+txtTienpo+"&txtcom"+i+"="+txtcom+"&txtmon"+i+"=1";
				}
		}
		var tipo=1;
		$.ajax({
			url: 'guardarCot.php',
			type: "POST",
			data: valores,
			success: function(datos){
				Ext.MessageBox.alert('Alert', 'La cotizacion se guardo correctamente.' );
				if(op==2){window.location='cotizador.php';}
				cargaCot.load_listaCot(0,0,0);
			}
		});		
	}
	
}

	var panel1 = new Ext.Panel({
			id: 'contenIn',
			title: 'Productos',
			iconCls: 'users',
			region: 'center',
			width    : 650
		
		});	
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
			items	:	[frmCoti,panel1			
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
			  id:'tabClientes', title:'Capturar Cotizacion',layout: 'fit',
				items:centerb
			},
			{
			  id:'Direcciones', title:'Cotizaciones pendientes',layout: 'fit',
				items:gridCot
			},{
			  id:'facturas', title:'Cotizaciones pagadas',layout: 'fit',
				items:PanelCotb
			}
						
			]}]
		});	 
		
		
function setStatus(status)
{
	var cve=Ext.get('folio').getValue();
		$.ajax({
			url: 'guardarCot.php',
			type: "POST",
			data: "tipoP=4&estatus="+status+"&cve="+cve,
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
					cargaCot.load_listaCot(0,0,0);	
			}
		});	
	}
function elimiarTr(id){
	$('#btn'+id).remove() ;	
	totales();
	}
function totales()
{
	var prod=Ext.get('Productos').getValue();
	var lista =prod.split("!");
	var j=0;
	var x=0;
	var subtotalD=0;
	var subtotalP=0;
	var lim=parseInt(lista.length);
	for(i=0;i<lim;i++)
	{
		var contenedord = document.getElementById("txtCostoD"+lista[i]);
		if(contenedord != null) {
			var tot=document.getElementById("txtTotalD"+lista[i]).value.replace(',', '');
				subtotalD+=parseFloat(tot)
			x++;	 		
		}
		var contenedorp = document.getElementById("txtCostoP"+lista[i]);
		if(contenedorp != null) {
			var tot=document.getElementById("txtTotalP"+lista[i]).value.replace(',', '');
			subtotalP+=parseFloat(tot)			
		j++;
		}		
		}
	if(j >0)
	{
		document.getElementById("txtsubP").value=subtotalP;
		document.getElementById("txtivaP").value=subtotalP*.16;
		document.getElementById("txtTotalP").value=(subtotalP*.16)+subtotalP;
		}
	if(x >0)
	{
		document.getElementById("txtsubD").value=subtotalD;
		document.getElementById("txtivaD").value=subtotalD*.16;
		document.getElementById("txtTotalD").value=(subtotalD*.16)+subtotalD;
		}
	}