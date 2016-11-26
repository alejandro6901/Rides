var Components = {
    autoFrom: false,
    autoTo: false,
    update: false,

    /*validate each control*/
    //parameter : controls list of controls HTML
    validateControls(controls) {
        var bErrores = false;
        for (var i = 0; i < controls.length; i++) {
            if (controls[i].id!='to' && controls[i].id!='from') {
              if (controls[i].value.length>=50) {
                  controls[i].value = '';
              }
            }
            if (controls[i].value == null || controls[i].value == '') {
                controls[i].classList.add('errorText');
                bErrores = true;
            } else {
                controls[i].classList.remove('errorText');
                if (controls[i].value.indexOf("'") > -1 || controls[i].value.indexOf(".")) {
                    var m = "";
                    var memo = controls[i].value;
                    for (var j = 0; j < memo.length; j++) {
                        if (memo[j] != "'" || memo[j].indexOf(".")>-1) {
                            m += memo[j];
                        }
                    }
                    controls[i].value = m;
                }
                controls[i].value = controls[i].value.trim();
            }
        }
        return bErrores;
    },

    /*add and remove the scroll the table*/
    fixedTable() {
        var tableConte = document.querySelector('.table-container');
        var tbody = document.querySelector('tbody');
        if (tbody.clientHeight >= 355) {
            tableConte.style.height = '355px';
        } else if (tbody.clientHeight <= 0) {
            document.querySelector('#no-items').style.display = 'flex';
            document.querySelector('.new-ride').classList.add('animation-btn');
        } else if (tbody.clientHeight > 0) {
            document.querySelector('#no-items').style.display = "none";
            document.querySelector('.new-ride').classList.remove('animation-btn');
            tableConte.style.height = '';
        }
    },

    /*clean the input*/
    //parameter : collectionControls list of controls HTML
    clearControls(collectionControls) {
        for (var i = 0; i < collectionControls.length; i++) {
            collectionControls[i].value = "";
            collectionControls[i].classList.remove('errorText');
        }
    },

    /*if the user is not login, it will be redirect to the public app*/
    showLog() {
        if (sessionStorage.getItem('denegate') != null) {
            var div = document.getElementById('window-login');
            div.classList.add('show-popup');
            div.classList.remove('close-popup');
            sessionStorage.removeItem('denegate');
        }
    },

    /*add new row the table*/
    addRowTable(ride, table) {
        var row = table.insertRow(0);
        row.id = "row-" + (table.childElementCount + 1);
        var cell;
        for (var i = 0; i < 3; i++) {
            cell = row.insertCell(i);
            switch (i) {
                case 0:
                    cell.innerHTML = ride.Name;
                    break;
                case 1:
                    cell.innerHTML = ride.StartLocation.PlaceName;
                    break;
                case 2:
                    cell.innerHTML = ride.EndLocation.PlaceName;
                    break;
            }
        }
        cell = row.insertCell(3);
        cell.className = 'actions';
        return cell;
    },

    /*make the controls*/
    //parameter:classBtn class to add the style to the button
    //parameter: cell where it will be the button in
    //parameter: table cell's parent
    //parameter: ride object that has the action(update,delete,display)
    //parameter: type kind of action that it will have the ride
    createButtonsRow(classBtn, cell, table, ride, type) {
        var button = document.createElement('input');
        button.type = "button";
        button.className = classBtn;
        switch (type) {
            case 0:
                button.addEventListener("click", function() {
                    Rides.showPopup();
                    Rides.memoryQuestion(ride);
                }, false);
                break;
            case 1:
                button.addEventListener("click", function() {
                    Rides.CallFormRides(ride);
                }, false);
                break;
            case 3:
                button.addEventListener("click", function() {
                    PublicApp.showRide(ride);
                }, false);
                break;
        }
        cell.appendChild(button);
    },

    /*validate if both places has the same country*/
    //parameter placeFrom : Start Location
    //parameter placeTo : End Location
    validateCountry(placeFrom,placeTo) {
        return this.getCountry(placeFrom) === this.getCountry(placeTo) ? true : false;
    },
    /*get the country*/
    //parameter place: object to extract the country
    getCountry(place) {
        var component = {
            country: 'long_name',
        };
        for (var i = 0; i < place.address_components.length; i++) {
            var addressType = place.address_components[i].types[0];
            if (addressType == 'country') {
                return place.address_components[i][component['country']].toUpperCase();
            }
        }
    }

  
}
Components.showLog();
