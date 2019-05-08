export interface VacaEvent {
    id: number;
    userId: string;
    vacationId: number;
    eventTypeId: number;
    locationName: string;
    googlePlaceId: string;
    name: string;
    description: string;
    imagesource: string;
    startDate: Date;
    endDate: Date;
    cost: number;
}