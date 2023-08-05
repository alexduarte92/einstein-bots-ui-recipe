import BaseChatMessage from 'lightningsnapin/baseChatMessage';
import { track } from 'lwc';

const CHAT_CONTENT_CLASS = 'chat-content';

export default class PartnerPortalChatCustomMessage extends BaseChatMessage {
    @track _messageStyle = '';
    @track _message = '';
    @track _userType = '';
    @track _shouldRenderDefaultOutput = true;

    connectedCallback() {
        this._userType = this.userType;
        this._messageStyle = `${CHAT_CONTENT_CLASS} ${this.userType}`;
        this._message = this.getRawMessage();
    }

    getRawMessage() {
        let element = document.createElement("div");
        element.innerHTML = this.messageContent.value;
        return element.innerText;
    }

    handleDisableDefaultOutput() {
        this._shouldRenderDefaultOutput = false;
    }
}