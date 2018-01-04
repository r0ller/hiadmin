sap.ui.define([
   "sap/ui/core/mvc/Controller",
   "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";
    return Controller.extend("hiadmin.controller.fileEditorController", {
        onInit : function() {
            var eventBus = this.getOwnerComponent().getEventBus();
            // 1. ChannelName, 2. EventName, 3. Function to be executed, 4. Listener
            eventBus.subscribe("fileEditor", "navigate", this.onNavigate, this);
        },
        onNavigate : function(channel, event, data) {
            var self = this;
            var userName = this.getView().getModel().getProperty("/user/name");
            var model = this.getView().getModel().getProperty("/editor/model");
            this.getView().getModel().setProperty("/editor/filename",data);
	        $.ajax({
	            url: "https://hidbp1942286791trial.hanatrial.ondemand.com/p1942286791trial/hiadmin/db.xsjs",
	            type: "GET",
	            data: {action: "readModelFile", user: userName, model: model, file: data},
	            headers : {"Access-Control-Allow-Origin" : "*"},
	            success: function(result){
                    if(result!=0){
                        //alert("content:"+result);
                        self.getView().byId("idTextAreaFileEditor").setValue(result);
                    }
                    else{
                        var file = new JSONModel("model/"+data);
                        file.attachRequestCompleted(function() {
                            self.getView().byId("idTextAreaFileEditor").setValue(file.getJSON());
                        });
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
        },
        onSave: function(){
            var userName = this.getView().getModel().getProperty("/user/name");
            var model = this.getView().getModel().getProperty("/editor/model");
            var fileName = this.getView().getModel().getProperty("/editor/filename");
            var fileContent = this.getView().byId("idTextAreaFileEditor").getValue();
            fileContent = fileContent.split("'").join("\'\'");
	        $.ajax({
	            url: "https://hidbp1942286791trial.hanatrial.ondemand.com/p1942286791trial/hiadmin/db.xsjs",
	            type: "POST",
	            data: {action: "writeModelFile", user: userName, model: model, file: fileName, filecontent: fileContent},
	            headers : {"Access-Control-Allow-Origin" : "*"},
	            success: function(result){
                    if(result==true){
                        alert("file saved!");
                    }
                    else{
                        alert("error: "+result);
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
        },
        onBack: function(event){
            var app = sap.ui.getCore().byId("idAppHi");
            app.to("idViewEditor");
        }
    });
});