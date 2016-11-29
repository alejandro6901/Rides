<?php

defined('BASEPATH') or exit('No direct script access allowed');

class User extends CI_Controller
{
    public function index()
    {
        $session = $this->session->flashdata('login');
        $error = $this->session->flashdata('login');
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
            $error = $this->session->set_flashdata('error', 'Username and Password are incorrect');
            $data['error'] = $error;
            $this->load->view('User/login', $data);
        }
    }
    public function insertUser()
    {

        // $error = array('respuesta' => false);
        $data = array(
                'name' => $this->input->post('name'),
                'last_name' => $this->input->post('last_name'),
                'phone' => $this->input->post('phone'),
                'user_name' => $this->input->post('user_name'),
                'password' => $this->input->post('password')
          );

       $this->load->model('User_model');
       $this->load->library('form_validation');


       $this->form_validation->set_rules('name','Name','trim|required|min_length[6]');
       $this->form_validation->set_rules('last_name','Last Name','trim|required|min_length[6]');
       $this->form_validation->set_rules('phone','Phone','trim|required|numeric|min_length[8]');
       $this->form_validation->set_rules('password','Password','trim|required|matches[repeat]|min_length[6]');
       $this->form_validation->set_rules('repeat','Repeat Password','trim|required|min_length[6]');
       $this->form_validation->set_message('required','%s is required');
       $this->form_validation->set_message('min_length','%s Minimum Lenght are 6');
       $this->form_validation->set_message('numeric','The Phone only can be numbers');

        if ($this->form_validation->run()) {
            $this->User_model->insertUser($data);
            // $error['respuesta'] = true;

        } else {
          //  $error['incorrect'] = array('name','last_name','phone','user_name','password','repeat');
              redirect('index.php/User');
        }

        // echo json_encode($error);
    }
}
