//namespace
var PublicApp = {
    placeFrom: null,
    placeTo: null,

    /*inicializate the components and add the events to the bottons*/
    initComponents() {
        sessionStorage.removeItem('User-Logged');
        document.getElementById('slideHomeBtn').addEventListener("click", function() {
            PublicApp.slide();
        }, false);
        $('#login-btn').click(function() {
            PublicApp.showPopup('window-login');
        });
        $('#close-login').click(function() {
            PublicApp.showPopup('window-login');
        });
        $('#hide-login').click(function() {
            PublicApp.hideLogin();
        });
        $('#signin-btn').click(function() {
            PublicApp.showPopup('window-signin');
        });
        $('#close-signin').click(function() {
            PublicApp.showPopup('window-signin');
        });
        $('#hide-signin').click(function() {
            PublicApp.hideSign();
        });
        $('#register').click(function() {
            PublicApp.signIn();
        });
        $('#login').click(function() {
            PublicApp.logIn();
        });
        $('#find-ride').click(function() {
            PublicApp.findRide();
        });
        $('#close-show-ride').click(function() {
            PublicApp.closeShowRide();
        });
    },

    /*add the class to animate when the user change panel*/
    slide() {
        var items = document.getElementsByClassName('items-principal-page');
        for (var i = 0; i < items.length; i++) {
            if (items[i].classList.contains('slide-up')) {
                items[i].classList.remove('slide-up');
                items[i].classList.add('slide-down');
            } else {
                items[i].classList.remove('slide-down');
                items[i].classList.add('slide-up');
            }
        }
    },

    /*muestra la tabla con los resultados de la busqueda*/
    seeResults() {
        var table = document.getElementById('table-info-rides');
        table.id = "table-info-rides2";
    },

    /*search in the storage places with the parameters placeFrom and placeTo*/
    findRide() {
        var rideBo = new BO_Ride();
        var table = document.querySelector('tbody');
        while (table.hasChildNodes()) {
            table.removeChild(table.firstChild);
        }
        var cellBtns;
        if (!(Components.validateControls(document.getElementsByClassName('input-text-style public-access')))) {
            var rides = rideBo.loadRides(this.placeFrom, this.placeTo);
            if (rides.length > 0) {
                if (this.placeFrom != null && this.placeTo != null) {
                    for (var i = 0; i < rides.length; i++) {
                        cellBtns = Components.addRowTable(rides[i], table);
                        Components.createButtonsRow("table-btns show-ride", cellBtns, table, rides[i], 3);
                    }
                }
                Components.fixedTable();
            } else {
                Components.fixedTable();
            }
        }
    },

    /*put the info's ride to show on the panel and call the google api to display the route*/
    //parameter: rideToShow object with the information
    showRide(rideToShow) {
        document.getElementById('window-show-ride').classList.add('show-popup');
        document.getElementById('window-show-ride').classList.remove('close-popup');
        document.getElementById('map').classList.add('show-popup');
        document.getElementById('map').classList.add('show-map');
        document.getElementById('map').classList.remove('close-popup');
        document.getElementById('show-ride-from').innerHTML = rideToShow.StartLocation.PlaceName; //'Barrio San Miguel, Alajuela, Ciudad Quesada, Costa Rica';
        document.getElementById('show-ride-to').innerHTML = rideToShow.EndLocation.PlaceName; //'San Gerardo, Quesada, San Carlos, Alajuela, Costa Rica';
        var days = document.getElementById('show-ride-days');
        days.innerHTML = '';
        if (7 != rideToShow.Days.length) {
            for (var i = 0; i < rideToShow.Days.length; i++) {
                days.innerHTML += " - " + rideToShow.Days[i];
            }
        } else {
            days.innerHTML = "all the days";
        }

        document.getElementById('show-ride-description').innerHTML = rideToShow.Description;
        document.getElementById('show-ride-name').innerHTML = rideToShow.Name;
        document.getElementById('show-ride-shedule').innerHTML = "Departure : " + rideToShow.Departure + " Arrival : " + rideToShow.Arrival;
        initMap(rideToShow);
    },

    /*call showPopup to close the modal and display out the map*/
    closeShowRide() {
        this.showPopup('window-show-ride');
        this.showPopup('map');
        document.getElementById('map').classList.remove('show-map');
    },

    /*display or display out the popup and call Components.clearControls and remove error messages */
    //parameter: e id of a element HTML
    showPopup(e) {
        var loginDiv = document.getElementById(e);
        if (loginDiv.classList.contains('show-popup')) {
            loginDiv.classList.remove('show-popup');
            loginDiv.classList.add('close-popup');
        } else {
            loginDiv.classList.add('show-popup');
            loginDiv.classList.remove('close-popup');
        }
        $(".errorStyle").remove();
        var controls = $(".login-data");
        Components.clearControls(controls);
        controls = $(".signin-data");
        Components.clearControls(controls);
    },

    /*hide the login and display sign in*/
    hideLogin() {
        this.showPopup('window-login');
        this.showPopup('window-signin');
    },

    /*hide the sign in and display login*/
    hideSign() {
        this.showPopup('window-signin');
        this.showPopup('window-login');
    },

    showPanel() {
        location.href = "./user-panel.html";
    },

    /*start the process to login the user*/
    signIn() {
        $.ajax({
            url: 'index.php/User/insertUser',
            type: 'POST',
            data: $('#form').serialize(),
            success: function(msj) {

                var json = JSON.parse(msj);
                console.log(json);
                if (json.respuesta) {
                    PublicApp.hideSign();
                } else {
                    var incorrects = json.incorrect;
                   for (var i = 0; i < incorrects.length; i++) {

                        switch (incorrects[i]) {

                            case 'name':
                                $("#passErrorContainer").append("<span class='errorStyle'>Name vacio</span>");

                                break;
                            case 'last_name':
                            
                                break;
                            case 'phone':

                                break;
                            case 'user_name':

                                break;
                            case 'password':

                                break;
                            case 'repeat':

                                break;
                            default:

                        }


                    }

                }

            }
        });

    },

    /*validate the password in correct format, compare both password*/
    //parameter: list of controls HTML
    validatePass(collectionControls) {
        var regExp = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$");
        var passControl1 = this.getControlPass(collectionControls, 'pass-1');
        var passControl2 = this.getControlPass(collectionControls, 'pass-2');
        if (!regExp.test(passControl1)) {
            return "At least one uppercase and lowercase,least one digit, least one special character and Minimum 8 in length";
        }
        return passControl1 == passControl2 ? "" : "the passwords doesn't match";
    },

    /*get the password controls*/
    //parameter : dataCollection list of controls HTML
    //parameter: id of the element HTML to choose
    getControlPass(dataCollection, Id) {
        for (var i = 0; i < dataCollection.length; i++) {
            if (dataCollection[i].id == Id) {
                return dataCollection[i].value;
            }
        }
    },

    /*start the process to login the user and if it's ok, it will redirect to principal app*/
    // logIn() {
    //     var dataCollection = $(".login-data");
    //     $(".errorStyle").remove();
    //     if (!Components.validateControls(dataCollection)) {
    //         var userBo = new BO_User();
    //         if (userBo.login(userBo.createUser(dataCollection))) {
    //             location.href = "./panel-user.html";
    //         } else {
    //             $("#LoginErrorContainer").append("<span class='errorStyle'>the credentials are wrong</span>");
    //         }
    //     }
    // }
}
PublicApp.initComponents();
