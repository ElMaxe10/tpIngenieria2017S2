var Driver = function(id, name, surname, score, idCar, description, color, plateNumber, year) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.score = score;
    this.idCar = idCar;
    this.descriptionCar = description;
    this.colorCar = color;
    this.plateNumberCar = plateNumber;
    this.yearCar = year;
    this.historyPositions = [];
    this.addPosition = function(lat, lon) {
        this.historyPositions.push(new Position(lat, lon));
    }

    //inicialización del indice para recorrer el arreglo de posiciones
    //historicas
    var indiceActual = 0;
    //function que recorre las posiciones una a una
    //ejecutando la function callback pasada como parametro
    this.travel = function(mapUpdaterConductor) {
        var self = this;
        colorC = this.colorCar;
        setTimeout(function() {
            mapUpdaterConductor(self.historyPositions[indiceActual], colorC);
            indiceActual++;
            if (indiceActual < self.historyPositions.length)
                self.travel(mapUpdaterConductor);
        }, 500); //1000 ms -> 1 s, la function se ejecuta cada medio segundo.
    }

    this.showDetails = function() {
        return name + " " + surname + " score: " + score + " Car: "+ this.descriptionCar + " " + this.colorCar + " " + this.plateNumberCar + " " + this.yearCar;
    }
};
