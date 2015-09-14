Ext.define('ExtMVC.view.contato.Grid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.contatogrid',
    
    requires: ['Ext.toolbar.Paging'],
    
    iconCls: 'icon-grid',

    title : 'Contacts',
    store: 'Contatos',

    columns: [{
		header: "EMAIL",
		width: 170,
		flex:1,
		dataIndex: 'email'
	},
    {
        header: "Date 1",
        width: 170,
        flex:1,
        dataIndex: 'date1'
    },
    {
        header: "Date 2",
        width: 170,
        flex:1,
        dataIndex: 'date2'
    },
    {
        header: "Date 3",
        width: 170,
        flex:1,
        dataIndex: 'date3'
    }],
	
	initComponent: function() {
		
		this.dockedItems = [{
            xtype: 'toolbar',
            items: [{
                iconCls: 'icon-save',
                itemId: 'add',
                text: 'Add',
                action: 'add'
            },{
                iconCls: 'icon-delete',
                text: 'delete',
                action: 'delete'
            }]
        },
        {
            xtype: 'pagingtoolbar',
            dock:'top',
            store: 'Contatos',
            displayInfo: true,
            displayMsg: 'Contacts {0} - {1} out of {2}',
            emptyMsg: "No Contacts."
        }];
		
		this.callParent(arguments);
	}
});
