/*
  This function accepts a callback function as a parameter.

  It calls the callback function with an object containing the data about
    the station at 18th and M Street NW (which is ID "31221")
*/
var localStation = function(callback) {

$.ajax({
  url:"/stations",
  method:"get",
  success: function (data) {
    var foundStations =_.filter(data, function (station) {
      return station.id ==="31221"
    }) 

    callback(foundStations[0])
  }
})

}

/*
  This function accepts a callback function as a parameter.

  It calls the callback function with an object containing the data about 
    the northernmost station in the Capital Bikeshare system.
  (For simplicity's sake, the northernmost station is the one
    with the highest latitude.)
*/
var northernmostStation = function(callback) {
  $.ajax({
    url:"/stations",
    method:"get",
    success: function (data) {
      var maxlaStations = _.max(data, function (station) {

        return station.latitude
      })
        callback(maxlaStations)
  }
})
  
}

/*
  This function accepts a callback function as a parameter.

  It calls the callback function with an object containing the data about 
    a single, random station in the Capital Bikeshare system.

  I'll code review this -- use something to get a random, different station
    each time.
*/
var randomStation = function(callback) {
 $.ajax({
    url:"/stations",
    method:"get",
    success: function (data) {
      var randomStations = _.filter(data, function (station) {
       var random = Math.floor(Math.random() * (5));
        return random 
      })
        callback(randomStations[5])
  }
})

}


/*
  This function accepts a callback function as a parameter.

  It calls the callback function with an array containing the data about
    any stations in the Capital Bikeshare system that currently have 0 bikes.
*/
var emptyStations = function(callback) {
$.ajax({
  url:"/stations",
  method:"get",
  success: function (data) {
    var zerobikes =_.filter(data, function (station) {
      return station.bikes ===0
    }) 

    callback(zerobikes)
  }
})

}

/*
  This function accepts a callback function as a parameter.

  It calls the callback function with an array containing the data about
    any stations in the Capital Bikeshare system that have been updated
    in the last 15 minutes.
*/
var recentStations = function(callback) {
$.ajax({
  url:"/stations",
  method:"get",
  success: function (data) {
    var recent =_.filter(data, function (station) {
     return station.lastUpdated<900000
    }) 

    callback(recent)
  }
})  

}
