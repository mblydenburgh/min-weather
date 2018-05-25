function geo(){
  
  // Check is geolocation is available in current browser
  if(!navigator.geolocation){
    $("#coords").html("<p> Geolocation not available </p>");
    return;
   } 

  function success(position){
    var lon = position.coords.longitude;
    var lat = position.coords.latitude;
    $("#coords").html("<p> Longitude: " + lon + ", Latitude: " + lat + "</p>");
    var API = '2ad17e1093ca34ee2d8d13cd68be2b5e';
    var url ='https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&APPID=';
    url += API;
    console.log(url);
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'text';
    
    request.onload = function(){
      var strData = request.response;
      var data = JSON.parse(strData);
      $('#city').html(data.name + ', ' + data.sys.country);
      var tempC = Math.round(data.main.temp - 273.15);
      var tempF = Math.round((tempC + 273.15)*1.8-459.67);
      //tempC code = &#8451
      //tempF code = &#8457
      $('#tempImp').html(tempF + '&#8457');
      $('#tempMet').html(tempC + '&#8451');
      var iconUrl = 'https://openweathermap.org/img/w/' + data.weather[0].icon +'.png';
      $('#summary').html(data.weather[0].description + "<img src='" + iconUrl +"'></img>");
      $("#convert").click(function(){
           $("#tempImp").toggle();
           $("#tempMet").toggle();
      });
    }
    request.send();
  }
  
  function error(){
    output.innerHTML = "<p>Unable to retrieve location</p>";
  }
  
  $('#coords').html("<p>Triangulating satilites...</p>");
  navigator.geolocation.getCurrentPosition(success,error);

}
