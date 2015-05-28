 /*! 
* Ext JS Library 3.0+ 
* Copyright(c) 2006-2009 Ext JS, LLC 
* licensing@extjs.com 
* http://www.extjs.com/license 
*/ 
Ext.ns('Ext.ux.form'); 

/** 
* <a href="/profile/class">@class</a> Ext.ux.form.FileUploadField 
* <a href="/profile/extends">@extends</a> Ext.form.TextField 
* Creates a file upload field. 
* <a href="/profile/xtype">@xtype</a> fileuploadfield 
*/ 
Ext.ux.form.FileUploadField = Ext.extend(Ext.form.TextField, { 
/** 
* <a href="/profile/cfg">@cfg</a> {String} buttonText The button text to display on the upload button (defaults to 
* 'Browse...'). Note that if you supply a value for {@link #buttonCfg}, the buttonCfg.text 
* value will be used instead if available. 
*/ 
buttonText: 'Browse...', 
/** 
* <a href="/profile/cfg">@cfg</a> {Boolean} buttonOnly True to display the file upload field as a button with no visible 
* text field (defaults to false). If true, all inherited TextField members will still be available. 
*/ 
buttonOnly: false, 
/** 
* <a href="/profile/cfg">@cfg</a> {Number} buttonOffset The number of pixels of space reserved between the button and the text field 
* (defaults to 3). Note that this only applies if {@link #buttonOnly} = false. 
*/ 
buttonOffset: 3, 
/** 
* <a href="/profile/cfg">@cfg</a> {Object} buttonCfg A standard {@link Ext.Button} config object. 
*/ 

// private 
readOnly: true, 

/** 
* <a href="/profile/hide">@hide</a> 
* <a href="/profile/method">@method</a> autoSize 
*/ 
autoSize: Ext.emptyFn, 

// private 
initComponent: function(){ 
Ext.ux.form.FileUploadField.superclass.initComponent.call(this);

this.addEvents( 
/** 
* <a href="/profile/event">@event</a> fileselected 
* Fires when the underlying file input field's value has changed from the user 
* selecting a new file from the system file selection dialog. 
* <a href="/profile/param">@param</a> {Ext.ux.form.FileUploadField} this 
* <a href="/profile/param">@param</a> {String} value The file value returned by the underlying file input field 
*/ 
'fileselected' 
); 
}, 

// private 
onRender : function(ct, position){ 
Ext.ux.form.FileUploadField.superclass.onRender.call(this, ct, position); 

this.wrap = this.el.wrap({cls:'x-form-field-wrap x-form-file-wrap'}); 
this.el.addClass('x-form-file-text'); 
this.el.dom.removeAttribute('name'); 

this.fileInput = this.wrap.createChild({ 
id: this.getFileInputId(), 
name: this.name||this.getId(), 
cls: 'x-form-file', 
tag: 'input', 
type: 'file', 
size: 1 
}); 

var btnCfg = Ext.applyIf(this.buttonCfg || {}, { 
text: this.buttonText 
}); 
this.button = new Ext.Button(Ext.apply(btnCfg, { 
renderTo: this.wrap, 
cls: 'x-form-file-btn' + (btnCfg.iconCls ? ' x-btn-icon' : '') 
})); 

if(this.buttonOnly){ 
this.el.hide(); 
this.wrap.setWidth(this.button.getEl().getWidth()); 
} 

this.fileInput.on('change', function(){ 
var v = this.fileInput.dom.value; 
this.setValue(v); 
this.fireEvent('fileselected', this, v); 
}, this); 
}, 

// private 
getFileInputId: function(){ 
return this.id + '-file'; 
}, 

// private 
onResize : function(w, h){ 
Ext.ux.form.FileUploadField.superclass.onResize.call(this, w, h); 

this.wrap.setWidth(w); 

if(!this.buttonOnly){ 
var w = this.wrap.getWidth() - this.button.getEl().getWidth() - this.buttonOffset; 
this.el.setWidth(w); 
} 
}, 

// private 
onDestroy: function(){ 
Ext.ux.form.FileUploadField.superclass.onDestroy.call(this);
Ext.destroy(this.fileInput, this.button, this.wrap); 

}, 


// private 
preFocus : Ext.emptyFn, 

// private 
getResizeEl : function(){ 
return this.wrap; 
}, 

// private 
getPositionEl : function(){ 
return this.wrap; 
}, 

// private 
alignErrorIcon : function(){ 
//this.errorIcon.alignTo(this.wrap, 'tl-tr', &#91;2, 0&#93;); 
} 

}); 

