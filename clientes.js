// JavaScript Document

var clccountry = new Ext.form.ComboBox({
			store: uns,
			id: 'edo',
			 hiddenName: 'cveEstado',
			valueField: 'value',
			displayField: 'label',
			triggerAction: 'all',
			mode: 'local',
			emptyText: 'Seleccione Estado',
			fieldLabel: 'Estado',
			  anchor: '90%',
			 editable: false
		});
uns.load();
		var clcstate = new Ext.form.ComboBox({
			store: stateStore,
			 hiddenName: 'cveMunicipio',
			//disabled: true,
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
var miformulario=	new  Ext.form.FormPanel({
					         id: 'formClientes',
							 region: 'north',
                			 height: 245,
							 anchor: '90%',
							 title      : 'DATOS FISCALES',
							 bodyStyle  : 'padding: 10px; background-color: DFE8F6',
							 waitMsgTarget: true,
							 reader: clientesFormReader,
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
													 fieldLabel:'Razon Social',
													 allowBlank: false,
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
													 anchor: '90%'
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
													 fieldLabel:'Numero exterior',
													 anchor: '90%'
													 },clccountry	,
													 {
													 xtype:'numberfield',
													 name:'clcPostal',
													 id: 'clcPostal',
													 fieldLabel:'Codigo postal',
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
													 },
													 {
													 xtype:'textfield',
													 name:'clcInterior',
													 id: 'clcInterior',
													 fieldLabel:'Numero interior',
													  anchor: '90%'
													 } ,clcstate,{
														xtype: 'radiogroup',
														fieldLabel: 'Tipo persona',
														id: "rbauto",
														defaults: {xtype: "radio",name: "rbauto"},
														allowBlank: false,
														items: [
															{boxLabel: 'Fisica',  inputValue: 1},
															{boxLabel: 'Moral',  inputValue: 2}
															
														]
													}
													 ]
											 }]

									  },

									 {
									  xtype:'hidden',
									  name:'cveCliente',
									  id:'cveCliente'
									  },
									  {
									  xtype:'hidden',
									  name:'operacionC',
									  id:'operacionC' ,
									  value: 1
									   }, {
									  xtype:'hidden',
									  name:'munc',
									  id:'munc'
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
	var radios = Ext.getCmp("rbauto");
// now set the value of the radio button(s) that match the key/value pair
radios.getValue();
	  /*miformulario.getForm().load({
                         url : 'listadosb.php',
                         method: 'POST',
                         params: {
                             cve:cveDireccion,listado:3
                         },
                         waitMsg : 'Espere por favor' ,
						 success:function() {	cveEstado=document.getElementById("munc").value
									document.getElementById("cveMunicipio").value	=cveEstado;
									   }
                     });
	document.getElementById("operacionC").value=2;
	document.getElementById("hdncvepadre").value=cveDireccion;
	cragaDirecciones(cveDireccion,1,1);
	cargaContactos(cveDireccion,1,1);
*/
	}
 var clientesRecord = new Ext.data.Record.create([
         {name: 'cveCliente', type: 'string'},
         {name: 'razonSocial', type: 'string'},
         {name: 'rfc', type: 'string'} ,
		 {name: 'clave', type: 'string'},
         {name: 'clcCalle', type: 'string'},
         {name: 'clcInterior', type: 'string'} ,
		 {name: 'clcPostal', type: 'string'},
         {name: 'clccolonia', type: 'string'},
		 {name: 'cveEstado', type: 'string'},
		 {name: 'munc', type: 'string'},
		 {name: 'mun', type: 'string'}
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
					 url : 'creaPersona.php?tipoP=1',
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
					 failure: function (response, request) {
					 		Ext.MessageBox.alert('Alert', 'El registro ya existe' );
							miformulario.getForm().reset();
						}
				});
			}
			else Ext.MessageBox.alert('Alert', 'Hay datos Incompletos' );
		}
	});

 var websData = [
         ['razonSocial','Razon social'],
         ['rfc','R.F.C.']
     ];

    var categoriesComboWebs = new Ext.form.ComboBox({
        fieldLabel: 'tipo',
        hiddenName: 'hdn_id_busqueda', // Este campo es importante, sin él no funciona el combo
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

var barra = new Ext.Toolbar([{
			text : ' Tipo de b&uacute;squeda '
		},categoriesComboWebs,{
			text : ' Criterio '
		},{
			xtype:'textfield',
			width: 150,
			fieldLabel: 'valor',
			name: 'txt_valor_b',
			id: 'txt_valor_b',
			tabIndex: 2
		},{
			text : ' Buscar ',
			icon : 'icons/delete.gif',
			handler : function() {
				var tipo=document.getElementById("hdn_id_busqueda").value;
				var valor=document.getElementById("txt_valor_b").value;
				if(tipo=='' || valor=='')
				{ alert('El campo criterio o tipo de búsqueda no deben estar vacios');}
				else{cargaClientes.load_listaClientes(tipo,valor);}


				}
		} ]);

var columClientes=new Ext.grid.ColumnModel([
	{id:'cveCliente', sortable:false,  resizable:true, hidden:false, width:80,  align:'left',  dataIndex:'cveCliente',        header:"Id"},
	{sortable:false,  resizable:true, hidden:false, width:100, align:'left',  dataIndex:'clave',     		header:"Clave"}	,
	{sortable:true,  resizable:true, hidden:false, width:220, align:'left',  dataIndex:'razonSocial',     		header:"Razon social"},
	{sortable:true,  resizable:true, hidden:false, width:160, align:'left',  dataIndex:'rfc',     		header:"R.F.C."}
]);
    columClientes.defaultSortable=true;

jsonClientes=new Ext.data.JsonReader({root:'data',totalProperty:'totalReg',id:'listaClientes'},
[{name:'cveCliente'},{name:'razonSocial'},{name:'rfc'},{name:'clave'}]);

var listaClientes={};
    listaClientes.datos=function()
                     {
                     listaClientes.datos.superclass.constructor.call(this,
					 {proxy:new Ext.data.HttpProxy({url:'listados.php?listado=1',method:'POST'}),
					 remoteSort:true,
					 reader:jsonClientes
					 });
					 this.setDefaultSort('razonSocial','ASC');

					 };
Ext.extend(listaClientes.datos,Ext.data.Store,{load_listaClientes:function(tipo,valor){this.load({params:{listado:1,consulta:tipo,where:valor,start: 0, limit: 30}});}});

var cargaClientes=new listaClientes.datos();
   cargaClientes.load_listaClientes(0,0);

var gridClientes=new Ext.grid.GridPanel
						 ({
						 region:'center',
						 title      : 'Mis clientes',
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
								pageSize: 30,
								store: cargaClientes,
								displayInfo: true
							}),
						 tbar : barra,
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
		width    : 800,
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
			  id:'Clientes', title:'DATOS DE FACTURACION',layout: 'fit',
				items:PanelClientes
			},
			{
			  id:'contactos', title:'CONTACTOS',layout: 'fit',
				items:PanelContacto
			},
			{
			  id:'Direcciones', title:'DIRECCIONES',layout: 'fit',
				items:PanelDireccion
			}

			]}]
		});

