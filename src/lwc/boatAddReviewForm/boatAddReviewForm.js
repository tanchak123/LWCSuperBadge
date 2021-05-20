import {LightningElement, api} from 'lwc';
import BOAT_REVIEW_OBJECT from '@salesforce/schema/BoatReview__c';
import NAME_FIELD from '@salesforce/schema/BoatReview__c.Name';
import COMMENT_FIELD from '@salesforce/schema/BoatReview__c.Comment__c';
import BOAT_FIELD from '@salesforce/schema/BoatReview__c.Boat__c';
import RATING_FIELD from '@salesforce/schema/BoatReview__c.Rating__c';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import { createRecord } from 'lightning/uiRecordApi';
const SUCCESS_TITLE = 'Review Created!';
const SUCCESS_VARIANT = 'success';

export default class BoatAddReviewForm extends LightningElement {
    // Private
    @api boatId;
    @api rating = 3;
    boatReviewObject = BOAT_REVIEW_OBJECT;
    nameField        = NAME_FIELD;
    commentField     = COMMENT_FIELD;
    labelSubject = 'Review Subject';
    labelRating  = 'Rating';

    // Public Getter and Setter to allow for logic to run on recordId change
    @api get recordId() {
        return this.boatId;
    }
    set recordId(value) {
        //sets boatId attribute
        //sets boatId assignment
        this.setAttribute('boatId', value);
        this.boatId = value;
    }

    // Gets user rating input from stars component
    handleRatingChanged(event) {
        console.log('handleRatingChanged: ');
        this.rating = event.detail.rating;
        console.log(this.rating);
    }

    // Custom submission handler to properly set Rating
    // This function must prevent the anchor element from navigating to a URL.
    // form to be submitted: lightning-record-edit-form
    handleSubmit(event) {
        console.log(event);
        console.log(event.detail);
        event.preventDefault();
        const fields = event.detail.fields;
        fields.Boat__c = this.boatId;
        fields.Rating__c = this.rating;
        this.template.querySelector('lightning-record-edit-form').submit(fields);
        // console.log('fields:' + fields);
        // console.log(fields);
        // const recordInput = {apiName : BOATREVIEW_OBJECT.objectApiName, fields};
        // createRecord(recordInput)
        //     .then (() => {
        //         this.dispatchEvent(
        //             new ShowToastEvent({
        //                 title: 'Success',
        //                 message: TOAST_TITLE,
        //                 variant: TOAST_SUCCESS_VARIANT
        //             })
        //         );
        //         this.dispatchEvent(new CustomEvent('reviewadded'));
        //     })
        //     .catch(error => {
        //         this.dispatchEvent({
        //             title: 'Error creating record',
        //             message: error.body.message,
        //             variant: 'error'
        //         });
        //     });
        console.log('handleSubmit: ');
    }

    // Shows a toast message once form is submitted successfully
    // Dispatches event when a review is created
    handleSuccess() {
        // TODO: dispatch the custom event and show the success message
        const evt = new ShowToastEvent(
            {title : SUCCESS_TITLE,
            variant : SUCCESS_VARIANT}
        );
        this.dispatchEvent(evt);
        this.dispatchEvent(new CustomEvent('createreview'));
        this.handleReset();
    }

    // Clears form data upon submission
    // TODO: it must reset each lightning-input-field
    handleReset() {
        const inputFields = this.template.querySelectorAll('lightning-input-field');
        if(inputFields) {
            inputFields.forEach(field => {
                field.reset();
            });
        }
    }
}