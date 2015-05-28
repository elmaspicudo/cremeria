// JavaScript Document
<?php
include "../lib/mnpBD.class.php";
$sql='SELECT folio AS id FROM folioscot where tipo=1 ';
$misd=$bd->Execute($sql);
$folio=$misd[0]['id'];
$usrUP=new mnpBD('folioscot');
$datosU=array($folio+1);
$usrUP->actualizar('folio',$datosU,'tipo=1');
$sql='SELECT MAX(total) as id FROM tipocambio';
$tipc=$bd->Execute($sql);
$tipocc=$tipc[0]['id'];
?>
function dolaresApesos()
{
 var mon= Ext.get('monti').getValue();
   if(mon ==0){ 
	var prod=Ext.get('Productos').getValue();
	lista = prod.split("!"); 
    var porcentaje=0;
    var totalc=0;
    var cambio=<?php echo $tipocc?>;
    var alto=lista.length-1;
	for(i=0;i<alto;i++)
	{
		var contenedord = document.getElementById("txtTotalD"+lista[i]);
		if(contenedord != null) {	
        	porcentaje=parseFloat(unformatNumber(document.getElementById("txtTotalD"+lista[i]).value))*cambio ;
			document.getElementById("txtTotalD"+lista[i]).value= formatNumber(porcentaje);
             totalc=totalc+parseFloat(porcentaje);
          
		}
			
		}
	
		document.getElementById("txtsubD").value=formatNumber(totalc);
        document.getElementById("txtivaD").value=formatNumber(totalc*.16);
		document.getElementById("txtTotalD").value=formatNumber((totalc*.16)+totalc);
		document.getElementById("monti").value=1;
		}else{Ext.MessageBox.alert('Alert', 'Ya se realizo la convercion a pesos' );}
	
}
function pesosAdolares()
{
var mon= Ext.get('monti').getValue();
   if(mon ==1){
	var prod=Ext.get('Productos').getValue();
	lista = prod.split("!"); 
    var porcentaje=0;
    var totalc=0;
    var cambio=<?php echo $tipocc?>;
     var alto=lista.length-1;
	for(i=0;i<alto;i++)
	{
		var contenedord = document.getElementById("txtTotalD"+lista[i]);
		if(contenedord != null) {	
        	porcentaje=parseFloat(unformatNumber(document.getElementById("txtTotalD"+lista[i]).value))/cambio ;
			document.getElementById("txtTotalD"+lista[i]).value= formatNumber(porcentaje);
			 totalc+=parseFloat(porcentaje);
		}
			
		}
	
		document.getElementById("txtsubD").value=formatNumber(totalc);
        document.getElementById("txtivaD").value=formatNumber(totalc*.16);
		document.getElementById("txtTotalD").value=formatNumber((totalc*.16)+totalc);
		document.getElementById("monti").value=0;
		}else{Ext.MessageBox.alert('Alert', 'Ya se realizo la convercion a dolares' );}
	
}
//


//
function formatNumber(num,prefix){
prefix = prefix || '';
num = Math.round(parseFloat(num)*Math.pow(10,2))/Math.pow(10,2)
num += '';
var splitStr = num.split('.');
var splitLeft = splitStr[0];
var splitRight = splitStr.length > 1 ? '.' + splitStr[1] : '';
var regx = /(\d+)(\d{3})/;
while (regx.test(splitLeft)) {
splitLeft = splitLeft.replace(regx, '$1' + ',' + '$2');
}
return prefix + splitLeft + splitRight;
}
function unformatNumber(num) {
return num.replace(/([^0-9\.\-])/g,'')*1;
}
function abrir(id,oper,tip)
{
	var el = document.getElementById('dv'+id); 
	var otro= document.getElementById('dc'+id); 
    var vals= document.getElementById('txtcom'+tip+id).value; 
    
	if(oper==1)
	{
			el.style.display ='none'
			otro.style.display ='block'
            window.setTimeout(function ()
    {

        		document.getElementById('txtcom'+tip+id).focus();
    		}, 0);
		}
	if(oper==2)
	{
			el.style.display ='block'
            if(vals !=''){ el.style.color="blue"; }
             if(vals ==''){ el.style.color="black"; }
			otro.style.display ='none'
		}
	}
    
    
