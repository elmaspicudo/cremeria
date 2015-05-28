// JavaScript Document
//Ext.getCmp('id_del_combo').setValue("texto que muestra el combo");
var uns = getStore();
		var stateStore = getStore();
		var countryCmb = new Ext.form.ComboBox({
			store: uns,
			id: 'country',
			mode: 'local',
			 hiddenName: 'edo_cveEstado',
			valueField: 'value',
			displayField: 'label',
			triggerAction: 'all',
			emptyText: 'Seleccione Estado',
			fieldLabel: 'Estado',
			 anchor: '80%',
			 editable: false
		});
	uns.load();
		var stateCmb = new Ext.form.ComboBox({
			store: stateStore,
			 hiddenName: 'mun_cveMunicipio',
			disabled: true,
			id: 'state',
			valueField: 'value',
			displayField: 'label',
			triggerAction: 'all',
			mode: 'local',
			emptyText: 'Municipio',
			fieldLabel: 'Municipio',
			anchor: '80%',
			editable: false
		});
		countryCmb.on('select',function(cmb,record,index){
			stateCmb.enable();
			stateCmb.clearValue();
			stateStore.load({params:{id:record.get('value')}});
		});

	function getStore(){
		var stores = new Ext.data.JsonStore({
			url:'listadoCmb.php',
			root:'data',
			fields: ['value','label']
		});
		return stores;
	}
var websDatab = [
        ['1','Fletera'],
        ['2','Transporte Propio'],
        ['3','Mensajeria'],
		['4','Transporte particular']
    ];
var forma = new Ext.form.ComboBox({
                                mode:           'local',
                                triggerAction:  'all',
                                forceSelection: true,
                                editable:       false,
                                fieldLabel:     'Forma de entrega',
                                name:           'forma',
								 displayField:   'name',
                                valueField:     'value',
                                queryMode: 'local',
								hiddenName:'formah',
                                store: new Ext.data.SimpleStore({  
								fields: ['value', 'name'],  
								data : websDatab,								  
								id: 0  
										})
                            });

