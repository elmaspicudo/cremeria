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
		 	  document.getElementById('cliente').value=jsonData.razonSocial;
			   document.getElementById('vigencia').value=jsonData.folio ;
			    document.getElementById('telContacto').value=jsonData.vent;
				document.getElementById('cveFactura').value=jsonData.cveFactura;
         } else {  
             Ext.MessageBox.alert('Alert', jsonData.data.message );              
         }  
     } 
	 

function traerDatos(cve,tipo)
{
	 Ext.Ajax.request({  
             url: 'otroListado.php?listado=3',  
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
							 title      : 'Datos de Entrega',
							 bodyStyle  : 'padding: 10px;',
							 waitMsgTarget: true, 
							 bodyPadding: 20, 					
							 border:true,
							 items: [ { layout:'column',
									 bodyStyle  : ' border:none',							
									  items:[
									  		{
												 columnWidth:.5,
												 layout: 'form',
												  bodyStyle  : 'border:none',	
												  items: [{xtype:'textfield',
													 name:'factura',   
													 id: 'factura',
													 fieldLabel:'Factura / Rem.',anchor: '90%'},{xtype:'textfield',
													 name:'cliente',   
													 id: 'cliente',
													 fieldLabel:'Cliente',anchor: '90%',disabled: true},{xtype:'textfield',
													 name:'emailC',   
													 id: 'emailC',
													 fieldLabel:'Persona E.',anchor: '90%'} ]
												 },
											{
												 columnWidth:.25,
												 layout: 'form',
												 bodyStyle  : 'border:none',	
												 items: [{
														xtype: 'radiogroup',
														fieldLabel: 'Tipo Doc.',
														cls: 'x-check-group-alt',
														anchor: '90%',
														id:'losradio',
														items: [
															{boxLabel: 'Fac.', name: 'credito',  inputValue: 1},
															{boxLabel: 'Rem.', name: 'credito', inputValue: 3}
															
														]
													},{xtype:'textfield',
													 name:'cve',   
													 id: 'cve',
													 fieldLabel:'Clave',anchor: '90%',disabled: true},{xtype:'textfield',
													 name:'telContacto',   
													 id: 'telContacto',
													 fieldLabel:'Vendedor',disabled: true,anchor: '90%'} ]
												 },
												 {
												 columnWidth:.25,
												 layout: 'form',
												 bodyStyle  : 'border:none',	
												 items: [{ xtype:'textfield',
													 name:'folio',   
													 id: 'folio',
													 fieldLabel:'Folio',anchor: '90%'
													 },{xtype:'datefield',
													 name:'fecha',   
													 id: 'fecha',
													 fieldLabel:'Fecha',anchor: '90%'},{ xtype:'textfield',
													 name:'vigencia',   
													 id: 'vigencia',
													 fieldLabel:'No. Cotz',anchor: '90%'
													 } ]
												 }
												 
											 ]
									},{
									  xtype:'textfield',
									  name:'nombrecom',
									  id:'nombrecom',
									  fieldLabel:'Nombre comercial',anchor: '50%'
									  },{ layout:'column',
									 bodyStyle  : 'padding: 10px; border:none',							
									  items:[
												 {
												 columnWidth:.7,
												 layout: 'form',
												  bodyStyle  : 'border:none',	
												  //labelWidth:140,
												 items: [productos]
												  },{
												 columnWidth:.3,
												 layout: 'form',
												  bodyStyle  : 'border:none',	
												  //labelWidth:140,
												 items: [{ xtype:'textfield',
													 name:'cantidad',   
													 id: 'cantidad',
													 fieldLabel:'Cantidad'
													 }]}
												  
												  
											 ]
									}
									 ,{
									  xtype:'hidden',
									  name:'Productos',
									  id:'Productos' 
									  },
									  {
									  xtype:'hidden',
									  name:'cantidades',
									  id:'cantidades' 
									  },
									  {
									  xtype:'hidden',
									  name:'hdncont',
									  id:'hdncont' ,
									  value:0
									  },
									  {
									  xtype:'hidden',
									  name:'hdnidEnr',
									  id:'hdnidEnr' ,
									  value:0
									  },
									  {
									  xtype:'hidden',
									  name:'cveFact',
									  id:'cveFactura' ,
									  value:0
									  },
									  {
									  xtype:'hidden',
									  name:'estatus',
									  id:'estatus' ,
									  value:1
									  }
									 
									 ],
									 buttons:[{
												text: 'Vista previa',
												handler: function(){
													var hdnidEnr=Ext.get('hdnidEnr').getValue();
													if(hdnidEnr > 0){
													imprimir();}else{ Ext.MessageBox.alert('Alert','Tienes que guardar para inprimir');}
												}},{
												text: 'Guardar',
												handler: function(){
													var hdnidEnr=Ext.get('estatus').getValue();
													if(hdnidEnr > 1){Ext.MessageBox.alert('Alert','La orden ya se envio a Almacen');
														}else{
													Guardar(1);}
												}},{
												text: 'Enviar Almacen',
												handler: function(){
													var hdnidEnr=Ext.get('hdnidEnr').getValue();
													if(hdnidEnr > 0){
													setStatus(2);
													document.getElementById('estatus').value=2
													 cargaCot.load_listaCot(0,0,0);
													}else{ Ext.MessageBox.alert('Alert','Tienes que guardar para enviar');}
												}}]
									
									});
									
function cargarOrdens(cveDireccion)
{
	 var tabPanel = Ext.getCmp('tabClientes');
		 tabPanel.show();
	  frmCoti.getForm().load({
                         url : 'listadosb.php',
                         method: 'POST',
                         params: {
                             cve:cveDireccion,listado:14
                         },
                         waitMsg : 'Espere por favor' ,
						
                     });
	var divObj = Ext.get('contenIn');

			divObj.load({
				url: 'tablaN.php',
				method: 'GET',
				params: {oper:3,data:cveDireccion}
			});

	}
 var clientesRecord = new Ext.data.Record.create([
         {name: 'factura', type: 'string'},
         {name: 'cliente', type: 'string'},
         {name: 'emailC', type: 'string'} ,
		 {name: 'losradio', type: 'string'},
         {name: 'cve', type: 'string'},
         {name: 'telContacto', type: 'string'} ,
		 {name: 'folio', type: 'string'},
         {name: 'fecha', type: 'string'},
		 {name: 'vigencia', type: 'string'},
		 {name: 'hdncont', type: 'string'},
		 {name: 'hdnidEnr', type: 'string'} ,
		 {name: 'cveFactura', type: 'string'} ,
		 {name: 'estatus', type: 'string'}
		 
     ]);

     var clientesFormReader = new Ext.data.JsonReader(
             {
                 root : 'data',
                 successProperty : 'success',
                 totalProperty: 'total',
                 id: 'idClientes'
             },clientesRecord
     );

									
function Guardar(tipo)
{
	if (frmCoti.getForm().isValid()) {
		var factura=Ext.get('cveFactura').getValue();
		var emailC=Ext.get('emailC').getValue();
		var ordenC=Ext.get('losradio').getValue();
		var folio=Ext.get('folio').getValue();
		var vigencia=Ext.get('fecha').getValue();
		var nombrecom=Ext.get('nombrecom').getValue();
		var hdnidEnr=Ext.get('hdnidEnr').getValue();
			var tipo=1;
		if(document.getElementById('hdnidEnr').value>0){tipo=3;}
		var valores="tipoP="+tipo+"&factura="+factura+"&personaE="+emailC +"&credito="+ordenC +"&folio="+folio +"&vigencia="+vigencia +"&nombrecom="+nombrecom+"&hdnidEnr="+hdnidEnr;
		
		var prod=Ext.get('Productos').getValue();
		lista =prod.split("!");
		var h=0; 
		var cuant=parseInt(Ext.get('hdncont').getValue())+1;
		valores+="&cunatpi="+Ext.get('hdncont').getValue()+1;
		for(i=0;i<cuant;i++)
		{
			var contenedord = document.getElementById("cvePrecio"+lista[i]);
				if(contenedord != null) {	
							var prod=Ext.get('cvePrecio'+lista[i]).getValue();
							var cant=Ext.get('txtPrecioP'+lista[i]).getValue();
							valores+="&prod"+i+"="+prod +"&cant"+i+"="+cant;
				}			
		}
	
		$.ajax({
			url: 'guardarRec.php',
			type: "POST",
			data: valores,
			success: function(datos){
				if(hdnidEnr >0){cargarOrdens(hdnidEnr)}
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
			  id:'tabClientes', title:'ORDEN DE SALIDA',layout: 'fit',
				items:centerb
			},
			{
			  id:'Direcciones', title:'ORDEN DE SALIDA PENDIENTES',layout: 'fit',
				items:gridCot
			}
						
			]}]
		});	 
		
		
function setStatus(status)
{
	var cve=Ext.get('hdnidEnr').getValue();
		$.ajax({
			url: 'guardarRec.php',
			type: "POST",
			data: "tipoP=4&estatus="+status+"&cve="+cve,
			success: function(datos){
				switch (status)	{
						case 1:alert(1)
						break;
						case 2:Ext.MessageBox.alert('Alert', 'La orden se envio a Almacen.' );
						break;
						case 3:alert(3)
						break;			
						case 4:	
						break;	
					}			
			}
		});	
	}