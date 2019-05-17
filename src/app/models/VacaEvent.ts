export interface VacaEvent {
    ID?: number;
    User?: string;
    VacationID?: number;
    EventTypeID: number;
    LocationName?: string;
    GooglePlaceId?: string;
    Name: string;
    Description: string;
    Imagesource?: string;
    StartDate: Date;
    EndDate?: Date;
    Cost?: number;
}