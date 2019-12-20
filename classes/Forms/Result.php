<?php
namespace Forms;

class Result extends \Cetera\DbObject {

  	public static function getTable()
    {
        return 'forms_results';
    }
  	
  	public static function getById( $id )
  	{ 		
        try
        {
            return parent::getById( $id );
        }
        catch (\Exception $e)
        {
            throw new \Exception('Запись ID='.$id.' не найдена');
        }	
  	}

    /**
     * Получение списка результатов
     *
     * @return array
     */
    public static function getList($filter = '')
    {
        foreach (\Forms\Result::enum() as $f) $data[] = $f->fields;

        return $data;
    }

    public static function getListById($id)
    {
        $data = self::getDbConnection()->fetchAll('SELECT * FROM '. static::getTable() . ' WHERE id IN (SELECT result_id as id FROM forms_results_map WHERE form_id=?) ORDER BY id',array((int)$id));

        $res = array();
        foreach ($data as  $d)
            $res[] = new static($d);

        return $data;
    }

    public function saveResult($formId)
    {
        parent::save();

        self::saveMap($this->id, $formId);
    }

    private static function saveMap($id, $formId)
    {
        self::getDbConnection()->insert('forms_results_map', array("form_id" => $formId, "result_id" => $id));
    }
}