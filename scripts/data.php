<?php
include('common_bo.php');

$data = array();

if (isset($_GET['action']))
{

    $d = json_decode(file_get_contents("php://input"), true);

    if (!empty($d))
    {
        foreach($d as $key => $val)
        {
            if (is_bool($val))
                $d[$key] = (int)$val;
        }
    }

    switch ($_GET['action'])
    {
        case 'create':
            $form = new \Forms\Form($d);
            $form->save();
            $data[] = $form->fields;

            break;

        case 'update':
            $form = \Forms\Form::getById((int)$d['id']);
            $form->setFields($d);
            $form->save();
            $data[] = $form->fields;

            break;

        case 'destroy':
            $form = \Forms\Form::getById((int)$d['id']);
            $form->delete();

            break;

        case 'results':
            $data = \Forms\Result::getListById((int)$_GET['formId']);
    }
}
else
{
    $data = \Forms\Form::getList();

}

if (is_array($data)) {
	foreach($data as $key => $value) {
		$data[$key]['id'] = intval($value['id']);
	}
}

echo json_encode(array(
    'success' => true,
    'rows'    => $data
));