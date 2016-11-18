<?php

defined('BASEPATH') or exit('No direct script access allowed');

class Register extends CI_Controller
{

    public function show_register()
    {
    $this->load->view('Register/register.php');
    }
    public function registerUser()
    {
        $data = $this->load->model('Register_model');
        $data = array(
               'first_name' => $_POST['first_name'],
               'last_name' => $_POST['last_name'],
               'email' => $_POST['email'],
               'password' => $_POST['password'],
               'date' => $_POST['date']
         );
        $this->Register_model->insertUser($data);
        redirect('Login/show_login');
    }
}
