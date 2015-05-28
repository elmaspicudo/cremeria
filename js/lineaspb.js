// JavaScript Document
// JavaScript Document
//Ext.getCmp('id_del_combo').setValue("texto que muestra el combo");
		
var frmLineas=	new  Ext.form.FormPanel({  
					         id: 'formLineaes', 
							 region: 'north',
                			 height: 160,
							 width : 300,
							 title      : 'DATOS DE LA LINEA',
							 bodyStyle  : 'padding: 10px; background-color: DFE8F6',
							 waitMsgTarget: true,  					
							 border:false,
							 reader: categoriesFormReaderl,
							 items: [{  
									 xtype:'textfield',
									 name:'codigoPostal',   
									 id: 'codigoPostal',
									 allowBlank: false,
									 anchor: '90%',
									 fieldLabel:'Nombre'
									 },
									 {  
									 xtype:'textfield',
									 name:'descripcion',   
									 id: 'descripcion',
									 allowBlank: false,
									 anchor: '90%',
									 fieldLabel:'Descripción'
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
					 url : 'creaPersona.php?tipoP=7',  
					 waitMsg : 'Guardando datos...',  
					 success: function () { 	
					 cargaLinea.load_listaLinea(10,10,10);						
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
                        winLinea.hide();
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
	 
	 var columLinea=new Ext.grid.ColumnModel([		 		  
	{id:'cveLinea', sortable:false,  resizable:true, hidden:true, width:80,  align:'left',  dataIndex:'cveLinea',        header:"cveLinea"},
	{sortable:false,  resizable:true, hidden:false, width:220, align:'left',  dataIndex:'cveLinea',     		header:"Id"},
	{sortable:false,  resizable:true, hidden:false, width:220, align:'left',  dataIndex:'clave',     		header:"Nombre"},	
	{sortable:false,  resizable:true, hidden:false, width:160, align:'left',  dataIndex:'descripcion',     		header:"Descripcion"},	
	{sortable:false,  resizable:true, hidden:false, width:100, align:'left',  dataIndex:'operaciones',     		header:"Operaciones"}
]);		 		
    columLinea.defaultSortable=true; 

jsonLinea=new Ext.data.JsonReader({root:'data',totalProperty:'totalReg',id:'listaLinea'},
[{name: 'cveLinea'},{name: 'clave'},{name: 'descripcion'},{name: 'operaciones'}]);	

var listaLinea={};
    listaLinea.datos=function()
                     {
                     listaLinea.datos.superclass.constructor.call(this,
					 {proxy:new Ext.data.HttpProxy({url:'listados.php',method:'POST'}),
					 remoteSort:true,
					 reader:jsonLinea
					 });
					 //this.setDefaultSort('nombre','ASC');
					 
					 };
Ext.extend(listaLinea.datos,Ext.data.Store,{load_listaLinea:function(tipo,valor,padre){this.load({params:{listado:11,cvepadre:padre,consulta:tipo,where:valor}});}});

var cargaLinea=new listaLinea.datos();  
cargaLinea.load_listaLinea(10,10,10);
var gridLinea=new Ext.grid.GridPanel
						 ({
						 region:'center',
						 title      : 'LINEAS',
						 id:'gridLinea',
						 height:450,
						 stripeRows:true,
						 store:cargaLinea,
						 cm:columLinea,
						 sm:new Ext.grid.RowSelectionModel({singleSelect:true}),			
						 trackMouseOver:true,
						 loadMask:{msg:'Cargando datos...'},
						 viewConfig:{forceFit:true,enableRowBody:true,showPreview:true},						 
                          bbar : new Ext.PagingToolbar({
								pageSize: 20,
								store: cargaLinea,
								displayInfo: true
							}),
						 selModel : new Ext.grid.RowSelectionModel({singleSelect:false})
						 });
	 
	 var PanelLineas = new Ext.Panel({
		width    : 700,
		height   : 500,
		layout   : 'border',
		items    : [frmLineas, gridLinea],
		
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
		
	function eliminarLinea(cve,tipo)
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
      cargaLinea.load_listaLinea(10,10,10);
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