var miformul
function operaciones()
{
	var prod=Ext.get('Productos').getValue();
	var divs=Ext.get('porcentaje').getValue();
	lista = prod.split("!"); 
	var j=0;
	var x=0;
	var subtotalD=0;
	var subtotalP=0;
   for(x=0;x<lista.length;x++)
	{
		var contenedord = document.getElementById("txtCostoD"+lista[x]);
		if(contenedord != null) {
      	
			document.getElementById("txtPorcentajeD"+lista[x]).value=divs;
              
			calculaP('D',lista[x])	
            	
		}
		var contenedorp = document.getElementById("txtCostoP"+lista[x]);
		if(contenedorp != null) {
			document.getElementById("txtPorcentajeP"+lista[x]).value=divs;
			calculaP('P',lista[x])
           
		}		
		}
	
		
	}
	
function calculaD(tipo,id)
{	
	var div=Ext.get('txtPrecio'+tipo+id).getValue();
	var des=Ext.get('txtDesc'+tipo+id).getValue();
    var cant=Ext.get('cantidad'+tipo+id).getValue();	

	div=unformatNumber(div);
	des=unformatNumber(des);
    cant=unformatNumber(cant);
    
      
	des=parseFloat(des);
	div=parseFloat(div)
    cant=parseFloat(cant);
      
	var porc=(div*des)/100;	
	porc=(parseFloat(div)-porc)*cant;	
	
    document.getElementById("txtTotal"+tipo+id).value=formatNumber(porc,'$');
		
	var prod=Ext.get('Productos').getValue();
	lista = prod.split("!"); 
	var total=0;
	var lim=parseInt(lista.length)+1;
	for(i=0;i<lim;i++)
	{
			var contenedord = document.getElementById("txtCosto"+tipo+lista[i]);
			if(contenedord != null) {
				var tol=unformatNumber(document.getElementById("txtTotal"+tipo+lista[i]).value);
				total+=parseFloat(tol);
				}			
		}	
		document.getElementById("txtsub"+tipo).value=formatNumber(total,'$');
		document.getElementById("txtiva"+tipo).value=formatNumber(total*.16,'$');
		document.getElementById("txtTotal"+tipo).value=formatNumber(((total*.16)+total),'$');		
	}	
function calculaP(tipo,id)
{
	var div=Ext.get('txtCosto'+tipo+id).getValue();
	var val=Ext.get('txtPorcentaje'+tipo+id).getValue();
    var cant=Ext.get('cantidad'+tipo+id).getValue();
	div=unformatNumber(div);
	val=unformatNumber(val);
    cant=unformatNumber(cant);
    
    var elprecio=(div)/val
    //var elprecio=div+(div*val);
    var precioTotalProd=elprecio*cant;
    
	document.getElementById("txtPrecio"+tipo+id).value=formatNumber(elprecio,'$');
	var des=Ext.get('txtDesc'+tipo+id).getValue();
	if(des !='' && des >0)
	{
		var porc=unformatNumber(document.getElementById("txtPrecio"+tipo+id).value);
		porc=(porc*des)/100;		
		document.getElementById("txtTotal"+tipo+id).value=formatNumber(porc,'$');
		}else{document.getElementById("txtTotal"+tipo+id).value=formatNumber(precioTotalProd,'$');}
		
	var prod=Ext.get('Productos').getValue();
	lista = prod.split("!"); 
	var j=0;
	var x=0;
	var subtotalD=0;
	var subtotalP=0;
	var lim=parseInt(lista.length);
	for(i=0;i<lim;i++)
	{
		var contenedord = document.getElementById("txtCostoD"+lista[i]);
		if(contenedord != null) {
			var tot=unformatNumber(document.getElementById("txtTotalD"+lista[i]).value);
				subtotalD+=parseFloat(tot)
			x++;	 		
		}
		var contenedorp = document.getElementById("txtCostoP"+lista[i]);
		if(contenedorp != null) {
			var tot=unformatNumber(document.getElementById("txtTotalP"+lista[i]).value);
			subtotalP+=parseFloat(tot)
		j++;
		}		
		}
	if(j >0)
	{
		document.getElementById("txtsubP").value=formatNumber(subtotalP,'$');
		document.getElementById("txtivaP").value=formatNumber((subtotalP*.16),'$');
		document.getElementById("txtTotalP").value=formatNumber(((subtotalP*.16)+subtotalP),'$');
		}
	if(x >0)
	{
		document.getElementById("txtsubD").value=formatNumber(subtotalD,'$');
		document.getElementById("txtivaD").value=formatNumber((subtotalD*.16),'$');
		document.getElementById("txtTotalD").value=formatNumber(((subtotalD*.16)+subtotalD),'$');
		}
		
	}	

	function creaEstores(ids,op){
		var stores = new Ext.data.JsonStore({
			url:'listadoCot.php?id='+ ids+'&oper='+op,
			root:'data',
			fields: ['value','label']
		});
		return stores;
	}
