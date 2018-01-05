sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"hiadmin/model/models"
], function(UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("hiadmin.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);
            var oModel = new sap.ui.model.json.JSONModel("model/model.json");
            this.setModel(oModel);

			// set the device model
			//this.setModel(models.createDeviceModel(), "device");
		},
        createContent: function(){
            //http://stackoverflow.com/questions/28492850/sapui5-component-metadata-rootview-parameter-for-jsonview
            var loginPage = sap.ui.view({id:"idViewLogin", viewName:"hiadmin.view.loginView", type:sap.ui.core.mvc.ViewType.JS});
            var editorPage = sap.ui.view({id:"idViewEditor", viewName:"hiadmin.view.editorView", type:sap.ui.core.mvc.ViewType.JS});
            var fileEditorPage = sap.ui.view({id:"idViewFileEditor", viewName:"hiadmin.view.fileEditorView", type:sap.ui.core.mvc.ViewType.JS});
            var modelPage = sap.ui.view({id:"idViewModels", viewName:"hiadmin.view.modelView", type:sap.ui.core.mvc.ViewType.JS});
            var app = new sap.m.App("idAppHi",{initialPage:"idViewLogin"});
            app.addPage(loginPage);
            app.addPage(editorPage);
            app.addPage(fileEditorPage);
            app.addPage(modelPage);
            return app;
        }
	});
});