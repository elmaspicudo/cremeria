// JavaScript Document
// JavaScript Document
//Ext.getCmp('id_del_combo').setValue("texto que muestra el combo");
var uns = creaEstores(0,11);
		var countryCmb = new Ext.form.ComboBox({
			store: uns,
			id: 'country',
			 hiddenName: 'edo_cveEstado', 
			valueField: 'value',
			displayField: 'label',
			triggerAction: 'all',
			emptyText: 'Seleccione',
			fieldLabel: 'Estado',
			  anchor: '50%',
			 editable: true			
		});
		countryCmb.on('select',function(cmb,record,index){
       
        	cargaDireccion.load_listaDireccion(10,10,record.get('value'));
			
		});
			
	function creaEstores(ids,op){
		var stores = new Ext.data.JsonStore({
			url:'listadoCmb.php',
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
							 title      : 'Capturar municipio',
							 bodyStyle  : 'padding: 10px; background-color: DFE8F6',
							 waitMsgTarget: true,  					
							 border:false,
							 reader: categoriesFormReader,
							 items: [countryCmb
									,
									 {  
									 xtype:'textfield',
									 name:'codigoPostal',   
									 id: 'codigoPostal',
									 fieldLabel:'Municipio',
									  anchor: '50%'
									 },
									 {
									  xtype:'hidden',
									  name:'idmun',
									  id:'idmun' 
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
					 url : 'creaPersona.php?tipoP=10',  
					 waitMsg : 'Guardando datos...',  
					 success: function () { 							
							Ext.MessageBox.alert('Alert', 'El registro se guardó correctamente.' );
							
							cargaDireccion.load_listaDireccion(10,10,document.getElementById('edo_cveEstado').value);
							frmDireccion.getForm().reset();
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
                             cve:cveDireccion,listado:15
                         },  
                         waitMsg : 'Espere por favor'  
                     });  
					
					document.getElementById('operacion').value=2;
		
	}

 var categoriesRecord = new Ext.data.Record.create([  
         {name: 'country', type: 'string'},  
         {name: 'codigoPostal', type: 'string'},
		 {name: 'idmun', type: 'string'}
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
	{id:'cveDireccion', sortable:false,  resizable:true, width:80,  align:'left',  dataIndex:'idmun',        header:"Clave "},
	{sortable:false,  resizable:true, hidden:false, width:220, align:'left',  dataIndex:'nombre',     		header:"Nombre"}
			
]);		 		
    columDireccion.defaultSortable=true; 

jsonDireccion=new Ext.data.JsonReader({root:'data',totalProperty:'totalReg',id:'listaDireccion'},
[{name: 'nombre'},{name: 'idmun'}]);	

var listaDireccion={};
    listaDireccion.datos=function()
                     {
                     listaDireccion.datos.superclass.constructor.call(this,
					 {proxy:new Ext.data.HttpProxy({url:'listados.php?listado=24',method:'POST'}),
					 remoteSort:true,
					 reader:jsonDireccion
					 });
					 //this.setDefaultSort('nombre','ASC');
					 
					 };
Ext.extend(listaDireccion.datos,Ext.data.Store,{load_listaDireccion:function(tipo,valor,padre){this.load({params:{listado:24,cvepadre:padre,consulta:tipo,where:valor,start: 0, limit: 30}});}});

var cargaDireccion=new listaDireccion.datos();  

var gridDireccion=new Ext.grid.GridPanel
						 ({
						 region:'center',
						 title      : 'Municipios',
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
								pageSize: 30,
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
	

