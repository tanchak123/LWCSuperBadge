import {LightningElement, api} from 'lwc';

import {NavigationMixin} from "lightning/navigation";
import getAllReviews from '@salesforce/apex/BoatDataService.getAllReviews'
// imports
export default class BoatReviews extends NavigationMixin(LightningElement) {
    // Private
    boatId;
    error;
    boatReviews;
    isLoading;

    // Getter and Setter to allow for logic to run on recordId change
    @api get recordId() {
        return this.boatId;
    }
    set recordId(value) {
        //sets boatId attribute
        //sets boatId assignment
        //get reviews associated with boatId
        this.setAttribute('boatId', value);
        this.boatId = value;
        this.getReviews();
    }

    // Getter to determine if there are reviews to display
    @api get reviewsToShow() {
        return this.boatReviews && this.boatReviews.length > 0 ? true : false;
    }

    // Public method to force a refresh of the reviews invoking getReviews
    @api
    refresh() {
        this.getReviews();
    }

    // Imperative Apex call to get reviews for given boat
    // returns immediately if boatId is empty or null
    // sets isLoading to true during the process and false when it’s completed
    // Gets all the boatReviews from the result, checking for errors.
    getReviews() {
        if (this.boatId == null || this.boatId == '') {
            return;
        }
        this.isLoading = true;
        this.error = undefined;
        getAllReviews({boatId : this.boatId}).then(result => {
            this.boatReviews = result;
            this.isLoading = false;
        }).catch(error => {
            this.boatReviews = undefined;
            this.error = error;
        });
    }

    // Helper method to use NavigationMixin to navigate to a given record on click
    navigateToRecord(event) {
        this[NavigationMixin.Navigate](
            {
                type: 'standard__recordPage',
                attributes: {
                    recordId: event.target.dataset.recordId,
                    objectApiName: 'User',
                    actionName: 'view'
                }
            }
        );
    }
}