<?php

defined('BASEPATH') or exit('No direct script access allowed');

class User extends CI_Controller
{

    public function index()
    {
        $session = $this->session->flashdata('login');
        if ($session == null) {
            $this->load->view('User/login');
        } else {
            redirect('Ride/');
        }
    }
    public function logout()
    {
        $this->session->set_userdata('user', null);
        redirect('/');
    }
    public function authenticate()
    {
        $message = array('response' => false, 'invaliddata' => false);
        $name = $this->input->post('name');
        $pass = $this->input->post('password');
        $this->load->model('User_model');
        $result = $this->User_model->getUser($name, $pass);
        if ($name == '' || $pass == '') {
            $message['invaliddata'] = true;
            echo json_encode($message);
        } else if (sizeof($result) > 0) {
            $this->session->set_userdata('user', $result[0]);
            $session = $this->session->set_flashdata('login', true);
            $message['response'] = true;
            echo json_encode($message);
        } else {
            echo json_encode($message);
        }
    }

    public function insertUser()
    {
        $message = array('response' => false, 'invaliddata' => false);
        $data = array(
                'name' => $this->input->post('name'),
                'last_name' => $this->input->post('last_name'),
                'phone' => $this->input->post('phone'),
                'user_name' => $this->input->post('user_name'),
                'password' => $this->input->post('password')
          );
        $this->load->model('User_model');
        $this->load->library('form_validation');
        $this->form_validation->set_rules('name', 'Name', 'trim|required');
        $this->form_validation->set_rules('last_name', 'Last Name', 'trim|required');
        $this->form_validation->set_rules('phone', 'Phone', 'trim|required|numeric');
        $this->form_validation->set_rules('password', 'Password', 'trim|required|matches[repeat]');
        $this->form_validation->set_rules('repeat', 'Repeat Password', 'trim|required');
        if ($this->form_validation->run()) {
            $this->User_model->insertUser($data);
            $message['response'] = true;
            echo json_encode($message);
        } else {
            $message['invaliddata'] = true;
            echo json_encode($message);
        }
    }

    public function getUserSettings()
    {
      $message = array('response' => false,'data'=>false);
      $user = $_SESSION['user'];
      $this->load->model('User_model');
      $result = $this->User_model->getUserSettings($user['id']);
      if ($result > 0) {
      $message['response'] = true;
       $message['data'] = $result[0];
        echo json_encode($message);
      }
    }

    public function updateUserSettings()
    {
      $message = array('response' => false, 'match' );
      $user = $_SESSION['user'];
      $id_user = $user['id'];
      $data = array(
              'name' => $this->input->post('name'),
              'last_name' => $this->input->post('last_name'),
              'speed_average' => $this->input->post('average'),
              'about_me' => $this->input->post('about_me')
        );
      $this->load->model('User_model');
      $result = $this->User_model->updateSettings($id_user,$data);
      if ($result > 0) {
        $message['response'] = true;
        echo json_encode($message);
      }else{
        echo json_encode($message);

      }

    }


}
