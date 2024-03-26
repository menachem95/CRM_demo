"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Meeting {
    constructor(sobject, agent, client, schedulingDate, meetingDate) {
        this.sobject = sobject;
        this.agent = agent;
        this.client = client;
        this.schedulingDate = schedulingDate;
        this.meetingDate = meetingDate;
    }
}
