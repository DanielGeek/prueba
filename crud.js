Ext.ns("alegra");

alegra.Crud = {
	init : function() {
		//CRUD
		var proxy = new Ext.data.HttpProxy({
			api: {
				read 	: "serverside/getContac.php",
				create 	: "serverside/createContact.php",
				update	: "serverside/updateContact.php",
				destroy	: "serverside/destroyContact.php"
			}
		});
		
		var reader = new Ext.data.JsonReader({
			totalProperty	: 'total',
			successProperty	: 'success',	//<--- el successproperty indica la propiedad que define si se ha insertado/actualizado o borrado con éxito
			messageProperty	: 'message',
			idProperty		: 'id',
			root			: 'data'		//<--- este es el nombre del parámetro que llega al servidor con el JSON modificado
		},[
				{name: 'nombre', allowBlank: false},
				{name: 'ident', allowBlank: false},
				{name: 'phone', allowBlank: false},
				{name: 'obser', allowBlank: false},
		]);
			
		var writer = new Ext.data.JsonWriter({
			encode			: true,
			writeAllFields	: true	//<--- decide si se manda al servidor solamente los campos modificados o todos
		});
		
		this.storeGrid = new Ext.data.Store({
			id			: "id",
			proxy		: proxy,
			reader		: reader,
			writer		: writer,
			autoSave	: true	//<--- hace las peticiones al servidor automáticamente
		});
		
		this.storeGrid.load();
		
		// var textFieldEmail = new Ext.form.TextField({vtype: "email",allowBlank: false}),
			textField = new Ext.form.TextField({allowBlank: false}),
			sm = new Ext.grid.CheckboxSelectionModel();
		
		this.grid = new Ext.grid.EditorGridPanel({
			store		: this.storeGrid,
			columns		: [
				sm,
				
				{header:'Nombre', dataIndex:'nombre',sortable: true,width:250, editor:textField},
				{header:'Identificación', dataIndex:'ident',sortable: true,width:250,editor:textField},
				{header:'Teléfono 1', dataIndex:'phone',sortable: true,width:250, editor:textField},
				{header:'Observaciones', dataIndex:'obser',sortable: true,width:230, editor:textField}
			],
			sm			: sm,
			border		: false,
			stripeRows	: true
		});
		
		var win = new Ext.Window({
			title	: "Prueba alegra",
			layout	: "fit",
			tbar	: [  
				{text:'Nuevo Contacto', scope:this, handler:this.addContact,iconCls:'save-icon'},
				{text:"Eliminar", scope:this, handler:this.onDelete,iconCls:'delete-icon'}
			],
			width	: 1024,
			height	: 390,
			items	: [this.grid]
		});
		win.show();
		
	},
	
	onDelete : function(){
		var rows = this.grid.getSelectionModel().getSelections();

		if(rows.length === 0){
			return false;
		}
		
		this.storeGrid.remove(rows);
	},
	
	addContact : function(){
		var contact = new this.storeGrid.recordType({
			nombre	: "",
			ident	: "",
			phone	: "",
			obser   : ""
		});
		
		this.grid.stopEditing();
		this.storeGrid.insert(0,contact);
		this.grid.startEditing(0,1);
	}
}
Ext.onReady(alegra.Crud.init,alegra.Crud);