<!DOCTYPE html>
<html>
  <head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Welcome</title>
    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
    <link rel="stylesheet" href="<?php echo base_url(); ?>assets/css/style.css" media="screen" title="no title" charset="utf-8">
  </head>
  <body >
<?php

if (isset($_SESSION['user'])) {
    $user = $_SESSION['user'];

}
 ?>
    <section class="container-fluid">
      <section class="row">
        <div class="col-md-4 col-sm-12">
          <div class="contenido logo">
            <div id="logo-container">
              <div id="logo-img">
                <img src="<?php echo base_url(); ?>assets/css/images/logo2.png"/>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4 col-sm-12">
            <div class="contenido">
              <ul>
                <li><a id="dashboard" class="op-menu"href="#">dashboard</a></li>
                <li><a id="rides" class="op-menu"href="#">rides</a></li>
                <li><a id="settings" class="op-menu"href="#">settigns</a></li>
              </ul>
            </div>
        </div>
        <div class="col-md-4 col-sm-12">
            <div class="contenido actions">
              <ul>
                <li>
                  <div class="data-user-container">
                    <div class="img-container">
                    <img src="<?php echo base_url(); ?>assets/css/images/user.png" alt="" />
                    </div>
                    <div class="name-user-container">
                      <span id="userName"><?php echo $user['user_name'] ?></span>
                    </div>
                  </div>
                </li>
                <form class="" action="<?php echo base_url().'index.php/User/logout'?>" method="post">
                    <li><input id="STYLE" class="op-menu" type="submit" name="name" value="Logout"></li>
                </form>
              </ul>
            </div>
        </div>
      </section>
  </section>
  <section class="container-fluid filter come-down date-clock">
    <section clas="col-md-12">
      <section class="container">
        <div class="content-clock">
          <div class="clock">
            <span class="style-time">22:30:4</span>
          </div>
          <div class="date">
            <span  class="style-date">5/6/2016</span>
          </div>
        </div>
      </section>
    </section>
    </section>
  <section class="container-fluid filter item-menu come-up" id="dashboard">
    <div class="row row-titule">
      <div class="titule">
        <h4>dashboard</h4>
      </div>
    </div>
    <div class="container">
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>start</th>
              <th>end</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
    </div>
    <div id="no-items" class="no-items-message">
          <h2>You don't have rides</h2>
          <h4>click on the plus button to add a new ride</h4>
          <div class="icon-btn animation-img">
            <img src="<?php echo base_url(); ?>assets/css/images/down.png" alt="" />
          </div>
      </div>
      <div id="btn-add-new-ride" class="edit new-ride">
        <div class="icon-btn">
            <img src="<?php echo base_url(); ?>assets/css/images/plus.png" alt="" />
        </div>
        <span>add</span>
      </div>
  </div>
  </section>
  <form class="container-fluid filter item-menu come-up ride" id="form-rides">
    <div class="row row-titule">
      <div class="titule">
        <h4>rides</h4>
      </div>
    </div>
    <section class="container">
      <div class="col-md-6 col-sm-12 container-controls">
        <div class=" control-input col-md-12">
          <h4>Settings</h4>
        </div>
        <div class="control-input col-md-6">
          <label class="frm-label-style" for="">Ride Name</label>
          <input class="frm-input-text-style rides-data" type="text" name="ride_name">
        </div>
        <div class="control-input col-md-12">
          <div class="two-controls">
              <div class="row" id="placesToFind">
                <div class="col-md-6"id="cont-start-location">
                  <label class="frm-label-style" for="">start location</label>
                  <input class="frm-input-text-style rides-data" id="from" type="text" name="start">
                </div>
                <div class="col-md-6"id="cont-end-location">
                  <label class="frm-label-style" for="">to</label>
                  <input class="frm-input-text-style rides-data" id="to"type="text" name="to">
                </div>
              </div>
          </div>
        </div>
        <div class="control-input col-md-12">
          <label class="frm-label-style" for="">Description</label>
          <textarea class="frm-input-text-style rides-data" name="description" rows="8" cols="40"></textarea>
        </div>
      </div>
      <div class="col-md-6 col-sm-12 container-controls">
        <div class=" control-input col-md-12">
          <h4>when</h4>
        </div>
        <div class="control-input col-md-12">
          <div class="two-controls">
              <div class="row" id="scheduleCont">
                <div class="col-md-6">
                  <label class="frm-label-style" for="">departure</label>
                  <input class="frm-input-text-style rides-data" id="dep" type="time" name="departure">
                </div>
                <div class="col-md-6">
                  <label class="frm-label-style" for="">estimated arrival</label>
                  <input class="frm-input-text-style rides-data" id="ari" type="time" name="arrival">
                </div>
              </div>
          </div>
        <div class=" control-input col-md-12">
          <h4>Days</h4>
        </div>
        <div class="control-input col-md-12" id="days-error-cont">
        </div>
        <div class="control-input checkboxes-container col-md-12">
          <div class="containerd">
            <div class="checkbox-container">
              <label class="frm-label-style" for="sunday">sunday</label>
              <input type="checkbox" id="check-sunday" name="days[]" value="sunday" class="chk-days">
            </div>
            <div class="checkbox-container">
              <label class="frm-label-style" for="monday">monday</label>
              <input type="checkbox" id="check-monday" name="days[]" value="monday" class="chk-days">
            </div>
            <div class="checkbox-container">
              <label class="frm-label-style" for="tuesday">tuesday</label>
              <input type="checkbox" id="check-tuesday" name="days[]" value="tuesday" class="chk-days">
            </div>
            <div class="checkbox-container">
              <label class="frm-label-style" for="wednesday">wednesday</label>
              <input type="checkbox" id="check-wednesday" name="days[]" value="wednesday" class="chk-days">
            </div>
            <div class="checkbox-container">
              <label class="frm-label-style" for="thursday">thursday</label>
              <input type="checkbox" id="check-thursday" name="days[]" value="thursday" class="chk-days">
            </div>
            <div class="checkbox-container">
              <label class="frm-label-style" for="friday">friday</label>
              <input type="checkbox" id="check-friday" name="days[]" value="friday" class="chk-days">
            </div>
            <div class="checkbox-container">
              <label class="frm-label-style" for="saturday">saturday</label>
              <input type="checkbox" id="check-saturday" name="days[]" value="saturday"  class="chk-days">
            </div>
          </div>
        </div>
      </section>
      <div class="row row-footer">
        <div class="container">
          <div class="col-md-6 container-frm-btn" id="cancel-back">
          </div>
          <div  class="col-md-6 container-frm-btn" id="save-update">
          <input type="submit" name="name" value="" class="col-md-6 container-frm-btn save-ride" id="save-update">
          </div>
        </div>
      </div>
  </form>
  <form class="container-fluid filter item-menu come-up" id="settings">
    <div class="row row-titule">
      <div class="titule">
        <h4>settings</h4>
      </div>
    </div>
    <section class="container settings-container">
      <div class="row">
        <div class="col-md-6 col-sm-12 container-controls">
          <div class="control-input col-md-6">
            <label class="frm-label-style" for="">Full Name</label>
            <input class="frm-input-text-style settings-data" id="name" type="text" name="full_name" placeholder="my name is...">
            <div id="UserNameErrorContainer"></div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 col-sm-12 container-controls">
          <div class="control-input col-md-6">
            <label class="frm-label-style" for="">Speed average</label>
            <input class="frm-input-text-style settings-data" id="speed" type="number" name="average" placeholder="you could add something here..">
          </div>
        </div>
      </div>
      <div class="row">
        <div class="control-input col-md-12">
          <label class="frm-label-style" for="">About me</label>

          <textarea class="frm-input-text-style settings-data" id="about-me" name="about_me" rows="8" cols="40" placeholder="we'd like to know something about you :)"></textarea>
        </div>
      </div>
    </section>
    <div class="row row-footer">
      <div class="container">
        <div class="col-md-6 container-frm-btn">
          <input class="frm-btn-style" type="button" name="name" id="cancel-settings" value="cancel">
        </div>
        <div class="col-md-6 container-frm-btn">

          <input class="frm-btn-style" type="submit" name="name" id="save-settings" value="">


        </div>
      </div>
    </div>
  </form>
  <section id="window-confirmation" class="close-popup">
    <div class="cover-popup">
      <div class="popup-container">
        <div class="close-bar">
          <div class="btn-close-pop-up" id="close-confirmation">
            <img src="<?php echo base_url(); ?>assets/css/images/close1.png" alt="" />
          </div>
        </div>
        <div class="popup-cont">
          <div class="item-popup">
            <label class="label-style" for="">Do you want to delete this item?</label>
          </div>
          <div class="item-popup last btns-confirm">

            <input type="button" class="btn-style-in" id="btn-delete" name="name" value="Yes">
            <input type="button" class="btn-style-in" id="btn-no" name="name" value="No">
          </div>
        </div>
      </div>
    </div>
  </section>
    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->

    <script src="<?php echo base_url(); ?>assets/js/logicObjects.js"></script>
    <script src="<?php echo base_url(); ?>assets/js/validation.js"></script>
    <script src="<?php echo base_url(); ?>assets/js/logicPag2.js"></script>
    <script src="<?php echo base_url(); ?>assets/js/api-google.js"></script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCpvVbVzSJlq3ryX_iUn0loWB8qRLyqpLw&signed_in=true&libraries=places&callback=initAutocomplete"
            async defer></script>
  </body>
</html>
