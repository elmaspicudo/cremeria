 var columCotb=new Ext.grid.ColumnModel([		 		  
	{id:'folio', sortable:true,  resizable:true, hidden:false, width:80,  align:'left',  dataIndex:'cveCotizacion',        header:"Folio"},
	{sortable:true,  resizable:true, hidden:false, width:220, align:'left',  dataIndex:'razonSocial',     		header:"Cliente"},
	{sortable:false,  resizable:true, hidden:false, width:220, align:'left',  dataIndex:'contacto',     		header:"Contacto"},
	{sortable:false,  resizable:true, hidden:false, width:160, align:'left',  dataIndex:'fecha',     		header:"Fecha"},	
	{sortable:false,  resizable:true, hidden:false, width:160, align:'left',  dataIndex:'user',     		header:"Vendedor"},	
	{sortable:false,  resizable:true, hidden:false, width:160, align:'left',  dataIndex:'operaciones',     		header:"Operaciones"}
				
				
]);		 		
    columCotb.defaultSortable=true; 
jsonCotb=new Ext.data.JsonReader({root:'data',totalProperty:'totalReg',id:'listaCotb'},
[{name: 'cveCotizacion'},{name: 'razonSocial'},{name: 'contacto'},{name: 'fecha'},{name: 'vigencia'},{name: 'estatus'},{name: 'user'},{name: 'operaciones'}]);	

var listaCotb={};
    listaCotb.datos=function()
                     {
                     listaCotb.datos.superclass.constructor.call(this,
					 {proxy:new Ext.data.HttpProxy({url:'listados.php',method:'POST'}),
					 remoteSort:true,
					 reader:jsonCotb
					 });
					 //this.setDefaultSort('nombre','ASC');
					 
					 };
Ext.extend(listaCotb.datos,Ext.data.Store,{load_listaCotb:function(tipo,valor,padre){this.load({params:{listado:20,cvepadre:padre,consulta:tipo,where:valor}});}});

var cargaCotb=new listaCotb.datos();  
	
var gridCotb=new Ext.grid.GridPanel
						 ({
						 region:'center',
						 title      : 'Direcciones',
						 id:'gridCotb',
						 height:450,
						 stripeRows:true,
						 store:cargaCotb,
						 cm:columCotb,
						 sm:new Ext.grid.RowSelectionModel({singleSelect:true}),			
						 trackMouseOver:true,
						 loadMask:{msg:'Cargando datos...'},
						 viewConfig:{forceFit:true,enableRowBody:true,showPreview:true},						 
                          bbar : new Ext.PagingToolbar({
								pageSize: 20,
								store: cargaCotb,
								displayInfo: true
							}),
						 selModel : new Ext.grid.RowSelectionModel({singleSelect:false})
						 });
	 
	 var PanelCotb = new Ext.Panel({
		width    : 700,
		height   : 500,
		layout   : 'border',
		items    : [gridCotb],
		
	});
	

 cargaCotb.load_listaCotb(4,0,0);
