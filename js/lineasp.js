// JavaScript Document
// JavaScript Document
//Ext.getCmp('id_del_combo').setValue("texto que muestra el combo");
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
			fieldLabel: 'Proveedor',
			  anchor: '50%',
			 editable: true			
		});
		
		var stateCmb = new Ext.form.ComboBox({
			store: stateStore,
			 hiddenName: 'mun_cveMunicipio', 
			id: 'state',
			valueField: 'value',
			displayField: 'label',
			triggerAction: 'all',
			emptyText: 'Seleccione',
			fieldLabel: 'Producto',
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
							 title      : 'Capturar dirección',
							 bodyStyle  : 'padding: 10px; background-color: DFE8F6',
							 waitMsgTarget: true,  					
							 border:false,
							 reader: categoriesFormReader,
							 items: [countryCmb,stateCmb
									,{
														xtype: 'radiogroup',
														fieldLabel: 'Tipo Doc.',
														anchor: '90%',
														id:'losradio',
														items: [
															{boxLabel: 'Pesos.', name: 'credito', id: 'credito', inputValue: 1},
															{boxLabel: 'Dolares.', name: 'credito',id: 'credito', inputValue: 2}
															
														]
													},
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
							cargaDireccion.load_listaDireccion(10,10,10);
							frmDireccion.getForm().reset();						
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
         {name: 'state', type: 'string'},  
         {name: 'codigoPostal', type: 'string'},
		 {name: 'cvePersona', type: 'string'},
		 {name: 'losradio', type: 'string'}  
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
	{id:'cveDireccion', sortable:false,  resizable:true, hidden:true, width:80,  align:'left',  dataIndex:'cveDireccion',        header:"cveDireccion"},
	{sortable:false,  resizable:true, hidden:false, width:220, align:'left',  dataIndex:'razonSocial',     		header:"Proveedor"},
	{sortable:false,  resizable:true, hidden:false, width:220, align:'left',  dataIndex:'descripcion',     		header:"Producto"},	
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
cargaDireccion.load_listaDireccion(10,10,10);
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
	

