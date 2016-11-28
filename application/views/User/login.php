<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
    <title>Welcome</title>
    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
    <link rel="stylesheet" href="<?php echo base_url(); ?>assets/css/style.css" media="screen" title="no title" charset="utf-8">
</head>

<body>
    <section class="container-fluid">
        <section class="row">
            <div class="col-md-4 col-sm-12">
                <div class="contenido logo">
                    <div id="logo-container">
                        <div id="logo-img">
                            <img src="<?php echo base_url(); ?>assets/css/images/logo2.png" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="contenido">
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="contenido actions">
                    <ul>
                        <li><a href="#" id="login-btn">login</a></li>
                        <li><a href="#" id="signin-btn">signin</a></li>
                    </ul>
                </div>

            </div>
        </section>
    </section>
    <section class="container-fluid filter">
        <section class="items-principal-page hello-container slide-up">
            <div class="items-hello">
                <h1>welcome to wego</h1>
                <h4>we travel together</h4>
            </div>
        </section>
        <section class="container">
            <div class="container-button-slide">
                <input type="button" class="btn-style-in public-access" id="slideHomeBtn" name="name" value="click me">
            </div>
        </section>
        <section class="items-principal-page container search-rides-container slide-down">
            <form class="container-search-ride" action="index.html" method="post">
                <div class="row">
                    <div class="col-sm-12 col-md-6">
                        <label class="label-public-acces" for="from">from</label>
                        <input class="input-text-style public-access" id="from" type="text" name="name" placeholder="examaple: Santa Monica" value="">
                    </div>
                    <div class="col-sm-12 col-md-6">
                        <label class="label-public-acces" for="to">to</label>
                        <input class="input-text-style public-access" id="to" type="text" name="name" placeholder="example: Los Angeles" value="">
                    </div>
                </div>
                <div class="row">
                    <div class="cont-btn-search">
                        <input type="button" class="btn-style-in public-access" id="find-ride" name="name" value="find my ride">
                    </div>
                </div>
                <div class="row">
                    <div class="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>start</th>
                                    <th>end</th>
                                    <th>View</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                    <div id="no-items" class="no-items-message">
                        <h2>Oh! sorry we found nothing :(</h2>
                        <h4>Try again!</h4>
                        <div class="icon-btn animation-img">

                        </div>
                    </div>
                    <div id="boton" class="edit new-ride">
                    </div>
                </div>
            </form>
        </section>
    </section>
    <section id="window-login" class="close-popup">
        <div class="cover-popup">
            <div class="popup-container">
                <div class="close-bar">
                    <div class="btn-close-pop-up" id="close-login">
                        <img src="<?php echo base_url(); ?>assets/css/images/close1.png" alt="" />
                    </div>
                </div>
                <form class="popup-cont" action="<?php echo base_url().'index.php/User/authenticate'?>" method="post">
                    <div class="item-popup">
                        <label class="label-style" for="">User</label>
                        <input class="login-data input-text-style" type="text" id="user-name" name="name" value="" placeholder="your user" max="5">
                    </div>
                    <div class="item-popup">
                        <label class="label-style" for="">Password</label>
                        <input class="login-data input-text-style" type="password" id="pass-1" name="password" value="" placeholder="your password">
                        <div id="LoginErrorContainer"></div>
                    </div>
                    <div class="item-popup last">
                        <input type="submit" class="btn-style-in" id="login"  value="Login">
                        <p class="other-op-log-sign">Not an user?<a href="#" id="hide-login">register here</a></p>
                    </div>
                </form>
            </div>
        </div>
    </section>
    <section id="window-signin" class="close-popup">
        <div class="cover-popup">
            <div class="popup-container">
                <div class="close-bar">
                    <div class="btn-close-pop-up" id="close-signin">
                        <img src="<?php echo base_url(); ?>assets/css/images/close1.png" alt="" />
                    </div>
                </div>
                <form class="popup-cont" id="form">
                    <div class="item-popup">
                        <label class="label-style" for="">User</label>
                        <input class="signin-data input-text-style" id="name" type="text" name="name" placeholder="Jon">
                    </div>
                    <div class="item-popup">
                        <label class="label-style" for="">Last name</label>
                        <input class="signin-data input-text-style" id="last-name" type="text" name="last_name" placeholder="snow">
                    </div>
                    <div class="item-popup">
                        <label class="label-style" for="">phone</label>
                        <input class="signin-data input-text-style" id="phone" type="number" name="phone" placeholder="555-555-555">
                    </div>
                    <div class="item-popup">
                        <label class="label-style" for="">User name</label>
                        <input class="signin-data input-text-style" id="user-name" type="text" name="user_name" placeholder="theWolf123">
                        <div id="UserNameErrorContainer"></div>
                    </div>
                    <div class="item-popup">
                        <label class="label-style" for="">password</label>
                        <input class="signin-data input-text-style" id="pass-1" type="password" name="password" placeholder="...your password">
                    </div>
                    <div class="item-popup">
                        <label class="label-style" for="">repeat Password</label>
                        <input class="signin-data input-text-style" id="pass-2" type="password" name="repeat" placeholder="...your password">
                        <div id="passErrorContainer"></div>
                    </div>
                    <div class="item-popup last">
                        <input type="button" class="btn-style-in" id="register" name="name" value="Register">
                        <p class="other-op-log-sign">Already an user?<a id="hide-signin">Login here</a></p>
                    </div>
               </form>
            </div>
        </div>
    </section>
    <div id="window-show-ride" class="close-popup">
        <div class="cover-popup map-info-ride">
            <div class="popup-container  ride-cont-info">
                <div class="close-bar">
                    <div class="btn-close-pop-up" id="close-show-ride">
                        <img src="<?php echo base_url(); ?>assets/css/images/close1.png" alt="" />
                    </div>
                </div>
                <section class="container containerDisplayMap">
                    <div class="row">
                        <h4 class="col-md-12" id="show-ride-name"></h4>
                    </div>
                    <div class="row">
                        <div class="col-md-6 ">
                            <h5 class="name-ride-show">from</h5>
                            <div class="show-item-ride">
                                <span class="style-show-ride" id="show-ride-from"></span>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <h5 class="name-ride-show">to</h5>
                            <div class="show-item-ride">
                                <span class="style-show-ride" id="show-ride-to"></span>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <h5 class="name-ride-show">description</h5>
                            <div class="show-item-ride">
                                <span class="style-show-ride" id="show-ride-description"></span>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 col-sm-6">
                            <h5 class="name-ride-show">Days</h5>
                            <div class="show-item-ride">
                                <span class="style-show-ride" id="show-ride-days"></span>
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-6">
                            <h5 class="name-ride-show">Departure and Arrival</h5>
                            <div class="show-item-ride">
                                <span class="style-show-ride" id="show-ride-shedule"></span>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
    <div id="map" style="position:absolute;" class="container close-popup close-map"></div>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <script src="<?php echo base_url(); ?>assets/js/validation.js"></script>
    <script src="<?php echo base_url(); ?>assets/js/logicPag1.js"></script>
    <script src="<?php echo base_url(); ?>assets/js/api-google.js"></script>
    <script src="<?php echo base_url(); ?>assets/js/query.js"></script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCpvVbVzSJlq3ryX_iUn0loWB8qRLyqpLw&signed_in=true&libraries=places&callback=initAutocomplete" async defer></script>
</body>

</html>
