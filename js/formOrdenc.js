// JavaScript Document
function creaEstores(ids,op){
		var stores = new Ext.data.JsonStore({
			url:'listadoCot.php?id='+ ids+'&oper='+op,
			root:'data',
			fields: ['value','label']
		});
		return stores;
	}
var clien = creaEstores(0,11);
var cvecon = creaEstores(0,12);
var clientes = new Ext.form.ComboBox({
			store: clien,
			hiddenName: 'nombreCli', 
			id: 'idCont',
			valueField: 'value',
			displayField: 'label',
			triggerAction: 'all',
			emptyText: 'Seleccione proveedor',
			fieldLabel: 'Proveedor',
			anchor: '90%',
			editable: true
		});
	clientes.on('select',function(cmb,record,index){
		contacto.enable();
			contacto.clearValue();
			cvecon.load({params:{id:record.get('value')}});	
			id=document.getElementById('idcot').value;
			 cargarPorductos(id,record.get('value'));	
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
			var websDatab = [
        ['1','Fletera'],
        ['2','Transporte Propio'],
        ['3','Mensajeria'],
		['4','Transporte particular']
    ];
var forma = new Ext.form.ComboBox({
                                mode:           'local',
                                triggerAction:  'all',
                                forceSelection: true,
                                editable:       false,
                                fieldLabel:     'Forma de entrega',
                                name:           'forma',
								 displayField:   'name',
                                valueField:     'value',
                                queryMode: 'local',
								hiddenName:'formah',
                                store: new Ext.data.SimpleStore({  
								fields: ['value', 'name'],  
								data : websDatab,								  
								id: 0  
										})
                            });
							
var websData = [
        ['1','Contado'],
        ['2','Credito'],
        ['3','Anticipo 50% y 50%']
    ];

    var categoriesComboWebs = new Ext.form.ComboBox({
        fieldLabel: 'tipo',
        hiddenName: 'hdn_id_busqueda', 
		store: new Ext.data.SimpleStore({
            fields: ['id_busqueda', 'nombres'],
            data : websData,
            id: 0
        }),
        valueField: 'id_busqueda',
        displayField: 'nombres',
        typeAhead: true,
        mode: 'local',
        triggerAction: 'all',
        emptyText: 'Seleccione el tipo de búsqueda...',
        selectOnFocus: true,
        width: 150
    });
							  
								
var frmCoti=	new  Ext.form.FormPanel({  
					         id: 'formPodu', region: 'north',
                			 height: 285,
							 anchor: '10%',
							  bodyStyle  : 'padding: 10px;',								
							 title      : 'Capturar datos',
							  reader: ordenRecord,
							 waitMsgTarget: true, 
							 bodyPadding: 20, 					
							 border:true,
							 items: [{ layout:'column',
									   bodyStyle  : ';border:none',
									   labelWidth: 65,	
													  
									  items:[
									  		{
												 columnWidth:.25,
												 layout: 'form',
												  bodyStyle  : ';border:none',		
												  items: [{xtype:'textfield',
													 name:'folio',   
													 id: 'folio',
													 fieldLabel:'Folio',anchor: '90%',disabled: true,}]
												 },
											{
												 columnWidth:.25,
												 layout: 'form',
												 bodyStyle  : ';border:none',	  												
												 items: [{xtype:'datefield',
													 name:'fecD', 
													 id: 'fecD',fieldLabel:'Fecha Exp.',anchor: '90%'}] 
												 },{
												 columnWidth:.25,
												 layout: 'form',
												 bodyStyle  : ';border:none',	  						
												 items: [{ xtype: 'timefield',
															minValue: '1:30 AM',
															maxValue: '9:15 PM',
													 name:'hora', 
													 id: 'hora',fieldLabel:'Hora',anchor: '90%'}]
												 },{
												 columnWidth:.25,
												 layout: 'form',
												 bodyStyle  : ';border:none',	  												
												 items: [{xtype:'datefield',
													 name:'entrega', 
													 id: 'entrega',fieldLabel:'Fecha Ent.',anchor: '90%'}]
												 }
												 
											 ]
									},clientes,contacto,
													  { layout:'column',
													  bodyStyle  : ';border:none',	
									  items:[
									  		{
												 columnWidth:.45,
												 layout: 'form',
												  bodyStyle  : ';border:none',		
												  items: [{xtype:'textfield',
													 name:'emailC',   
													 id: 'emailC',
													 fieldLabel:'Email',anchor: '90%',disabled: true},forma]
												 }, 
											{
												 columnWidth:.45,
												 layout: 'form',
												 bodyStyle  : ';border:none',	  												
												 items: [{xtype:'textfield',
													 name:'telContacto', 
													 id: 'telContacto',
													 fieldLabel:'Telefono',disabled: true,anchor: '90%'},categoriesComboWebs]
												 }
											 ]
									},{xtype : "displayfield",anchor: '90%',id:'labStat', value:"",width: 80,style: 'font-size:18px;color:green;font-weight:bold;'}
									,{
									  xtype:'hidden',
									  name:'opera',
									  id:'opera',
									  value:1
									  },
									  {
									  xtype:'hidden',
									  name:'cuant',
									  id:'cuant' 
									  },
									  {
									  xtype:'hidden',
									  name:'idcot',
									  id:'idcot' 
									  },
									  {
									  xtype:'hidden',
									  name:'statcot',
									  id:'statcot' 
									  },
									  {
									  xtype:'hidden',
									  name:'idOrden',
									  id:'idOrden' ,value:0
									  }
									 
									 ],
									 buttons:[{
												text: 'Cerrar compra',
												handler: function(){
													var st= Ext.get('idOrden').getValue();
													if(st > 0){
													setStatus(3);
                                                    Ext.getCmp('statcot').setValue(3);
													window.location='inventario.php';
													}else{Ext.MessageBox.alert('Alert', 'No se puede cerrar la compra si no guardas' );}
												}},{
												text: 'Guardar',
												handler: function(){
													 var st= Ext.get('idOrden').getValue();
													if(st > 1 ){Ext.MessageBox.alert('Alert', 'Ya se guardo la orden' );}else{
													guardar();
													var prov=0;
													if(document.getElementById('nombreCli').value >0){prov=document.getElementById('nombreCli').value;}													
													cargarPorductos(document.getElementById('idcot').value,prov);
													}
													}},{
												text: 'Enviar por email',
												id:'btnenviarm',
												handler: function(){
													var st= Ext.get('idOrden').getValue();
													if(st > 0){
													enviaremail();
													}else{Ext.MessageBox.alert('Alert', 'No se puede enviar la compra si no guardas' );}
												}},{
												text: 'Imprimir',
												id:'btnimp',
												handler: function(){
													var st= Ext.get('idOrden').getValue();
													if(st > 0){
													imprimir();
													}else{Ext.MessageBox.alert('Alert', 'No se puede imprimir la compra si no guardas' );}
												}},{
												text: 'Cancelar cot.',
												handler: function(){
													var st= Ext.get('idOrden').getValue();
													if(st > 0){
													setStatus(2);
                                                    Ext.getCmp('statcot').setValue(2);
													}else{Ext.MessageBox.alert('Alert', 'No se puede cancelar la compra si no guardas' );}
                                               }}]
									
									});
									
	
function traerDatos(cve)
{
	
	$.post( 'qsp.php', { id: cve, oper: 3 },
	  function(data){
		 var dat=data.split('|');
		 document.getElementById('telContacto').value=dat[0]
		 document.getElementById('emailC').value=dat[1]
	  });
	
	}									
function cargarOrdenc(cveOrden)
{
	 var tabPanel = Ext.getCmp('tabFormP');
		 tabPanel.show();
	  frmCoti.getForm().load({  
                         url : 'listadosb.php',  
                         method: 'POST',  
                         params: {  
                             cve:cveOrden,listado:13
                         },
                         waitMsg : 'Espere por favor'  
                     });  
	document.getElementById("opera").value=2;
	
	var divObj = Ext.get('contenIn'); 
	divObj.load({
				url: 'prod.php',
				method: 'GET',
				params: {oper:2,id:cveOrden}
			});	
	}
 var ordenRecord = new Ext.data.Record.create([  
         {name: 'folio', type: 'string'},  
         {name: 'fecD', type: 'string'},  
         {name: 'hora', type: 'string'},  
         {name: 'entrega', type: 'string'},
		 {name: 'emailC', type: 'string'} ,{name: 'tipoP', type: 'string'} ,{name: 'nombreCli', type: 'string'} ,{name: 'cont', type: 'string'},
		 {name: 'telContacto', type: 'string'}, 
		 {name: 'idcot', type: 'string'} ,{name: 'idCont', type: 'string'} ,{name: 'cveContacto', type: 'string'} ,
		 {name: 'statcot', type: 'string'} ,{name: 'forma', type: 'string'} ,{name: 'tipoP', type: 'string'} ,
		 {name: 'idOrden', type: 'string'} 		
     ]); 
     var ordenFormReader = new Ext.data.JsonReader(  
             {  
                 root : 'data',  
                 successProperty : 'success',  
                 totalProperty: 'total',  
                 id: 'idProducto'  
             },ordenRecord  
     );
									
	var panellist=new Ext.Panel({
			id: 'contenIn',
			title: 'Productos',
			iconCls: 'users',
			region: 'center',
			width    : 650
		
		});	
			var centerb = new Ext.Panel({
			xtype	:	"panel",
			region	:	"center",
			layout	:	"border",
			border	:	false,
			items	:	[frmCoti,panellist]
		});

function setStatus(status)
{
	var cve=Ext.get('idOrden').getValue();
   
		$.ajax({
			url: 'guardarOrdenc.php',
			type: "POST",
			data: "tipoP=4&estatus="+status+"&cve="+cve,
			success: function(datos){
				switch (status)	{
						case 1:
						break;
						case 2:Ext.MessageBox.alert('Alert', 'La cotizacion ha sido cancelada.' );
						break;
						case 3:Ext.MessageBox.alert('Alert', 'Venta cerrada exitosamente felicidades.' );
						break;
					}
					
			}
		});
		 cargaOrdF.load_listaOrdF(0,0,0);
		  cargaOrdC.load_listaOrdC(0,0,0);
        }

function realPedido(id){
	    
        var tabPanel = Ext.getCmp('tabFormP');
		 tabPanel.show();
		   	cargarPorductos(id,0);
			document.getElementById('idcot').value=id;
		}	

var provds = creaEstores(0,14);
var cveprov = creaEstores(0,12);
var provedores = new Ext.form.ComboBox({
			store: provds,
			hiddenName: 'nombreprov', 
			id: 'idprov',
			valueField: 'value',
			displayField: 'label',
			triggerAction: 'all',
			emptyText: 'Seleccione proveedor',
			fieldLabel: 'Proveedor',
			anchor: '90%',
			editable: true
		});
	provedores.on('select',function(cmb,record,index){
			cveprov.load({params:{id:record.get('value')}});		
			
	});
var contProv = new Ext.form.ComboBox({
			store: cveprov,
			hiddenName: 'cveContactop', 
			disabled: true,
			id: 'contp',
			valueField: 'value',
			displayField: 'label',
			triggerAction: 'all',
			emptyText: 'Seleccione contacto',
			fieldLabel: 'Contacto',
			anchor: '90%',
			mode: 'local',
			editable: true
		});
contProv.on('select',function(cmb,record,index){
			
			});
var form = new Ext.form.ComboBox({
                                mode:           'local',
                                triggerAction:  'all',
                                forceSelection: true,
                                editable:       false,
                                fieldLabel:     'Forma de entrega',
                                name:           'form',
                                displayField:   'name',
                                valueField:     'value',
                                 hiddenName: 'hdn_form',
                                store: new Ext.data.SimpleStore({  
								fields: ['value', 'name'],  
								data : websDatab,  
								id: 0  
										})
                            });			
var cat = new Ext.form.ComboBox({
        fieldLabel: 'tipo',
        hiddenName: 'hdn_id', // Este campo es importante, sin él no funciona el combo
        store: new Ext.data.SimpleStore({
            fields: ['id_busqueda', 'nombres'],
            data : websData,
            id: 0
        }),
        valueField: 'id_busqued',
        displayField: 'nombres',
        typeAhead: true,
        mode: 'local',
        triggerAction: 'all',
        emptyText: 'Seleccione el tipo de búsqueda...',
        selectOnFocus: true,
        width: 150
    });
	 
var frmpro=	new  Ext.form.FormPanel({  
					         id: 'formPodu', region: 'north',
                			 height: 285,
							 anchor: '10%',
							  bodyStyle  : 'padding: 10px;',								
							 title      : 'Capturar datos',
							 waitMsgTarget: true, 
							 bodyPadding: 20, 					
							 border:true,
							 items: [{ layout:'column',
									   bodyStyle  : ';border:none',
									   labelWidth: 65,	
													  
									  items:[
									  		{
												 columnWidth:.25,
												 layout: 'form',
												  bodyStyle  : ';border:none',		
												  items: [{xtype:'textfield',
													 name:'foliof',   
													 id: 'foliof',
													 fieldLabel:'Folio',anchor: '90%',disabled: true,}]
												 },
											{
												 columnWidth:.25,
												 layout: 'form',
												 bodyStyle  : ';border:none',	  												
												 items: [{xtype:'datefield',
													 name:'fecDf', 
													 id: 'fecDf',fieldLabel:'Fecha Exp.',anchor: '90%'}]
												 },{
												 columnWidth:.25,
												 layout: 'form',
												 bodyStyle  : ';border:none',	  												
												 items: [{ xtype: 'timefield',
															minValue: '1:30 AM',
															maxValue: '9:15 PM',
													 name:'horaf', 
													 id: 'horaf',fieldLabel:'Hora',anchor: '90%'}]
												 },{
												 columnWidth:.25,
												 layout: 'form',
												 bodyStyle  : ';border:none',	  												
												 items: [{xtype:'datefield',
													 name:'entregaf', 
													 id: 'entregaf',fieldLabel:'Fecha Ent.',anchor: '90%'}]
												 }
												 
											 ]
									},provedores,contProv,
													  { layout:'column',
													  bodyStyle  : ';border:none',	
									  items:[
									  		{
												 columnWidth:.45,
												 layout: 'form',
												  bodyStyle  : ';border:none',		
												  items: [{xtype:'textfield',
													 name:'emailp',   
													 id: 'emailp',
													 fieldLabel:'Email',anchor: '90%',disabled: true},form]
												 },
											{
												 columnWidth:.45,
												 layout: 'form',
												 bodyStyle  : ';border:none',	  												
												 items: [{xtype:'textfield',
													 name:'telContactop', 
													 id: 'telContactop',
													 fieldLabel:'Telefono',disabled: true,anchor: '90%'},cat]
												 }
											 ]
									},{
									  xtype:'hidden',
									  name:'Productosp',
									  id:'Productosp' 
									  },
									  {
									  xtype:'hidden',
									  name:'cantidadesp',
									  id:'cantidadesp' 
									  },{
									  xtype:'hidden',
									  name:'oper',
									  id:'oper' ,
									  value:1
									  },
									  {
									  xtype:'hidden',
									  name:'idorden',
									  id:'idorden' 
									  }
									 
									 ],
									 buttons:[{
												text: 'Ordenar compra',
												handler: function(){
													guardarb();
												}}]
									
									});
									
									var panellistp=new Ext.Panel({
			id: 'contenp',
			title: 'Productos',
			iconCls: 'users',
			region: 'center',
			width    : 650
		
		});	
			var centerp = new Ext.Panel({
			xtype	:	"panel",
			region	:	"center",
			layout	:	"border",
			border	:	false,
			items	:	[panellistp]
		});
	var winp;
function traerPrecio(id,cot){	
	     if(!winp){
            winp = new Ext.Window({
                modal: 'true',
                layout:'fit',
                width:900,
                height:600,
                closeAction:'hide',
                plain: true,
                items: centerp
               
            });
        }
        winp.show(); 
		cargaProvedores(id,0,cot)  
		Ext.getCmp('cantidadesp').setValue(cot) 	
		}	
	
	  	 var fAjax = function(response, request) {          
         var errMessage = '<b>Error en la petición</b>  '  
                        + ' <b>status</b> ' + response.status + ''  
                        + ' <b>statusText</b> ' + response.statusText + ''  
                        + ' <b>responseText</b> ' + response.responseText + '';  
   
        
     }  
 var tAjax = function(response, request) {  
         var jsonData = Ext.util.JSON.decode(response.responseText);		 
					Ext.getCmp('cuant').setValue(jsonData.cuant);		
		
     } 
	
function cargarPorductos(id,prov)
{
	var divObj = Ext.get('contenIn'); 
	divObj.load({
				url: 'prod.php',
				method: 'GET',
				params: {oper:1,id:id,idp:prov}
			});	
			
		Ext.Ajax.request({  
             url: 'listadoCot.php?oper=15',  
             method: 'POST',  
             success: tAjax,  
             failure: fAjax,  
             timeout: 10000,  
             headers: {  
                 'cabecera-propia': 'prueba'  
             },  
             params: {  
                 cve: id
             }  
         });	
	}	
 
function cargaProvedores(id,prov,cot)
{
	var divObj = Ext.get('contenp'); 
	divObj.load({
				url: 'prod.php',
				method: 'GET',
				params: {oper:3,id:id,idp:prov,cot:cot}
			});	
	}	
	

function traerPreciop(cve,id)
{
	provds.load({params:{id:id}});
	provedores.setValue(cve);
	cot=document.getElementById('idcot').value;
		var divObj = Ext.get('contenp'); 
		divObj.load({
					url: 'prod.php',
					method: 'GET',
					params: {oper:2,id:id,idp:cve,cot:cot}
				});	
	contProv.enable();
			contProv.clearValue();
			//cveprov.load({params:{id:record.get('value')}});	
	}	
function formatNumber(num,prefix){
prefix = prefix || '';
num = Math.round(parseFloat(num)*Math.pow(10,2))/Math.pow(10,2)
num += '';
var splitStr = num.split('.');
var splitLeft = splitStr[0];
var splitRight = splitStr.length > 1 ? '.' + splitStr[1] : '';
var regx = /(\d+)(\d{3})/;
while (regx.test(splitLeft)) {
splitLeft = splitLeft.replace(regx, '$1' + ',' + '$2');
}
return prefix + splitLeft + splitRight;
}
function unformatNumber(num) {
return num.replace(/([^0-9\.\-])/g,'')*1;
}
function calculaP1(tipo,id)
{
		
	var div=Ext.get('Precio'+tipo+id).getValue();
	var des=Ext.get('txtDesc'+tipo+id).getValue();
    var cant=Ext.get('txtCant'+tipo+id).getValue();	

	div=unformatNumber(div);
	des=unformatNumber(des);
    cant=unformatNumber(cant);
    
      
	des=parseFloat(des);
	div=parseFloat(div)
    cant=parseFloat(cant);
      
	var porc=(div*des)/100;	
	porc=(parseFloat(div)-porc)*cant;	
	
    document.getElementById("txtTotal"+tipo+id).value=formatNumber(porc,'$');
		
	var cuantos=parseInt(document.getElementById('cuant').value)+1;
	var total=0;
	for(i=1;i<cuantos;i++)
	{
			var contenedord = document.getElementById('Precio'+tipo+id);
			if(contenedord != null) {
				var tol=unformatNumber(document.getElementById("txtTotal"+tipo+id).value);
				total+=parseFloat(tol);
				//alert(i)
				}			
		}	
		document.getElementById("txtsub1"+tipo).value=formatNumber(total,'$');
		document.getElementById("txtiva1"+tipo).value=formatNumber(total*.16,'$');
		document.getElementById("txtTotal1"+tipo).value=formatNumber(((total*.16)+total),'$');	
	
	}				
function calculaP2()
{
	var div=Ext.get('Precio'+tipo+id).getValue();
	var des=Ext.get('txtDesc'+tipo+id).getValue();
    var cant=Ext.get('txtCant'+tipo+id).getValue();	

	div=unformatNumber(div);
	des=unformatNumber(des);
    cant=unformatNumber(cant);
    
      
	des=parseFloat(des);
	div=parseFloat(div)
    cant=parseFloat(cant);
      
	var porc=(div*des)/100;	
	porc=(parseFloat(div)-porc)*cant;	
	
    document.getElementById("txtTotal"+tipo+id).value=formatNumber(porc,'$');	
		
	if(j >0)
	{
		document.getElementById("txtsub2D").value=total;
		document.getElementById("txtTotal2D").value=(total*.16)+total;
		}
	if(x >0)
	{
		document.getElementById("txtsub2P").value=total;
		document.getElementById("txtTotal2P").value=(total*.16)+total;
		}
	}
function guardarb()
{
	if (frmpro.getForm().isValid()) {
		var fecD=Ext.get('fecDf').getValue();
		var hora=Ext.get('horaf').getValue();
		var entrega=Ext.get('entregaf').getValue();
		var nombreCli=Ext.get('nombreprov').getValue();
		var hdn_id_busqueda=Ext.get('hdn_form').getValue();
		var cveContactop=Ext.get('cveContactop').getValue();
		var cot=Ext.get('cantidadesp').getValue();
		var idorden=Ext.get('idorden').getValue();
		var foliof=Ext.get('foliof').getValue();
		var obs=Ext.get('txaOng2P').getValue();	
		var tipoP=Ext.get('oper').getValue();
		var hdn_id=Ext.get('hdn_id').getValue();
		var valores="cot="+cot+"&fecD="+fecD+"&hora="+hora+"&entrega="+entrega +"&nombreCli="+nombreCli +"&hdn_id_busqueda="+hdn_id_busqueda +"&cveContactop="+cveContactop+"&foliof="+foliof+"&obs="+obs+"&tipoP="+tipoP+"&hdn_id="+hdn_id;
		
		valores+="&cunatpi=2";
		
			var contenedord = document.getElementById("cvePrecioP1");
			var i=1;
				if(contenedord != null) {	
							var cvePrecio=Ext.get('cvePrecioP1').getValue();
							var txtCant=Ext.get('txtCantP1').getValue();
							var Precio=Ext.get('PrecioP1').getValue();
							var txtDesc=Ext.get('txtDescP1').getValue();
							var txtTotal=Ext.get('txtTotalP1').getValue();														
							var txtTienpo=Ext.get('txtTienpoP1').getValue();							
							var txtcom=Ext.get('txtcomP1').getValue();	
											
							valores+="&cvePrecio"+i+"="+cvePrecio +"&txtCant"+i+"="+txtCant+"&Precio"+i+"="+Precio +"&txtDesc"+i+"="+txtDesc+"&txtTotal"+i+"="+txtTotal+"&txtTienpo"+i+"="+txtTienpo+"&txtcom"+i+"="+txtcom+"&txtmon"+i+"=2";
				}
			var contenedorp = document.getElementById("cvePrecioD1");
			if(contenedorp != null) {	
							var cvePrecio=Ext.get('cvePrecioD1').getValue();
							var txtCant=Ext.get('txtCantD1').getValue();
							var Precio=Ext.get('PrecioD1').getValue();
							var txtDesc=Ext.get('txtDescD1').getValue();
							var txtTotal=Ext.get('txtTotalD1').getValue();														
							var txtTienpo=Ext.get('txtTienpoD1').getValue();							
							var txtcom=Ext.get('txtcomD1').getValue();	
											
							valores+="&cvePrecio"+i+"="+cvePrecio +"&txtCant"+i+"="+txtCant+"&Precio"+i+"="+Precio +"&txtDesc"+i+"="+txtDesc+"&txtTotal"+i+"="+txtTotal+"&txtTienpo"+i+"="+txtTienpo+"&txtcom"+i+"="+txtcom+"&txtmon"+i+"=2";
				}
		
		var tipo=1;
		$.ajax({
			url: 'guardarOrdenc.php',
			type: "POST",
			data: valores,
			success: function(datos){
				Ext.MessageBox.alert('Alert', 'La cotizacion se guardo correctamente.' );
				
			}
		});		
	}
	}
function guardar()
{
	
	if (frmCoti.getForm().isValid()) {
		var fecD=Ext.get('fecD').getValue();
		var hora=Ext.get('hora').getValue();
		var entrega=Ext.get('entrega').getValue();
		var nombreCli=Ext.get('nombreCli').getValue();
		var hdn_id_busqueda=Ext.get('formah').getValue();
		var cveContactop=Ext.get('cveContacto').getValue();		
		var cot=Ext.get('idcot').getValue();
		var idorden=1//Ext.get('idorden').getValue();
		var foliof=Ext.get('folio').getValue();
		var obsp=Ext.get('txaOng1PA').getValue();//txaOng1DA
		var obsd=Ext.get('txaOng1DA').getValue();
		var tipoP=Ext.get('opera').getValue();
		var hdn_id=Ext.get('hdn_id_busqueda').getValue();
		var valores="cot="+cot+"&fecD="+fecD+"&hora="+hora+"&entrega="+entrega +"&nombreCli="+nombreCli +"&hdn_id_busqueda="+hdn_id_busqueda +"&cveContactop="+cveContactop+"&foliof="+foliof+"&obsp="+obsp+"&obsd="+obsd+"&tipoP="+tipoP+"&hdn_id="+hdn_id;	
		
		var lim=parseInt(Ext.get('cuant').getValue())+1;
		valores+="&cunatpi="+lim;
		for(i=1;i<lim;i++)
		{
			var contenedord = document.getElementById("cvePrecioPA"+i);
			
				if(contenedord != null) {	
							var cvePrecio=Ext.get('cvePrecioPA'+i).getValue();
							var txtCant=Ext.get('txtCantPA'+i).getValue();
							var Precio=Ext.get('PrecioPA'+i).getValue();
							var txtDesc=Ext.get('txtDescPA'+i).getValue();
							var txtTotal=Ext.get('txtTotalPA'+i).getValue();														
							var txtTienpo=Ext.get('txtTienpoPA'+i).getValue();							
							var txtcom=Ext.get('txtcomPA'+i).getValue();	
							var hdnMon=	Ext.get('hdnMonPA'+i).getValue();			
							valores+="&cvePrecio"+i+"="+cvePrecio +"&txtCant"+i+"="+txtCant+"&Precio"+i+"="+Precio +"&txtDesc"+i+"="+txtDesc+"&txtTotal"+i+"="+txtTotal+"&txtTienpo"+i+"="+txtTienpo+"&txtcom"+i+"="+txtcom+"&txtmon"+i+"=2&hdnMon"+i+"="+hdnMon;
				}
			var contenedorp = document.getElementById("cvePrecioDA"+i);
			if(contenedorp != null) {	
							var cvePrecio=Ext.get('cvePrecioDA'+i).getValue();
							var txtCant=Ext.get('txtCantDA'+i).getValue();
							var Precio=Ext.get('PrecioDA'+i).getValue();
							var txtDesc=Ext.get('txtDescDA'+i).getValue();
							var txtTotal=Ext.get('txtTotalDA'+i).getValue();														
							var txtTienpo=Ext.get('txtTienpoDA'+i).getValue();							
							var txtcom=Ext.get('txtcomDA'+i).getValue();	
							var hdnMon=	Ext.get('hdnMonDA'+i).getValue();				
							valores+="&cvePrecio"+i+"="+cvePrecio +"&txtCant"+i+"="+txtCant+"&Precio"+i+"="+Precio +"&txtDesc"+i+"="+txtDesc+"&txtTotal"+i+"="+txtTotal+"&txtTienpo"+i+"="+txtTienpo+"&txtcom"+i+"="+txtcom+"&txtmon"+i+"=2&hdnMon"+i+"="+hdnMon;
				}
		
			}
		var tipo=1;
		$.ajax({
			url: 'guardarOrdenc.php',
			type: "POST",
			data: valores,
			success: function(datos){
				
				Ext.MessageBox.alert('Alert', 'La cotizacion se guardo correctamente.' );
				cargarOrdenc(4); cargaInv.load_listaInv(0,0,0);//cargarOrdenc(datos)
			}
		});		
	}

	}
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