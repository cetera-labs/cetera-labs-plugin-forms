Ext.define('Plugin.forms.NewField', {
    extend:'Ext.Window',
    width       : 400,
    modal       : true,
    title       : _('Создание нового поля веб-формы'),
    buttonAlign : 'center',
    resizable   : false,
    listeners   : {
        beforeshow: function(){
            if(this.fieldtype == 'submit' || this.fieldtype == 'submitbtn') {
                Ext.getCmp('fieldRequired').hide();
                Ext.getCmp('fieldName').hide();
            }

            if(this.fieldtype != 'submitbtn')
                Ext.getCmp('fieldSubmitBtnValue').hide();

            if(this.fieldtype != 'submit')
                Ext.getCmp('fieldSubmitValue').hide();

            if(this.fieldtype != 'select')
                Ext.getCmp('fieldValue').hide();

            if(this.fieldtype != 'text' && this.fieldtype != 'tel' && this.fieldtype != 'email' && this.fieldtype != 'textarea')
                Ext.getCmp('fieldPlaceholder').hide();
        }
    },
    items       : [{
            xtype: 'textfield',
            name: 'name',
            allowBlank: false,
            padding: 5,
            id: 'fieldName',
            fieldLabel: _('Название поля')
        },{
            name: 'required',
            xtype: 'checkbox',
            padding: 5,
            id: 'fieldRequired',
            inputValue: '1',
            hideEmptyLabel: false,
            fieldLabel: _('Тип поля'),
            boxLabel: _('Обязательное')
        },{
            name: 'fieldvalue',
            xtype: 'textarea',
            padding: 5,
            id: 'fieldValue',
            inputValue: '1',
            hideEmptyLabel: false,
            fieldLabel: _('Варианты значений (каждое значение на новой строке)')
        },{
            name: 'fieldSubmitBtnValue',
            xtype: 'textarea',
            padding: 5,
            id: 'fieldSubmitBtnValue',
            inputValue: '1',
            hideEmptyLabel: false,
            fieldLabel: _('Html-код внутри кнопки (использовать двойные кавычки)')
        },{
            name: 'fieldSubmitValue',
            xtype: 'textfield',
            padding: 5,
            id: 'fieldSubmitValue',
            fieldLabel: _('Надпись на кнопке')
        },{
            xtype: 'textfield',
            name: 'class',
            allowBlank: true,
            padding: 5,
            id: 'fieldClass',
            fieldLabel: _('CSS класс')
        },{
            xtype: 'textfield',
            name: 'placeholder',
            allowBlank: true,
            padding: 5,
            id: 'fieldPlaceholder',
            fieldLabel: _('Плейсхолдер')
        }

    ],
    buttons     : [{
            text    : 'OK',
            handler : function() {

                var fieldValue = '';
                var placeholder = '';
                var className = '';
                var fieldName = '';
                var fieldProps = '';
                var required = '';

                if(this.up('window').fieldtype == 'select')
                {
                    var values = Ext.getCmp('fieldValue').getValue();
                    var arValues  = values.split("\n");
                    for (var i = 0; i < arValues.length; i++)
                    {
                        fieldValue += ' "' + arValues[i] + '"';
                    }
                }

                className =  Ext.getCmp('fieldClass').getValue();
                if(className != '')
                    className = ' class="' + className + '"';

                placeholder = Ext.getCmp('fieldPlaceholder').getValue();
                if(placeholder != '')
                    placeholder = ' placeholder="' + placeholder + '"';

                fieldProps = className + placeholder;
                if(fieldProps != '')
                    fieldProps = ' |' + fieldProps;

                if(this.up('window').fieldtype == 'submitbtn')
                    fieldName = '\'' + Ext.getCmp('fieldSubmitBtnValue').getValue() +  '\'';
                else if(this.up('window').fieldtype == 'submit')
                    fieldName = '\'' + Ext.getCmp('fieldSubmitValue').getValue() +  '\'';
                else fieldName = Ext.getCmp('fieldName').getValue();

                if(Ext.getCmp('fieldRequired').getValue() && this.up('window').fieldtype != 'submit' && this.up('window').fieldtype != 'submitbtn')
                    required = '*';
                else required = '';

                if(fieldName != '')
                    Ext.getCmp('formtemplate').editor.insert('[' + this.up('window').fieldtype + required + ' ' + fieldName + fieldValue  + fieldProps + ']');
                this.up('window').destroy();
            }
        }, {
            text    : 'Отмена',
            handler : function() {
                this.up('window').destroy();
            }
        }
    ]
});

