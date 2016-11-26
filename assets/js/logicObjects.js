class Place {
    fillPlace(place, direction) {
        this.Id = place.id;
        this.PlaceName = place.name;
        this.Direction = direction;
        this.PlaceCordenates = place.geometry.location;
    }
}

class Ride {
    Ride() {
        this.User = '';
        this.Id = '';
        this.Name = '';
        this.StartLocation = '';
        this.EndLocation = '';
        this.Description = '';
        this.Departure = '';
        this.Arrival = '';
        this.Days = [];
    }
    ToString() {
        return this.StartLocation.PlaceName + ' ' + this.EndLocation.PlaceName;
    }
}
class BO_Ride {
    /*create a new user or override one with new information*/
    createRide(controls, placeFrom, placeTo, dFrom, dTo, checkedDays, ride) {
        if (ride == null) {
            var ride = new Ride();
            ride.Ride();
        }
        var user = JSON.parse(sessionStorage.getItem('User-Logged'));
        ride.User = user.Id;
        ride.Id = ride.Id != null ? ride.Id : null;
        ride.Name = controls[0].value;
        if (Components.autoFrom || ride.Id == '') {
            ride.StartLocation = new Place();
            ride.StartLocation.fillPlace(placeFrom, dFrom);
        }
        if (Components.autoTo || ride.Id == '') {
            ride.EndLocation = new Place();
            ride.EndLocation.fillPlace(placeTo, dTo);
        }
        ride.Description = controls[3].value;
        ride.Departure = controls[4].value;
        ride.Arrival = controls[5].value;
        ride.Days = checkedDays;
        return ride;
    }

    /*start the process to save the ride, call DAO_Ride*/
    //parameter ride: object to save
    saveRide(ride) {
        var dao = new DAO_Ride();
        dao.saveInlocalStorage(ride);
    }

    /*extract the ride from the list and call updateStorage*/
    //parameter pRide: object to delete
    deleteRide(pRide, rideBo) {
        var rides = this.loadRides();
        for (var i = 0; i < rides.length; i++) {
            if (rides[i].Id == pRide.Id) {
                rides.splice(i, 1);
                break;
            }
        }
        this.updateStorage(rides);
        return true;
    }

    /*override the ride in the list and call updateStorage*/
    //parameter ride: object to update
    updateRide(ride, rideBo) {
        var rides = this.loadRides();
        for (var i = 0; i < rides.length; i++) {
            if (rides[i].Id == ride.Id) {
                rides[i] = ride;
                break;
            }
        }
        this.updateStorage(rides);
        return true;
    }

    /*call DAO_Ride and start the process to update*/
    //parameter rides: objects to update
    updateStorage(rides) {
        var dao = new DAO_Ride();
        dao.updateLocalStorage(rides);
    }

    /*return a list of rides*/
    getRides() {
        return this.loadRides();
    }

    /*call DAO_Ride an get a list of rides*/
    //parameter placeTo: object to consult
    //parameter placeFrom: object to consult
    loadRides(placeFrom, placeTo) {
        var dao = new DAO_Ride();
        var data = [];
        var filter = null;
        if (placeFrom != null || placeTo != null) {
            filter = placeFrom.name + ' ' + placeTo.name;
        }
        data = this.ParseObjectsToRides(dao.loadLocalStorage());
        if (data == null) {
            data = [];
        } else if (filter != null) {
            data = this.filterRides(data, filter);
        }
        return data;
    }

    /*filter the search*/
    //parameter data: list of rides
    //parameter filter: places to find
    filterRides(data, filter) {
        var dataMemo = [];
        for (var i = 0; i < data.length; i++) {
            if (data[i].ToString() == filter) {
                dataMemo.push(data[i]);
            }
        }
        return data = dataMemo;
    }

    /*parse a list of object to rides*/
    //parameter objs: list of objects
    ParseObjectsToRides(objs) {
        try {
            var ridesToParse = [];
            for (var i = 0; i < objs.length; i++) {
                objs[i] = this.ParseObjectToRide(objs[i]);
                if (objs[i] != null) {
                    ridesToParse.push(objs[i]);
                }
            }
            return objs = ridesToParse;
        } catch (e) {
            return null;
        }
    }

