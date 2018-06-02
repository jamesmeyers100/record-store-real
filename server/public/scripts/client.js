let myApp = angular.module('myApp', []);

myApp.controller('RecordStoreController', ['$http', function ($http) {
    // use "vm" as the name in script
    let vm = this;
    vm.records = [];

    // Gets the data entered on the form
    vm.getRecord = function () {
        let newRecord = {
            artist: vm.artistIn,
            albumName: vm.albumNameIn,
            year: vm.yearIn,
            genreList: vm.genreListIn
        }

        $http({
            method: 'POST',
            url: '/record',
            data: newRecord
        }).then(function (response) {
            console.log('Sent record to the server');
            vm.requestRecords();
            vm.artistIn = '';
            vm.albumNameIn = '';
            vm.yearIn = '';
            vm.genreListIn = '';
        }).catch(function (error) {
            console.log('ERROR adding a movie');
        });
    } // end getRecord

    vm.removeMe = function (index) {
        console.log('in removeMe:', index);
        let recordToDelete = vm.records[index];
        $http({
                method: 'DELETE',
                url: `/record?_id=${recordToDelete._id}`,
            })
            .then(function (response) {
                console.log('Deleted record', recordToDelete);
                vm.requestRecords();
            })
            .catch(function (error) {
                console.log('ERROR deleting a record');

            })
    } // end removeMe

    vm.requestRecords = function () {
        $http({
            method: 'GET',
            url: '/record'
        }).then(function (response) {
            console.log('Got response from the server:', response.data);
            vm.records = response.data;
            console.log('your record:', vm.records);
        }).catch(function (error) {
            console.log(`Error getting record: ${error}`);
        });
    } // end requestRecord

    // Get the record when the controller loads
    console.log('RecordStoreController is created');
    vm.requestRecords();
}]); // end controller