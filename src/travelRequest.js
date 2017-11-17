  var TravelRequest = function(name, map) {
    this.name = name; // nombre de la carrera
    this.map = map; // mapa de la carrera
    this.driversData = []; //arreglo de conductores, aca se agregan instancias de driver.
    this.finishedLoad; // en un boolean, como es null, te lo devuelve con false por defecto

    // dada una posición, busca el conductor al que le corresponde
    // y la asocia al mismo.
    this.bindDriverPosition = function(driverPosition) {
        this.driversData.forEach(function(data) {
            var driver = data.driver;
            if (driver.id == driverPosition.id) {
                driverPosition.positions.forEach(function(position) {
                    driver.addPosition(position.lat, position.lon);
                });

                console.log("posiciones asociadas a " + driver.showDetails() + " posiciones:");
                driver.historyPositions.forEach(function(position) {
                    console.log(position);
                });
            }
        });
        this.finishedLoad = true;
    }

    this.addDriver = function(driver) {
      // Creamos el layer en el mapa para ese conductor
        var driverLayer = L.featureGroup().addTo(map);
        // porque el mismo permite bindear comportamiento a todos los elementos del layer.
        driverLayer.bindPopup(driver.showDetails()); // bindeo de un popup a todos los markers del grupo.

        // Agregamos el layer al control
        this.map.layersControl.addOverlay(driverLayer, driver.name);
        // funcion que dibuja al conductor en el mapa.
        var updater = function(newPosition, color) {
          console.log(color);
            if (typeof newPosition != "undefined") {
                console.log("Updating view for driver: " + driver.name + "!!");
                console.log(newPosition);

                // borrando el auto ya mostrado.
                driverLayer.clearLayers();

                var auto= "./imagenes/auto.png";

                var myIcon = L.icon({
                  iconUrl: './imagenes/auto.png',
                  iconSize: [38, 95],
                  iconAnchor: [22, 94],
                  popupAnchor: [-3, -76],
                  shadowUrl: './imagenes/auto.png',
                  shadowSize: [68, 95],
                  shadowAnchor: [22, 94]
                });

                var marker = L.circleMarker(newPosition, {
                    radius: 10,
                    fillColor:"" + color,
                    color: "black",
                    weight: 1,
                    opacity: 100,
                    fillOpacity: 100
                });

                // dibujando el auto en el mapa
                driverLayer.addLayer(marker);
                //driverLayer.createIcon(myIcon);
            }
        }

        // agregar a la carrera cada conductores, con el updater asociado
        this.driversData.push({
            driver: driver,
            updater: updater
        })
    }

    // funcion que carga el listado de conductores en el documento html
    this.loadListOfDrivers = function() {
        console.log("cargando lista de conductores length: " + this.driversData.length);
        this.driversData.forEach(function(data) {
            var driver = data.driver;
            var itemList = "<a class=\"list-group-item\"><button class=\"list-group-item-heading\" onClick=\"iniciar("+driver.id+")\"> " + driver.name + " " + driver.surname + "<p class=\"list-group-item-text\">" + "Score: "+driver.score + " Car: " + driver.descriptionCar +" Color: "+ driver.colorCar +" Plate number: "+ driver.plateNumberCar +" Year: "+ driver.yearCar + "</p></a</button>";
            $("#drivers").append(itemList);
        });
    }

    this.startTravel = function(id){
        
        this.driversData.forEach(function(data) {
            var driver = data.driver;
            if(driver.id == id){
                driver.travel(data.updater);
            }
        });
    }

};
