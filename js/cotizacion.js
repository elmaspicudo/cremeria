   	 var fAjax = function(response, request) {          
         var errMessage = '<b>Error en la petición</b>  '  
                        + ' <b>status</b> ' + response.status + ''  
                        + ' <b>statusText</b> ' + response.statusText + ''  
                        + ' <b>responseText</b> ' + response.responseText + '';  
   
        
     } 
function traerepd(cve,oper)
	{
	$.post( 'qsp.php', { id: cve, oper: oper },
	  function(data){
		 if(oper==1){document.getElementById("producto").value=data;}
		 else{document.getElementById("cveprod").value=data;}
	  });
	} 
 var tAjax = function(response, request) {  
         var jsonData = Ext.util.JSON.decode(response.responseText);
		 if (jsonData.cveCliente > 0) { 
		  var tabPanel = Ext.getCmp('tabClientes');
		 tabPanel.show();
		 // cveCotizacion,cveCliente,cveContacto,cveDireccion,fecha,vigencia,observaciones,estatus 
		 	
			Ext.getCmp('idCont').setValue(jsonData.razonSocial);
			//Ext.getCmp('nombreCli').setValue(jsonData.cveCliente);cveContacto
			document.getElementById('nombreCli').value=jsonData.cveCliente;
			
           Ext.getCmp('fecha').setValue(jsonData.fecha);
			Ext.getCmp('folio').setValue(jsonData.folio);
			document.getElementById('telContacto').value=jsonData.telContacto;
			direcciones.enable();
			direcciones.clearValue();
			dire.load({params:{id:jsonData.cveCliente}});
			contacto.enable();
			contacto.clearValue();
			cvecon.load({params:{id:jsonData.cveCliente}});	
			Ext.getCmp('direccion').setValue(jsonData.nombre); 
			
			document.getElementById('cveDireccion').value=jsonData.cveDireccion;
			Ext.getCmp('cont').setValue(jsonData.contacto);
			document.getElementById('cveContacto').value=jsonData.cveContacto;
			Ext.getCmp('emailC').setValue(jsonData.correo);  
			Ext.getCmp('calleE').setValue(jsonData.dir);
         	Ext.getCmp('idcot').setValue(jsonData.cveCotizacion);
			Ext.getCmp('opercot').setValue(2);
			//Ext.getCmp('hdncont').setValue(jsonData.cuantos);
			document.getElementById('hdncont').value=parseInt(jsonData.cuantos)+1;
			Ext.getCmp('Productos').setValue(jsonData.prods);
			Ext.getCmp('cantidades').setValue(jsonData.cant);
			Ext.getCmp('statcot').setValue(jsonData.estatus);
			
			if(jsonData.estatus==2){
			document.getElementById('labStat').style.color='red';
			Ext.getCmp('labStat').setValue('CANCELADA');
			
			}
			if(jsonData.estatus==1){
			document.getElementById('labStat').style.color='green';
			Ext.getCmp('labStat').setValue('ACTIVA');
			}
			//document.getElementById('labStat').value=;
		
         } else {  
             Ext.MessageBox.alert('Alert', 'no paso' );              
         }  
     } 
	var tAjaxb = function(response, request) {  
         var jsonData = Ext.util.JSON.decode(response.responseText);
		 if (jsonData.cveCliente > 0) { 
		  var tabPanel = Ext.getCmp('tabClientes');
		 tabPanel.show();
		 // cveCotizacion,cveCliente,cveContacto,cveDireccion,fecha,vigencia,observaciones,estatus 
		 	
			Ext.getCmp('idCont').setValue(jsonData.razonSocial);
			//Ext.getCmp('nombreCli').setValue(jsonData.cveCliente);cveContacto
			document.getElementById('nombreCli').value=jsonData.cveCliente;
			document.getElementById('telContacto').value=jsonData.telContacto;
           Ext.getCmp('fecha').setValue(jsonData.fecha);
			
			direcciones.enable();
			direcciones.clearValue();
			dire.load({params:{id:jsonData.cveCliente}});
			contacto.enable();
			contacto.clearValue();
			cvecon.load({params:{id:jsonData.cveCliente}});	
			Ext.getCmp('direccion').setValue(jsonData.nombre); 
			document.getElementById('cveDireccion').value=jsonData.cveDireccion;  			 
			Ext.getCmp('cont').setValue(jsonData.contacto);
			document.getElementById('cveContacto').value=jsonData.cveContacto;
			Ext.getCmp('emailC').setValue(jsonData.correo);  
			Ext.getCmp('calleE').setValue(jsonData.dir);
         	//Ext.getCmp('idcot').setValue(jsonData.cveCotizacion);
			Ext.getCmp('opercot').setValue(1);
			document.getElementById('hdncont').value=jsonData.cuantos;
			Ext.getCmp('Productos').setValue(jsonData.prods);
			Ext.getCmp('cantidades').setValue(jsonData.cant);
			Ext.getCmp('statcot').setValue(1);
			
			/*if(jsonData.estatus==2){
			document.getElementById('labStat').style.color='red';
			Ext.getCmp('labStat').setValue('CANCELADA');
			}
			if(jsonData.estatus==1){
			document.getElementById('labStat').style.color='green';
			Ext.getCmp('labStat').setValue('ACTIVA');
			}*/
			//document.getElementById('labStat').value=;
		
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

		 $.ajax({
			url: 'tabla.php',
            cache: false,
			type: "GET",
			data: "oper="+3+"&id="+cve,
			dataType: "json",
			success: function(json){
				document.getElementById("bdPro").innerHTML="";
				$("#bdPro").append(json.data);
				//$("#tblDls").tablesorter();
				document.getElementById("txtSubtotal").value=formatNumber(json.subtotal,'$');
		document.getElementById("txtIva").value=formatNumber(json.iva,'$');
		document.getElementById("txtTotal").value=formatNumber(json.total,'$');
		document.getElementById("hdncont").value=formatNumber(json.reg,'$');
		
				
			}
		});
			
 }
function copiar(cve)
{
	 Ext.Ajax.request({  
             url: 'listadoCot.php?oper=18',  
             method: 'POST',  
             success: tAjaxb,  
             failure: fAjax,  
             timeout: 10000,  
             headers: {  
                 'cabecera-propia': 'prueba'  
             },  
             params: {  
                 cve: cve
             }  
         }); 
		 		
	}
 var columCot=new Ext.grid.ColumnModel([		 		  
	{id:'folio', sortable:true,  resizable:true, hidden:false, width:80,  align:'left',  dataIndex:'cveCotizacion',        header:"Folio"},
	{sortable:true,  resizable:true, hidden:false, width:220, align:'left',  dataIndex:'razonSocial',     		header:"Cliente"},
	{sortable:false,  resizable:true, hidden:false, width:220, align:'left',  dataIndex:'contacto',     		header:"Contacto"},
	{sortable:false,  resizable:true, hidden:false, width:160, align:'left',  dataIndex:'fecha',     		header:"Fecha"},	
	{sortable:false,  resizable:true, hidden:false, width:160, align:'left',  dataIndex:'vigencia',     		header:"Vigencia"},
	{sortable:false,  resizable:true, hidden:false, width:100, align:'left',  dataIndex:'estatus',     		header:"Estatus"},		
	{sortable:false,  resizable:true, hidden:false, width:160, align:'left',  dataIndex:'oper',     		header:"Operaciones"}			
]);		 		
    columCot.defaultSortable=true; 
jsonCot=new Ext.data.JsonReader({root:'data',totalProperty:'totalReg',id:'listaCot'},
[{name: 'cveCotizacion'},{name: 'razonSocial'},{name: 'contacto'},{name: 'fecha'},{name: 'vigencia'},{name: 'estatus'},{name: 'oper'}]);	

var listaCot={};
    listaCot.datos=function()
                     {
                     listaCot.datos.superclass.constructor.call(this,
					 {proxy:new Ext.data.HttpProxy({url:'listados.php?listado=7',method:'POST'}),
					 remoteSort:true,
					 reader:jsonCot
					 });
					 //this.setDefaultSort('nombre','ASC');
					 
					 };
Ext.extend(listaCot.datos,Ext.data.Store,{load_listaCot:function(tipo,valor,padre){this.load({params:{listado:7,cvepadre:padre,consulta:tipo,where:valor,start: 0, limit: 1000000}});}});

var cargaCot=new listaCot.datos();  
	
var gridCot=new Ext.grid.GridPanel
						 ({
						 region:'center',
						 title      : 'COTIZACIONES PENDIENTES',
						 id:'gridCot',
						 height:450,
						 stripeRows:true,
						 store:cargaCot,
						 cm:columCot,
						 sm:new Ext.grid.RowSelectionModel({singleSelect:true}),			
						 trackMouseOver:true,
						 loadMask:{msg:'Cargando datos...'},
						 viewConfig:{forceFit:true,enableRowBody:true,showPreview:true},						 
                         /* bbar : new Ext.PagingToolbar({
								pageSize: 20,
								store: cargaCot,
								displayInfo: true
							}),*/
						 selModel : new Ext.grid.RowSelectionModel({singleSelect:false})
						 });
	 
	 var PanelCot = new Ext.Panel({
		width    : 700,
		height   : 500,
		layout   : 'border',
		items    : [gridCot],
		
	});
	

 cargaCot.load_listaCot(0,0,0);