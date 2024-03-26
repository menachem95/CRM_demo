import { log } from "console";
import { MeetingInterface } from "./Meeting";

type UserRole = "AGENT" | "CLIENT";

export default abstract class User {
  constructor(
    public name: string,
    public email: string,
    public phone: string,
    private type: UserRole
  ) {}
  public scheduleMeeting(meetingInformation: MeetingInterface) {
    console.log(
      `meeting: ${meetingInformation.sobject}, with ${meetingInformation.agent} and ${meetingInformation.client}`
    );
  }
  static getAll(type: UserRole) {
    if (type === "AGENT") {
        console.log("AGENT");
    } else if (type === "CLIENT") {
        console.log("CLIENT");
    }
  }
}

