'use strict';

angular.module('home')
    .factory('HomeFactory', ['$http', '$q', function($http, $q){

        var contacts = null;

        return {
            getContacts: getContacts,
            createContact: createContact,
            deleteContact: deleteContact,
            editContact: editContact
        };

        function getContacts() {
            return $http.get('/contactList').then(function(response){
                contacts = response.data;
                return contacts;
            });
        }
        function createContact(contact) {
            return $http.post('/contactList', contact).then(function(response) {
                if (!contacts) {contacts = [];}
                contacts.push(response.data);
            });
        }
        function deleteContact(contact) {
            return $http.delete('/contactList/' + contact._id).then(function(){
                var index = contacts.indexOf(contact);
                contacts.splice(index, 1);
            });
        }
        function editContact(contact) {
            return $http.put('/contactList/' + contact._id, contact).then(function(response) {
                for (var i = 0; i < contacts.length; i++) {
                    if (contacts[i]._id === contact._id) {
                        contacts[i] = response.data;
                    }
                };
            });
        }

    }]);