Ext.define('Plugin.forms.Edit', {
    extend:'Ext.Window',
    
	requires: ['Plugin.forms.Model', 'Cetera.field.Ace', 'Plugin.forms.FileMultiple', 'Plugin.forms.ListResult'/*, 'Plugin.forms.ResultModel'*/],

    modal: true,
    autoShow: true,
    width: '60%',
    height: '60%',
    minWidth: 400,
    minHeight: 300,
    layout: 'fit',

    initComponent: function() {

        if (!this.record)
            this.record = Ext.create('Plugin.forms.Model');
            
        if (!this.record.getId())
            this.title = _('Создать форму');
            else this.title = _('Редактировать форму');

        this.form = Ext.create('Ext.form.Panel',{

            id: 'formpanel',
            plain: true,
            border: 0,
            bodyStyle: 'background:none',

            fieldDefaults: {
                labelWidth: 100,
                anchor: '100%'
            },
    
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
        
            items:[
                {
                    xtype: 'textfield',
                    name: 'name',
                    allowBlank: false,
                    padding: 5,
                    fieldLabel: Config.Lang.title
                },{
                    xtype: 'tabpanel',
                    flex: 1,
                    border: 0,
                    bodyStyle: 'background:none',
                    defaults: {
                        bodyStyle: 'background:none',
                        bodyPadding: 5,
                        border: 0
                    },
                    items: [
                        {
                            title: _('Шаблон формы'),
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background:none',
                                    border: 0,
                                    id  : 'fieldButtonsPanel',
                                    defaults: {
                                        margin: '0 4 4 0',
                                        xtype: 'button',
                                        scope: this
                                    },
                                    items: [{
                                        text: 'Text',
                                        handler: function() {
                                            Ext.create('Plugin.forms.NewField',{fieldtype: 'text'}).show();
                                        }
                                    },{
                                        text: 'Tel',
                                        handler: function() {
                                            Ext.create('Plugin.forms.NewField',{fieldtype: 'tel'}).show();
                                        }
                                    },{
                                        text: 'Textarea',
                                        handler: function() {
                                            Ext.create('Plugin.forms.NewField',{fieldtype: 'textarea'}).show();
                                        }
                                    },{
                                        text: 'E-mail',
                                        handler: function() {
                                            Ext.create('Plugin.forms.NewField',{fieldtype: 'email'}).show();
                                        }
                                    },{
                                        text: 'Date',
                                        handler: function() {
                                            Ext.create('Plugin.forms.NewField',{fieldtype: 'date'}).show();
                                        }
                                    },{
                                        text: 'File',
                                        handler: function() {
                                            Ext.create('Plugin.forms.NewField',{fieldtype: 'file'}).show();
                                        }
                                    },{
                                        text: 'Checkbox',
                                        handler: function() {
                                            Ext.create('Plugin.forms.NewField',{fieldtype: 'checkbox'}).show();
                                        }
                                    },{
                                        text: 'Radio',
                                        handler: function() {
                                            Ext.create('Plugin.forms.NewField',{fieldtype: 'radio'}).show();
                                        }
                                    },{
                                        text: 'Select',
                                        handler: function() {
                                            Ext.create('Plugin.forms.NewField',{fieldtype: 'select'}).show();
                                        }
                                    },{
                                        text: 'Submit',
                                        handler: function() {
                                            Ext.create('Plugin.forms.NewField',{fieldtype: 'submit'}).show();
                                        }
                                    },{
                                        text: 'Submit Btn',
                                        handler: function() {
                                            Ext.create('Plugin.forms.NewField',{fieldtype: 'submitbtn'}).show();
                                        }
                                    },{
                                        text: 'Captcha Img',
                                        handler: function() {
                                            Ext.getCmp('formtemplate').editor.insert('[captchaimg ]');
                                        }
                                    },{
                                        text: 'Captcha strong Img',
                                        handler: function() {
                                            Ext.getCmp('formtemplate').editor.insert('[captchastrongimg ]');
                                        }
                                    },{
                                        text: 'Captcha Input',
                                        handler: function() {
                                            Ext.getCmp('formtemplate').editor.insert('[captchainput* captcha_code]');
                                        }
                                    },{
                                        text: 'ReCaptcha',
                                        handler: function() {
                                            Ext.getCmp('formtemplate').editor.insert('[recaptcha ]');
                                        }
                                    },{
                                        text: 'Form result',
                                        handler: function() {
                                            Ext.getCmp('formtemplate').editor.insert('[formresult]');
                                        }
                                    },{
                                        text: 'Form error',
                                        handler: function() {
                                            Ext.getCmp('formtemplate').editor.insert('[formerror]');
                                        }
                                    }
                                    /*{
                                        text: 'URL'
                                    },{
                                        text: 'Radio'
                                    },{
                                        text: 'Menu'
                                    },{
                                        text: 'File'
                                    },*/]
                                },{
                                    xtype: 'acefield',
                                    name: 'template',
                                    id: 'formtemplate',
                                    hideLabel: true,
                                    flex: 1,
                                    listeners : {
                                        resize: function (panel, w, h){
                                            panel.editor.resize('100%', h);
                                        }

                                    }
                                },{
                                    xtype: 'displayfield',
									value: _('Использование CAPTCHA для площадки fastsite обязательно!')
                                },{
                                    xtype: 'textfield',
                                    name: 'reCaptchaPublic',
                                    fieldLabel: 'Recaptcha public'
                                },{
                                    xtype: 'textfield',
                                    name: 'reCaptchaPrivate',
                                    fieldLabel: 'Recaptcha private'
                                },{
                                    name: 'useTwig',
                                    xtype: 'checkbox',
                                    inputValue: '0',
                                    hideEmptyLabel: false,
                                    boxLabel: _('Использовать Twig для шаблона')
                                }
                            ]
                        },{
                            title: _('Письмо'),
							layout: 'form',
							defaultType: 'textfield',
							autoScroll: true,
							items: [
								{
									name: 'mailTo',
									fieldLabel: _('Кому')
								},{
									name: 'mailFrom',
									fieldLabel: _('От')
								},{
									name: 'mailSubject',
									fieldLabel: _('Тема')
								},{
									name: 'mailBody',
									xtype: 'textarea',
									height: 200,
									fieldLabel: _('Текст письма')
								},{
                                    name: 'mailAttachments',
                                    xtype: 'checkbox',
                                    inputValue: '1',
                                    hideEmptyLabel: false,
                                    boxLabel: _('Отправлять файлы из формы во вложении')
                                },{
                                    name: 'mailHtml',
                                    xtype: 'checkbox',
                                    inputValue: '1',
                                    hideEmptyLabel: false,
                                    boxLabel: _('HTML формат письма')
                                },{
                                    name: 'mailTmplAttachments',
                                    xtype: 'fileselectfieldmultiple',
                                    fieldLabel: _('Вложения')
                                },{
									xtype:'fieldset',
									title: _('Отправлять 2 письма'),
									checkboxToggle: true,
									checkboxName: 'mail2',
									collapsed: true, // fieldset initially collapsed
									defaultType: 'textfield',
									items:[
										{
											name: 'mail2To',
											fieldLabel: _('Кому')
										},{
											name: 'mail2From',
											fieldLabel: _('От')
										},{
											name: 'mail2Subject',
											fieldLabel: _('Тема')
										},{
											name: 'mail2Body',
											xtype: 'textarea',
											height: 200,
											fieldLabel: _('Текст письма')
										},{
                                            name: 'mail2Attachments',
                                            xtype: 'checkbox',
                                            inputValue: '1',
                                            hideEmptyLabel: false,
                                            boxLabel: _('Отправлять файлы из формы во вложении')
                                        },{
											name: 'mail2Html',
											xtype: 'checkbox',
											inputValue: '1',
											hideEmptyLabel: false,
											boxLabel: _('HTML формат письма')
										}
									]
								}
							]
                        },{
                            title: _('Уведомления'),
							autoScroll: true,
							defaultType: 'textfield',
							layout: 'form',
							defaults: {
								labelAlign: 'top'
							},							
							items: [
								{
									name: 'msgSuccess',
									fieldLabel: _('Сообщение отправителя было успешно отправлено')
								},{
									name: 'msgFail',								
									fieldLabel: _('Сообщение отправить не удалось')
								},{
									name: 'msgError',								
									fieldLabel: _('Ошибки заполнения')
								},{
									name: 'msgRequired',								
									fieldLabel: _('Некоторое поле должно быть заполнено')
								},{
                                    name: 'msgCaptchaError',
                                    fieldLabel: _('Неверный код Captcha')
                                }
							]
                        },{
                            title: _('Результаты'),
                            layout: 'fit',
                            items: [
                                {
                                    xtype: 'formresult',
                                    name: 'formresultfield',
                                    formId: this.record.getId()
                                }
                            ]
                        }
                    ]
                }
            ]
        
        });
        
        this.form.loadRecord( this.record );

        Ext.apply(this, {
        
            items: this.form,
        
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'bottom',
                ui: 'footer',
                layout: {
                    pack: 'center'
                },
                items: [{
                    minWidth: 80,
                    text: Config.Lang.ok,
                    scope: this,
                    handler: function() {
                        var f = this.form.getForm();
						            if (f.isValid()) {
                            f.updateRecord();
                            if (!f.getRecord().getId()) this.fireEvent('formcreated', f.getRecord());
                            this.close();
                        }	
                    }
                },{
                    minWidth: 80,
                    text: Config.Lang.cancel,
                    scope: this,
                    handler: function() {
                        this.close();
                    }
                }]
            }]
        
        });
        
        this.callParent(arguments);

    }

});

