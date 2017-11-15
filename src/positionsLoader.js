function PositionsLoader(url) {
    this.url = url;
    this.finishedLoad = false;
    var driversPositions = [];

    // recibe los datos de posiciones a procesar
    this.loadDriversPositionsTo = function(race) {

        function generarArrayDeDriversPositions(driversPositionsData) {

            console.log("generando array de positions:");
            driversPositionsData.forEach(function(data) {
                var positionsData = [];

                data.positions.forEach(function(position) {
                    positionsData.push(new Position(position.lat, position.lon));
                });

                var driverPosition = {
                    id: data.driver,
                    positions: positionsData
                };
                console.log(driverPosition.positions);
                driversPositions.push(driverPosition);
            });
        }

        function cargarDriversPositions(DriversPositionsResponse, self) {

            console.log("callback llamado");
            generarArrayDeDriversPositions(DriversPositionsResponse.positions);

            console.log("asociando posiciones a conductores");
            driversPositions.forEach(function(driverPosition) {
                race.bindDriverPosition(driverPosition);
            });

            self.finishedLoad = true;
        }

        console.log("ejecutando request sobre url: " + url);
        requestJSON(url, cargarDriversPositions, this);
    }
}
