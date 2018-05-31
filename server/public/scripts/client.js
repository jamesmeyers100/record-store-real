$(document).ready(onReady);
// let myApp = angular.module
function onReady(){
    console.log('Client side ready!');
    $('#submitButton').on('click', function(event){
        event.preventDefault();
        let record = getNewRecord();
        addRecord(record);
        //
    });
    getAllRecords();
}

function addRecord(record){
    $.ajax({
        method: 'POST',
        url: '/record',
        data: record
    }).then( function(response){
        //clear input fields
        $('.inputs').val('');
        getAllRecords();
    }).catch(function(response) {
        console.log('Something bad happened:', response.status);
    });
};

function displayAllRecords(recordArray) {
    console.log('in displayAllRecords');
    let $recordsTarget = $('#recordSpot');
    $recordsTarget.empty();
    for(let record of recordArray){
        $recordsTarget.append(makeRowFor(record));
    };
}

function getNewRecord(){
    let record = {
    artist: $('#artistIn').val(),
    albumName: $('#albumIn').val(),
    year: $('#yearIn').val(),
    genreList: $('#genreIn').val(),
    };
    return record;
}

function makeRowFor(record) {
    let rowHtml = `<tr>
        <td>${record.artist}</td>
        <td>${record.albumName}</td>
        <td>${record.year}</td>
        <td>${record.genreList}</td>
    </tr>`;
    return rowHtml;
}

function getAllRecords() {
     $.ajax({
         method: 'GET',
         url: '/record',
     }).then(function (response) {
         displayAllRecords(response)
     })
}