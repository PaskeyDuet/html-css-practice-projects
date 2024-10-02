<?php

	$email_to = "advokat_egorova@list.ru";
    
	$email = trim($_POST['advice-email']);
	$phone = trim($_POST['advice-phone']);

	$dt = date('Y-m-d H:i:s');
	
    $errors = [];

	if($email == '') {
		$errors['advice-email'] = 'Укажите свой E-mail!';
	}elseif(!filter_var($email, FILTER_VALIDATE_EMAIL)){
		$errors['advice-email'] = 'Введите корректный E-mail!';
	}
    
    if($phone == '') {
		$errors['advice-phone'] = 'Укажите свой телефон!';
	} elseif(!validate_phone_number($phone)) {
		$errors['advice-phone'] = 'Введите корректный номер!';
	}

    $response = ['res' => empty($errors), 'errors' => $errors];
    
	if(empty($errors)){

		$headers = 'From: advokat-egorova.com <info@vh394.timeweb.ru>' . "\r\n" .
    	'Reply-To: info@vh394.timeweb.ru' . "\r\n" .
    	'X-Mailer: PHP/' . phpversion();

		$subject  = 'Запись на консультацию';
		$letter   = "Заявка: \n Почта: $email \n Телефон: $phone \n";

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