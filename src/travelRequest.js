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
        var driverLayer = L.featureGroup().addTo(this.map); // es un featureGroup
        // porque el mismo permite bindear comportamiento a todos los elementos del layer.
        driverLayer.bindPopup(driver.showDetails()); // bindeo de un popup a todos los markers del grupo.

        // Agregamos el layer al control
        this.map.layersControl.addOverlay(driverLayer, driver.name);
        // funcion que dibuja al conductor en el mapa.
        var updater = function(newPosition) {
            if (typeof newPosition != "undefined") {
                console.log("Updating view for driver: " + driver.name + "!!");
                console.log(newPosition);
                // borando los markers ya mostrados.
                driverLayer.clearLayers();

                var marker = L.circleMarker(newPosition, {
                    radius: 10,
                    fillColor: "#00AA00",
                    color: "black",
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.5
                });
                //actualizando la posiciones del conductor en el mapa.
                driverLayer.addLayer(marker);
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
            var itemList = "<a class=\"list-group-item\"><button class=\"list-group-item-heading\" onClick=\"iniciar("+driver.id+")\"> " + driver.name + " " + driver.surname + "</button><p class=\"list-group-item-text\">" + "Score: "+driver.score + " Car: " + driver.descriptionCar +" "+ driver.colorCar +" "+ driver.plateNumberCar +" "+ driver.yearCar + "</p></a>";
            $("#drivers").append(itemList);
        });
    }

    this.startTravel = function(id){
        document.getElementById('drivers').style.visibility='hidden';
        this.driversData.forEach(function(data) {
            var driver = data.driver;
            if(driver.id == id){
                driver.travel(data.updater);
            }
        });
    }

};
