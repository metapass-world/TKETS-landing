export interface TicketColors {
  titleColor: string;
  detailColor: string;
  buttonBackgroundColor: string;
  buttonBackgroundHoverColor: string;
  buttonTextColor: string;
  ticketBackground?: string;
}

export interface ImageTicketStyleProps {
  colors: TicketColors;
  image: string;
  gutterLeft: boolean;
  fullWidthBackground: boolean;
}

export interface TicketMetadata {
  eventName: string;
  eventLocation: string;
  eventDatetime: string;
  ticketType: string;
  valid: boolean;
}