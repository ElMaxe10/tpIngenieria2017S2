function IncidentsLoader(url) {
  this.url=url;
  var latlngs=[];
  this.finishedLoad= false;

  this.loadIncidents= function(map,types){

    //modifico el html para mostrar la info de la incidencia
    function mostrarDatos(incident){
      var tipo = types.getTipo(incident.type);
      console.log(tipo);
      incident = "<h3> incident " +
        tipo.description +
        "</small>" +
        "</h3>";
      $("#incident").hide();
      $("#incident").empty();
      $("#incident").append(incident);
      $("#incident").show(500);
    }

    // recibe el listado de incidencias a procesar
    function generarArrayDeIncidentPositions(incidentList) {
        console.log("generando array de coordenadas de incidencias:  ");
        incidentList.forEach(function(incident) {
            console.log("coordenada: " + incident.lat + ", " + incident.lon);
            latlngs.push([incident.lat, incident.lon]);
        });
    }

    function cargarIncidents(incidentListResponse, self) {  // self es una referencia a si mismo que se usa para poder actualizar la variable finishedLoad a true
        console.log("callback llamado");
        var incidentLayer = L.featureGroup().addTo(map); // es un layer de leaflet que facilita asociar una o varias funciones a cada elemento que compone ese layer/grupo

        // Agregamos el layer al control
        map.layersControl.addOverlay(incidentLayer, "Incidents");

        console.log("añadiendo incidencias a mapa");
        incidentListResponse.incidents.forEach(function(incident) { // recorre la lista de incidencias
            marker = L.circleMarker([incident.coordinate.lat, incident.coordinate.lon], {
                radius: 5,
                fillColor: "red",
                color: "black",
                weight: 1,
                opacity: 1,
                fillOpacity: 1
            });

            marker.on('click', function() { //muestra los datosde la incidencia

                mostrarDatos(incident);
                var tipo = types.getTipo(incident.type);
                //generamos el popup para que se muestre al hacer clik sobre la incidencia.
                incidentLayer.bindPopup(tipo.description + " Delay: " + tipo.delay);
            });
            incidentLayer.addLayer(marker);
        });
        self.finishedLoad = true;
    }




    console.log("ejecutando request sobre url: " + url);
    requestJSON(url, cargarIncidents, this);


  }

}
