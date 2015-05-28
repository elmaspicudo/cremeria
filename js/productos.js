// JavaScript Document
var uns = creaEstores(0,13);
	function creaEstores(ids,op){
		var stores = new Ext.data.JsonStore({
			url:'listadoCot.php?id='+ ids+'&oper='+op,
			root:'data',
			fields: ['value','label']
		});
		return stores;
	}

var clccountry = new Ext.form.ComboBox({
			id: 'linea',
			store: uns,
			hiddenName: 'cveLinea', 
			valueField: 'value',
			displayField: 'label',
			triggerAction: 'all',
			emptyText: 'Seleccione',
			fieldLabel: 'Línea',
			allowBlank: false,
			anchor: '90%',
			editable: false			
		});
var frmProductos=	new  Ext.form.FormPanel({  
					         id: 'formProductos', 
							 region: 'north',
							 reader: productosFormReader,
                			 height: 250,
							 width : 505,
							 title      : 'DATOS DEL PRODUCTO',
							 bodyStyle  : 'padding: 10px; background-color: DFE8F6',
							 waitMsgTarget: true,  												
							 border:false,
							 items: [{ layout:'column',
									 bodyStyle  : 'padding: 10px; background-color: DFE8F6; border:none',							
									  items:[
											{columnWidth:.6,
											 layout: 'form',
											 bodyStyle  : 'background-color: DFE8F6;border:none',	
											 items: [{  
													 xtype:'textfield',
													 name:'descripcionpro',   
													 id: 'descripcionpro',
													 allowBlank: false,
													 fieldLabel:'Nombre',
													 anchor: '90%'
													 } , clccountry
													 ]
											 }
											 ]
									},
							 		{ layout:'column',
									 bodyStyle  : 'padding: 10px; background-color: DFE8F6; border:none',							
									  items:[
											{
												 columnWidth:.3,
												 layout: 'form',
												  bodyStyle  : 'background-color: DFE8F6;border:none',	
												 // labelWidth:140,
												 items: [{  
													 xtype:'textfield',
													 name:'clavepro',   
													 id: 'clavepro',
													 allowBlank: false,
													 fieldLabel:'Clave Primaria'
													 },
													 {  
													 xtype:'textfield',
													 name:'clavepro2',   
													 id: 'clavepro2',
													 allowBlank: false,
													 fieldLabel:'Clave Secundaria'
													 } ]
												 }
											 ]
									}, {
									  xtype:'hidden',
									  name:'cveProducto',
									  id:'cveProducto' 
									  },
									  {
									  xtype:'hidden',
									  name:'operacionD',
									  id:'operacionD' ,
									  value: 1
									   },{
									  xtype:'hidden',
									  name:'unid',
									  id:'unid' 
									  }
									  
									 ]
									
									});
									
	frmProductos.addButton({
		text : 'Cancelar',
		disabled : false,
		handler : function() {
			frmProductos.getForm().reset();	
			
		} 
	});	 
		 
	frmProductos.addButton({
		text : 'Guardar',
		disabled : false,
		handler : function(event) {
			if (frmProductos.getForm().isValid()) {
				frmProductos.getForm().submit({  
					 url : 'creaProducto.php',  
					 waitMsg : 'Guardando datos...',  
					 success: function () { 
							Ext.MessageBox.alert('Alert', 'El registro se guardó correctamente.' );
							 cargaProductos.load_listaProductos(0,0);
							frmProductos.getForm().reset();	
							//cargaProductos.load_listaProductos(0,0);
							/*responseData = Ext.util.JSON.decode(request.response.responseText);  
							 if (responseData.success   == true) {  
     	                     	cve_store.load(); 
								selecciona_empleado(responseData.idEmp)
							 }*/
						},
					 failure: function () { 
					 		Ext.MessageBox.alert('Alert', 'El registro no se guardó correctamente.' );
							frmProductos.getForm().reset();
						}
				});
			}	 
			else Ext.MessageBox.alert('Alert', 'Hay datos Incompletos' );
		} 
	});		
