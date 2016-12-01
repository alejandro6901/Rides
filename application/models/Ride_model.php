
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
     $query = $this->db->insert('ride',$data);
   }

}

?>