Ext.reg('fileuploadfield', Ext.ux.form.FileUploadField); 

// backwards compat 
Ext.form.FileUploadField = Ext.ux.form.FileUploadField; 

 var columCotb=new Ext.grid.ColumnModel([		 		  
	{id:'folio', sortable:true,  resizable:true, hidden:false, width:80,  align:'left',  dataIndex:'cveOrden',        header:"Folio"},
	{sortable:true,  resizable:true, hidden:false, width:220, align:'left',  dataIndex:'razonSocial',     		header:"Cliente"},
	{sortable:false,  resizable:true, hidden:false, width:220, align:'left',  dataIndex:'contacto',     		header:"Contacto"},
	{sortable:false,  resizable:true, hidden:false, width:160, align:'left',  dataIndex:'fecha',     		header:"Fecha"},	
	{sortable:false,  resizable:true, hidden:false, width:160, align:'left',  dataIndex:'vigencia',     		header:"Vigencia"},
	{sortable:false,  resizable:true, hidden:false, width:160, align:'left',  dataIndex:'user',     		header:"Vendedor"},	
	{sortable:false,  resizable:true, hidden:false, width:160, align:'left',  dataIndex:'operaciones',     		header:"Operaciones"}
				
				
]);		 		
    columCotb.defaultSortable=true; 
jsonCotb=new Ext.data.JsonReader({root:'data',totalProperty:'totalReg',id:'listaCotb'},
[{name: 'cveOrden'},{name: 'razonSocial'},{name: 'contacto'},{name: 'fecha'},{name: 'vigencia'},{name: 'estatus'},{name: 'user'},{name: 'operaciones'}]);	

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
Ext.extend(listaCotb.datos,Ext.data.Store,{load_listaCotb:function(tipo,valor,padre){this.load({params:{listado:15,cvepadre:padre,consulta:tipo,where:valor}});}});

var cargaCotb=new listaCotb.datos();  
	
