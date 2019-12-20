<?php
$a = \Cetera\Application::getInstance();

$t = $a->getTranslator();
$t->addTranslation(__DIR__.'/lang');

$conn = $a->getConn();

$r = $conn->fetchColumn("select count(*) from forms where id = ?", array(1));

if (!$r)
{
    $conn->executeQuery(
			'INSERT INTO
				forms (
					  id,
					  name,
					  template,
					  mailTo,
					  mailFrom,
					  mailSubject,
					  mailBody,
					  mailHtml,
					  mail2,
					  msgSuccess,
					  msgFail,
					  msgCaptchaError,
					  msgRequired,
					  msgError
				)
				VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
			array(
				1,
				$t->_('Мы на связи'),
				'
				  <div class="grid-x grid-padding-x">
					<div class="small-24 medium-24 cell">[formresult ][formerror ]</div>
				  </div>
				  <div class="grid-x grid-padding-x">
					<div class="small-24 medium-8 cell">
					  <label>' . $t->_('Ваше имя') . '</label>
					</div>
					<div class="small-24 medium-16 cell">
					  [text* name | placeholder="Ваше имя"]
					  <p class="help-text">' . $t->_('Поле обязательно для заполнения') . '</p>
					</div>
				  </div>
				  <div class="grid-x grid-padding-x">
					<div class="small-24 medium-8 cell">
					  <label>Email</label>
					</div>
					<div class="small-24 medium-16 cell">
					  [email* email | placeholder="username@address.com"]
					  <p class="help-text">' . $t->_('Введите ваш электронный адрес') . '</p>
					</div>
				  </div>
				  <div class="grid-x grid-padding-x">
					<div class="small-24 medium-8 cell">
					  <label>' . $t->_('Чем мы можем помочь') . '?</label>
					</div>
					<div class="small-24 medium-16 cell">
					  [textarea message | placeholder="' . $t->_('Введите ваше сообщение') . '"]
					</div>
				  </div>
				  <div class="grid-x grid-padding-x">
					<div class="shrink medium-offset-8 cell">
					  [checkbox* agreement | id="agreement"]
					</div>
					<div class="auto cell">
					  <label for="agreement">' . $t->_('Соглашаюсь на') . ' <a href="" title="условия">' . $t->_('обработку персональных данных') . '</a></label>
					</div>
				  </div>
				  <div class="grid-x grid-padding-x margin-top-3">
					<div class="small-24 medium-16 medium-offset-8 cell">
					  [submitbtn \'' . $t->_('Отправить сообщение') . ' &nbsp;<i class="far fa-envelope fa-lg"></i>\' | class="secondary button"]
					</div>
				  </div>
				',
				'support@[server.url]',
				'support@[server.url]',
				'Сообщение с сайта [server.name] ([server.url])',
				"От: [name] <[email]>\nСообщение:[message]\n\n\n--Это сообщение отправлено с сайта [server.name] ([server.url])",
				0,
				0,
				$t->_('Ваше сообщение было отправлено успешно. Спасибо.'),
				$t->_('Ошибка при отправке сообщения. Пожалуйста, попробуйте позже или обратитесь к администратору сайта.'),
				$t->_('Неверный код'),
				$t->_('Пожалуйста, заполните обязательное поле.'),
				$t->_('Ошибки заполнения. Пожалуйста, проверьте все поля и отправьте снова.')
			)
    );
}