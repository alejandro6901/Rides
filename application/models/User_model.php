<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class User_model extends CI_Model
{
   public function __construct()
   {
       parent::__construct();
   }

    function insertUser($data)
   {
      $this->db->insert('user', $data);
   }

   public function getUser($user,$pass)
   {
      $query = $this->db->get_where('user',array('user_name' =>$user,'password' => $pass));
      return $query->result_array();
   }
   public function updateSettings($id,$data)
   {
     $this->db->where('id',$id);
     $this->db->update('user',$data);
     return $this->db->affected_rows();
   }
   public function getUserSettings($id)
   {
      $query = $this->db->get_where('user',array('id' =>$id));
      return $query->result_array();
   }



}

?>