var prod = creaEstores(0,1);
var dire = creaEstores(0,4);
var clien = creaEstores(0,2);
var cvecon = creaEstores(0,5);
var cveclie = creaEstores(0,6);
var cveProd= creaEstores(0,9);


var productos = new Ext.form.ComboBox({
			store: prod,
			id: 'producto',
			hiddenName: 'cveProducto',
			valueField: 'value',
			displayField: 'label',
			triggerAction: 'all',
			emptyText: 'Seleccione producto',
			fieldLabel: 'Productos',
			anchor: '90%',
			editable: true
		});
//*******************************************************************************************
	productos.on('select',function(cmb,record,index){

        if(record.get('value')==0)
		{
			winClientes();
		}
		else
		{
        	traerepd(record.get('value'),2)
			   cvePro.disable();               
           
			}
		});
        
//*****       
        
        
var cvePro = new Ext.form.ComboBox({
			store: cveProd,
			id: 'cveprod',
			hiddenName: 'cveProd',
			valueField: 'value',
			displayField: 'label',
			triggerAction: 'all',
			emptyText: 'Seleccione producto',
			fieldLabel: 'Clave Producto',
			anchor: '90%',
			editable: true,       
		});
//*******************************************************************************************
	cvePro.on('select',function(cmb,record,index){

        if(record.get('value')==0)
		{
			winClientes();
		}
		else
		{
			traerepd(record.get('value'),1)
			   productos.disable();  
            
			}
		});
        
//****      
var clientes = new Ext.form.ComboBox({
			store: clien,
			hiddenName: 'nombreCli',
			id: 'idCont',
			valueField: 'value',
			displayField: 'label',
			triggerAction: 'all',
			emptyText: 'Seleccione cliente',
			fieldLabel: 'Cliente',
			anchor: '90%',
			editable: true,allowBlank: false
		});
	clientes.on('select',function(cmb,record,index){
		if(record.get('value')==0)
		{
			winClientes();
		}
		else
		{
			cveclientes.disable();
			cveclientes.clearValue();
			cveclie.load({params:{id:record.get('value')}});

			direcciones.enable();
			direcciones.clearValue();
			dire.load({params:{id:record.get('value')}});
			contacto.enable();
			contacto.clearValue();
			cvecon.load({params:{id:record.get('value')}});

			}
		});
var cveclientes = new Ext.form.ComboBox({
			store: cveclie,
			hiddenName: 'cveCliente',
			id: 'client',
			valueField: 'value',
			displayField: 'label',
			triggerAction: 'all',
			emptyText: 'Seleccione cliente',
			fieldLabel: 'Clave',
			anchor: '90%',
			editable: true
		});
cveclientes.on('select',function(cmb,record,index){
		if(record.get('value')==0)
		{
			winClientes();
		}
		else
		{
			clientes.disable();
			cveclie.load({params:{id:record.get('value')}});

			direcciones.enable();
			direcciones.clearValue();
			dire.load({params:{id:record.get('value')}});
			contacto.enable();
			contacto.clearValue();
			cvecon.load({params:{id:record.get('value')}});

			}
		});

var direcciones = new Ext.form.ComboBox({
			store: dire,
			hiddenName: 'cveDireccion',
			disabled: true,
			id: 'direccion',
			valueField: 'value',
			displayField: 'label',
			triggerAction: 'all',
			emptyText: 'Seleccione obra',
			fieldLabel: 'Proyecto / Obra',
			anchor: '90%',
			editable: true,allowBlank: false,mode: 'local'
		});
direcciones.on('select',function(cmb,record,index){
	if(record.get('value') == 0){
    winClientes();
    var cliente=document.getElementById("nombreCli").value;
    if(cliente==''){cliente=document.getElementById("cveCliente").value;}
				cargarClientes(cliente);
                var tabPanel = Ext.getCmp('pnlDirecciones');
				tabPanel.show();

		}else{
			traerDatos(record.get('value'),8);
		}
});
var contacto = new Ext.form.ComboBox({
			store: cvecon,
			hiddenName: 'cveContacto',
			disabled: true,
			id: 'cont',
			valueField: 'value',
			displayField: 'label',
			triggerAction: 'all',
			emptyText: 'Seleccione contacto',
			fieldLabel: 'Contacto',
			anchor: '90%',
			editable: true,allowBlank: false,mode: 'local'
		});
