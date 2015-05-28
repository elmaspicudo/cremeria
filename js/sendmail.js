   var frmMail = new  Ext.form.FormPanel({  
					         id: 'formMail', 
							 region: 'north',
                			 height: 250,
        title: 'Enviar',
        bodyStyle:'padding:5px 5px 0',
        width: 600,
        items: [{
                    xtype:'textfield',
                    fieldLabel: 'Para',
                    name: 'first',
                    anchor:'96%'
                }, {
                    xtype:'textfield',
                    fieldLabel: 'Asunto',
                    name: 'company',
                    anchor:'96%'
                },{
            xtype: 'htmleditor',
            name: 'bio',
            fieldLabel: 'Mensaje',
            height: 250,
            anchor: '96%'
        }],

        buttons: [{
            text: 'Save'
        },{
            text: 'Cancel'
        }]
    });
function sendMail(oper){	
var winSend;
	     if(!winSend){
            winSend = new Ext.Window({
                modal: 'true',
                layout:'fit',
                width:800,
                height:450,
                closeAction:'hide',
                plain: true,
                items: frmMail
               
            });
        }
        winSend.show();   	
		}	