var pandir = new Ext.Panel({
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
	items: [
		{
		  id:'Direcciones', title:'DIRECCIONES',layout: 'fit',
			items:PanelDireccion
		}
	]}]
});

var pancon = new Ext.Panel({
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
	items: [
		{
		  id:'contactos',
		  title:'CONTACTOS',
		  layout: 'fit',
		  items:PanelContacto
		}
	]}]
});



var win;
function winClientes(){
   if(!win){
        win = new Ext.Window({
            layout:'fit',
           	layout:'fit',
            width:700,
            height:600,
            closeAction:'hide',
            plain: true,
			animCollapse : true,//Al minimizar la ventana se animará
			collapsible  : true,
            items: center
        });
    }
    win.show();

}

var win;
var win2;
var win3;
function winClientes(){
    if(!win){
    		win = new Ext.Window({
               layout:'fit',
               layout:'fit',
               width:700,
               height:600,
               closeAction:'hide',
               plain: true,
               items: center
           });

     }
       	win.show();
}

function winClientesDir(){
    if(!win2){
   		win2 = new Ext.Window({
              layout:'fit',
              layout:'fit',
              width:700,
              height:600,
              closeAction:'hide',
              plain: true,
              items: pandir
          });
     }
      win2.show();
}

function winClientesCont(){
    if(!win3){
   		win3 = new Ext.Window({
              layout:'fit',
              layout:'fit',
              width:700,
              height:600,
              closeAction:'hide',
              plain: true,
              items: pancon
          });
      }
      win3.show();
}