contacto.on('select',function(cmb,record,index){
	if(record.get('value') == 0){
			 winClientes();
    var cliente=document.getElementById("nombreCli").value;
    if(cliente==''){cliente=document.getElementById("cveCliente").value;}
				cargarClientes(cliente);
                var tabPanel = Ext.getCmp('pnlcontactos');
				tabPanel.show();

	}else{
		traerDatos(record.get('value'),7);
	}
});
 var falloAjax = function(response, request) {
         var errMessage = '<b>Error en la petición</b>  '
                        + ' <b>status</b> ' + response.status + ''
                        + ' <b>statusText</b> ' + response.statusText + ''
                        + ' <b>responseText</b> ' + response.responseText + '';


     }
 var terminoAjax = function(response, request) {
         var jsonData = Ext.util.JSON.decode(response.responseText);
         if (jsonData.success == true) {
		 	if(jsonData.oper == 8){ document.getElementById('calleE').value=jsonData.dir}
            if(jsonData.oper == 7){
			 document.getElementById('telContacto').value =jsonData.tel
			  document.getElementById('emailC').value=jsonData.email      }
         } else {
             Ext.MessageBox.alert('Alert', jsonData.data.message );
         }
     }


function traerDatos(cve,tipo)
{
	 Ext.Ajax.request({
             url: 'listadoCot.php?oper='+tipo,
             method: 'POST',
             success: terminoAjax,
             failure: falloAjax,
             timeout: 10000,
             headers: {
                 'cabecera-propia': 'prueba'
             },
             params: {
                 cve: cve
             }
         });
}


var frmCoti=	new  Ext.form.FormPanel({
					         id: 'formPodu', region: 'north',
                			 height: 285,
							 anchor: '100%',
							bodyStyle  : '',
							 waitMsgTarget: true,
							 bodyPadding: 20,
							 border:true,
							 items: [ { layout:'column',
									 bodyStyle  : 'padding: 10px; border:none',
									  items:[
									  		{
												 columnWidth:.60,
												 layout: 'form',
												  bodyStyle  : ';border:none',
												  items: [clientes,contacto,{xtype:'textfield',
													 name:'emailC',
													 id: 'emailC',
													 fieldLabel:'Email',anchor: '90%',disabled: true},direcciones,{xtype:'textfield',
													 name:'calleE',
													 id: 'calleE',
													 fieldLabel:'Dir. Entrega',anchor: '90%',disabled: true} ]
												 },
											{
												 columnWidth:.35,
												 layout: 'form',
												 bodyStyle  : 'border:none',
												 items: [{ xtype:'textfield',
													 name:'folio',
													 id: 'folio',
													 fieldLabel:'Folio',anchor: '90%', value:'<?php echo $folio; ?>',disabled: true
													 },{xtype:'datefield',
													 name:'fecha',
													 id: 'fecha',
													 fieldLabel:'Fecha',anchor: '90%', value:'<?php echo date("d/m/Y"); ?>',allowBlank: false} ,{xtype:'textfield',
													 name:'telContacto',
													 id: 'telContacto',
													 fieldLabel:'Teléfono',readOnly:true,anchor: '90%',style: 'font-weight:bold;'},
                                                     {xtype : "displayfield",anchor: '90%',id:'labStat', value:"",width: 80,style: 'font-size:18px;color:green;font-weight:bold;'}
                                                     ]
												 }												 

											 ]
									},{
									  xtype:'hidden',
									  name:'Productos',
									  id:'Productos'
									  },
									  {
									  xtype:'hidden',
									  name:'cantidades',
									  id:'cantidades'
									  },{
									  xtype:'hidden',
									  name:'idcot',
									  id:'idcot'
									  },{
									  xtype:'hidden',
									  name:'opercot',
									  value:1,
									  id:'opercot'
									  },{
									  xtype:'hidden',
									  name:'statcot',
									  value:1,
									  id:'statcot'
									  },{
									  xtype:'hidden',
									  name:'monti',
									  value:0,
									  id:'monti'
									  }

									 ],
									 buttons:[{
												text: 'Cerrar venta',anchor: '90%',
												handler: function(){
                                                var cot= Ext.get('idcot').getValue();
                                                 if(cot > 0){
                                                 Ext.MessageBox.alert('Alert', 'La venta ya se registro' );
                                                 }else{
                                               	Guardar(1);                                       
                                                    }
                                                   
												}},{
												text: 'Imprimir',anchor: '90%',
												id:'btnimp',
												handler: function(){
                                                var cot= Ext.get('idcot').getValue();
                                                if(cot > 0){
                                                imprimir();
                                                 }else{
                                               	Ext.MessageBox.alert('Alert', 'Necesitas cerrar la venta para cancelar' );                                       
                                                    }
													
												}},{
												text: 'Cancelar venta.',anchor: '90%',
												handler: function(){
                                                var hayPro= Ext.get('Productos').getValue();
                                                var revisarCve=Ext.get('idcot').getValue();
                                                if(hayPro!=''){
                                                	if(revisarCve!=''){
                                                    	setStatus(2);
                                                    Ext.getCmp('statcot').setValue(2);}else{
													Ext.MessageBox.alert('Alert', 'Necesitas guardar para Cancelar' );
                                                 }
												}else{Ext.MessageBox.alert('Alert', 'Agregue por lo menos un producto' );}
												}}]

									});
