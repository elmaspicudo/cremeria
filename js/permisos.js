var categoriesColumnMode = new Ext.grid.ColumnModel(
        [
		{header: 'Folio',dataIndex: 'folio',width: 50,hidden: false},
		{header: 'Cliente',dataIndex: 'razonSocial',width: 150},
		{header: 'Vendedor',dataIndex: 'usern',width: 300},
		{header: 'Fecha Deposito',dataIndex: 'precioUnitario',width: 90},
		{header: 'Banco',dataIndex: 'cveLinea',width: 150},
		{header: 'Monto total de la cotizacion',dataIndex: 'descripcion',width: 300},
		{header: 'Monto del deposito',dataIndex: 'cveLinea',width: 150},
		{header: 'Operaciones',dataIndex: 'operaciones',width: 150}
		]
    );
jsonPermisos=new Ext.data.JsonReader({root:'data',totalProperty:'totalReg',id:'listaPermisos'},
[{name:'folio'},{name:'razonSocial'},{name:'usern'},{name:'precioUnitario'},{name:'unidad'},{name:'clave'},{name:'moneda'},{name:'operaciones'}]);	

var listaPermisos={};
    listaPermisos.datos=function()
                     {
                     listaPermisos.datos.superclass.constructor.call(this,
					 {proxy:new Ext.data.HttpProxy({url:'listados.php?listado=22',method:'POST'}),
					 remoteSort:true,
					 reader:jsonPermisos
					 });
					 this.setDefaultSort('descripcion','ASC');
					 
					 };
Ext.extend(listaPermisos.datos,Ext.data.Store,{load_listaPermisos:function(tipo,valor){this.load({params:{listado:22,consulta:tipo,where:valor,start: 0, limit: 30}});}});

var cargaProductos=new listaPermisos.datos();  
   cargaProductos.load_listaPermisos(0,0);
	
	 var categoriesGrid=new Ext.grid.GridPanel
						 ({
						 region:'center',
						 title      : 'Direcciones',
						 id:'gridCotb',
						 height:450,
						 stripeRows:true,
						 store:cargaProductos,
						 cm:categoriesColumnMode,
						 sm:new Ext.grid.RowSelectionModel({singleSelect:true}),			
						 trackMouseOver:true,
						 loadMask:{msg:'Cargando datos...'},
						 viewConfig:{forceFit:true,enableRowBody:true,showPreview:true},						 
                          bbar : new Ext.PagingToolbar({
								pageSize: 20,
								store: cargaProductos,
								displayInfo: true
							}),
						 selModel : new Ext.grid.RowSelectionModel({singleSelect:false})
						 });
						 
 
						 var PanelProductos = new Ext.Panel({
		width    : 650,
		height   : 300,
		layout   : 'border',
		items    : [categoriesGrid],
		
	});
