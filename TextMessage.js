
exports.TextMessage = function (jsonState){
	
	var that = this;
	var stateWrapper = { _private : {	from: "", fcity: "", fstate: "", fzip: "",
	 									to: "", tcity: "", tstate: "", tzip	: "", 
										body: "",
	 									twilosmssid: "",
	 									twiloacctid:""
									}
						};
	
	function makeGetSet(obj, key){
		return( function(value){

			if(value === undefined){return(obj._private[key]);}
			else{obj._private[key]= value; return(that); }

		});
	}
	
	this.FromPhone = makeGetSet(stateWrapper, "from");
	this.FromCity = makeGetSet(stateWrapper, "fcity");
	this.FromState = makeGetSet(stateWrapper,"fstate");
	this.FromZip = makeGetSet(stateWrapper,"fzip");
	
	this.ToPhone = makeGetSet(stateWrapper,"to");
	this.ToCity = makeGetSet(stateWrapper,"tcity");
	this.ToState = makeGetSet(stateWrapper,"tstate");
	this.ToZip = makeGetSet(stateWrapper,"tzip");
	
	this.Body = makeGetSet(stateWrapper,"body");
	
	this.TwiloSmsSid = makeGetSet(stateWrapper,"twilosmssid");
	this.TwiloAcctId = makeGetSet(stateWrapper,"twiloacctid");

	this.Serialize = function(){return(JSON.stringify(stateWrapper._private));};
	this.Deserialize = function(json){stateWrapper._private = JSON.parse(json);};
	
	if(jsonState){
		that.Deserialize(jsonState);
	}
}