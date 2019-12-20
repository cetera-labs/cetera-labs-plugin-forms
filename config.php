<?php
/**
 * @version $Id: config.php,v 1.2 2006/04/15 09:16:17 cetera Exp $
 * @copyright 2005 
 **/

$t = $this->getTranslator();
$t->addTranslation(__DIR__.'/lang');


$this->registerWidget(array(
    'name'     => 'forms',
    'class'    => '\\Forms\\Widget',
    'describ'  => $t->_('Веб форма'),
    'icon'     => 'icon.png',
    'ui'       => 'Plugin.forms.Widget',
));

if ( $this->getBo() && $this->getUser() && $this->getUser()->isAdmin() ) {
    $this->getBo()->addModule(array(
        'id'	     => 'forms',
        'position' => MENU_SITE,
        'name' 	   => $t->_('Конструктор форм'),
        'icon'     => '/cms/plugins/forms/images/icon.png',
        'class'    => 'Plugin.forms.List'
	));

    $this->getBo()->registerEvent(
        'FORMS_SUCCESS', 
        $t->_('Успешное заполнение формы'),
        [
            'form'   => $t->_('заполненная форма'),
        ]
    );
}