function imprimir()
{
var prod=Ext.get('hdncont').getValue();
		lista =parseInt(prod);
        var valores;
		valores+="&cunatpi="+lista;
		for(i=0;i<lista;i++)
		{
			var contenedord = document.getElementById("txtCheck"+i);
            var siono=$('input[id=txtCheck'+i+']').is(':checked');
				if(contenedord != null && siono==true) {
                   			var txtCodigo=Ext.get('txtclave'+i).getValue();
							var txtUnidades=Ext.get('txtUnidades'+i).getValue();
							var txtSubtotal=Ext.get('txtSubtotal'+i).getValue();
                            var txtumd=Ext.get('txtumd'+i).getValue();
							valores+="&unidades"+i+"="+txtUnidades +"&cveprod"+i+"="+txtCodigo+"&txtTotal"+i+"="+txtSubtotal+"&txtumd"+i+"="+txtumd;
				}
			}
	
	newwindow2=window.open('xmltopdf.php?id=1'+valores,'name','height=600,width=750');
	}
function Guardar(op)
{
	if (frmCoti.getForm().isValid()) {
    var hayProductos=Ext.get('hdncont').getValue();
    if(hayProductos>0){
    var tabPanel = Ext.getCmp('tabClientes');
    tabPanel.disable();
		var cveCliente=Ext.get('nombreCli').getValue();
		var cveContacto=Ext.get('cveContacto').getValue();
		var cveDireccion=Ext.get('cveDireccion').getValue();
		var vigencia=Ext.get('fecha').getValue();
		var idcot=Ext.get('idcot').getValue();
        var folio=Ext.get('folio').getValue();
		var tipo=Ext.get('opercot').getValue();
		var valores="idcot="+idcot+"&tipoP="+1+"&cveCliente="+cveCliente +"&cveContacto="+cveContacto +"&cveDireccion="+cveDireccion +"&fecha="+vigencia +"&folio="+folio;

		var prod=Ext.get('hdncont').getValue();
		var un=Ext.get('cantidades').getValue();
		unidades =un.split("!");
		lista =parseInt(prod);
		var h=0;
		valores+="&cunatpi="+lista;
		for(i=0;i<lista;i++)
		{
			var contenedord = document.getElementById("txtclave"+i);
				if(contenedord != null) {
							var txtCodigo=Ext.get('txtclave'+i).getValue();
							var txtUnidades=Ext.get('txtUnidades'+i).getValue();
							var txtSubtotal=Ext.get('txtSubtotal'+i).getValue();
                            var txtumd=Ext.get('txtumd'+i).getValue();
							valores+="&unidades"+i+"="+txtUnidades +"&cveprod"+i+"="+txtCodigo+"&txtTotal"+i+"="+txtSubtotal+"&txtumd"+i+"="+txtumd;
				}
			}
		var tipo=1;
		$.ajax({
			url: 'guardarCot.php',
			type: "POST",
			data: valores,
			success: function(datos){
            tabPanel.enable();
            if(datos > 0){
				Ext.MessageBox.alert('Alert', 'La cotización se guardó correctamente.' );
				if(op==2){window.location='cotizador.php';}
                cargaCotz(datos);
              	cargaCot.load_listaCot(0,0,0);
                }else{Ext.MessageBox.alert('Alert', 'Ocurrió un error al guardar.' );}
			}
		});
	}else{Ext.MessageBox.alert('Alert', 'Debe añadir por lo menos un producto.' );}
}else{Ext.MessageBox.alert('Alert', 'Debe llenar los campos marcados en rojo y añadir por lo menos un producto.' );}
}


	var panel1 = new Ext.Panel({
			id: 'contenIn',
			title: 'Productos',
			iconCls: 'users',
			region: 'center',
			width    : 650,
            height:970,
            html:'<div style="height:600px; overflow:auto"><table cellspacing="0" cellpadding="0" id="mytable" style="width:98%;"><thead><tr class="x-grid3-hd-row x-grid3-header" id="unt0">	<th style="width:10%; text-align: left; height:20px" >Codigo</th><th style="width: 30%; text-align: left;" colspan="2" >Nombre</th><th style="width: 10%; text-align: left;">Unidades</th><th style="width: 10%; text-align: left;" >Tipo Venta</th><th style="width: 10%; text-align: left;" >Precio</th><th style="width: 10%; text-align: left;" >Descuento</th><th style="width: 10%; text-align: center;" >Total</th><th style="width: 10%; text-align: left;" >Imprimir</th><th style="width: 10%; text-align: left;" >Operación</th></tr></thead><tbody id="bdPro"></tbody><tfoot><tr id="trnew"><td style="text-align:left;" class="trinicio"><input type="text" id="txtCodigo" value="" class="sinborded"/></td><td class="trinicio" colspan="2" ><div id="tdDes" ></div></td><td style="text-align:left;" class="trinicio"><input type="text" id="txtUnidades" value="" class="sinborded"/></td><td class="trinicio" ><div id="tdumd"></div></td><td class="trinicio"></td><td class="trinicio"></td><td class="trinicio"></td><td class="trinicio"></td><td class="trinicio"></td></tr><tr ><td colspan="6"></td><td class="trinicios"><span style="color:red; font-size:14px">Subtotal</span></td><td class="trinicio"><input type="text" id="txtSubtotal" class="totales" /></td><td class="trinicio"></td></tr><tr ><td colspan="6"></td><td class="trinicios"><span style="color:red; font-size:14px">I.V.A</span></td><td class="trinicio"><input type="text" id="txtIva" class="totales"/></td><td class="trinicio"></td></tr><tr ><td colspan="6"></td><td class="trinicios"><span style="color:red; font-size:14px">Total</span></td><td class="trinicio"><input type="text" id="txtTotal" class="totales"/></td><td class="trinicio"></td></tr><tr ><td colspan="5"></td><td class="trinicios" style="border-top:solid 1px #e0e1e1;"><span style="color:red; font-size:14px">PAGO</span></td><td class="trinicio"><input type="text" id="txtPago" class="totales" onchange="cambio()"/></td><td class="trinicio"><span style="color:red; font-size:14px">CAMBIO</span></td><td class="trinicio"><input type="text" id="txtCambio" class="totales"/></td></tr><tr ><td colspan="5"></td><td colspan="3" ><input type="button" onclick="ejecutarventa();" value="Cerrar Venta" /><input type="button" onclick="imprimir();" value="Imprimir" /><input type="button" onclick="cancelarV();" value="Cancelar Venta" /></td><td colspan="2" ><input type="button" onclick="set_checked(true)" value="Seleccionar todos" /><input type="button" onclick="set_checked(false)" value="Quitar todos" /></td></tr></tfoot></table></div>'
		});
    
		
		
       function ejecutarventa(){
                                                var cot= Ext.get('idcot').getValue();
                                                 if(cot > 0){
                                                 Ext.MessageBox.alert('Alert', 'La venta ya se registro' );
                                                 }else{
                                               	Guardar(1);                                       
                                                    }
                                                   
												}
        function veImprimir(){
                                                var cot= Ext.get('idcot').getValue();
                                                if(cot > 0){
                                                imprimir();
                                                 }else{
                                               	Ext.MessageBox.alert('Alert', 'Necesitas cerrar la venta para cancelar' );                                       
                                                    }
													
												}
         function cancelarV(){
         
                                                var hayPro= Ext.get('Productos').getValue();
                                                var revisarCve=Ext.get('idcot').getValue();
                                                if(hayPro!=''){
                                                	if(revisarCve!=''){
                                                    	setStatus(2);
                                                    Ext.getCmp('statcot').setValue(2);}else{
													Ext.MessageBox.alert('Alert', 'Necesitas guardar para Cancelar' );
                                                 }
												}else{Ext.MessageBox.alert('Alert', 'Agregue por lo menos un producto' );}
												}
        var panelform = new Ext.Panel({
			id: 'panelform',
			title: 'Datos de facturación',
			iconCls: 'users',
			region: 'north',
			width    : 1024,
            collapsible: true,
    titleCollapse: true,
items	:	[frmCoti
			]
		});
	
	
        
        var centerb = new Ext.Panel({
			xtype	:	"panel",
			region	:	"center",
			layout	:	"border",
			border	:	false,
			items	:	[panelform,panel1
			]
		});
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
			  id:'tabClientes', title:'PUNTO DE VENTA',layout: 'fit',
				items:centerb
			},
			{
			  id:'Direcciones', title:'VENTAS REALIZADAS',layout: 'fit',
				items:gridCot
			}
			]}]
		});


