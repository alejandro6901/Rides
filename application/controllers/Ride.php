<?php

defined('BASEPATH') or exit('No direct script access allowed');

class Ride extends CI_Controller
{
  public function __construct()
  {
      parent::__construct();
      if (!isset($_SESSION['user']) ) {
        if (isset($_POST['from']) && $_POST['to']) {
        }else{
          redirect('/');
        }
      }

  }
    public function index()
    {
        $this->load->view('Profile/panel-user');
    }
    public function insertRide()
    {
      $message = array('response' => false);
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
      $message['response'] = true;
      echo json_encode($message);
    }else{
        echo json_encode($message);
    }
    }
    public function getRides()
    {
        $message = array('response' => false,'data' =>false);
        $user = $_SESSION['user'];
        $this->load->model('Ride_model');
        $result = $this->Ride_model->getRides($user['id']);
        if ($result > 0) {
          $message['response'] = true;
         $message['data'] = $result;
          echo json_encode($message);
        }
    }
    public function getRidesPublic()
    {
        $message = array('response' => false,'data' =>false);
        $from = $this->input->post('from');
        $to = $this->input->post('to');
        $this->load->model('Ride_model');
        $result = $this->Ride_model->getRidesPublic($from,$to);
        if ($result > 0) {
          $message['response'] = true;
         $message['data'] = $result;
          echo json_encode($message);
        }
    }
    public function updateRides()
    {
      $days = '';
      foreach ($_POST['days'] as $day) {
         $days .= $day.'-';
      }
      $days = trim($days,'-');
      $message = array('response' => false);
      $data = array(
              'name' => $this->input->post('ride_name'),
              'place_from' => $this->input->post('start'),
              'place_to' => $this->input->post('to'),
              'description' => $this->input->post('description'),
              'departure' => $this->input->post('departure'),
              'arrival' => $this->input->post('arrival'),
              'days' => $days
        );
      $id_ride = $this->input->post('id');
      $this->load->model('Ride_model');
      $result = $this->Ride_model->updateRide($id_ride,$data);
      if ($result > 0) {
        $message['response'] = true;
        echo json_encode($message);
      }else{
        echo json_encode($message);
    }
}
    public function deleteRide()
    {
      $message = array('response' => false);
      $user = $_SESSION['user'];
      $this->load->model('Ride_model');
       $result = $this->Ride_model->deleteRide($_POST['id'],$user['id']);
      if ($result > 0) {
        $message['response'] = true;
        echo json_encode($message);
      }
    }




}
