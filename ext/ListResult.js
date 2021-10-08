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
            
            columns: [
                {
                    text: 'ID',
                    dataIndex: 'id',
                    width: 50
                },
                {
                    text: _('Дата'),
                    dataIndex: 'date',
                    width: 150
                },
                {
                    text: Config.Lang.title,
                    dataIndex: 'text',
                    flex: 1
                }
            ],

            store: Ext.create('Ext.data.JsonStore', {
                autoLoad: true,
                autoDestroy: true,
                remoteSort: true,
                model: Plugin.forms.ModelResult,
                proxy: {
                    type: 'ajax',
                    api: {
                        read: '/cms/plugins/forms/scripts/data.php?action=results',
                        update: '/cms/plugins/forms/scripts/data.php?action=updateResult',
                        destroy: '/cms/plugins/forms/scripts/data.php?action=destroyResult'
                    },
                    reader: {
                        type: 'json',
                        root: 'rows'
                    },
                    extraParams: {
                        'formId': this.formId
                    }
                }
            }),            

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