function setStatus(status)
{
	var cve=Ext.get('idcot').getValue();
   if(cve > 0){
		$.ajax({
			url: 'guardarCot.php',
			type: "POST",
			data: "tipoP=4&estatus="+status+"&cve="+cve,
			success: function(datos){
				switch (status)	{
						case 1:
						break;
						case 2:Ext.MessageBox.alert('Alert', 'La cotizacion ha sido cancelada.' );
						break;
						case 3:
						break;
						case 4:Ext.MessageBox.alert('Alert', 'Venta cerrada exitosamente felicidades.' );window.location='cotizador.php';
						break;
					}
					cargaCot.load_listaCot(0,0,0);
			}
		});
        }else{Ext.MessageBox.alert('Alert', 'Necesitas guardar la cotizacion.' );}
        }
	
 function cambiarStatus (cve,status)
{
	//var cve=Ext.get('idcot').getValue();
		$.ajax({
			url: 'guardarCot.php',
			type: "POST",
			data: "tipoP=4&estatus="+status+"&cve="+cve,
			success: function(datos){
				Ext.MessageBox.alert('Alert', 'La cotizacion fue eliminada.' );
						
					cargaCot.load_listaCot(0,0,0);
                    cargaCopag.load_listaCotb(0,0,0);
                    cargaCotb.load_listaCotb(0,0,0);
			}
		});
	}
