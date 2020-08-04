Ext.define('Plugin.forms.Model', {
    extend: 'Ext.data.Model',
    fields: [
        'name',
        {
            name: 'template',
            type: 'string',
            defaultValue: '<div class="row">\n\t<div class="medium-12 columns">[formresult ][formerror ]</div>\n\t<div class="medium-12 columns"><label>' + _('Ваше имя (обязательно)') + ' [text* name]</label></div>\n\t<div class="medium-12 columns"><label>' + _('Ваш e-mail (обязательно)') + ' [email* email]</label></div>\n\t<div class="medium-12 columns"><label>' + _('Тема') + ' [text subject]</label></div>\n\t<div class="medium-12 columns"><label>' + _('Сообщение') + ' [textarea message]</label></div>\n\t<div class="medium-12 columns">[submitbtn "' + _('Отправить') + '"]</div>\n</div>'
        },{
            name: 'reCaptchaPublic',
            type: 'string',
            defaultValue: ''
        },{
            name: 'reCaptchaPrivate',
            type: 'string',
            defaultValue: ''
        },{
			name: 'mailTo',
			defaultValue: '[themeConfig(\'email\')]'
		},{
			name: 'mailFrom',
			defaultValue: '[name] <no-reply@[server.url]>'
		},{
			name: 'mailSubject',
			defaultValue: '[subject]'
		},{
			name: 'mailHeaders',
			defaultValue: 'Reply-To: [email]'
		},{
			name: 'mailBody',
			defaultValue: 'От: [name] <[email]>\n' + _('Тема') + ': [subject]\n\n' + _('Сообщение') + ':\n[message]\n\n--\n' + _('Это сообщение отправлено с сайта') + ' [server.name] ([server.url])'
		},{
			name: 'mailTmplAttachments',
			type: 'string',
            defaultValue: ''
		},{
			name: 'mailAttachments'
		},{
			name: 'mailHtml'
		},{
			name: 'mail2',
			type: 'boolean'
		}, {
			name: 'mail2To',
			defaultValue: '[email]'
		},{
			name: 'mail2From',
			defaultValue: '[server.name] <no-reply@[server.url]>'
		},{
			name: 'mail2Subject',
			defaultValue: '[subject]'
		},{
			name: 'mail2Headers',
			defaultValue: 'Reply-To: [themeConfig(\'email\')]'
		},{
			name: 'mail2Body',
			defaultValue: _('Сообщение') + ':\n[message]\n\n--\n' + _('Это сообщение отправлено с сайта') + ' [server.name] ([server.url])'
		},{
			name: 'mail2Html',
			type: 'boolean'
		},{
			name: 'mail2Attachments'
		},{
			name: 'mail2Html'
		},{
			name: 'msgSuccess',
			defaultValue: _('Ваше сообщение было отправлено успешно. Спасибо.')
		},{
			name: 'msgFail',
			defaultValue: _('Ошибка при отправке сообщения. Пожалуйста, попробуйте позже или обратитесь к администратору сайта.')
		},{
			name: 'msgError',
			defaultValue: _('Ошибки заполнения. Пожалуйста, проверьте все поля и отправьте снова.')
		},{
			name: 'msgSpam',
			defaultValue: _('Ошибка при отправке сообщения. Пожалуйста, попробуйте позже или обратитесь к администратору сайта.')
		},{
			name: 'msgConditions',
			defaultValue: _('Пожалуйста, примите условия для продолжения.')
		},{
			name: 'msgRequired',
			defaultValue: _('Пожалуйста, заполните обязательное поле.')
		},{
            name: 'msgCaptchaError',
            defaultValue: _('Неверный код')
        },{
			name: 'msgTooBig',
			defaultValue: _('Указано слишком много данных.')
		},{
			name: 'msgTooSmall',
			defaultValue: _('Указано слишком мало данных.')
		},{
			name: 'msgDateInvalid',
			defaultValue: _('Формат даты некорректен.')
		},{
			name: 'msgDateSmall',
			defaultValue: _('Указана слишком ранняя дата.')
		},{
			name: 'msgDateBig',
			defaultValue: _('Указана слишком поздняя дата.')
		},{
			name: 'msgFileFail',
			defaultValue: _('Не удалось загрузить файл.')
		},{
			name: 'msgFileDeny',
			defaultValue: _('Этот тип файла не разрешен.')
		},{
			name: 'msgFileTooBig',
			defaultValue: _('Этот файл слишком большой.')
		},{
			name: 'msgNumInvalid',
			defaultValue: _('Числовой формат некорректен.')
		},{
			name: 'msgNumSmall',
			defaultValue: _('Это число слишком мало.')
		},{
			name: 'msgNumBig',
			defaultValue: _('Это число слишком велико.')
		},{
			name: 'msgAnswerInvalid',
			defaultValue: _('Вы ввели некорректный ответ.')
		},{
			name: 'msgEmailInvalid',
			defaultValue: _('Некорректный e-mail.')
		},{
			name: 'msgUrlInvalid',
			defaultValue: _('Некорректный URL.')
		},{
			name: 'msgPhoneInvalid',
			defaultValue: _('Некорректный номер телефона.')
		},{
            name: 'useTwig',
            type: 'boolean'
        }
    ],
    proxy: {
		    type: 'ajax',
        api: {
            create  : '/plugins/forms/scripts/data.php?action=create',
            read    : '/plugins/forms/scripts/data.php',
            update  : '/plugins/forms/scripts/data.php?action=update',
            destroy : '/plugins/forms/scripts/data.php?action=destroy'
        },
        reader: {
			      type: 'json',
            root: 'rows'
        }
    }	
});

Ext.define('Plugin.forms.ModelResult', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'text',
            type: 'string'
        }
    ],
    proxy: {
        type: 'ajax',
        api: {
            create  : '/plugins/forms/scripts/data.php?action=addResult',
            read:     '/plugins/forms/scripts/data.php?action=results',
            update:   '/plugins/forms/scripts/data.php?action=updateResult',
            destroy:  '/plugins/forms/scripts/data.php?action=destroyResult'
        },
        reader: {
            type: 'json',
            root: 'rows'
        }
    }
});