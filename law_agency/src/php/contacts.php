<?php

	$email_to = "advokat_egorova@list.ru";
    
    $name = trim($_POST['contacts-name']);
    $phone = trim($_POST['contacts-phone']);
	$email = trim($_POST['contacts-email']);
	$desc  = trim($_POST['contacts-desc']);

	$dt = date('Y-m-d H:i:s');
	
    $errors = [];

    if($name == '') {
		$errors['contacts-name'] = 'Введите имя!';
	} elseif (strlen($name) < 2) {
		$errors['contacts-name'] = 'Имя должно содержать миниммум 2 буквы!';
	}

	if($phone == '') {
		$errors['contacts-phone'] = 'Укажите свой телефон!';
	} elseif(!validate_phone_number($phone)) {
		$errors['contacts-phone'] = 'Введите корректный номер!';
	}

	if($email == '') {
		$errors['contacts-email'] = 'Укажите свой E-mail!';
	}elseif(!filter_var($email, FILTER_VALIDATE_EMAIL)){
		$errors['contacts-email'] = 'Введите корректный E-mail!';
	}

    $response = ['res' => empty($errors), 'errors' => $errors];
    
	if(empty($errors)){

		$headers = 'From: advokat-egorova.com <info@vh394.timeweb.ru>' . "\r\n" .
    	'Reply-To: info@vh394.timeweb.ru' . "\r\n" .
    	'X-Mailer: PHP/' . phpversion();

		$subject  = 'Детальная запись на консультацию';
		$letter   = "Заявка из раздела контакты: \n Имя: $name \n Телефон: $phone \n Почта: $email \n Описание проблемы: $desc \n";

		$sendmail = mail($email_to, $subject, $letter, $headers);
	}
    
    echo json_encode($response);

    function validate_phone_number($phone) {
		$filtered_phone_number = filter_var($phone, FILTER_SANITIZE_NUMBER_INT);
		$phone_to_check = str_replace("-", "", $filtered_phone_number);
		if (strlen($phone_to_check) < 10 || strlen($phone_to_check) > 14) {
			return false;
		} else {
			return true;
		}
	}