<?php
namespace Forms;
/**
 * Cetera CMS 3
 *
 * @package CeteraCMS
 * @version $Id$
 * @copyright 2000-2010 Cetera labs (http://www.cetera.ru)
 * @author Roman Romanov <nicodim@mail.ru>
 **/


/**
 * Виджет "Список материалов"
 *
 * @package CeteraCMS
 */
class Widget extends \Cetera\Widget\Templateable
{
    /**
     * Параметры виджета
     */
    protected $_params = array(
        'form'     => '',
        'template' => 'default.twig',
        'twigParams' => array(),
    );

    public $formID = '';
    public $formHTML = '';

    /**
     * Подготовка вывода виджета Веб-формы
     *
     * @return string
     */
    protected function _getHtml()
    {
        try {
            $form = \Forms\Form::getById($this->getParam('form'));

            $errorMsg = '';
            $resultMsg = '';

            // Обработка введенных данных формы
            if(isset($_REQUEST['webform']) && $_REQUEST['webform'] == $form->id) // проверка на случай нескольких виджетов веб-форм на странице
            {
                $errorMsg = \Forms\Form::validateData($form);
								
                if(!$errorMsg) // если нет ошибок валидации, обработка и отправка введенных данных
                    $resultMsg = \Forms\Form::performAction($form, $this->getParams());
            }

            $this->formID = $form->id;
            $this->formHTML = \Forms\Form::parseTemplate($form->template, $form->id, $form->useTwig, $form->reCaptchaPublic, $errorMsg, $resultMsg, $this->getParams());

        }
        catch (\Exception $e)
        {
            // Не валим сайт мз-за ошибок
            return $e->getMessage();
        }

        return parent::_getHtml();
    }
}