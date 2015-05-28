// JavaScript Document
var clccountry = new Ext.form.ComboBox({
			store: uns,
			id: 'edo',
			 hiddenName: 'cveEstado',
			valueField: 'value',
			displayField: 'label',
			triggerAction: 'all',
			emptyText: 'Seleccione Estado',
			fieldLabel: 'Estado',
			  anchor: '90%',
			 editable: false	,
			 mode: 'local',
		});
uns.load();
		var clcstate = new Ext.form.ComboBox({
			store: stateStore,
			 hiddenName: 'cveMunicipio',
			disabled: true,
			id: 'mun',
			valueField: 'value',
			displayField: 'label',
			triggerAction: 'all',
			mode: 'local',
			emptyText: 'Seleccione Municipio',
			fieldLabel: 'Municipio',
			 anchor: '90%',
			editable: false
		});
		clccountry.on('select',function(cmb,record,index){
			clcstate.enable();
			clcstate.clearValue();
			stateStore.load({params:{id:record.get('value')}});
		});
 var websData = [
         ['razonSocial','Razon social'],
         ['rfc','R.F.C.']
     ];
var frmPorveedores=	new  Ext.form.FormPanel({
					         id: 'formClientes',
							 region: 'north',
                			 height: 285,
							 width : 1105,
							 title      : 'CAPTURAR PROVEEDOR',
							 bodyStyle  : 'padding: 10px; background-color: DFE8F6',
							 waitMsgTarget: true,
							 reader:proveedoresFormReader,		//PrazonSocial,Prfc
							 border:false,
							 items: [{ layout:'column',
									 bodyStyle  : 'border:none',
									  items:[{columnWidth:.8,
											 layout: 'form',
											 bodyStyle  : 'border:none',
											 items: [{
													 xtype:'textfield',
													 name:'razonSocial',
													 id: 'razonSocial',
													 fieldLabel:'Razón Social',
													 allowBlank: false,
													  anchor: '90%'
													 },
													 {
													 xtype:'textfield',
													 name:'nomCom',
													 id: 'nomCom',
													 fieldLabel:'Nombre Comercial',
													  anchor: '90%'
													 }]}]},
							 		 { layout:'column',
									 bodyStyle  : 'border:none',
									  items:[{columnWidth:.4,
											 layout: 'form',
											 bodyStyle  : 'border:none',
											 items: [{
													 xtype:'textfield',
													 name:'rfc',
													 id: 'rfc',
													 fieldLabel:'R.F.C.',
													 anchor: '90%',
													 allowBlank: false, minLength: 1, maxLength: 13,
														 enableKeyEvents: true,
														 listeners: {
												             keyup: function(field) {
																if (field.getValue().length > 13) {
																	field.setValue(field.getValue().substring(0, 13));
																}
							                                }
											             }
													 },
													 {
													 xtype:'textfield',
													 name:'clcCalle',
													 id: 'clcCalle',
													 fieldLabel:'Calle'//cveDireccion, pa_cvePais,edo_cveEstado,mun_cveMunicipio,
													 ,anchor: '90%'
													 } ,
													 {
													 xtype:'textfield',
													 name:'clcExterior',
													 id: 'clcExterior',
													 fieldLabel:'Número exterior',
													 anchor: '90%'
													 },clccountry	,
													 {
													 xtype:'numberfield',
													 name:'clcPostal',
													 id: 'clcPostal',
													 fieldLabel:'Código postal',
													 anchor: '90%'
													 }
													 ]
											 },
											 {columnWidth:.4,
											 layout: 'form',
											 bodyStyle  : 'border:none',
											 items: [
													 {
													 xtype:'textfield',
													 name:'clave',
													 id: 'clave',
													 fieldLabel:'Clave',
													 anchor: '90%'
													 } ,
													 {
													 xtype:'textfield',
													 name:'clccolonia',
													 id: 'clccolonia',
													 fieldLabel:'Colonia',
													  anchor: '90%'
													 } ,
													 {
													 xtype:'textfield',
													 name:'clcInterior',
													 id: 'clcInterior',
													 fieldLabel:'Número interior',
													  anchor: '90%'
													 },clcstate
													 ]
											 }]

									  },
									 {
									  xtype:'hidden',
									  name:'cveProveedor',
									  id:'cveProveedor'
									  },
									  {
									  xtype:'hidden',
									  name:'operacionP',
									  id:'operacionP' ,
									  value: 1
									   }, {
									  xtype:'hidden',
									  name:'munc',
									  id:'munc'
									   }

									 ]

									});