var frmDireccion=	new  Ext.form.FormPanel({
					         id: 'formDirecciones',
							 region: 'north',
                			 height: 220,
							 width : 300,
							 title      : 'LUGAR DE ENTREGA',
							 bodyStyle  : 'padding: 10px;',
							 waitMsgTarget: true,
							 border:false,
							 reader: categoriesFormReader,
							 items: [{ layout:'column',
									 bodyStyle  : 'padding: 10px; border:none',
									  items:[
									  		{
												 columnWidth:.5,
												 layout: 'form',
												  bodyStyle  : 'border:none',
												  items: [{
									 xtype:'textfield',
									 name:'nombreDir',
									 id: 'nombreDir',
									 fieldLabel:'Nombre de Obra / Entrega',  anchor: '80%',allowBlank: false//cveDireccion, pa_cvePais,edo_cveEstado,mun_cveMunicipio
									 },{
									 xtype:'textfield',
									 name:'calle',
									 id: 'calle',
									 fieldLabel:'Calle',  anchor: '80%'//cveDireccion, pa_cvePais,edo_cveEstado,mun_cveMunicipio
									 } ,{
									 xtype:'textfield',
									 name:'numeroExterior',
									 id: 'numeroExterior',
									 fieldLabel:'Numero exterior',  anchor: '80%'
									 },{
									 xtype:'textfield',
									 name:'numeroInterior',
									 id: 'numeroInterior',
									 fieldLabel:'Numero interior',  anchor: '80%'
									 }  ]},
											{
												 columnWidth:.5,
												 layout: 'form',
												  bodyStyle  : 'border:none',
												  items: [{
									 xtype:'textfield',
									 name:'colonia',
									 id: 'colonia',
									 fieldLabel:'Colonia',  anchor: '80%'
									 },countryCmb,stateCmb, {
									 xtype:'numberfield',
									 name:'codigoPostal',
									 id: 'codigoPostal',
									 fieldLabel:'Codigo postal',  anchor: '80%'
									 },forma	]}]},  
									 {
									  xtype:'hidden',
									  name:'cvePersona',
									  id:'cvePersona'
									  },
									 {
									  xtype:'hidden',
									  name:'tipoPersona',
									  id:'tipoPersona'
									  },
									 {
									  xtype:'hidden',
									  name:'operacion',
									  id:'operacion'
									  },
									  {
									  xtype:'hidden',
									  name:'cveDireccion',
									  id:'cveDireccion'
									  },
									  {
									  xtype:'hidden',
									  name:'muncd',
									  id:'muncd'
									  }
									 ],
									 buttons: [{
                    text:'Guardar',
					handler : function(event)
					{
						if(document.getElementById("cvePersona").value=='')
						{
						  	document.getElementById("cvePersona").value=document.getElementById("hdncvepadre").value;
							document.getElementById("tipoPersona").value=document.getElementById("hdntipoPer").value;
							document.getElementById("operacion").value=document.getElementById("hdnoper").value;
						}
			if (frmDireccion.getForm().isValid()) {
				frmDireccion.getForm().submit({
					 url : 'creaPersona.php?tipoP=4',
					 waitMsg : 'Guardando datos...',
					 success: function () {
							persona=document.getElementById("cvePersona").value;
							tipop=document.getElementById("tipoPersona").value;
							operacion=document.getElementById("operacion").value;
							cargaDireccion.load_listaDireccion(tipop,0,persona);
							frmDireccion.getForm().reset();
							document.getElementById("cvePersona").value=persona;
							document.getElementById("tipoPersona").value=tipop;
							document.getElementById("operacion").value=operacion;
							Ext.MessageBox.alert('Alert', 'El registro se guardó correctamente.' );
							dire.load({params:{id:persona}});
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
                    text: 'Close',
                    handler: function(){
                        win.hide();
                    }
                }]

									});

function cargarDireccion(cveDireccion)
{
	uns.load();
	stateCmb.enable();
	  frmDireccion.getForm().load({
                         url : 'listadosb.php',
                         method: 'POST',
                         params: {
                             cve:cveDireccion,listado:1
                         },
                         waitMsg : 'Espere por favor',
						 success:function() {	cveEstado=document.getElementById("muncd").value
									document.getElementById("mun_cveMunicipio").value	=cveEstado;
									   }
                     });

		Ext.getCmp('operacion').setValue(mun);
		document.getElementById("operacion").value=2;
	}

 var categoriesRecord = new Ext.data.Record.create([
         {name: 'cveDireccion', type: 'int'},
         {name: 'edo_cveEstado', type: 'int'},
         {name: 'muncd', type: 'int'},
		 {name: 'mun_cveMunicipio', type: 'int'},
		 {name: 'calle', type: 'string'},
         {name: 'colonia', type: 'string'},
         {name: 'numeroInterior', type: 'int'},
         {name: 'numeroExterior', type: 'int'},
		 {name: 'cvePersona', type: 'int'},
         {name: 'codigoPostal', type: 'int'},
		 {name: 'nombreDir', type: 'string'},
         {name: 'tipoPersona', type: 'int'}
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
	{sortable:false,  resizable:true, hidden:false, width:220, align:'left',  dataIndex:'nombreDir',     		header:"Nombre"},
	{sortable:false,  resizable:true, hidden:false, width:220, align:'left',  dataIndex:'cal',     		header:"Calle"},
	{sortable:false,  resizable:true, hidden:false, width:160, align:'left',  dataIndex:'col',     		header:"Colonia"},
	{sortable:false,  resizable:true, hidden:false, width:160, align:'left',  dataIndex:'mun',     		header:"Municipio"},
	{sortable:false,  resizable:true, hidden:false, width:100, align:'left',  dataIndex:'pais',     		header:"Estado"},
	{sortable:false,  resizable:true, hidden:false, width:100, align:'left',  dataIndex:'operaciones',     		header:"Operaciones"}

]);
    columDireccion.defaultSortable=true;

jsonDireccion=new Ext.data.JsonReader({root:'data',totalProperty:'totalReg',id:'listaDireccion'},
[{name: 'cveDireccion'},{name: 'nombreDir'},{name: 'cal'},{name: 'col'},{name: 'mun'},{name: 'pais'},{name: 'operaciones'}]);

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
Ext.extend(listaDireccion.datos,Ext.data.Store,{load_listaDireccion:function(tipo,valor,padre){this.load({params:{listado:6,cvepadre:padre,consulta:tipo,where:valor}});}});

var cargaDireccion=new listaDireccion.datos();

var gridDireccion=new Ext.grid.GridPanel
						 ({
						 region:'center',
						 title      : 'Direcciones',
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


function cragaDirecciones(persona,tipop,operacion){
	frmDireccion.getForm().reset();
    cargaDireccion.load_listaDireccion(tipop,0,persona);
}


var winDir;
function abreDireccion(persona,tipop,operacion){
	frmDireccion.getForm().reset();
        if(!winDir){
            winDir = new Ext.Window({
                modal: 'true',
                layout:'fit',
                width:720,
                height:550,
                closeAction:'hide',
                plain: true,
                items: PanelDireccion
            });
        }
        winDir.show();
    	document.getElementById("cvePersona").value=persona;
		document.getElementById("tipoPersona").value=tipop;
		document.getElementById("operacion").value=operacion;
		cargaDireccion.load_listaDireccion(tipop,0,persona);
	}

 var pnlpanelorden = new Ext.Panel({
	 	id: 'panelorden',
		title: 'ORDENAR PEDIDO',
		iconCls: 'users',
		region: 'center',
		width    : 650
		});


//var winorden;
function abreOrden(cotizacion){
	   /* if(!winorden){
            winorden = new Ext.Window({
                modal: 'true',
                layout:'fit',
                width:920,
                height:650,
                closeAction:'hide',
                plain: true,
                items: pnlpanelorden
            });
        }
        winorden.show();*/
		 var tabPanel = Ext.getCmp('ordenes');
		 tabPanel.show();
    	var divObj = Ext.get('panelorden'); 
		divObj.load({
					url: 'ordnes.php',
					method: 'GET',
					params: {oper:3,id:cotizacion}
				});	
	}
function elimiarTro(tipo,id){
	$('#btnor'+id).remove() ;
	totalesOrdc(tipo);
	}
	
function calculaOP(tipo,id){
	
	var div=Ext.get('txtCosto'+tipo+'O'+id).getValue();
	var val=Ext.get('txtPorcentaje'+tipo+'O'+id).getValue();
    var cant=Ext.get('cantidad'+tipo+'O'+id).getValue();
	div=unformatNumber(div);
	val=unformatNumber(val);
    cant=unformatNumber(cant);
    
    var elprecio=(div)/val
    //var elprecio=div+(div*val);
    var precioTotalProd=elprecio*cant;
    
	document.getElementById("txtPrecio"+tipo+'O'+id).value=formatNumber(elprecio,'$');
	var des=Ext.get('txtDesc'+tipo+id).getValue();
	if(des !='' && des >0)
	{
		var porc=unformatNumber(document.getElementById("txtPrecio"+tipo+id).value);
		porc=(porc*des)/100;		
		document.getElementById("txtTotal"+tipo+'O'+id).value=formatNumber(porc,'$');
		}else{document.getElementById("txtTotal"+tipo+'O'+id).value=formatNumber(precioTotalProd,'$');}
		totalesOrdc(tipo);
	}
	
	function totalesOrdc(tipo)
	{
		var cuant=document.getElementById('tolPar').value
		var total=0;
		for(var i=0;i<cuant; i++)
		{
			var contenedord = document.getElementById("txtTotal"+tipo+'O'+i);
			if(contenedord != null) {
				var valor=document.getElementById("txtTotal"+tipo+'O'+i).value;
			total+=parseInt(unformatNumber(valor));
			}
			}
		document.getElementById("txtsubO"+tipo).value=formatNumber(total,'$');
		document.getElementById("txtivaO"+tipo).value=formatNumber(total*.16,'$');
		document.getElementById("txtTotalO"+tipo).value=formatNumber(((total*.16)+total),'$');
		}
function enviarOrden(cveCotz)
{
		lista =document.getElementById('tolPar').value;
		var h=0;
		var valores="idcot="+cveCotz+"&tipoP=1";
		valores+="&cunatpi="+lista;
		for(i=0;i<lista;i++)
		{
			var contenedord = document.getElementById("cantidadDO"+i);
				if(contenedord != null) {
							var prod=Ext.get('cvePrecioDO'+i).getValue();
							valores+="&unidades"+i+"="+Ext.get('cantidadDO'+i).getValue() +"&cveprod"+i+"="+prod+"&txtmon"+i+"=2";
				}
			var contenedorp = document.getElementById("cantidadPO"+i);
			if(contenedorp != null) {
							var prod=Ext.get('cvePrecioPO'+i).getValue();
							valores+="&unidades"+i+"="+Ext.get('cantidadPO'+i).getValue() +"&cveprod"+i+"="+prod+"&txtmon"+i+"=1";
				}
		}
		var tipo=1;
		$.ajax({
			url: 'guardarPed.php',
			type: "POST",
			data: valores,
			success: function(datos){
            if(datos > 0){
				Ext.MessageBox.alert('Alert', 'Ocurrió un error al guardar.' );
				
                }else{Ext.MessageBox.alert('Alert', 'La cotización se guardó correctamente.' );
				 var tabPanel = Ext.getCmp('tabClientes');
		 tabPanel.show();
		 cargaCotz(cveCotz);
				var divObj = Ext.get('panelorden'); 
		divObj.load({
					url: 'ordnes.php',
					method: 'GET',
					params: {oper:1}
				});
				
				 cargaCot.load_listaCot(0,0,0);
                                                                cargaCopag.load_listaCotb(0,0,0);
                                                                cargaCotb.load_listaCotb(0,0,0);	
				}
			}
		});
	

	}