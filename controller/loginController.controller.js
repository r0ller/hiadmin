sap.ui.define([
   "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";
    return Controller.extend("hiadmin.controller.loginController", {
    onLogin: function () {
        var self = this;
        var userName = this.getView().getModel().getProperty("/user/name");
        var pw = this.getView().getModel().getProperty("/user/password");
        $.ajax({
            url: "https://hidbp1942286791trial.hanatrial.ondemand.com/p1942286791trial/hiadmin/auth.xsjs",
            type: "GET",
            data: {action: "logon", user: userName, pw: pw},
            headers : {"Access-Control-Allow-Origin" : "*"},
            success: function(result){
            	console.log("handleLoginResponse succeeded");
            	if(result == true){
			        $.ajax({
			            url: "https://hidbp1942286791trial.hanatrial.ondemand.com/p1942286791trial/hiadmin/db.xsjs",
			            type: "GET",
			            data: {action: "readModels", user: userName},
			            headers : {"Access-Control-Allow-Origin" : "*"},
			            success: function(models){
		                    if(models!=0){
		                        //alert("result is:"+models);
		                        var modelArray=JSON.parse(models);
		                        for(var i=0;i<modelArray.length;++i){
		                            //console.log("/models/"+i+":"+modelArray[i]);
		                            self.getView().getModel().setProperty("/models/"+i,modelArray[i]);
		                        }
		                    }
		                    else{
		                        alert("nothing found!");
		                    }
			            },
						error: function(result){
							console.log("error: "+result);
						},
						xhrFields: { 
						      withCredentials: true
						   },
						crossDomain: true
			        });
				var app = sap.ui.getCore().byId("idAppHi");
				app.to("idViewModels");
            	}
            },
			error: function(result){
				console.log("error: "+result);
			},
			xhrFields: { 
			      withCredentials: true
			   },
			crossDomain: true
        });
        }
    });
});