var frmProductos=	new  Ext.form.FormPanel({  
					         id: 'formProductos', 
							 region: 'north',
							 reader: productosFormReader,
                			 height: 300,
							 width : 505,
							 title      : 'DATOS DE LA COTIZACION',
							 bodyStyle  : 'padding: 10px;',
							 waitMsgTarget: true,  												
							 border:false,
							 items: [{  
													 xtype:'textfield',
													 name:'folio',   
													 id: 'folio',
													 fieldLabel:'Folio',
													 anchor: '90%'
													 } ,{  
													 xtype:'textfield',
													 name:'razonSocial',   
													 id: 'razonSocial',
													 fieldLabel:'Cliente',
													 anchor: '90%'
													 },{  
													 xtype:'textfield',
													 name:'usern',   
													 id: 'usern',
													 fieldLabel:'Vendedor',
													 anchor: '90%'
													 },{ layout:'column',
									 bodyStyle  : 'padding: 10px; border:none',
									  items:[ {
												 columnWidth:.4,
												 layout: 'form',
												  bodyStyle  : 'border:none',
												 items: [{  
													 xtype:'textfield',
													 name:'total',   
													 id: 'total',
													 fieldLabel:'Monto pesos',
													 anchor: '90%'
													 }]
												  },{
												 columnWidth:.4,
												 layout: 'form',
												  bodyStyle  : 'border:none',
												  items: [{  
													 xtype:'textfield',
													 name:'totalD',   
													 id: 'totalD',
													 fieldLabel:'Monto dolares',
													 anchor: '90%'
													 }]}


											 ]
									},{
										xtype:'fieldset',
										title: 'Datos del pago',
										collapsible: true,
										layout: 'anchor',
										anchor: '100%',
										items :[{ layout:'column',
										bodyStyle  : 'padding: 10px; border:none',
										items:[{
												 columnWidth:.20,
												 layout: 'form',
												  bodyStyle  : 'border:none',
												  labelWidth:100,
												 items: [{  
													 xtype:'datefield',
													 name:'fecha',   
													 id: 'fecha',
													 fieldLabel:'Fecha deposito',
													 anchor: '90%',allowBlank: false
													 } ]
												 },
												 {
												 columnWidth:.55,
												 layout: 'form',
												  bodyStyle  : 'border:none',
												  labelWidth:70,
												 items: [{  
													 xtype:'textfield',
													 name:'banco',   
													 id: 'banco',
													 fieldLabel:'Banco',
													 anchor: '90%'
													 }]
												  },{
												 columnWidth:.25,
												 layout: 'form',
												  bodyStyle  : 'border:none',
												  labelWidth:90,
												 items: [{ xtype:'textfield',
													 name:'cantidad',
													 id: 'cantidad',
													 fieldLabel:'Monto deposito',anchor: '90%',allowBlank: false
													 }]}]
									}]
										}, {
									  xtype:'hidden',
									  name:'cveCotizacion',
									  id:'cveCotizacion' 
									  },
									  {
									  xtype:'hidden',
									  name:'operacion',
									  id:'operacion' ,
									  value: 1
									   },{
									  xtype:'hidden',
									  name:'idcobro',
									  id:'idcobro' 
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
					 url : 'creaCosas.php?tipoP=1',  
					 waitMsg : 'Guardando datos...',  
					 success: function () { 
							Ext.MessageBox.alert('Alert', 'El registro se guardó correctamente.' );
							 cargaPerm.load_listaYa(0,document.getElementById("cveCotizacion").value);
							Ext.getCmp('fecha').setValue('');
							Ext.getCmp('banco').setValue('');
							Ext.getCmp('cantidad').setValue('');
							document.getElementById("operacion").value=1;
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
	
var categoriesColumn = new Ext.grid.ColumnModel(
        [
		{header: 'Fecha Deposito',dataIndex: 'fecha',width: 90},
		{header: 'Banco',dataIndex: 'banco',width: 150},
		{header: 'Monto del deposito',dataIndex: 'monto',width: 150}
		]
    );
jsonYa=new Ext.data.JsonReader({root:'data',totalProperty:'totalReg',id:'listaYa'},
[{name:'fecha'},{name:'banco'},{name:'monto'}]);	

var listaYa={};
    listaYa.datos=function()
                     {
                     listaYa.datos.superclass.constructor.call(this,
					 {proxy:new Ext.data.HttpProxy({url:'listados.php?listado=23',method:'POST'}),
					 remoteSort:true,
					 reader:jsonYa
					 });
					 this.setDefaultSort('descripcion','ASC');
					 
					 };
Ext.extend(listaYa.datos,Ext.data.Store,{load_listaYa:function(tipo,valor){this.load({params:{listado:23,consulta:tipo,where:valor,start: 0, limit: 30}});}});

var cargaPerm=new listaYa.datos();  
  
	 var categ=new Ext.grid.GridPanel({
						 region:'center',
						 title      : 'PEDIDOS',
						 id:'gridCotb',
						 height:450,
						 stripeRows:true,
						 store:cargaPerm,
						 cm:categoriesColumn,
						 sm:new Ext.grid.RowSelectionModel({singleSelect:true}),			
						 trackMouseOver:true,
						 loadMask:{msg:'Cargando datos...'},
						 viewConfig:{forceFit:true,enableRowBody:true,showPreview:true},						 
                          bbar : new Ext.PagingToolbar({
								pageSize: 20,
								store: cargaPerm,
								displayInfo: true
							}),
						 selModel : new Ext.grid.RowSelectionModel({singleSelect:false})
						 });
 var PanelProdu = new Ext.Panel({
		width    : 650,
		height   : 300,
		layout   : 'border',
		items    : [frmProductos,categ],
		
	});
						 	
function cargarProducto(cveProducto,id)
{
	  frmProductos.getForm().load({  
                         url : 'listadosb.php',  
                         method: 'POST',  
                         params: {  
                             cve:cveProducto,listado:12,pag:id,
                         },
						 waitMsg : 'Espere por favor'  
                     });  
	cargaPerm.load_listaYa(0,cveProducto);
	if(id >0){
	document.getElementById("operacion").value=2;
	}
	}
 var productosRecord = new Ext.data.Record.create([ 
         {name: 'cveCotizacion', type: 'string'},  
         {name: 'folio', type: 'string'},  
         {name: 'usern', type: 'string'},  
         {name: 'razonSocial', type: 'string'},
		 {name: 'total', type: 'string'}, 
		 {name: 'fecha', type: 'string'},  
         {name: 'banco', type: 'string'},
		 {name: 'idcobro', type: 'string'} ,
		 {name: 'cantidad', type: 'string'}
     ]);
     var productosFormReader = new Ext.data.JsonReader(  
             {  
                 root : 'data',  
                 successProperty : 'success',  
                 totalProperty: 'total',  
                 id: 'idProducto'  
             },productosRecord  
     ); 


function abrirFactura(id,tip){	
	
	    var tabPanel = Ext.getCmp('tabPagos');
		 tabPanel.show();        
		cargarProducto(id,0);
		
		}	