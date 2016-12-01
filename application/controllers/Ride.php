<?php

defined('BASEPATH') or exit('No direct script access allowed');

class Ride extends CI_Controller
{
    public function index()
    {
        $this->load->view('Profile/panel-user');
    }
    public function insertRide()
    {

      $days = '';
      $id = $this->input->post('save');
      foreach ($_POST['days'] as $day) {
         $days .= $day;
      }
      $data = array(
              'ride_name' => $this->input->post('ride_name'),
              'start' => $this->input->post('start'),
              'to' => $this->input->post('to'),
              'description' => $this->input->post('description'),
              'departure' => $this->input->post('departure'),
              'arrival' => $this->input->post('arrival'),
              'days' => $days
        );
      $this->load->model('Ride_model');
      
        // $this->Ride_model->insertUser($data);
      var_dump($id);
    }
}
