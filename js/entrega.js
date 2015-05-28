   	 var fAjax = function(response, request) {          
         var errMessage = '<b>Error en la petición</b>  '  
                        + ' <b>status</b> ' + response.status + ''  
                        + ' <b>statusText</b> ' + response.statusText + ''  
                        + ' <b>responseText</b> ' + response.responseText + '';  
   
        
     }  
 var tAjax = function(response, request) {  
         var jsonData = Ext.util.JSON.decode(response.responseText);
		 if (jsonData.cveCliente > 0) { 
		  var tabPanel = Ext.getCmp('tabClientes');
		 tabPanel.show();
		 // cveCotizacion,cveCliente,cveContacto,cveDireccion,fecha,vigencia,observaciones,estatus 
		 	
			Ext.getCmp('idCont').setValue(jsonData.razonSocial);
			//Ext.getCmp('nombreCli').setValue(jsonData.cveCliente);
			//document.getElementById('nombreCli').value=jsonData.cveCliente;
           Ext.getCmp('fecha').setValue(jsonData.fecha);
			Ext.getCmp('vigencia').setValue(jsonData.vigencia);
            Ext.getCmp('folio').setValue(jsonData.cveCotizacion);
			
			direcciones.enable();
			direcciones.clearValue();
			dire.load({params:{id:jsonData.cveCliente}});
			contacto.enable();
			contacto.clearValue();
			cvecon.load({params:{id:jsonData.cveCliente}});	
			
			Ext.getCmp('cveDireccion').setValue(jsonData.cveDireccion);  
			Ext.getCmp('cveContacto').setValue(jsonData.cveContacto);
			Ext.getCmp('direccion').setValue(jsonData.nombre);  
			Ext.getCmp('cont').setValue(jsonData.contacto);
			Ext.getCmp('emailC').setValue(jsonData.correo);  
			Ext.getCmp('calleE').setValue(jsonData.dir);
         	
			
         } else {  
             Ext.MessageBox.alert('Alert', 'no paso' );              
         }  
     } 
function cargaCotz(cve)
{
	 Ext.Ajax.request({  
             url: 'listadoCot.php?oper=10',  
             method: 'POST',  
             success: tAjax,  
             failure: fAjax,  
             timeout: 10000,  
             headers: {  
                 'cabecera-propia': 'prueba'  
             },  
             params: {  
                 cve: cve
             }  
         }); 
		 var divObj = Ext.get('contenIn'); 
		 divObj.load({
				url: 'tabla.php',
				method: 'GET',
				params: {oper:3,id:cve}
			}); 
	}
 var columCot=new Ext.grid.ColumnModel([		 		  
	{id:'folio', sortable:true,  resizable:true, hidden:false, width:80,  align:'left',  dataIndex:'folio',        header:"Folio"},
	{sortable:true,  resizable:true, hidden:false, width:220, align:'left',  dataIndex:'folioFactura',     		header:"Factura"},
	{sortable:false,  resizable:true, hidden:false, width:220, align:'left',  dataIndex:'responsable',     		header:"Responsable"},
	{sortable:false,  resizable:true, hidden:false, width:160, align:'left',  dataIndex:'fecha',     		header:"Fecha"}
	
]);		 		
    columCot.defaultSortable=true; 
jsonCot=new Ext.data.JsonReader({root:'data',totalProperty:'totalReg',id:'listaCot'},
[{name: 'folio'},{name: 'folioFactura'},{name: 'responsable'},{name: 'fecha'}]);	

var listaCot={};
    listaCot.datos=function()
                     {
                     listaCot.datos.superclass.constructor.call(this,
					 {proxy:new Ext.data.HttpProxy({url:'otroListado.php?listado=7',method:'POST'}),
					 remoteSort:true,
					 reader:jsonCot
					 });
					 this.setDefaultSort('folio','ASC');
					 
					 };
Ext.extend(listaCot.datos,Ext.data.Store,{load_listaCot:function(tipo,valor,padre){this.load({params:{listado:4,cvepadre:padre,consulta:tipo,where:valor,start: 0, limit: 30}});}});

var cargaCot=new listaCot.datos();  
	
var gridCot=new Ext.grid.GridPanel
						 ({
						 region:'center',
						 title      : 'Direcciones',
						 id:'gridCot',
						 height:450,
						 stripeRows:true,
						 store:cargaCot,
						 cm:columCot,
						 sm:new Ext.grid.RowSelectionModel({singleSelect:true}),			
						 trackMouseOver:true,
						 loadMask:{msg:'Cargando datos...'},
						 viewConfig:{forceFit:true,enableRowBody:true,showPreview:true},						 
                          bbar : new Ext.PagingToolbar({
								pageSize: 30,
								store: cargaCot,
								displayInfo: true
							}),
						 selModel : new Ext.grid.RowSelectionModel({singleSelect:false})
						 });
	 
	 var PanelCot = new Ext.Panel({
		width    : 700,
		height   : 500,
		layout   : 'border',
		items    : [gridCot],
		
	});
	

 cargaCot.load_listaCot(0,0,0);