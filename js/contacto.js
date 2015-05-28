// JavaScript Document winContacto

	var winContacto;

///fromulario contacto
var frmContacto=	new  Ext.form.FormPanel({
					         id: 'frmContacto',
							 region: 'north',
                			 height: 220,
							 width : 300,
							 title      : 'Capturar contacto',
							 bodyStyle  : 'padding: 10px; ',
							 waitMsgTarget: true,
							 reader:contactoFormReader,
							 border:false,
							 items: [{ layout:'column',
									 bodyStyle  : 'padding: 10px; border:none',
									  items:[
									  		{
												 columnWidth:.5,
												 layout: 'form',
												  bodyStyle  : 'border:none',
												  items: [{
									 xtype:'textfield',
									 name:'txtNombre',
									 id: 'txtNombre',
									 fieldLabel:'Nombre',allowBlank: false,  anchor: '80%'
									 } , {
									 xtype:'textfield',
									 name:'txtApaterno',
									 id: 'txtApaterno',
									 fieldLabel:'Apellido paterno',  anchor: '80%',allowBlank: false
									 },
									 {
									 xtype:'textfield',
									 name:'txtMaterno',
									 id: 'txtMaterno',
									 fieldLabel:'Apellido materno',allowBlank: false,  anchor: '80%'
									 },
									  {
									 xtype:'textfield',
									 name:'txtCorreo',
									 id: 'txtCorreo',
									 fieldLabel:'E-mail',allowBlank: false,vtype: 'email',  anchor: '80%'
									 },{
									 xtype:'textfield',
									 name:'txtNextel',
									 id: 'txtNextel',
									 fieldLabel:'Nextel',  anchor: '80%'
									 }]},
											{columnWidth:.5,
												 layout: 'form',
												  bodyStyle  : 'border:none',
												  items: [{
									 xtype:'textfield',
									 name:'txtTelefono',
									 id: 'txtTelefono',
									 fieldLabel:'Telefono 1',  anchor: '80%',allowBlank: false
									 },{
									 xtype:'textfield',
									 name:'txtTelefonob',
									 id: 'txtTelefonob',
									 fieldLabel:'Telefono 2',  anchor: '80%'
									 },{
									 xtype:'textfield',
									 name:'txtFax',
									 id: 'txtFax',
									 fieldLabel:'Fax',  anchor: '80%'
									 },{
									 xtype:'textfield',
									 name:'txtCelular',
									 id: 'txtCelular',  anchor: '80%',
									 fieldLabel:'Celular'
									 }]}]},		
									 {
									  xtype:'hidden',
									  name:'cveContacto',
									  id:'cveContacto'
									  },
									  {
									  xtype:'hidden',
									  name:'tipoCon',
									  id:'tipoCon'
									  },
									   {
									  xtype:'hidden',
									  name:'cvepadre',
									  id:'cvepadre'
									  },
									  {
									  xtype:'hidden',
									  name:'CtipoO',
									  id:'CtipoO' ,
									  value: 1
									   }

									 ]

									});
frmContacto.addButton({
		text : 'Guardar',
		disabled : false,
		handler : function(event) {
			if(document.getElementById('cvepadre').value=='')
			{
				document.getElementById('cvepadre').value=document.getElementById("hdncvepadre").value;
				document.getElementById('tipoCon').value=document.getElementById("hdntipoPer").value;
				}


			if (frmContacto.getForm().isValid()) {
				frmContacto.getForm().submit({
					 url : 'creaContacto.php?tipoP=1',
					 waitMsg : 'Guardando datos...',
					 success: function () {
							Ext.MessageBox.alert('Alert', 'El registro se guardó correctamente.' );
							persona=document.getElementById('cvepadre').value;
							tipop=document.getElementById('tipoCon').value;
							cargaContacto.load_listaContacto(tipop,0,persona);
							frmContacto.getForm().reset();
							document.getElementById('cvepadre').value=persona;
							document.getElementById('tipoCon').value=tipop;
							Ext.MessageBox.alert('Alert', 'El registro se guardó correctamente.' );
							cvecon.load({params:{id:persona}});
							/*responseData = Ext.util.JSON.decode(request.response.responseText);
							 if (responseData.success   == true) {
     	                     	cve_store.load();
								selecciona_empleado(responseData.idEmp)
							 }*/
						},
					 failure: function () {
					 		Ext.MessageBox.alert('Alert', 'El registro no se guardó correctamente.' );
							frmContacto.getForm().reset();
						}
				});
			}
			else Ext.MessageBox.alert('Alert', 'Hay datos Incompletos' );
		}
	});

frmContacto.addButton({
		text : 'Cancelar',
		disabled : false,
		handler : function() {
			frmContacto.getForm().reset();

		}
	});

