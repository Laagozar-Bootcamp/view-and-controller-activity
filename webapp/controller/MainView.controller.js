sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], 
/**
 * 
 * @param {typeof sap.ui.core.mvc.Controller} Controller 
 * @returns 
 */
    (Controller,MessageToast) => {
    "use strict";

    return Controller.extend("com.training.exer1gozar.controller.MainView", {
        onInit() {
        },

        onAddItem: function(){
            //commented this code for now
            //var oTextBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
            //var sMsg = oTextBundle.getText("addButtonMsg");
            //this.fnDisplayMsg(sMsg);

            //Instantiate the fragment
            //Dialog creation (lazy)
            if (!this.oDialog){
                // By using loadFragment, we are adding the fragment as a dependent to the View
                // By doing so, we can use the functions inside the view's controller
                this.oDialog = this.loadFragment({
                    name: "com.training.exer1gozar.fragment.ProductDialog"
                });
            }

            this.oDialog.then(function(oDialog) {
                oDialog.open();
            });
        },

        //code that calls fnDisplayMsg is currently commented out
        fnDisplayMsg: function(sMsg){
            MessageToast.show(sMsg);
        },

        onCloseDialog: function(){
            this.getView().byId("idProductDialog").close();
        },

        onChangeMOP: function(oEvent){
            var sSelectedKey = oEvent.getParameter("selectedItem").getProperty("key");
            var oMobileLabel = this.getView().byId("idLblPhone");
            var oMobileInput = this.getView().byId("idInputPhone");

            var oCredLabel = this.getView().byId("idLblCc");
            var oCredInput = this.getView().byId("idInptCc");
            
            var oTextBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
            var sMsgGCash = oTextBundle.getText("gCashSelect");
            var sMsgCred = oTextBundle.getText("creditSelect");
            var sMsgCod = oTextBundle.getText("codSelect");

            if (sSelectedKey === "GCASH"){
                //show the mobile field
                oMobileLabel.setVisible(true);
                oMobileInput.setVisible(true);
                oCredLabel.setVisible(false);
                oCredInput.setVisible(false);

                MessageToast.show(sMsgGCash);
            }else if (sSelectedKey === "CC"){
                //show credit card field
                oCredLabel.setVisible(true);
                oCredInput.setVisible(true);
                oMobileLabel.setVisible(false);
                oMobileInput.setVisible(false);

                MessageToast.show(sMsgCred);
            }else {
                //oMobileLabel.setVisible(false);
                //oMobileInput.setVisible(false);
                //oCredLabel.setVisible(false);
                //oCredInput.setVisible(false);

                MessageToast.show(sMsgCod);
            }
        },

        onPressCheckout: function (){
            //var oTextBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
            //var sMsg2 = oTextBundle.getText("reqFldBlank")
            //var oInputFNameValue = this.getView().byId("idInptFName").getValue();
            //var oInputLNameValue = this.getView().byId("idInptLName").getValue(); 

            var oInputFName = this.getView().byId("idInptFName");
            var oInputLName = this.getView().byId("idInptLName");
            var oInputFNameValue = oInputFName.getValue();
            var oInputLNameValue = oInputLName.getValue();
            var oRouter = this.getOwnerComponent().getRouter();

            //check if first name is blank and if last name is blank
            if (oInputFNameValue === "" && oInputLNameValue === ""){
                //MessageToast.show(sMsg2);

                oInputFName.setValueState("Error");
                oInputLName.setValueState("Error");
            }else {
                oInputFName.setValueState("None");
                oInputLName.setValueState("None");

                //Navigate to review page passing first
                oRouter.navTo("RouteReviewPage", {
                    firstName: oInputFNameValue
                });
            }
        },

        onPressTestMsg: function(){
            if (!this.oDialog){
                // By using loadFragment, we are adding the fragment as a dependent to the View
                // By doing so, we can use the functions inside the view's controller
                this.oDialog = this.loadFragment({
                    name: "com.training.exer1gozar.fragment.CSSDialog"
                });
            }

            this.oDialog.then(function(oDialog) {
                oDialog.open();
            });
        },

        onPressCloseMsgDialog: function(){
            this.getView().byId("idMsgDialog").close();
        },
    });
});