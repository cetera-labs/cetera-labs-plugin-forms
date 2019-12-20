Ext.define('Plugin.forms.Widget', {

    extend: 'Cetera.widget.Widget',
	
	requires: [
        'Plugin.forms.Model',
        'Cetera.field.WidgetTemplate',
        'Cetera.field.Folder'
    ],

    formfields: [{
		name: 'form',
		xtype: 'combobox',
		fieldLabel: _('Веб форма'),
		store: {
			model: 'Plugin.forms.Model',
			autoLoad: true
		},
		valueField:'id',
		displayField:'name',
		autoSelect:true,
		queryMode: 'remote',
		triggerAction: 'all',
		editable: false
	},{
        xtype: 'widgettemplate',
        widget: 'Forms'
    }
    ],
	
    setParams : function(params) {
        if (params.form)
            params.form = parseInt(params.form);

        this.callParent([params]);
    }
});
