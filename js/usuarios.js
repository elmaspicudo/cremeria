// JavaScript Document
 var websData2 = [  
         ['1','Administrador'],  
		 ['5','Compras']  ,
         ['2','Facturacion']  ,
		 ['3','Inventario'],  
         ['4','Ventas'] ,
		  ['6','Cobranza']        
     ]; 

    var categoriesComboWebss = new Ext.form.ComboBox({
        fieldLabel: 'Permiso',
        hiddenName: 'user', // Este campo es importante, sin él no funciona el combo
        store: new Ext.data.SimpleStore({
            fields: ['id_busqueda', 'nombres'],
            data : websData2,
            id: 0
        }),
        valueField: 'id_busqueda',
        displayField: 'nombres',
        typeAhead: true,
        mode: 'local',
        triggerAction: 'all',
        selectOnFocus: true,
        width: 150,anchor: '90%'
    });
var miformulario=	new  Ext.form.FormPanel({  
					         id: 'formClientes', 
							 region: 'north',
                			 height: 345,
							 width : 105,
							 title      : 'Capturar Usuario',
							 bodyStyle  : 'padding: 10px;',
							 waitMsgTarget: true,  		
							 reader: clientesFormReader,			
							 border:false,
							 items: [
							 		 { layout:'column',
									 bodyStyle  : 'border:none',							
									  items:[{columnWidth:.4,
											 layout: 'form',
											 bodyStyle  : 'border:none',	
											 items: [{  
													 xtype:'textfield',
													 name:'rfc',   
													 id: 'rfc',
													 fieldLabel:'Nombre',
													 anchor: '90%'
													 },
													 {  
													 xtype:'textfield',
													 name:'clcCalle',   
													 id: 'clcCalle',
													 fieldLabel:'Apellido M.'//cveDireccion, pa_cvePais,edo_cveEstado,mun_cveMunicipio,
													 ,anchor: '90%'
													 } ,
													 {  
													 xtype:'textfield',
													 name:'clcExterior',   
													 id: 'clcExterior',
													 fieldLabel:'Nick',
													 anchor: '90%'
													 }										 
													 ]
											 },
											 {columnWidth:.3,
											 layout: 'form',
											 bodyStyle  : 'border:none',	
											 items: [ 
													 {  
													 xtype:'textfield',
													 name:'clave',   
													 id: 'clave',
													 fieldLabel:'Apellido P.',
													 anchor: '90%'
													 } ,categoriesComboWebss,
													 {  
													 xtype:'textfield',
													 name:'clccolonia',   
													 id: 'clccolonia',
													 fieldLabel:'Password',
													  anchor: '90%'
													 } 
													 ]
											 }]
									  
									  },	{
            xtype: 'htmleditor',
            name: 'bio',
            fieldLabel: 'Firma',
            height: 200,
            anchor: '70%'
        },
												 
									 {
									  xtype:'hidden',
									  name:'cveCliente',
									  id:'cveCliente' 
									  },
									  {
									  xtype:'hidden',
									  name:'operacion',
									  id:'operacion' ,
									  value: 1
									   }
									  
									 ]
									
									});
									
	miformulario.addButton({
		text : 'Cancelar',
		disabled : false,
		handler : function() {
			miformulario.getForm().reset();	
			
		} 
	});	 
	
function cargarClientes(cveDireccion)
{
	  miformulario.getForm().load({  
                         url : 'listadosb.php',  
                         method: 'POST',  
                         params: {  
                             cve:cveDireccion,listado:10
                         },  
                         waitMsg : 'Espere por favor'  
                     });  
	document.getElementById("operacion").value=2;
	document.getElementById("cveCliente").value=cveDireccion;
		
	}
 var clientesRecord = new Ext.data.Record.create([  
         {name: 'clave', type: 'string'},  
         {name: 'clcCalle', type: 'string'} ,
		 {name: 'clcExterior', type: 'string'},  
         {name: 'clccolonia', type: 'string'},  
         {name: 'cveCliente', type: 'string'} ,
		 {name: 'rfc', type: 'string'},  
         {name: 'user', type: 'int'},
		 {name: 'bio', type: 'string'}
     ]);  
   

     var clientesFormReader = new Ext.data.JsonReader(  
             {  
                 root : 'data',  
                 successProperty : 'success',  
                 totalProperty: 'total',  
                 id: 'idClientes'  
             },clientesRecord  
     ); 
	
	

	miformulario.addButton({
		text : 'Guardar',
		disabled : false,
		handler : function(event) {
			if (miformulario.getForm().isValid()) {
				miformulario.getForm().submit({  
					 url : 'creaPersona.php?tipoP=8',  
					 waitMsg : 'Guardando datos...',  
					 success: function () { 
							Ext.MessageBox.alert('Alert', 'El registro se guardó correctamente.' );
							miformulario.getForm().reset();	
							cargaClientes.load_listaClientes(0,0);
							/*responseData = Ext.util.JSON.decode(request.response.responseText);  
							 if (responseData.success   == true) {  
     	                     	cve_store.load(); 
								selecciona_empleado(responseData.idEmp)
							 }*/
						},
					 failure: function () { 
					 		Ext.MessageBox.alert('Alert', 'El registro no se guardó correctamente.' );
							miformulario.getForm().reset();
						}
				});
			}	 
			else Ext.MessageBox.alert('Alert', 'Hay datos Incompletos' );
		} 
	});	
							

