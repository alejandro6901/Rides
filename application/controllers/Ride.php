<?php

defined('BASEPATH') or exit('No direct script access allowed');

class Ride extends CI_Controller
{
  public function __construct()
  {
      parent::__construct();
      if (!isset($_SESSION['user'])) {
          redirect('/');
      }

  }
    public function index()
    {
        $this->load->view('Profile/panel-user');
    }
    public function insertRide()
    {
      $error = array('respuesta' => false);
      $user = $_SESSION['user'];
      $days = '';

      foreach ($_POST['days'] as $day) {
         $days .= $day.'-';
      }
      $days = trim($days,'-');

      $data = array(
              'id_user' => $user['id'],
              'name' => $this->input->post('ride_name'),
              'place_from' => $this->input->post('start'),
              'place_to' => $this->input->post('to'),
              'description' => $this->input->post('description'),
              'days' => $days,
              'departure' => $this->input->post('departure'),
              'arrival' => $this->input->post('arrival')
        );
      $this->load->model('Ride_model');
      $result = $this->Ride_model->insertRide($data);

      if ($result > 0) {
      $error['respuesta'] = true;
      echo json_encode($error);
    }else{
        echo json_encode($error);
    }

    }
    public function getRides()
    {
        $message = array('respuesta' => false,'data' =>false);
        $user = $_SESSION['user'];
        $this->load->model('Ride_model');
        $result = $this->Ride_model->getRides($user['id']);

        if ($result > 0) {
          $message['respuesta'] = true;
         $message['data'] = $result;
          echo json_encode($message);
        }

    }
    public function deleteRide()
    {
      $message = array('respuesta' => false);
      $user = $_SESSION['user'];
      $this->load->model('Ride_model');
       $result = $this->Ride_model->deleteRide($_POST['id'],$user['id']);
      if ($result > 0) {
        $message['respuesta'] = true;
        echo json_encode($message);
      }
    }
}
