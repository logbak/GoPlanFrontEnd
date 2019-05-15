export interface VacaEvent {
    ID?: number;
    User?: string;
    VacationId?: number;
    EventTypeId: number;
    LocationName?: string;
    GooglePlaceId?: string;
    Name: string;
    Description: string;
    Imagesource?: string;
    StartDate: Date;
    EndDate?: Date;
    Cost?: number;
}