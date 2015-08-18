'use strict';

angular.module('home')
    .controller('HomeController', ['HomeFactory', function(HomeFactory) {

        var homeVm = this;
        homeVm.contact = {};
        
        HomeFactory.getContacts().then(function(response) {
            homeVm.contactList = response;
        });

        homeVm.addContact = function() {
            HomeFactory.createContact(homeVm.contact).then(function() {
                homeVm.contact = {};
            });
        };
        homeVm.removeContact = function(contact) {
            HomeFactory.deleteContact(contact);
        }
        homeVm.editContact = function(contact) {
            homeVm.contact = angular.copy(contact);
        }
        homeVm.updateContact = function() {
            HomeFactory.editContact(homeVm.contact.id).then(function() {
                homeVm.contact = {};
            });
        }

        
        
    }]);