    /*parse a object to ride*/
    //parameter obj: object to parse
    ParseObjectToRide(obj) {
        var data = [];
        var rideToParse = new Ride();
        rideToParse.Ride();
        for (var prop in rideToParse) {
            if (obj.hasOwnProperty(prop)) {
                switch (prop) {
                    case 'User':
                        rideToParse.User = obj.User;
                        break;
                    case 'Id':
                        rideToParse.Id = obj.Id;
                        break;
                    case 'Name':
                        rideToParse.Name = obj.Name;
                        break;
                    case 'StartLocation':
                        rideToParse.StartLocation = obj.StartLocation;
                        break;
                    case 'EndLocation':
                        rideToParse.EndLocation = obj.EndLocation;
                        break;
                    case 'Description':
                        rideToParse.Description = obj.Description;
                        break;
                    case 'Departure':
                        rideToParse.Departure = obj.Departure;
                        break;
                    case 'Arrival':
                        rideToParse.Arrival = obj.Arrival;
                        break;
                    case 'Days':
                        rideToParse.Days = obj.Days;
                        break
                }
            } else {
                return obj = null;
            }
        }
        return obj = rideToParse;
    }
}
class DAO_Ride {
    /*save in localStorage and inicializate the array*/
    saveInlocalStorage(rideSave) {
            var dataCollection = this.loadLocalStorage();
            dataCollection = dataCollection != null ? dataCollection : [];
            rideSave.Id = dataCollection.length > 0 ? parseInt(dataCollection[dataCollection.length - 1].Id + 1) : dataCollection.length + 1;
            dataCollection.push(rideSave);
            localStorage.setItem('Ride', JSON.stringify(dataCollection));
        }
        /*update the array*/
    updateLocalStorage(dataCollection) {
            localStorage.setItem('Ride', JSON.stringify(dataCollection));
        }
        /*load the array*/
    loadLocalStorage() {
        var data = [];
        data = JSON.parse(localStorage.getItem('Ride'));
        return data != null ? data : null;
    }
}

class User {
    UserInit() {
            this.Id = '';
            this.User = '';
            this.LastName = '';
            this.Phone = '';
            this.UserName = '';
            this.Password = '';
            this.SpeedAverage = '';
            this.AboutMe = '';
        }
        /*
        ->method to get acces to the class
          ->parameter:typeOfVal is a number
            0:to get login
            1:to get the name and last name of the current user
            default:to get the username
        */
    ToString(typeOfVal) {
        switch (typeOfVal) {
            case 0:
                return this.UserName + ' ' + this.Password;
            case 1:
                return this.User + ' ' + this.LastName;
            default:
                return this.UserName;
        }
    }
}
class BO_User {
    /*create a new user*/
    createUser(data) {
        var user = new User();
        user.UserInit();
        return user = this.fillDataUser(user, data);
    }

    /*start the process to fill a user with new info*/
    fillDataUser(user, data) {
        var val;
        var property;
        for (var i = 0; i < data.length; i++) {
            val = data[i].value;
            property = data[i].id;
            user = this.fillPropertyUser(property, val, user);
        }
        return user;
    }

    /*fill the user with the info*/
    fillPropertyUser(property, val, user) {
        switch (property) {
            case 'name':
                user.User = val;
                break;
            case 'last-name':
                user.LastName = val;
                break;
            case 'phone':
                user.Phone = val;
                break;
            case 'user-name':
                user.UserName = val;
                break;
            case 'pass-1':
                user.Password = val;
                break;
            case 'about-me':
                user.AboutMe = val;
                break;
            case 'speed':
                user.SpeedAverage = val;
                break;
        }
        return user;
    }

    /*validate the username and call DAO_User to save*/
    saveUser(user) {
        var users = [];
        users = this.loadUsers();
        if (users != null) {
            for (var i = 0; i < users.length; i++) {
                if (users[i].ToString() == user.ToString()) {
                    return false;
                }
            }
        }
        var dao = new DAO_User();
        dao.saveInlocalStorage(user);
        return true;
    }

