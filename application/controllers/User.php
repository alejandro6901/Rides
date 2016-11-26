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
            $this->load->view('User/panel-user');
        }
    }
    public function logout()
    {
        $this->session->set_userdata('user', null);
        redirect('index.php/User/');
    }
    public function authenticate()
    {
        $name = $this->input->post('name');
        $pass = $this->input->post('password');
        $this->load->model('User_model');
        $result = $this->User_model->getUser($name, $pass);

        if (sizeof($result) > 0) {
            $this->session->set_userdata('user', $result[0]);
            $session = $this->session->set_flashdata('login', true);
            redirect('index.php/User/');
        } else {
            $error = $this->session->set_flashdata('error', 'userName and Password are incorrect');
            $data['error'] = $error;
            $this->load->view('User/login', $data);
        }
    }
    function insertUser()
    {
      $name = $this->input->post('name');
      $last_name = $this->input->post('last_name');
      $phone = $this->input->post('phone');
      $user_name = $this->input->post('user_name');
      $pass = $this->input->post('password');
      $repeat_pass = $this->input->post('repeat');
      var_dump($name);
      die;
    }
}