function cargarProducto(cveProducto)
{
	  frmProductos.getForm().load({  
                         url : 'listadosb.php',  
                         method: 'POST',  
                         params: {  
                             cve:cveProducto,listado:2
                         },
						 success: function (){
							 document.getElementById("cveLinea").value=document.getElementById("unid").value;

							 },  
                         waitMsg : 'Espere por favor'  
                     });  
	document.getElementById("operacionD").value=2;
	
	}
 var productosRecord = new Ext.data.Record.create([  
         {name: 'cveProducto', type: 'int'},  
         {name: 'descripcionpro', type: 'string'},  
         {name: 'clavepro', type: 'string'},
		 {name: 'clavepro2', type: 'string'},
		 {name: 'cveLinea', type: 'string'}, 
		 {name: 'unid', type: 'string'} 		
     ]); 
     var productosFormReader = new Ext.data.JsonReader(  
             {  
                 root : 'data',  
                 successProperty : 'success',  
                 totalProperty: 'total',  
                 id: 'idProducto'  
             },productosRecord  
     ); 
	 
	 var barraD = new Ext.Toolbar([{
			text : ' Nombre ',
						
		},{
			xtype:'textfield',
			width: 150,
			fieldLabel: 'valor',
			name: 'txt_valor_bD',
			id: 'txt_valor_bD',
			tabIndex: 2     
		},{
			text : ' Buscar ',
			icon : 'icons/delete.gif',
			handler : function() {
				
				cargaProductos.load_listaProductos(1,document.getElementById('txt_valor_bD').value);
				
				}
		} ]);
		
	

var columProductos=new Ext.grid.ColumnModel([	 		  
	{id:'cveProducto', sortable:false,  resizable:true, hidden:true, width:80,  align:'left',  dataIndex:'cveProducto',        header:"cveProducto"},
		{sortable:true,  resizable:true, hidden:false, width:100, align:'left',  dataIndex:'clave',     		header:"Clave"},
		{sortable:true,  resizable:true, hidden:false, width:100, align:'left',  dataIndex:'clavepro2',     		header:"Clave Sec."},
	{sortable:true,  resizable:true, hidden:false, width:160, align:'left',  dataIndex:'cveLinea',     		header:"Línea"},	
	{sortable:true,  resizable:true, hidden:false, width:160, align:'left',  dataIndex:'descripcion',     		header:"Nombre"},
	{sortable:true,  resizable:true, hidden:false, width:50, align:'left',  dataIndex:'precio',     		header:"Precio"},	
	{sortable:false,  resizable:true, hidden:false, width:50, align:'left',  dataIndex:'operaciones',     		header:"Operaciones"}		
]);		 		
    columProductos.defaultSortable=true; 

jsonProductos=new Ext.data.JsonReader({root:'data',totalProperty:'totalReg',id:'listaProductos'},
[{name:'cveProducto'},,{name:'clavepro2'},{name:'cveLinea'},{name:'descripcion'},{name:'precio'},{name:'clave'},{name:'operaciones'}]);	

var listaProductos={};
    listaProductos.datos=function()
                     {
                     listaProductos.datos.superclass.constructor.call(this,
					 {proxy:new Ext.data.HttpProxy({url:'listados.php?listado=3',method:'POST'}),
					 remoteSort:true,
					 reader:jsonProductos
					 });
					 this.setDefaultSort('descripcion','ASC');
					 
					 };
Ext.extend(listaProductos.datos,Ext.data.Store,{load_listaProductos:function(tipo,valor){this.load({params:{listado:3,consulta:tipo,where:valor,start: 0, limit: 30}});}});

var cargaProductos=new listaProductos.datos();  
   cargaProductos.load_listaProductos(0,0);
	
