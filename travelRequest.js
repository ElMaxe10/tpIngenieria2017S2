var TravelRequest = function(name, map) {
    this.name = name;
    this.map = map;
    this.carsData = [];

    this.addCar = function(carDriver) {
        //Creamos el layer en el mapa para ese carDriver
        var carLayer = L.layerGroup().addTo(this.map);
        // Agregamos el layer al control
        this.map.layersControl.addOverlay(carLayer, carDriver.name);

        var updater = function(newPosition) {
            console.log("Updating view for car driver: " + carDriver.name + "!!");
            console.log(newPosition);

            // Opción 1.
            carLayer.addLayer(L.marker(newPosition));
            // Opción 2.
            // carLayer.addLayer(L.circleMarker(newPosition, {
            //                         radius: 7,
            //                         fillColor: "#00AA00",
            //                         color: "#DDD",
            //                         weight: 1,
            //                         opacity: 1,
            //                         fillOpacity: 0.3
            //                     }));
        }

        this.carsData.push({
            carDriver: carDriver,
            updater: updater
        })
    }

    this.start = function() {
        this.carsData.forEach(function(data) {
            var carDriver = data.carDriver;
            carDriver.move(data.updater);
        });
    }
};
