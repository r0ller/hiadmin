sap.ui.jsview("hiadmin.view.editorView", {  // this View file is called editorView.view.js within ./view/
   
    getControllerName: function() {
        return "hiadmin.controller.editorController";     // the Controller lives in editorController.controller.js
    },

    createContent: function(editorController) {
        var modelFiles = new sap.m.Table("modelFiles", {   
            headerText : "Model Files",
            headerDesign : sap.m.ListHeaderDesign.Standard,
            mode : sap.m.ListMode.None,
            includeItemInSelection : false,
            columns: [
                new sap.m.Column({
                    width : "1em",
                    header : new sap.m.Label({
                        text : "File Name"
                    })
                }),
                new sap.m.Column({
                    width : "1em",
                    header : new sap.m.Label({
                        text : "Edit"
                    })
                })
            ]
        });
        jQuery.sap.require("sap.ui.core.IconPool");
        //taken from example code link in https://archive.sap.com/discussions/thread/3544906
        modelFiles.bindItems("/modelfiles", new sap.m.ColumnListItem({
            cells : [ new sap.m.Text({
                text : "{}"
                }), new sap.m.Button({
                icon : "sap-icon://edit",
            press: function(event){editorController.onEdit(event);}
            })]
          }));
        var flexbox = new sap.m.FlexBox({direction:"Column"});
        var modelText = new sap.m.Text("modelInEditor",{text:"{/editor/model}"});
        var buildMenu = new sap.m.Menu("idBuildMenu", {title: "Build"});
//		sap.m.MenuItem press event does not trigger, so need to live with sap.m.Menu's attachItemSelected
//		https://github.com/SAP/openui5/issues/1505
//		var buildMenuItemFoma = new sap.m.MenuItem("idBuildFoma",{text: "Phonology & Morphology",press: function(event){alert("clicked!");}});
		var buildMenuItemFoma = new sap.m.MenuItem("idBuildFoma",{text: "Phonology & Morphology"});
		buildMenu.addItem(buildMenuItemFoma);
		var buildMenuItemBison = new sap.m.MenuItem("idBuildBison",{text: "Grammar & Semantics"});
		buildMenu.addItem(buildMenuItemBison);
		var buildMenuItemDb = new sap.m.MenuItem("idBuildDb",{text: "Configuration"});
		buildMenu.addItem(buildMenuItemDb);
		var buildMenuItemAll = new sap.m.MenuItem("idBuildAll",{text: "All"});
		buildMenu.addItem(buildMenuItemAll);
		var buildMenuButton = new sap.m.MenuButton("idButtonBuild",{text:"Build"});
		buildMenu.attachItemSelected(function(event){
			var menuItemId = event.getParameter("item").toString();
			menuItemId = menuItemId.substring(menuItemId.lastIndexOf("#")+1,menuItemId.length);
			//var itemText = menuItem.getText();
			//alert("Item \"" + menuItemId + "\" was selected.");
			if(menuItemId === "idBuildFoma"){
				editorController.onBuildFoma(event);
			}
			else if(menuItemId === "idBuildBison"){
				editorController.onBuildBison(event);
			}
			else if(menuItemId === "idBuildDb"){
				editorController.onBuildDb(event);
			}
			else if(menuItemId === "idBuildAll"){
				editorController.onBuildAll(event);
			}
		});
		buildMenuButton.setMenu(buildMenu);
        flexbox.addItem(modelText);
        flexbox.addItem(modelFiles);
        //flexbox.addItem( new sap.m.Button('idButtonBuild',{text:"Build",press: function(){editorController.onBuild();}}));
        flexbox.addItem(buildMenuButton);
        flexbox.setAlignItems("Center");
        flexbox.setJustifyContent("Center");
        return new sap.m.Page("idPageEditor",{
            title:"Editor",
            content:flexbox,
            showNavButton: true,
            navButtonPress: function(){editorController.onBack();}
        });
    }

});