function cargarContacto(cveDireccion)
{
	  frmContacto.getForm().load({
                         url : 'listadosb.php',
                         method: 'POST',
                         params: {
                             cve:cveDireccion,listado:5
                         },
                         waitMsg : 'Espere por favor'
                     });
	document.getElementById("CtipoO").value=2;

	}
 var contactoRecord = new Ext.data.Record.create([
		 {name: 'txtNombre', type: 'string'},
         {name: 'txtApaterno', type: 'string'},
		 {name: 'txtMaterno', type: 'string'},
         {name: 'txtTelefono', type: 'string'},
		 {name: 'txtTelefonob', type: 'string'},
		 {name: 'txtNextel', type: 'string'},
		 {name: 'txtFax', type: 'string'},
		 {name: 'txtCelular', type: 'string'},
		 {name: 'txtCorreo', type: 'string'},
         {name: 'cveContacto', type: 'string'},
		 {name: 'tipoCon', type: 'string'},
         {name: 'cvepadre', type: 'string'}

     ]);

var contactoFormReader = new Ext.data.JsonReader(
     {
                 root : 'data',
                 successProperty : 'success',
                 id: 'idContacto'
             },contactoRecord
     );

/// grid contacto
var contactoBarra = new Ext.Toolbar([{
			xtype:'textfield',
			width: 150,
			fieldLabel: 'Nombre',
			name: 'txtbusNombre',
			id: 'txtbusNombre',
			tabIndex: 1
		},{
			text : ' Buscar ',
			icon : 'icons/delete.gif',
			handler : function() {
				var valor=document.getElementById("txtbusNombre").value;
				
				var cvepadre=document.getElementById("hdncvepadre").value;
				var tipo=document.getElementById("hdntipoPer").value;
				cargaContacto.load_listaContacto(tipo,valor,cvepadre);

				}
		} ]);

var columContacto=new Ext.grid.ColumnModel([
	{id:'cveContacto', sortable:false,  resizable:true, hidden:true, width:80,  align:'left',  dataIndex:'cveContacto',        header:"cveContacto"},
	{sortable:true,  resizable:true, hidden:false, width:220, align:'left',  dataIndex:'nombre',     		header:"Nombre"},
	{sortable:true,  resizable:true, hidden:false, width:160, align:'left',  dataIndex:'telefono',     		header:"Telefono"},
	{sortable:false,  resizable:true, hidden:false, width:100, align:'left',  dataIndex:'correo',     		header:"Correo"},
	{sortable:false,  resizable:true, hidden:false, width:100, align:'left',  dataIndex:'operaciones',     		header:"Operaciones"}

]);
    columContacto.defaultSortable=true;

jsonContacto=new Ext.data.JsonReader({root:'data',totalProperty:'totalReg',id:'listaContacto'},
[{name:'cveContacto'},{name:'nombre'},{name:'telefono'},{name:'correo'},{name:'operaciones'}]);

var listaContacto={};
    listaContacto.datos=function()
                     {
                     listaContacto.datos.superclass.constructor.call(this,
					 {proxy:new Ext.data.HttpProxy({url:'listados.php',method:'POST'}),
					 remoteSort:true,
					 reader:jsonContacto
					 });
					 this.setDefaultSort('nombre','ASC');

					 };
Ext.extend(listaContacto.datos,Ext.data.Store,{load_listaContacto:function(tipo,valor,padre){this.load({params:{listado:5,cvepadre:padre,consulta:tipo,where:valor}});}});

var cargaContacto=new listaContacto.datos();

var gridContacto=new Ext.grid.GridPanel
						 ({
						 region:'center',
						 title      : 'Contactos',
						 id:'gridContacto',
						 height:450,
						 stripeRows:true,
						 store:cargaContacto,
						 cm:columContacto,
						 sm:new Ext.grid.RowSelectionModel({singleSelect:true}),
						 trackMouseOver:true,
						 loadMask:{msg:'Cargando datos...'},
						 viewConfig:{forceFit:true,enableRowBody:true,showPreview:true},
                          bbar : new Ext.PagingToolbar({
								pageSize: 20,
								store: cargaContacto,
								displayInfo: true
							}),
						 tbar : contactoBarra,
						 selModel : new Ext.grid.RowSelectionModel({singleSelect:false})
						 });



	var PanelContacto = new Ext.Panel({
		width    : 700,
		height   : 500,
		layout   : 'border',
		items    : [frmContacto, gridContacto],

	});
function cargaContactos(persona,tipop,operacion){

	frmContacto.getForm().reset();
	var valorcito="";
	cargaContacto.load_listaContacto(tipop,valorcito,persona);

		}
function abreContacto(persona,tipop,operacion){

	frmContacto.getForm().reset();

        if(!winContacto){
            winContacto = new Ext.Window({
                modal: 'true',
                layout:'fit',
                width:720,
                height:550,
                closeAction:'hide',
                plain: true,
                items: PanelContacto
            });
        }
        winContacto.show();
		document.getElementById('cvepadre').value=persona;
		document.getElementById('tipoCon').value=tipop;
		cargaContacto.load_listaContacto(tipop,0,persona);

}