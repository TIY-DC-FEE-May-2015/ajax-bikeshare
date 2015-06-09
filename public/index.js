/*
  This function accepts a callback function as a parameter.

  It calls the callback function with an object containing the data about
    the station at 18th and M Street NW (which is ID "31221")
*/
var localStation = function(callback) {
  var ajaxSettings = {
    url: "/stations",
    method: "GET",
    success: function(data) {
      var foundStations = _.filter(data, function(station){
        return station.id === "31221"
      })

      callback(foundStations[0])
    }
  }

  $.ajax(ajaxSettings)

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
      url: "/stations",
      method: "GET",
      success: function(data){
        var highestStations = _.max(data, function(station){
          return station.latitude

        })
          callback(highestStations)
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
      var randomStations = {
      url: "/stations",
      method: "GET",
      success: function(data){
       var ranSpot = _.sample(data)
       callback(ranSpot)
    }
}
  $.ajax(randomStations)
}


/*
  This function accepts a callback function as a parameter.

  It calls the callback function with an array containing the data about
    any stations in the Capital Bikeshare system that currently have 0 bikes.
*/
var emptyStations = function(callback) {
  var empty = {
      url: "/stations",
      method: "GET",
      success: function(data){
        var noBikes = _.filter(data, function(station){
          return station.bikes === 0
        }) 
        callback(noBikes)
      }
  }
  $.ajax(empty)
}

/*
  This function accepts a callback function as a parameter.

  It calls the callback function with an array containing the data about
    any stations in the Capital Bikeshare system that have been updated
    in the last 15 minutes.
*/
var recentStations = function(callback) {
    var anything = {
      url: "/stations",
      method: "GET",
      success: function(data){
        var Share = _.filter(data, function(station){
            return station.lastUpdated <= 900000
        })
          callback(Share)
      }
    }
    $.ajax(anything)
}