var gridCotb=new Ext.grid.GridPanel
						 ({
						 region:'center',
						 title      : 'ORDENES DE COMPRA',
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
	

 cargaCotb.load_listaCotb(0,0,0);
 function setStatus(status,cve)
{
		$.ajax({
			url: 'guardarCot.php',
			type: "POST",
			data: "tipoP=4&estatus="+status+"&cve="+cve,
			success: function(datos){
				switch (status)	{
						case 1:alert(1)
						break;
						case 2:alert(2)
						break;
						case 3:alert(3)
						break;			
						case 4:Ext.MessageBox.alert('Alert', 'Venta cerrada exitosamente felicidades.' );	
						break;	
					}	
					 cargaCotb.load_listaCotb(0,0,0);		
			}
		});	
	}
	
var columC=new Ext.grid.ColumnModel([		 		  
	{id:'folio', sortable:true,  resizable:true, hidden:false, width:80,  align:'left',  dataIndex:'cveOrden',        header:"Folio"},
	{sortable:true,  resizable:true, hidden:false, width:220, align:'left',  dataIndex:'razonSocial',     		header:"Cliente"},
	{sortable:false,  resizable:true, hidden:false, width:220, align:'left',  dataIndex:'contacto',     		header:"Contacto"},
	{sortable:false,  resizable:true, hidden:false, width:160, align:'left',  dataIndex:'fecha',     		header:"Fecha"},	
	{sortable:false,  resizable:true, hidden:false, width:160, align:'left',  dataIndex:'vigencia',     		header:"Vigencia"},
	{sortable:false,  resizable:true, hidden:false, width:160, align:'left',  dataIndex:'user',     		header:"Vendedor"},	
	{sortable:false,  resizable:true, hidden:false, width:160, align:'left',  dataIndex:'operaciones',     		header:"Operaciones"}
				
				
]);		 		
    columC.defaultSortable=true; 
jsonC=new Ext.data.JsonReader({root:'data',totalProperty:'totalReg',id:'listaC'},
[{name: 'cveOrden'},{name: 'razonSocial'},{name: 'contacto'},{name: 'fecha'},{name: 'vigencia'},{name: 'estatus'},{name: 'user'},{name: 'operaciones'}]);	

var listaC={};
    listaC.datos=function()
                     {
                     listaC.datos.superclass.constructor.call(this,
					 {proxy:new Ext.data.HttpProxy({url:'listados.php',method:'POST'}),
					 remoteSort:true,
					 reader:jsonC
					 });
					 //this.setDefaultSort('nombre','ASC');
					 
					 };
Ext.extend(listaC.datos,Ext.data.Store,{load_listaC:function(tipo,valor,padre){this.load({params:{listado:16,cvepadre:padre,consulta:tipo,where:valor}});}});

var cargaC=new listaC.datos();  
	
var gridC=new Ext.grid.GridPanel
						 ({
						 region:'center',
						 title      : 'ORDENES PAGADAS',
						 id:'gridC',
						 height:450,
						 stripeRows:true,
						 store:cargaC,
						 cm:columC,
						 sm:new Ext.grid.RowSelectionModel({singleSelect:true}),			
						 trackMouseOver:true,
						 loadMask:{msg:'Cargando datos...'},
						 viewConfig:{forceFit:true,enableRowBody:true,showPreview:true},						 
                          bbar : new Ext.PagingToolbar({
								pageSize: 20,
								store: cargaC,
								displayInfo: true
							}),
						 selModel : new Ext.grid.RowSelectionModel({singleSelect:false})
						 });
	 
	 var PanelC = new Ext.Panel({
		width    : 700,
		height   : 500,
		layout   : 'border',
		items    : [gridC],
		
	});
	

 cargaC.load_listaC(0,0,0);
 
 
var frmCoti=	new  Ext.form.FormPanel({
        width: 500,
        frame: true,
        title: 'File Upload Form',
        bodyPadding: '10 10 0',
        defaults: {
            anchor: '80%',
            allowBlank: false,
            msgTarget: 'side',
            labelWidth: 50
        },

        items: [{
            xtype: 'textfield',
            fieldLabel: 'Name'
        },{ 
			xtype: 'fileuploadfield', 
			id: 'form-file', 
			emptyText: 'Select an image', 
			fieldLabel: 'Photo', 
			name: 'photo-path', 
			buttonText: '', 
			buttonCfg: { 
			iconCls: 'upload-icon' 
			} 
			} ],

        buttons: [{
            text: 'Save',
            handler: function(){
                var form = this.up('form').getForm();
                if(form.isValid()){
                    form.submit({
                        url: 'file-upload.php',
                        waitMsg: 'Uploading your photo...',
                        success: function(fp, o) {
                            msg('Success', 'Processed file "' + o.result.file + '" on the server');
                        }
                    });
                }
            }
        },{
            text: 'Reset',
            handler: function() {
                this.up('form').getForm().reset();
            }
        }]
    });


 
	var win;
function pagar(id){
	     if(!win){
            win = new Ext.Window({
                modal: 'true',
                layout:'fit',
                width:400,
                height:200,
                closeAction:'hide',
                plain: true,
                items: frmCoti
               
            });
			
        }
		 win.show(); 
		   
		}