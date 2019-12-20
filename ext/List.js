Ext.define('Plugin.forms.List', {

    extend:'Ext.grid.Panel',
    requires: 'Plugin.forms.Model',
    
    border: false,
    
    columns: [{
        text: 'ID',
        dataIndex: 'id',
        width: 50
    },{
        text: Config.Lang.title,
        dataIndex: 'name',
        flex: 1
    }],

    store: {
        model: 'Plugin.forms.Model',
        autoLoad: true,
        autoSync: true
    },

    edit: function( record ) {
    
        var window = Ext.create('Plugin.forms.Edit',{
            record: record,
            listeners: {
                scope: this,
                formcreated: function(r) {
                    this.getStore().add(r);
                }
            }
        });
    
    },
    
    initComponent: function(){

        this.addAction = Ext.create('Ext.Action', {
            iconCls: 'icon-new', 
            text: Config.Lang.add,
            scope: this,
            handler: function(widget, event)
            {  
                this.edit( Ext.create('Plugin.forms.Model') );
            }
        });
        
        this.editAction = Ext.create('Ext.Action', {
            iconCls: 'icon-edit', 
            text: _('Изменить'),
            disabled: true,
            scope: this,
            handler: function(widget, event)
            {
                var rec = this.getSelectionModel().getSelection()[0];
                if (rec) this.edit( rec );
            }
        });

        this.copyAction = Ext.create('Ext.Action', {
            iconCls: 'icon-copy',
            text: _('Копировать'),
            disabled: true,
            scope: this,
            handler: function(widget, event)
            {
                var rec = this.getSelectionModel().getSelection()[0];

                if (rec) {
                    var data = rec.copy().data;

                    delete data.id;
                    this.getStore().add(Ext.create('Plugin.forms.Model', data));
                }
            }
        });
    
        this.deleteAction = Ext.create('Ext.Action', {
            iconCls: 'icon-delete', 
            text: Config.Lang.remove,
            disabled: true,
            scope: this,
            handler: function(widget, event) {
            
                Ext.MessageBox.confirm(Config.Lang.delete, Config.Lang.r_u_sure, function(btn) {
                    if (btn == 'yes') {
                        var rec = this.getSelectionModel().getSelection()[0];
                        if (rec) this.getStore().remove(rec);
                    }
                }, this);

            }
        });
    
        Ext.apply(this, {
        
            dockedItems: [{
                xtype: 'toolbar',
                items: [
                    {
                        tooltip: Config.Lang.reload,
                        iconCls: 'icon-reload',
                        handler: function(btn) { btn.up('grid').getStore().load(); }
                    },'-',
                    this.addAction,
                    this.editAction,
                    this.copyAction,
                    this.deleteAction
                ]
            }],
            
            viewConfig: {
                stripeRows: true,
                listeners: {
                    itemcontextmenu: {
                        fn: function(view, rec, node, index, e) {
                            e.stopEvent();
                            this.contextMenu.showAt(e.getXY());
                            return false;
                        },
                        scope: this
                    }
                }
            }
        });
        
        this.contextMenu = Ext.create('Ext.menu.Menu', {
            items: [
                this.addAction,
                this.editAction,
                this.copyAction,
                this.deleteAction
            ]
        });
        
        this.callParent(arguments);
              
        this.getSelectionModel().on({
            selectionchange: function(sm, selections) {
                if (selections.length) {
                    this.deleteAction.enable();
                    this.copyAction.enable();
                    this.editAction.enable();                                     
                } else {
                    this.deleteAction.disable();
                    this.copyAction.disable();
                    this.editAction.disable();
                }
            },
            scope: this
        });

    }

});

