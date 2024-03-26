export interface MeetingInterface {
  sobject: string;
  agent: string;
  client: string;
  schedulingDate: string;
  meetingDate: string;
  summary?: string
}

class Meeting implements MeetingInterface {
  constructor(
    public sobject: string,
    public agent: string,
    public client: string,
    public schedulingDate: string,
    public meetingDate: string
  ) {}
//   static createMeeting() {}
}
