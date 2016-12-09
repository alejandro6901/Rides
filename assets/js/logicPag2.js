//namespace
var Rides = {
    placeFrom: null,
    placeTo: null,

    /*charge the user's info and add events to buttons*/
    initNameSpace() {
        document.getElementById('logo-container').addEventListener("click", function() {
            Rides.goStart();
        }, false);
        document.getElementById('cancel-settings').addEventListener("click", function() {
            Rides.goStart()
        }, false);
        document.getElementById('close-confirmation').addEventListener("click", function() {
            Rides.showPopup();
        }, false);
        document.getElementById('save-settings').addEventListener("click", function() {
            Rides.updateSettings();
        }, false);
        document.getElementById('btn-add-new-ride').addEventListener("click", function() {
            Rides.callRideFrmFromDash();
        }, false);
        this.addEventMenuItems();
        this.clock();
    },
    /*function to call rides form form dashboard*/
    callRideFrmFromDash() {
        this.activeItem(document.getElementById('rides'));
        this.createBtnRides('frm-btn-style', 'back-dash', 'cancel', 'cancel-back', null);
        this.createBtnRides('frm-btn-style', 'save-ride', 'save', 'save-update', null);
        this.clearControlsRide();
    },
    /*thread to start the clock*/
    clock: function() {
        var f = new Date();
        var hora = f.getHours();
        var minuto = f.getMinutes();
        var segundo = f.getSeconds();
        hora = hora < 10 ? "0" + hora : hora;
        minuto = minuto < 10 ? "0" + minuto : minuto;
        segundo = segundo < 10 ? "0" + segundo : segundo;

        document.querySelector('.clock span').innerHTML = hora + ":" + minuto + ":" + segundo;
        document.querySelector('.date span').innerHTML = f.toLocaleDateString();
        setTimeout("Rides.clock()", 1000)
    },

    /*add events to the menu buttons*/
    addEventMenuItems() {
        var items = document.getElementsByClassName('op-menu');
        for (var i = 0; i < items.length; i++) {
            if (items[i].id != 'logout-btn') {
                items[i].addEventListener("click", function() {
                    Rides.activeItem(this);
                });
            } else {
                items[i].addEventListener("click", function() {
                    Rides.logout();
                });
            }
        }
    },

    /*display a panel*/
    //parameter e: id of a element HTML
    activeItem(e) {
        var clockContainer = document.querySelector('.date-clock');
        if (clockContainer.classList.contains('come-down')) {
            document.querySelector('.date-clock').classList.add('come-up');
            document.querySelector('.date-clock').classList.remove('come-down');
        }
        var items = document.getElementsByClassName('item-menu');
        for (var i = 0; i < items.length; i++) {
          if (items[i].id.indexOf(e.id)>-1) {
              items[i].classList.add('come-down');
              items[i].classList.remove('come-up');
              switch (e.id) {
                case 'dashboard':
                $.ajax({
                    url: 'getRides',
                    type: 'POST',
                    success: function(msj) {
                      var json = JSON.parse(msj);
                      if (json.respuesta) {
                          Rides.loadTableRides(json.data);
                      } else {
                          $("#ErrorContainer").append("<span class='errorStyle'>Error</span>");
                      }
                    }
                });
                    Components.fixedTable();
                    break;
                case 'rides':
                    this.createBtnRides('frm-btn-style', 'cancel-ride', 'cancel', 'cancel-back', null);
                    this.createBtnRides('frm-btn-style', 'save-ride', 'save', 'save-update', null);
                    this.clearControlsRide();
                    break;
                case 'settings':
                    this.loadSettingsUser();
                    break;
                default:
                break;
              }
          } else {
              items[i].classList.remove('come-down');
              items[i].classList.add('come-up');
          }

        }
    },

    /*display the home with the clock*/
    goStart() {
        var clockContainer = document.querySelector('.date-clock');
        clockContainer.classList.remove('come-up');
        clockContainer.classList.add('come-down');
        var items = document.getElementsByClassName('item-menu');
        for (var i = 0; i < items.length; i++) {
            items[i].classList.remove('come-down');
            items[i].classList.add('come-up');
        }
    },

    /*call clear the controls and clean the checkbox, and remove error messages*/
    clearControlsRide() {
        var controls = document.getElementsByClassName('rides-data');
        var days = document.getElementsByClassName('chk-days');
        Components.clearControls(controls);
        for (var i = 0; i < days.length; i++) {
            days[i].checked = false;
        }
        $('.days-error-cont').remove();
        $(".errorStyle").remove();
        this.placeTo = null;
        this.placeFrom = null;
    },

    /*load the user info on the settings panel*/
    loadSettingsUser() {
      $.ajax({
          url: '../User/getUserSettings',
          type: 'POST',
          success: function(msj) {
            var json = JSON.parse(msj);
            $('#name').val(json.data.name);
            $('#last_name').val(json.data.last_name);
            $('#speed').val(json.data.speed_average);
            $('#about-me').val(json.data.about_me);
          }
      });

    },

    /*start the process to update the user info and valida if it has name and last name*/
    updateSettings() {
      $.ajax({
          url: '../User/updateUserSettings',
          type: 'POST',
          data:$('#form-settings').serialize(),
          success: function(msj) {
            var json = JSON.parse(msj);
            if (json.respuesta) {
               Rides.goStart();
            } else {
                $("#ErrorContainer").append("<span class='errorStyle'>Error</span>");
            }
          }
      });

    },

    /*start the proces to save the ride, validate the places and the inputs*/
    saveRide() {
        var controls = document.getElementsByClassName('rides-data');
        var checkedDays = this.validateChecks();
        $(".errorStyle").remove();
        $('.days-error-cont').remove();
        if (checkedDays.length > 0) {
            if (!Components.validateControls(controls)) {
                if ((this.placeTo != null && this.placeTo != "") && (this.placeFrom != null && this.placeFrom != "")) {
                    if (this.placeTo.geometry.location.lat() != this.placeFrom.geometry.location.lat() && this.placeTo.geometry.location.lng() != this.placeFrom.geometry.location.lng()) {
                        if (Components.validateCountry(this.placeFrom, this.placeTo)) {
                            $.ajax({
                                url: 'insertRide',
                                type: 'POST',
                                data: $('#form-rides').serialize(),
                                success: function(msj) {
                                  var json = JSON.parse(msj);
                                  if (json.respuesta) {
                                      Rides.activeItem(document.getElementById('dashboard'));
                                  } else {
                                      $("#ErrorContainer").append("<span class='errorStyle'>Error</span>");
                                  }
                                }
                            });
                        } else {
                            $("#placesToFind").append("<span class='errorStyle'>The country is diferent in both places</span>");
                        }
                    } else {
                        $("#placesToFind").append("<span class='errorStyle'>The places must be diferent</span>");
                    }
                }
            }
            if (this.placeFrom == null || this.placeFrom == "") {
                $("#cont-start-location").append("<span class='errorStyle'>incorrect place</span>");
            }
            if (this.placeTo == null || this.placeTo == "") {
                $('#cont-end-location').append("<span class='errorStyle'>incorrect place</span>");
            }
        } else {
            Components.validateControls(controls);
            $('#days-error-cont').append("<span class='errorStyle'>you should choose minimun a day</span>");
        }
    },

    /*go back to the dashboard*/
    backDashboard() {
        var items = document.getElementsByClassName('item-menu');
        for (var i = 0; i < items.length; i++) {
            if (items[i].id == 'dashboard') {
                items[i].classList.add('come-down');
                items[i].classList.remove('come-up');
            } else {
                items[i].classList.remove('come-down');
                items[i].classList.add('come-up');
            }
        }
    },

    /*cancel the action to delete a ride*/
    cancel() {
        this.clearControlsRide();
        this.goStart();
    },

    /*validate the checkboxes if them are false*/
    validateChecks() {
        var days = document.getElementsByClassName('chk-days');
        var checkedDays = [];
        var j = 0;
        for (var i = 0; i < days.length; i++) {
            if (days[i].checked == true) {
                checkedDays[j] = days[i].value;
                j++;
            }
        }
        return checkedDays;
    },

    /*load the table with user's rides and display it*/
    //parameter rides : list of rides to display in the table
    loadTableRides(rides) {

        var table = document.querySelector('tbody');
        var cellBtns;
        while (table.hasChildNodes()) {
            table.removeChild(table.firstChild);
        }
        for (var i = 0; i < rides.length; i++) {
                cellBtns = Components.addRowTable(rides[i], table);
                Components.createButtonsRow("table-btns delete", cellBtns, table, rides[i], 0);
                Components.createButtonsRow("table-btns update", cellBtns, table, rides[i], 1);

        } //for end
    },

    /*create the buttons in rides form, it depends of the situation(new one or update one)*/
    createBtnRides(clas, pid, val, idParent, ride) {
        var parent = document.getElementById(idParent);
        var input = document.createElement('input');
        while (parent.hasChildNodes()) {
            parent.removeChild(parent.firstChild);
        }
        input.type = "button";
        input.className = clas;
        input.id = pid;
        input.value = val;
        switch (pid) {
            case 'save-ride':
                input.addEventListener("click", function() {
                    Rides.saveRide();
                }, false);
                break;
            case 'update-ride':
                input.addEventListener("click", function() {
                    Rides.updateRide(ride);
                }, false);
                break;
            case 'cancel-ride':
                input.addEventListener("click", function() {
                    Rides.cancel();
                    $(".errorStyle").remove();
                    $('.days-error-cont').remove();
                }, false);
                break;
            case 'back-dash':
                input.addEventListener("click", function() {
                    Rides.backDashboard();
                    $(".errorStyle").remove();
                    $('.days-error-cont').remove();
                    Components.update = false;
                    Components.autoFrom = false;
                    Components.autoTo = false
                }, false);
                break;
        }
        parent.appendChild(input);
    },

    /*display or display out the popup confirmation and delete the buttons or call createBtnPopUp to create them*/
    showPopup() {
        var divPopupConfirmation = document.getElementById('window-confirmation');
        if (divPopupConfirmation.classList.contains('show-popup')) {
            divPopupConfirmation.classList.remove('show-popup');
            divPopupConfirmation.classList.add('close-popup');
        } else {
            var parent = document.querySelector('.item-popup.last');
            while (parent.hasChildNodes()) {
                parent.removeChild(parent.firstChild);
            }
            parent.appendChild(this.createBtnPopUp('btn-delete', 'yes'));
            parent.appendChild(this.createBtnPopUp('btn-no', 'no'));
            divPopupConfirmation.classList.add('show-popup');
            divPopupConfirmation.classList.remove('close-popup');
        }
    },

    /*create the buttons for the confirmation window*/
    createBtnPopUp(id, val) {
        var input = document.createElement('input');
        input.type = "button";
        input.className = "btn-style-in";
        input.id = id;
        input.value = val;
        return input;
    },

    /*add the events to the new confirmation window buttons for the respective ride*/
    //parameter e : ride that has the action
    memoryQuestion(e, ride) {
        document.getElementById('btn-delete').addEventListener("click", function() {
            Rides.confirmDeleteItem(e, ride);
        }, false);
        document.getElementById('btn-no').addEventListener("click", function() {
            Rides.showPopup();
        }, false);
    },

    /*start the process to delete a ride*/
    //parameter ride: ride that has the action
    confirmDeleteItem(ride) {
      $.ajax({
          url: 'deleteRide',
          type: 'POST',
          data: ride,
          success: function(msj) {

            var json = JSON.parse(msj);
            if (json.respuesta) {
                Rides.activeItem(document.getElementById('dashboard'));
            } else {
                $("#ErrorContainer").append("<span class='errorStyle'>MAME</span>");
            }

          }
      });
        //esconde el popup
        this.showPopup();
    },

    /*call and fill rides form with the ride data*/
    //parameter ride: ride that has the action
    CallFormRides(ride) {

      var daysRide = ride.days;
      var splitD =  daysRide.split("-");
        Components.update = true;
        var controls = document.getElementsByClassName('rides-data');
        var day = document.getElementsByClassName('chk-days');
        this.activeItem(document.getElementById('rides'));
        this.createBtnRides('frm-btn-style', 'back-dash', 'back', 'cancel-back', null);
        this.createBtnRides('frm-btn-style', 'update-ride', 'update', 'save-update', ride);
        controls[0].value = ride.name;
        controls[1].value = ride.place_from;
        controls[2].value = ride.place_to;
        controls[3].value = ride.description;
        controls[4].value = ride.departure;
        controls[5].value = ride.arrival;
        for (var i = 0; i < day.length; i++) {
          for (var j = 0; j < splitD.length; j++) {
              if (day[i].value == splitD[j]) {
                  day[i].checked = true;
                  break;
              }
          }
        }

    },

    /*start the process to update a ride*/
    updateRide(ride) {
      var form = $('#form-rides').serialize();
      var querystring = "id="+ride.id+"&"+form;
      $.ajax({
          url: 'updateRides',
          type: 'POST',
          data: querystring,
          success: function(msj) {
            var json = JSON.parse(msj);
            if (json.respuesta) {
                Rides.activeItem(document.getElementById('dashboard'));
            } else {
                $("#ErrorContainer").append("<span class='errorStyle'>Error</span>");
            }
           }
      });

    },
}
Rides.initNameSpace();