function cargaPorveedores(cveDireccion)
{
	  frmPorveedores.getForm().load({
                         url : 'listadosb.php',
                         method: 'POST',
                         params: {
                             cve:cveDireccion,listado:4
                         },
                         waitMsg : 'Espere por favor' ,
						 success:function() {	cveEstado=document.getElementById("munc").value
									document.getElementById("cveMunicipio").value	=cveEstado;
									   }
                     });
	document.getElementById("operacionP").value=2;
	document.getElementById("hdncvepadre").value=cveDireccion;
	cragaDirecciones(cveDireccion,2,1);
	cargaContactos(cveDireccion,2,1);
	}
 var proveedoresRecord = new Ext.data.Record.create([
         {name: 'cveProveedor', type: 'int'},
         {name: 'PrazonSocial', type: 'int'},
         {name: 'Prfc', type: 'int'} ,
		 {name: 'cveEstado', type: 'string'},
		 {name: 'munc', type: 'string'},
		 {name: 'mun', type: 'string'}
     ]);

     var proveedoresFormReader = new Ext.data.JsonReader(
             {
                 root : 'data',
                 successProperty : 'success',
                 totalProperty: 'total',
                 id: 'idClientes'
             },proveedoresRecord
     );

	frmPorveedores.addButton({
		text : 'Cancelar',
		disabled : false,
		handler : function() {
			frmPorveedores.getForm().reset();

		}
	});

	frmPorveedores.addButton({
		text : 'Guardar',
		disabled : false,
		handler : function(event) {
			if (frmPorveedores.getForm().isValid()) {
				frmPorveedores.getForm().submit({
					 url : 'creaPersona.php?tipoP=2',
					 waitMsg : 'Guardando datos...',
					 success: function () {
							Ext.MessageBox.alert('Alert', 'El registro se guardó correctamente.' );
							frmPorveedores.getForm().reset();
							cargaProveedores.load_listaProveedores(0,0);
							/*responseData = Ext.util.JSON.decode(request.response.responseText);
							 if (responseData.success   == true) {
     	                     	cve_store.load();
								selecciona_empleado(responseData.idEmp)
							 }*/
						},
					 failure: function () {
					 		Ext.MessageBox.alert('Alert', 'El registro no se guardó correctamente.' );
							frmPorveedores.getForm().reset();
						}
				});
			}
			else Ext.MessageBox.alert('Alert', 'Hay datos Incompletos' );
		}
	});

	 var categoriesComboWebsP = new Ext.form.ComboBox({
        fieldLabel: 'tipo',
        hiddenName: 'hdn_id_busquedaP', // Este campo es importante, sin él no funciona el combo
        store: new Ext.data.SimpleStore({
            fields: ['id_busqueda', 'nombres'],
            data : websData,
            id: 0
        }),
        valueField: 'id_busqueda',
        displayField: 'nombres',
        typeAhead: true,
        mode: 'local',
        triggerAction: 'all',
        emptyText: 'Seleccione el tipo de búsqueda...',
        selectOnFocus: true,
        width: 150
    });

var barraP = new Ext.Toolbar([{
			text : ' Tipo de b&uacute;squeda '

		},categoriesComboWebsP,{
			text : ' Criterio ',

		},{
			xtype:'textfield',
			width: 150,
			fieldLabel: 'valor',
			name: 'txt_valor_bP',
			id: 'txt_valor_bP',
			tabIndex: 2
		},{
			text : ' Buscar ',
			icon : 'icons/delete.gif',
			handler : function() {
				var tipo=document.getElementById("hdn_id_busquedaP").value;
				var valor=document.getElementById("txt_valor_bP").value;
				if(tipo=='' || valor=='')
				{ alert('El campo criterio o tipo de búsqueda no deben estar vacios');}
				else{cargaProveedores.load_listaProveedores(tipo,valor);}


				}
		} ]);

var columProveedores=new Ext.grid.ColumnModel([
	{id:'cveProveedor', sortable:false,  resizable:true, hidden:false, width:80,  align:'left',  dataIndex:'cveProveedor',        header:"Id"},
	{sortable:false,  resizable:true, hidden:false, width:100, align:'left',  dataIndex:'clave',     		header:"Clave"}	,
	{sortable:true,  resizable:true, hidden:false, width:220, align:'left',  dataIndex:'razonSocial',     		header:"Razón Social"},
	{sortable:true,  resizable:true, hidden:false, width:160, align:'left',  dataIndex:'rfc',     		header:"R.F.C."}
]);
    columProveedores.defaultSortable=true;

jsonProveedores=new Ext.data.JsonReader({root:'data',totalProperty:'totalReg',id:'listaProveedores'},
[{name:'cveProveedor'},{name:'razonSocial'},{name:'rfc'},{name:'clave'}]);

var listaProveedores={};
    listaProveedores.datos=function()
                     {
                     listaProveedores.datos.superclass.constructor.call(this,
					 {proxy:new Ext.data.HttpProxy({url:'listados.php?listado=2',method:'POST'}),
					 remoteSort:true,
					 reader:jsonProveedores
					 });
					 this.setDefaultSort('razonSocial','ASC');

					 };
Ext.extend(listaProveedores.datos,Ext.data.Store,{load_listaProveedores:function(tipo,valor){this.load({params:{listado:2,consulta:tipo,where:valor,start: 0, limit: 30}});}});

var cargaProveedores=new listaProveedores.datos();
   cargaProveedores.load_listaProveedores(0,0);

var gridProveedores=new Ext.grid.GridPanel
						 ({
						 region:'center',
						 title      : 'Mis proveedores',
						 id:'gridClientes',
						 height:350,
						 stripeRows:true,
						 store:cargaProveedores,
						 cm:columProveedores,
						 sm:new Ext.grid.RowSelectionModel({singleSelect:true}),
						 trackMouseOver:true,
						 loadMask:{msg:'Cargando datos...'},
						 viewConfig:{forceFit:true,enableRowBody:true,showPreview:true},
                          bbar : new Ext.PagingToolbar({
								pageSize: 30,
								store: cargaProveedores,
								displayInfo: true
							}),
						 tbar : barraP,
						 selModel : new Ext.grid.RowSelectionModel({singleSelect:false})
						 });