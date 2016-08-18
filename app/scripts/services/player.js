'use strict';

/**
 * @ngdoc service
 * @name covertRobotApp.PlayerService
 * @description
 * # PlayerService
 * Service in the covertRobotApp.
 */
angular.module('covertRobotApp')
  .service('PlayerService', function ($cookieStore, _, $firebaseArray, $firebaseObject) {
    var self = this,
        ref = firebase.database().ref(),
        _obj,
        users = ['Ginger Spice','Justin Bieber','Beyonce','Hulk','Wonder Woman','Inigo Montoya','Brie Larson','Homer Simpson'];
    
    self.getUniqueId = function () {
      // generate a unique identifier for the player and save it in a cookie to allow refreshes
      if ($cookieStore.get('playerId')) {
        self._id = $cookieStore.get('playerId');
        return self._id;
      } else {
        $cookieStore.put('playerId', _.random(0, 999999999));
        self._id = $cookieStore.get('playerId');
        return self._id;
      }
    };

    self._connect = function () {
      self.obj = $firebaseObject(ref.child('quiz').child(self.PIN));
      _obj = self.obj;
      return self.obj.$loaded();
    };

    self.join = function (PIN) {
      self.PIN = PIN;
      self.screenName = _.sample(users);

      // test if username already selected
      var userExists = $firebaseArray(ref.child('quiz').child(PIN).child('users').orderByChild('screenName').equalTo(self.screenName));
      userExists.$loaded().then(function () {
        if (userExists.length > 0) {
          var temp = users.splice(users.indexOf(self.screenName), self.screenName.length);
          self.screenName = _.sample(temp);
        }

        return self._connect()
        .then(function () {
          // create 'users' node if it doesn't exist
          if (!_obj.hasOwnProperty('users')) {
            _obj.users = {};
          }

          // register player
          _obj.users[self.getUniqueId()] = {
            screenName: self.screenName
          };

          return _obj.$save();
        });
      });
    };

    self.init = function (PIN) {
      // get unique id from cookie store & connect
      self.getUniqueId();
      self.PIN = PIN;
      if (PIN) {
        return self._connect();
      } else {
        return false;
      }
    };

    self.selfSave = function (attr, val) {
      _obj.users[self._id][attr] = val;
      return _obj.$save();
    };
  });
