function DriversLoader(url) {
    this.url = url;
    this.finishedLoad = false;

    var driversArray = [];
    this.loadDriversTo = function(race, positionsLoader) {

        // recibe los conductores a procesar
        function generarArrayDeDrivers(driversData) {
            console.log("generando array de conductores:");
            driversData.forEach(function(driverD) {
                // creamos un objeto driver porque el mismo tiene comportamiento que no viene en el json.
                var driver = new Driver(driverD.id,
                    driverD.name,
                    driverD.surname,
                    driverD.sponsor,
                    driverD.surname
                );
                console.log(driver.showDetails());
                driversArray.push(driver);
            });
        }

        function cargarDrivers(driversResponse, self) {
            console.log("callback llamado");
            generarArrayDeDrivers(driversResponse.drivers);

            console.log("añadiendo conductores a carrera");
            driversArray.forEach(function(driver) {
                race.addDriver(driver);
                console.log(driver.showDetails() + " añadido");
            });

            // Se llama al siguiente loader para que asocie las posiciones a los conductores.
            console.log("loadPositions");
            positionsLoader.loadDriversPositionsTo(race);
            // Se carga la lista de conductores en el documento html.
            race.loadListOfDrivers();
            self.finishedLoad = true;
        }

        console.log("ejecutando request sobre url: " + url);
        requestJSON(url, cargarDrivers, this);

    }
}