    /*start the prcess to update the user*/
    updateSettingsUser(controls) {
        var user = this.userCurrentData();
        var data = [];
        for (var i = 0; i < controls.length; i++) {

            if (controls[i].id == 'name') {
                var content = controls[i].value.split(' ');
                if (content.length > 1) {
                    var inputMemo = document.createElement('input');
                    inputMemo.id = 'last-name';
                    for (var j = 1; j < content.length; j++) {
                        inputMemo.value += content[j];
                    }
                    controls[i].value = content[0];
                    data.push(inputMemo);
                    data.push(controls[i]);
                } else {
                    return false;
                }
            } else {
                data.push(controls[i]);
            }
        }

        user = this.fillDataUser(user, data);
        var users = [];
        users = this.loadUsers();
        for (var i = 0; i < users.length; i++) {
            if (users[i].Id == user.Id) {
                users[i] = user;
                break;
            }
        }
        var dao = new DAO_User();
        dao.updateLocalStorage(users);
        this.login(user);
        return true;
    }

    /*try to match some user from localStorage with the user login process*/
    login(user) {
        try {
            var users = [];
            users = this.loadUsers();
            for (var i = 0; i < users.length; i++) {
                if (users[i].ToString(0) == user.ToString(0)) {
                    sessionStorage.setItem('User-Logged', JSON.stringify(users[i]));
                    return true;
                }
            }
            return false;
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    /*load all the users*/
    loadUsers() {
        var dao = new DAO_User();
        var data = [];
        data = dao.loadLocalStorage();
        if (data == null) {
            return [];
        } else {
            return this.ParseObjectsToUsers(data);
        }
    }

    /*remove the sessionStorage user*/
    logOut() {
        sessionStorage.removeItem('User-Logged');
    }

    /*return the user info*/
    userCurrentData() {
        return this.ParseObjectToUser(JSON.parse(sessionStorage.getItem('User-Logged')));
    }

    /*parse a list of objects to users*/
    ParseObjectsToUsers(objs) {
        try {
            var users = [];
            for (var i = 0; i < objs.length; i++) {
                objs[i] = this.ParseObjectToUser(objs[i]);
                if (objs[i] != null) {
                    users.push(objs[i]);
                }
            }
            return objs = users;
        } catch (e) {
            return null;
        }
    }

    /*parse an object to user*/
    ParseObjectToUser(obj) {
        var data = [];
        var usToParse = new User();
        usToParse.UserInit();
        for (var prop in usToParse) {
            if (obj.hasOwnProperty(prop)) {
                switch (prop) {
                    case 'Id':
                        usToParse.Id = obj.Id;
                        break;
                    case 'User':
                        usToParse.User = obj.User;
                        break;
                    case 'LastName':
                        usToParse.LastName = obj.LastName;
                        break;
                    case 'Phone':
                        usToParse.Phone = obj.Phone;
                        break;
                    case 'UserName':
                        usToParse.UserName = obj.UserName;
                        break;
                    case 'Password':
                        usToParse.Password = obj.Password;
                        break;
                    case 'AboutMe':
                        usToParse.AboutMe = obj.AboutMe;
                        break;
                    case 'SpeedAverage':
                        usToParse.SpeedAverage = obj.SpeedAverage;
                        break;
                }
            } else {
                return obj = null;
            }
        }
        return obj = usToParse;
    }

}
class DAO_User {
    /*save in localStorage and inicializate the array*/
    saveInlocalStorage(userSave) {
            var dataCollection = JSON.parse(localStorage.getItem('User'));
            dataCollection = dataCollection != null ? dataCollection : [];
            userSave.Id = dataCollection.length + 1;
            dataCollection.push(userSave);
            localStorage.setItem('User', JSON.stringify(dataCollection));
        }
        /*update the array*/
    updateLocalStorage(dataCollection) {
            localStorage.setItem('User', JSON.stringify(dataCollection));
        }
        /*load the array*/
    loadLocalStorage() {
        var data = JSON.parse(localStorage.getItem('User'));
        return data != null ? data : null;
    }
}
