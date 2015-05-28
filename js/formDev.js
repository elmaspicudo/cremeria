
							
var websDatadev = [
        ['1','Material dañado'],
        ['2','Tiempo extemporaneo'],
        ['3','Material equivocado']
    ];

    var categoriesComboWebsdev = new Ext.form.ComboBox({
        fieldLabel: 'tipo',
        hiddenName: 'hdnDev', 
		store: new Ext.data.SimpleStore({
            fields: ['id_busqueda', 'nombres'],
            data : websDatadev,
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
							  
								
var frmDev=	new  Ext.form.FormPanel({  
					         id: 'formPodu', region: 'north',
                			 height: 105,
							 anchor: '10%',
							  bodyStyle  : 'padding: 10px;',								
							 title      : 'Capturar datos',
							 waitMsgTarget: true, 
							 bodyPadding: 20, 					
							 border:true,
							 items: [{ layout:'column',
									   bodyStyle  : ';border:none',
									   labelWidth: 65,	
													  
									  items:[
									  		{
												 columnWidth:.25,
												 layout: 'form',
												  bodyStyle  : ';border:none',		
												  items: [{xtype:'textfield',
													 name:'foliodev',   
													 id: 'foliodev',
													 fieldLabel:'Folio',anchor: '90%',disabled: true,}]
												 },
											{
												 columnWidth:.25,
												 layout: 'form',
												 bodyStyle  : ';border:none',	  												
												 items: [{xtype:'datefield',
													 name:'fecdev', 
													 id: 'fecdev',fieldLabel:'Fecha Exp.',anchor: '90%'}] 
												 },
												 {
												 columnWidth:.25,
												 layout: 'form',
												 bodyStyle  : ';border:none',	  												
												 items: [categoriesComboWebsdev] 
												 }
												 
											 ]
									},{
									  xtype:'hidden',
									  name:'cuantdev',
									  id:'cuantdev',
									  value:0
									  },
									  {
									  xtype:'hidden',
									  name:'idcontdev',
									  id:'cuant' 
									  },
									  {
									  xtype:'hidden',
									  name:'idcotdev',
									  id:'idcotdev' 
									  },
									  {
									  xtype:'hidden',
									  name:'statcotdev',
									  id:'statcotdev' 
									  },
									  {
									  xtype:'hidden',
									  name:'idOrdendev',
									  id:'idOrdendev' ,value:0
									  }
									 
									 ],
									 buttons:[{
												text: 'Guardar',
												handler: function(){
													crearDev();
													
													}},{
												text: 'Cancelar ',
												handler: function(){
													
													  }}]
									
									});
									
	
function traerDatosdev(cve)
{
	
	$.post( 'qsp.php', { id: cve, oper: 3 },
	  function(data){
		 var dat=data.split('|');
		 document.getElementById('telContacto').value=dat[0]
		 document.getElementById('emailC').value=dat[1]
	  });
	
	}									
	var paneldev = new Ext.Panel({
			id: 'contenDv',
			title: 'Productos',
			iconCls: 'users',
			region: 'center',
			width    : 650

		});
		
			var centerdev = new Ext.Panel({
			xtype	:	"panel",
			region	:	"center",
			layout	:	"border",
			border	:	false,
			items	:	[frmDev,paneldev]
		});


	var windv;
function traerDev(id,cot){	
	     if(!windv){
            windv = new Ext.Window({
                modal: 'true',
                layout:'fit',
                width:900,
                height:600,
                closeAction:'hide',
                plain: true,
                items: centerdev
               
            });
        }
        windv.show(); 
		var divObj = Ext.get('contenDv'); 
	divObj.load({
				url: 'dev.php',
				method: 'GET',
				params: {oper:1,id:id}
			});	
			document.getElementById('idOrdendev').value=id;
	$.post( 'qsp.php', { id: id, oper: 4 },
	  function(data){
		document.getElementById('cuantdev').value=data;
	  });
		}	
function calculaDev(tipo,id)
{
		
	var div=Ext.get('Precio'+tipo+id).getValue();
	var des=Ext.get('txtDesc'+tipo+id).getValue();
    var cant=Ext.get('txtCant'+tipo+id).getValue();	

	div=unformatNumber(div);
	des=unformatNumber(des);
    cant=unformatNumber(cant);
    
      
	des=parseFloat(des);
	div=parseFloat(div)
    cant=parseFloat(cant);
      
	var porc=(div*des)/100;	
	porc=(parseFloat(div)-porc)*cant;	
	
    document.getElementById("txtTotal"+tipo+id).value=formatNumber(porc,'$');
		
	var cuantos=parseInt(document.getElementById('cuant').value)+1;
	var total=0;
	for(i=1;i<cuantos;i++)
	{
			var contenedord = document.getElementById('Precio'+tipo+id);
			if(contenedord != null) {
				var tol=unformatNumber(document.getElementById("txtTotal"+tipo+id).value);
				total+=parseFloat(tol);
				//alert(i)
				}			
		}	
		document.getElementById("txtsub1"+tipo).value=formatNumber(total,'$');
		document.getElementById("txtiva1"+tipo).value=formatNumber(total*.16,'$');
		document.getElementById("txtTotal1"+tipo).value=formatNumber(((total*.16)+total),'$');	
	
	}				
	
function crearDev()
{
	if (frmDev.getForm().isValid()) {
		var foliodev=Ext.get('foliodev').getValue();
		var fecdev=Ext.get('fecdev').getValue();
		var hdnDev=Ext.get('hdnDev').getValue();
		var idOrdendev=Ext.get('idOrdendev').getValue();
		var valores="foliodev="+foliodev+"&fecdev="+fecdev+"&hdnDev="+hdnDev+"&idOrdendev="+idOrdendev+"&tipoP=1" ;	
		
		var lim=parseInt(Ext.get('cuantdev').getValue())+1;
		//var lim=3;
		valores+="&cunatpi="+lim;
		for(i=1;i<lim;i++)
		{
			var contenedord = document.getElementById("cvePrecioPA"+i);
			
				if(contenedord != null) {	
							var cvePrecio=Ext.get('cvePrecioPA'+i).getValue();
							var txtCant=Ext.get('txtCantPA'+i).getValue();
							valores+="&cvePrecio"+i+"="+cvePrecio +"&txtCant"+i+"="+txtCant;
				}
			var contenedorp = document.getElementById("cvePrecioDA"+i);
			if(contenedorp != null) {	
							var cvePrecio=Ext.get('cvePrecioDA'+i).getValue();
							var txtCant=Ext.get('txtCantDA'+i).getValue();
										
							valores+="&cvePrecio"+i+"="+cvePrecio +"&txtCant"+i+"="+txtCant;
				}
		
			}
		var tipo=1;
		$.ajax({
			url: 'guardardev.php',
			type: "POST",
			data: valores,
			success: function(datos){				
				Ext.MessageBox.alert('Alert', 'La devolucion se guardo correctamente.' );
				window.location='cotizador.php';
				
			}
		});		
	}

	
	
	} 