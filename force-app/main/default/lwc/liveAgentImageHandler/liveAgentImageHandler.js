import { api, LightningElement } from 'lwc';
import { track } from 'lwc';

const AGENT_USER_TYPE = 'agent';
const FILES_UPLOADED_TAG = '<filesUploaded>';
const DISABLE_DEFAULT_OUTPUT_EVENT = 'disabledefaultoutput';

export default class LiveAgentImageHandler extends LightningElement {
    @api rawMessage;
    @api userType;
    @track _shouldHandle = false;
    @track _formattedImages = '';

    connectedCallback() {
        this.clearState();
        if (this.userType !== AGENT_USER_TYPE) {
            return;
        }
        var messageTag = this.getMessageTag();
        if (messageTag === null) {
            return;
        }
        this._formattedImages = this.buildFormattedImages(messageTag);
        this._shouldHandle = true;
        this.dispatchNewEvent(DISABLE_DEFAULT_OUTPUT_EVENT);
    }

    clearState() {
        this._shouldHandle = false;
        this._formattedImages = '';
    }

    getMessageTag() {
        if (this.rawMessage.includes(FILES_UPLOADED_TAG)) {
            return FILES_UPLOADED_TAG;
        } 
        return null;
    }

    buildFormattedImages(messageTag) {
        var formattedImages = [];
        this.getJsonModals(messageTag).forEach(function(image, index)  {
            if (messageTag === FILES_UPLOADED_TAG) {
                formattedImages.push('<a href="' + image.downloadUrl + '" download><img src="' + image.downloadUrl + '" width="150" height="150" style="margin-bottom: 5px"></a>');
            }
        });
        return formattedImages.join('<br/>');
    }

    getJsonModals(messageTag) {
        return JSON.parse(this.rawMessage.match(new RegExp(messageTag + "(.*)" + messageTag))[1]);
    }

    dispatchNewEvent(eventName) {
        this.dispatchEvent(new CustomEvent(eventName));
    }
}