function elimiarTr(id){
	$('#trnew'+id).remove() ;
	totales();
	}
function totales()
{
	var prod=Ext.get('hdncont').getValue();
	var j=0;
	var x=0;
	var subtotalD=0;
	var subtotalP=0;
	var lim=parseInt(prod);
	for(i=0;i<lim;i++)
	{
		var contenedord = document.getElementById("txtSubtotal"+i);
		if(contenedord != null) {
			var tot=unformatNumber(document.getElementById("txtSubtotal"+i).value);
				subtotalD+=parseFloat(tot)
			
		}
		}
	
		document.getElementById("txtSubtotal").value=formatNumber(subtotalD,'$');
		//document.getElementById("txtIva").value=formatNumber(subtotalD*.16,'$');
		document.getElementById("txtTotal").value=formatNumber(subtotalD,'$');
		
	
	}
 function cambio()
 {
 	var pago=document.getElementById("txtPago").value;
    var total=unformatNumber(document.getElementById("txtTotal").value);
    document.getElementById("txtCambio").value=pago-parseFloat(total);
 }
    var panelpidsin=new Ext.Panel({
			id: 'panelpidsin',
			title: 'EXISTENCIA EN INVENTARIO',
			iconCls: 'users',
			region: 'center',
			width    : 650
		
		});	
  var winpidsin ;
 function verPrecio(id){	
	     if(!winpidsin){
            winpidsin = new Ext.Window({
                modal: 'true',
                layout:'fit',
                width:400,
                height:200,
                closeAction:'hide',
                plain: true,
                items: panelpidsin
               
            });
        }
        winpidsin.show(); 
        var divObj = Ext.get('panelpidsin'); 
		divObj.load({
					url: 'prod.php',
					method: 'GET',
					params: {oper:4,id:id}
				});		
		}	