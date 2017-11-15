var Driver = function(id, name, surname, score) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.score = score;
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
        setTimeout(function() {
            mapUpdaterConductor(self.historyPositions[indiceActual]);
            indiceActual++;
            if (indiceActual < self.historyPositions.length)
                self.travel(mapUpdaterConductor);
        }, 1000); //1000 ms -> 1 s, la function se ejecuta cada medio segundo.
    }

    this.showDetails = function() {
        return name + " " + surname + " score: " + score;
    }
};
