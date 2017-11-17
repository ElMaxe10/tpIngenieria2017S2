function incidentTypes(url){
	this.url= url;
	var incidencias=[];

	function cargarIncidentsTypes(response){
		for(i=0;i<response.incidenttypes.length;i++){
			var incident=response.incidenttypes[i]
			incidencias.push(new IncidentType(incident.id,incident.description,incident.delay));
		}
		console.log(incidencias);
	}

	this.getTipo=function(id){
		for(i=0;i<incidencias.length;i++){
			if(incidencias[i].id == id){
				console.log("aca esta la incidencia" + incidencias[i]);
				return incidencias[i];
			}
		}
	}

	this.requestIncidencias= requestJSON(url,cargarIncidentsTypes,this);

}
