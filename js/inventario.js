 var columInv=new Ext.grid.ColumnModel([		 		 
	//{sortable:true,  resizable:true, hidden:false, width:80,  align:'left',  dataIndex:'linea',        header:"Linea"},
	{sortable:true,  resizable:true, hidden:false, width:220, align:'left',  dataIndex:'prod',     		header:"Nombre"},
	{sortable:false,  resizable:true, hidden:false, width:220, align:'left',  dataIndex:'uni',     		header:"Unidad M."},
	{sortable:false,  resizable:true, hidden:false, width:160, align:'left',  dataIndex:'total',     		header:"Existencia"},	
	{sortable:false,  resizable:true, hidden:false, width:160, align:'left',  dataIndex:'bandera',     		header:"Semaforo"}		
]);		 		
    columInv.defaultSortable=true; 
jsonInv=new Ext.data.JsonReader({root:'data',totalProperty:'totalReg',id:'listaInv'},
[{name: 'linea'},{name: 'prod'},{name: 'uni'},{name: 'total'},{name: 'bandera'},{name: 'unidadesC'}]);	

var listaInv={};
    listaInv.datos=function()
                     {
                     listaInv.datos.superclass.constructor.call(this,
					 {proxy:new Ext.data.HttpProxy({url:'listados.php?listado=8',method:'POST'}),
					 remoteSort:true,
					 reader:jsonInv
					 });
					 //this.setDefaultSort('nombre','ASC');
					 
					 };
Ext.extend(listaInv.datos,Ext.data.Store,{load_listaInv:function(tipo,valor,padre){this.load({params:{listado:8,cvepadre:padre,consulta:tipo,where:valor,start: 0, limit: 20}});}});

var cargaInv=new listaInv.datos();  
	
var gridInv=new Ext.grid.GridPanel
						 ({
						 region:'center',
						 title      : 'PRODUCTOS',
						 id:'gridInv',
						 height:450,
						 stripeRows:true,
						 store:cargaInv,
						 cm:columInv,
						 sm:new Ext.grid.RowSelectionModel({singleSelect:true}),			
						 trackMouseOver:true,
						 loadMask:{msg:'Cargando datos...'},
						 viewConfig:{forceFit:true,enableRowBody:true,showPreview:true},						 
                          bbar : new Ext.PagingToolbar({
								pageSize: 20,
								store: cargaInv,
								displayInfo: true
							}),
						 selModel : new Ext.grid.RowSelectionModel({singleSelect:false})
						 });
	 
	 var PanelInv = new Ext.Panel({
		width    : 700,
		height   : 500,
		layout   : 'border',
		items    : [gridInv],
		
	});
	

 cargaInv.load_listaInv(0,0,0);
 
