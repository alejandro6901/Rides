/*inicializate autocomplete*/
function initAutocomplete() {
    var autocompleteFrom = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */
        (document.getElementById('from')), {
            types: []
        });
    autocompleteFrom.addListener('place_changed', function() {
        getIdPlace(autocompleteFrom, 'from');
    });
    /*doble check the place*/
    document.getElementById('from').addEventListener("focusout", function() {
        getIdPlace(autocompleteFrom, 'from');
    });

    var autocompleteTo = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */
        (document.getElementById('to')), {
            types: []
        });
    autocompleteTo.addListener('place_changed', function() {
        getIdPlace(autocompleteTo, 'to');
    });
    /*doble check the place*/
    document.getElementById('to').addEventListener("focusout", function() {
        getIdPlace(autocompleteTo, 'to');
    });
}
/*in case of update if this input is on focus,it will clean*/
document.getElementById('to').addEventListener("focusin", function() {
    if (Components.update) {
        this.value = '';
        Components.autoTo = true;
    }
});

/*in case of update if this input is on focus,it will clean*/
document.getElementById('from').addEventListener("focusin", function() {
    if (Components.update) {
        this.value = '';
        Components.autoFrom = true;
    }
});

/*function to validate the place about the autocomplete on focus*/
//parameter:autocomplete var type google maps
//parameter: flag determine the Start Location and End Location
function getIdPlace(autocomplete, flag) {
    // Get the place details from the autocomplete object.
    var place = autocomplete.getPlace();
    if (!(place === undefined || place === null)) {
        if (!place.geometry) {
            console.log("Autocomplete's returned place contains no geometry");
            return;
        }
        if (flag == 'to') {
            if (typeof Rides == 'undefined') {
                PublicApp.placeTo = place;
            } else {
                Rides.placeTo = place;
            }
        } else if (typeof Rides == 'undefined') {
            PublicApp.placeFrom = place;
        } else {
            Rides.placeFrom = place;
        }
        return true;
    } else {
        return false;
    }
}

/*function to inicializate the map*/
//parameter:rideToShow it's the ride selected to show on the map
function initMap(rideToShow) {
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: {
            lat: 41.85,
            lng: -87.65
        }
    });
    directionsDisplay.setMap(map);
    var onChangeHandler = function() {
        calculateAndDisplayRoute(directionsService, directionsDisplay, rideToShow);
    };
    onChangeHandler();
}

/*function to calculate and display the route*/
//parameter:directionsService var type google maps
//parameter:directionsDisplay var type google maps
//parameter:rideToShow object that has the cordenates to display on the map
function calculateAndDisplayRoute(directionsService, directionsDisplay, rideToShow) {
    directionsService.route({
        origin: {
            lat: parseFloat(rideToShow.StartLocation.PlaceCordenates.lat),
            lng: parseFloat(rideToShow.StartLocation.PlaceCordenates.lng)
        },
        destination: {
            lat: parseFloat(rideToShow.EndLocation.PlaceCordenates.lat),
            lng: parseFloat(rideToShow.EndLocation.PlaceCordenates.lng)
        },
        travelMode: google.maps.TravelMode.DRIVING
    }, function(response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}
