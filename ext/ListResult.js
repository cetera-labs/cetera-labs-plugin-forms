Ext.define('Plugin.forms.ListResult', {

    alias: 'widget.formresult',

    extend:'Ext.grid.Panel',
    requires: 'Plugin.forms.ModelResult',

    border: false,

    edit: function( record ) {

        var windowResult = Ext.create('Plugin.forms.ResultDetail',{
            record: record
        });

    },

    initComponent: function(){

        this.editAction = Ext.create('Ext.Action', {
            iconCls: 'icon-edit',
            text: _('Просмотр'),
            disabled: true,
            scope: this,
            handler: function(widget, event)
            {
                var rec = this.getSelectionModel().getSelection()[0];

                if (rec) this.edit( rec );
            }
        });

        this.deleteAction = Ext.create('Ext.Action', {
            iconCls: 'icon-delete',
            text: Config.Lang.remove,
            disabled: true,
            scope: this,
            handler: function(widget, event) {

                var rec = this.getSelectionModel().getSelection()[0];

                Ext.MessageBox.confirm(Config.Lang.delete, Config.Lang.r_u_sure, function(btn) {
                    if (btn == 'yes') {
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
                    this.editAction,
                    //this.deleteAction
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
                this.editAction,
                //this.deleteAction
            ]
        });



        this.callParent(arguments);

        this.getSelectionModel().on({
            selectionchange: function(sm, selections) {
                if (selections.length) {
                    //this.deleteAction.enable();
                    this.editAction.enable();
                } else {
                    //this.deleteAction.disable();
                    this.editAction.disable();
                }
            },
            scope: this
        });

    }

});