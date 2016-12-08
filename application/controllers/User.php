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
        $error = array('respuesta' => false, 'invaliddata' => false);
        $name = $this->input->post('name');
        $pass = $this->input->post('password');
        $this->load->model('User_model');
        $result = $this->User_model->getUser($name, $pass);
        if ($name == '' || $pass == '') {
            $error['invaliddata'] = true;
            echo json_encode($error);
        } elseif (sizeof($result) > 0) {
            $this->session->set_userdata('user', $result[0]);
            $session = $this->session->set_flashdata('login', true);
            $error['respuesta'] = true;
            echo json_encode($error);
        } else {
            echo json_encode($error);
        }
    }

    public function insertUser()
    {
        $error = array('respuesta' => false, 'invaliddata' => false);
        $data = array(
                'name' => $this->input->post('name'),
                'last_name' => $this->input->post('last_name'),
                'phone' => $this->input->post('phone'),
                'user_name' => $this->input->post('user_name'),
                'password' => $this->input->post('password')
          );
          $fullname = $data['name'].' '.$data['last_name'];
          $data['full_name'] = $fullname;
        $this->load->model('User_model');
        $this->load->library('form_validation');
        $this->form_validation->set_rules('name', 'Name', 'trim|required');
        $this->form_validation->set_rules('last_name', 'Last Name', 'trim|required');
        $this->form_validation->set_rules('phone', 'Phone', 'trim|required|numeric');
        $this->form_validation->set_rules('password', 'Password', 'trim|required|matches[repeat]');
        $this->form_validation->set_rules('repeat', 'Repeat Password', 'trim|required');

        if ($this->form_validation->run()) {
            $this->User_model->insertUser($data);
            $error['respuesta'] = true;
            echo json_encode($error);
        } else {
            $error['invaliddata'] = true;
            echo json_encode($error);
        }
    }
}
