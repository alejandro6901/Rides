
<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Ride_model extends CI_Model
{
   public function __construct()
   {
       parent::__construct();
   }

   public function insertRide($data)
   {
     $query = $this->db->insert('rides',$data);
     return $this->db->affected_rows();
   }

   public function getRides($id)
   {
       $query = $this->db->get_where('rides',array('id_user' => $id));
       return $query->result_array();
   }

}

?>
