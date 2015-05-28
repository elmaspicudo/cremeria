// JavaScript Document
// JavaScript Document
//Ext.getCmp('id_del_combo').setValue("texto que muestra el combo");
		
var frmLineas=	new  Ext.form.FormPanel({  
					         id: 'formDirecciones', 
							 region: 'north',
                			 height: 160,
							 width : 300,
							 title      : 'TIPO DE CAMBIO',
							 bodyStyle  : 'padding: 10px; background-color: DFE8F6',
							 waitMsgTarget: true,  					
							 border:false,
							 reader: categoriesFormReaderl,
							 items: [{  
									 xtype:'datefield',
													 name:'fecha',
													 id: 'fecha',
													 fieldLabel:'Fecha',anchor: '90%', value:'<?php echo date("d/m/Y"); ?>',allowBlank: false
									 },
									 {  
									 xtype:'textfield',
									 name:'descripcion',   
									 id: 'descripcion',
									 anchor: '90%',
									 fieldLabel:'Valor'
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
						if (frmLineas.getForm().isValid()) {
				frmLineas.getForm().submit({  
					 url : 'creaPersona.php?tipoP=9',  
					 waitMsg : 'Guardando datos...',  
					 success: function () { 	
							frmLineas.getForm().reset();						
							Ext.MessageBox.alert('Alert', 'El registro se guardó correctamente.' );
							document.getElementById('operacion').value=1;
						},
					 failure: function () { 
					 		Ext.MessageBox.alert('Alert', 'El registro no se guardó correctamente.' );
							frmLineas.getForm().reset();
						}
				});
			}	 
			else Ext.MessageBox.alert('Alert', 'Hay datos Incompletos' );
		
						}
                    
                },{
                    text: 'Close',
                    handler: function(){
                        win.hide();
                    }
                }]
									
									});

function traerDatoslinea(cveDireccion)
{
	frmLineas.getForm().load({  
                         url : 'listadosb.php',  
                         method: 'POST',  
                         params: {  
                             cve:cveDireccion,listado:9
                         },  
                         waitMsg : 'Espere por favor'  
                     });  
					document.getElementById('operacion').value=2;
		
	}

 var categoriesRecordl = new Ext.data.Record.create([  
         {name: 'country', type: 'string'}, 
		 {name: 'cvePersona', type: 'string'},
		 {name: 'codigoPostal', type: 'string'}, 
		 {name: 'descripcion', type: 'string'},  
         {name: 'state', type: 'string'}
     ]);  
 
     var categoriesFormReaderl = new Ext.data.JsonReader(  
             {  
                 root : 'data',  
                 successProperty : 'success',  
                 totalProperty: 'total',  
                 id: 'id_direcciones'  
             },categoriesRecordl  
     ); 
	 
	 var columDireccion=new Ext.grid.ColumnModel([		 		  
	{id:'cveDireccion', sortable:false,  resizable:true, hidden:true, width:80,  align:'left',  dataIndex:'cveDireccion',        header:"cveDireccion"},
	{sortable:false,  resizable:true, hidden:false, width:220, align:'left',  dataIndex:'cveLinea',     		header:"Id"},
	{sortable:false,  resizable:true, hidden:false, width:220, align:'left',  dataIndex:'clave',     		header:"Nombre"},	
	{sortable:false,  resizable:true, hidden:false, width:160, align:'left',  dataIndex:'descripcion',     		header:"Descripcion"},	
	{sortable:false,  resizable:true, hidden:false, width:100, align:'left',  dataIndex:'operaciones',     		header:"Operaciones"}
]);		 		
    columDireccion.defaultSortable=true; 

jsonDireccion=new Ext.data.JsonReader({root:'data',totalProperty:'totalReg',id:'listaDireccion'},
[{name: 'cveLinea'},{name: 'clave'},{name: 'descripcion'},{name: 'operaciones'}]);	

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
Ext.extend(listaDireccion.datos,Ext.data.Store,{load_listaDireccion:function(tipo,valor,padre){this.load({params:{listado:11,cvepadre:padre,consulta:tipo,where:valor}});}});

var cargaDireccion=new listaDireccion.datos();  
cargaDireccion.load_listaDireccion(10,10,10);
var gridDireccion=new Ext.grid.GridPanel
						 ({
						 region:'center',
						 title      : 'LINEAS',
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
	 
	
	

	var winLinea;
function winLineas(){
	    if(!winLinea){
            winLinea = new Ext.Window({
				title      : 'LINEAS',
                layout:'fit',
               	layout:'fit',
                width:700,
                height:600,
                closeAction:'hide',
                plain: true,
				animCollapse : true,//Al minimizar la ventana se animará
		collapsible  : true,
                items: PanelLineas                
            });
        }
        winLinea.show();
    	
		}