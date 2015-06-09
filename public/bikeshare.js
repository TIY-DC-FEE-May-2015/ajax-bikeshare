var userLocation = function() {
	navigator.geolocation.getCurrentPosition(function(position){
		var userLat = position.coords.latitude
		var userLong = position.coords.longitude
	})
}

var stationLocation = function(data) {


	_.sortBy(data, function(index){
		var latDiff = Math.abs(Math.abs(index.latitude) - Math.abs(userLat))
		var longDiff = Math.abs(Math.abs(index.longitude)-Math.abs(userLong))
		index.distance = (latDiff+longDiff) * -1
		return index.distance

	})


	
}


var findDocks = function(callback) {

			var ajaxSettings = {
				url: "/live",
				method: "GET",
				success: function(data) {
					var openDock = _.filter(data, function(station){ 	
						var party = $("#party").val()
						return station.docks >= party
					})				
//wasn't sure how to nest or if I even should nest like this
//but i couldn't get variables like userLat to apply across functions
//this seemed like the cleanest method
					navigator.geolocation.getCurrentPosition(function(position){
						var userLat = position.coords.latitude
						var userLong = position.coords.longitude

						_.each(openDock, function(index){
							var latDiff = Math.abs(Math.abs(index.latitude) - Math.abs(userLat))
							var longDiff = Math.abs(Math.abs(index.longitude)-Math.abs(userLong))
							index.distance = (latDiff+longDiff)
						})
//this simply doesn't work and i don't know why
						_.sortBy(openDock, "distance")	
//so I didn't even get to the point of using this
						var openDock = _.first(openDock, 10)
					})

				}
			}
			//not really sure where this fits if you're nesting functions
			$.ajax(ajaxSettings) //this returns an array of objects
		}	



$(document).on("ready", function(){

	$(".submit").on("click", function(){

		findDocks(function(data){//not totally clear why this works. but okay.



			_.each(data, function(index){
				
				$(".results").append("<div class='name'>"+index.name+"</div>", "<div class='docks'>Open Docks: "+index.docks+"</div><br>")
							// index.name+"\nOpen docks: "+index.docks+"\n\n"
			})

		


		})
		//returns what appears to be an array of objects
		//so, work through that and pull out station name and address...

	})

//then, make it take in the number
//only return say, 10 items


//then, hopefully, geolocation - that's when to use limited items


})