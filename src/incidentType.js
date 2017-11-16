function IncidentType(id, description, delay){
  this.id = id;
  this.description = description;
  this.delay = delay;
}

function showDetails() {
    return this.description + " Delay: "+ this.delay;
}
