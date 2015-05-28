

	var panel1 = new Ext.Panel({
			id: 'contenIn',
			title: 'Productos',
			iconCls: 'users',
			region: 'center',
			width    : 650
		
		});	
		var south =new Ext.Panel({
			xtype	:	"panel",
			region	:	"south",
			height	:	150,
			collapsible: true,
			title	:	"Mensages"
		});
var win;
function winClientes(cveDireccion){
   if(!win){
        win = new Ext.Window({
			title      : 'Archivo',
            layout:'fit',
           	layout:'fit',
            width:400,
            height:150,
            closeAction:'hide',
            plain: true,
			 items: panel1
        });
    }
    win.show();
	var divObj = Ext.get('contenIn');

			divObj.load({
				url: 'forms.php',
				method: 'POST',
				params: {oper:1,data:cveDireccion}
			});

}
		var center1 = new Ext.Panel({
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
			 id:'Direcciones', title:'ORDEN DE SALIDA',layout: 'fit',
				items:gridCot
			}
						
			]}]
		});	 
		
		
function setStatus(status)
{
	var cve=Ext.get('hdnidEnr').getValue();
		$.ajax({
			url: 'guardarRec.php',
			type: "POST",
			data: "tipoP=4&estatus="+status+"&cve="+cve,
			success: function(datos){
				switch (status)	{
						case 1:alert(1)
						break;
						case 2:Ext.MessageBox.alert('Alert', 'La orden se envio a Almacen.' );
						break;
						case 3:alert(3)
						break;			
						case 4:	
						break;	
					}			
			}
		});	
	}