var gridProductos=new Ext.grid.GridPanel
						 ({
						 region:'center',
						 title      : 'Mis productos',
						 id:'gridClientes',
						 height:350,
						 stripeRows:true,
						 store:cargaProductos,
						 cm:columProductos,
						 sm:new Ext.grid.RowSelectionModel({singleSelect:true}),			
						 trackMouseOver:true,
						 loadMask:{msg:'Cargando datos...'},
						 viewConfig:{forceFit:true,enableRowBody:true,showPreview:true},						 
                          bbar : new Ext.PagingToolbar({
								pageSize: 30,
								store: cargaProductos,
								displayInfo: true
							}),
						 tbar : barraD,
						 selModel : new Ext.grid.RowSelectionModel({singleSelect:false})
						 });
						 
						 var PanelProductos = new Ext.Panel({
		width    : 650,
		height   : 300,
		layout   : 'border',
		items    : [ frmProductos,gridProductos],
		
	});
	function eliminardTodo(cve,tipo)
{
	 Ext.Ajax.request({
             url: 'creaPersona.php?tipoP='+tipo,
             method: 'POST',
             success: successAjaxln,
             failure: failureAjaxln,
             timeout: 10000,
             headers: {
                 'cabecera-propia': 'prueba'
             },
             params: {
                 cve: cve
             }
         });
        cargaProductos.load_listaProductos(0,0);
	}
 var failureAjaxln = function(response, request) {
         var errMessage = '<b>Error en la petición</b>  '
                        + ' <b>status</b> ' + response.status + ''
                        + ' <b>statusText</b> ' + response.statusText + ''
                        + ' <b>responseText</b> ' + response.responseText + '';


     }


     var successAjaxln = function(response, request) {
         var jsonData = Ext.util.JSON.decode(response.responseText);
         if (jsonData.success == true) {
              Ext.MessageBox.alert('Alert', jsonData.data.message );

         } else {
             Ext.MessageBox.alert('Alert', jsonData.data.message );
         }
     }

var uns = creaEstores(0,11);
var stateStore = creaEstores(0,1);
		var countryCmb = new Ext.form.ComboBox({
			store: uns,
			id: 'country',
			 hiddenName: 'edo_cveEstado', 
			valueField: 'value',
			displayField: 'label',
			triggerAction: 'all',
			emptyText: 'Seleccione',
			fieldLabel: 'Tipo de venta',
			  anchor: '50%',
			 editable: true			
		});
		
		
	function creaEstores(ids,op){
		var stores = new Ext.data.JsonStore({
			url:'listadoCot.php?id='+ ids+'&oper='+op,
			root:'data',
			fields: ['value','label']
		});
		return stores;
	}

			
var frmDireccion=	new  Ext.form.FormPanel({  
					         id: 'formDirecciones', 
							 region: 'north',
                			 height: 250,
							 width : 600,
							 title      : 'Capturar precio',
							 bodyStyle  : 'padding: 10px; background-color: DFE8F6',
							 waitMsgTarget: true,  					
							 border:false,
							 reader: categoriesFormReader,
							 items: [countryCmb
									,
									 {  
									 xtype:'numberfield',
									 name:'codigoPostal',   
									 id: 'codigoPostal',
									 fieldLabel:'Precio',
									  anchor: '50%'
									 },
									 {
									  xtype:'hidden',
									  name:'cvePersona',
									  id:'cvePersona' 
									  },
									  {
									  xtype:'hidden',
									  name:'cvePrecio',
									  id:'cvePrecio' 
									  },
									 {
									  xtype:'hidden',
									  name:'operacion',
									  id:'operacion' ,
									  value: 1,
									  }
									 ],
									 buttons: [{
                    text:'Guardar',
					handler : function(event)
					{
						if (frmDireccion.getForm().isValid()) {
				frmDireccion.getForm().submit({  
					 url : 'creaPersona.php?tipoP=5',  
					 waitMsg : 'Guardando datos...',  
					 success: function () { 						
							var prod=document.getElementById('cvePersona').value;
							cargaDireccion.load_listaDireccion(10,prod,10);
							frmDireccion.getForm().reset();			
							Ext.getCmp('cvePersona').setValue(prod);			
							Ext.MessageBox.alert('Alert', 'El registro se guardó correctamente.' );
							document.getElementById('operacion').value=1;
						},
					 failure: function () { 
					 		Ext.MessageBox.alert('Alert', 'El registro no se guardó correctamente.' );
							frmDireccion.getForm().reset();
						}
				});
			}	 
			else Ext.MessageBox.alert('Alert', 'Hay datos Incompletos' );
		
						}
                    
                },{
                    text: 'Cancelar',
                    handler: function(){
                        frmDireccion.getForm().reset();	
                    }
                }]
									
									});

