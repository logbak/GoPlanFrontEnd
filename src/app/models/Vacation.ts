export interface Vacation{
    ID?: number;
    UserID: string;
    CreatedDate: Date;
    StartDate: Date;
    EndDate: Date;
    Name: string;
    Description?: string;
    TotalCost?: number;
    ImageSource?: string;
    EventList?: string;
    Attendees?: string;
}