export interface RGBA {
  red: number;
  blue: number;
  green: number;
  alpha: number;
}

export interface TicketColors {
  titleColor: RGBA;
  detailColor: RGBA;
  buttonBackgroundColor: RGBA;
  buttonBackgroundHoverColor: RGBA;
  buttonTextColor: RGBA;
  ticketBackground?: RGBA;
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