function traerDatos(cveDireccion)
{
	frmDireccion.getForm().load({  
                         url : 'listadosb.php',  
                         method: 'POST',  
                         params: {  
                             cve:cveDireccion,listado:8
                         },  
                         waitMsg : 'Espere por favor'  
                     });  
					stateStore.load();uns.load();
					document.getElementById('operacion').value=2;
		
	}

 var categoriesRecord = new Ext.data.Record.create([  
         {name: 'country', type: 'string'},  
         {name: 'cvePrecio', type: 'string'},  
         {name: 'codigoPostal', type: 'string'},
		 {name: 'cvePersona', type: 'string'}
     ]);  
 
     var categoriesFormReader = new Ext.data.JsonReader(  
             {  
                 root : 'data',  
                 successProperty : 'success',  
                 totalProperty: 'total',  
                 id: 'id_direcciones'  
             },categoriesRecord  
     ); 
	 
	 var columDireccion=new Ext.grid.ColumnModel([		 		  
	{sortable:false,  resizable:true, hidden:false, width:220, align:'left',  dataIndex:'descripcion',     		header:"Producto"},	
	{sortable:false,  resizable:true, hidden:false, width:220, align:'left',  dataIndex:'razonSocial',     		header:"Unidad Medida"},
	{sortable:false,  resizable:true, hidden:false, width:160, align:'left',  dataIndex:'precio',     		header:"Precio"},	
	{sortable:false,  resizable:true, hidden:false, width:100, align:'left',  dataIndex:'operaciones',     		header:"Operaciones"}
			
]);		 		
    columDireccion.defaultSortable=true; 

jsonDireccion=new Ext.data.JsonReader({root:'data',totalProperty:'totalReg',id:'listaDireccion'},
[{name: 'razonSocial'},{name: 'descripcion'},{name: 'precio'},{name: 'operaciones'}]);	

var listaDireccion={};
    listaDireccion.datos=function()
                     {
                     listaDireccion.datos.superclass.constructor.call(this,
					 {proxy:new Ext.data.HttpProxy({url:'listados.php',method:'POST'}),
					 remoteSort:true,
					 reader:jsonDireccion
					 });
					 //this.setDefaultSort('nombre','ASC');
					 
					 };
Ext.extend(listaDireccion.datos,Ext.data.Store,{load_listaDireccion:function(tipo,valor,padre){this.load({params:{listado:10,cvepadre:padre,consulta:tipo,where:valor}});}});

var cargaDireccion=new listaDireccion.datos();  
var gridDireccion=new Ext.grid.GridPanel
						 ({
						 region:'center',
						 title      : 'Precios proveedores',
						 id:'gridDireccion',
						 height:450,
						 stripeRows:true,
						 store:cargaDireccion,
						 cm:columDireccion,
						 sm:new Ext.grid.RowSelectionModel({singleSelect:true}),			
						 trackMouseOver:true,
						 loadMask:{msg:'Cargando datos...'},
						 viewConfig:{forceFit:true,enableRowBody:true,showPreview:true},						 
                          bbar : new Ext.PagingToolbar({
								pageSize: 20,
								store: cargaDireccion,
								displayInfo: true
							}),
						 selModel : new Ext.grid.RowSelectionModel({singleSelect:false})
						 });
	 
	 var PanelDireccion = new Ext.Panel({
		width    : 700,
		height   : 500,
		layout   : 'border',
		items    : [frmDireccion, gridDireccion],
		
	});
							 
	var winProd;
function winProductos(cvePersona){
	    if(!winProd){
            winProd = new Ext.Window({
                title      : 'PRECIOS',
				layout:'fit',
               	layout:'fit',
                width:900,
                height:600,
                closeAction:'hide',
                plain: true,
				animCollapse : true,//Al minimizar la ventana se animará
		collapsible  : true,
                items: PanelDireccion                
            });
        }
        winProd.show();
    	Ext.getCmp('cvePersona').setValue(cvePersona);
		cargaDireccion.load_listaDireccion(10,cvePersona,10);
		}