Ext.define('Plugin.forms.ResultDetail', {
    extend:'Ext.Window',
    requires: ['Plugin.forms.Model', 'Plugin.forms.ListResult'],

    title: _('Просмотр результата'),
    modal: true,
    autoShow: true,
    width: '60%',
    height: '60%',
    minWidth: 400,
    minHeight: 300,
    layout: 'fit',

    initComponent: function(){

        this.form = Ext.create('Ext.form.Panel',{

            id: 'formpanelresult',
            plain: true,
            border: 0,
            bodyStyle: 'background:none',

            fieldDefaults: {
                labelWidth: 100,
                anchor: '100%'
            },

            layout: {
                type: 'vbox',
                align: 'stretch'
            },

            items:[
                {
                    name: 'text',
                    xtype: 'textarea',
                    height: 200
                }
            ]

        });

        this.form.loadRecord( this.record );

        Ext.apply(this, {

            items: this.form,

            dockedItems: [{
                xtype: 'toolbar',
                dock: 'bottom',
                ui: 'footer',
                layout: {
                    pack: 'center'
                },
                items: [{
                    minWidth: 80,
                    text: Config.Lang.close,
                    scope: this,
                    handler: function() {
                        this.close();
                    }
                }]
            }]

        });

        this.callParent(arguments);

    }

});