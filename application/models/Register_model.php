<?php

class Register_model extends CI_Model
{
   public function __construct()
   {
       parent::__construct();
   }

   public function insertUser($data)
   {
      $this->db->insert('user', $data);
   }
  //  public function insertUserData($data)
  //  {
  //     $this->db->insert('', $datagenre);
  //  }
}

?>
