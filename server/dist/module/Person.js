"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Person {
    constructor(name, email, phone, type) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.type = type;
    }
    scheduleMeeting(meetingInformation) {
        console.log(`meeting: ${meetingInformation.sobject}, with ${meetingInformation.agent} and ${meetingInformation.client}`);
    }
    static getAll(type) {
        if (type === "AGENT") {
            console.log("AGENT");
        }
        else if (type === "CLIENT") {
            console.log("CLIENT");
        }
    }
}
exports.default = Person;