var columClientes=new Ext.grid.ColumnModel([		 		  
	{id:'cveCliente', sortable:false,  resizable:true, hidden:false, width:80,  align:'left',  dataIndex:'cveCliente',        header:"Id"},
	{sortable:false,  resizable:true, hidden:false, width:100, align:'left',  dataIndex:'id',     		header:"Nick"}	,
	{sortable:true,  resizable:true, hidden:false, width:220, align:'left',  dataIndex:'razonSocial',     		header:"Usuarios"}
]);		 		
    columClientes.defaultSortable=true; 

jsonClientes=new Ext.data.JsonReader({root:'data',totalProperty:'totalReg',id:'listaClientes'},
[{name:'cveCliente'},{name:'razonSocial'},{name:'id'}]);	

var listaClientes={};
    listaClientes.datos=function()
                     {
                     listaClientes.datos.superclass.constructor.call(this,
					 {proxy:new Ext.data.HttpProxy({url:'listados.php',method:'POST'}),
					 remoteSort:true,
					 reader:jsonClientes
					 });
					 this.setDefaultSort('username','ASC');
					 
					 };
Ext.extend(listaClientes.datos,Ext.data.Store,{load_listaClientes:function(tipo,valor){this.load({params:{listado:12,consulta:tipo,where:valor}});}});

var cargaClientes=new listaClientes.datos();  
   cargaClientes.load_listaClientes(0,0);
	
var gridClientes=new Ext.grid.GridPanel
						 ({
						 region:'center',
						 title      : 'Mis Usuarios',
						 id:'gridClientes',
						 height:350,
						 stripeRows:true,
						 store:cargaClientes,
						 cm:columClientes,
						 sm:new Ext.grid.RowSelectionModel({singleSelect:true}),			
						 trackMouseOver:true,
						 loadMask:{msg:'Cargando datos...'},
						 viewConfig:{forceFit:true,enableRowBody:true,showPreview:true},						 
                          bbar : new Ext.PagingToolbar({
								pageSize: 20,
								store: cargaClientes,
								displayInfo: true
							}),
						 selModel : new Ext.grid.RowSelectionModel({singleSelect:false})
						 });


function eliminardTodo(cve,tipo)
{
	 Ext.Ajax.request({  
             url: 'creaPersona.php?tipoP='+tipo,  
             method: 'POST',  
             success: successAjaxFn,  
             failure: failureAjaxFn,  
             timeout: 10000,  
             headers: {  
                 'cabecera-propia': 'prueba'  
             },  
             params: {  
                 cve: cve
             }  
         });  
       switch(tipo)
								{								
									case 1:  cargaClientes.load_listaClientes(0,0);
									break;
									case 2: cargaProveedores.load_listaProveedores(0,0);
									break;		
									case 3:  cargaProductos.load_listaProductos(0,0);
									break;								
								}
	}
	   var failureAjaxFn = function(response, request) {          
         var errMessage = '<b>Error en la petición</b>  '  
                        + ' <b>status</b> ' + response.status + ''  
                        + ' <b>statusText</b> ' + response.statusText + ''  
                        + ' <b>responseText</b> ' + response.responseText + '';  
   
        
     }  
   
    
     var successAjaxFn = function(response, request) {  
         var jsonData = Ext.util.JSON.decode(response.responseText);     
         if (jsonData.success == true) {  
              Ext.MessageBox.alert('Alert', jsonData.data.message ); 
           
         } else {  
             Ext.MessageBox.alert('Alert', jsonData.data.message );              
         }  
     } 
	 
var PanelClientes = new Ext.Panel({
		width    : 700,
		height   : 500,
		layout   : 'border',
		items    : [miformulario,gridClientes],
		
	});
		var center = new Ext.Panel({
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
			  id:'Clientes', title:'DATOS USUARIO',layout: 'fit',
				items:PanelClientes
			}
						
			]}]
		});	 
		
var win;
function winClientes(){
	    if(!win){
            win = new Ext.Window({
                layout:'fit',
               	layout:'fit',
                width:800,
                height:700,
                closeAction:'hide',
                plain: true,
                items: center                
            });
        }
        win.show();
    	
		}	 