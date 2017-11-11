var CarDriver = function(name, historyPositions) {
    this.name = name;
    this.historyPositions = historyPositions;

    var actualIx = 0;

    this.move = function(callback) {
        var self = this;
        setTimeout(function() {
            callback(historyPositions[actualIx]);

            actualIx += 1;
            if(actualIx < historyPositions.length) {
                self.move(callback);
            }
        }, 1000);
    }
};

