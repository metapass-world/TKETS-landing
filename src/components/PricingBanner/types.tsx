export interface PricingCalculatorData {
  pricePerTicket: number;
  numberOfTicketsSold: number;
}

export const defaultTicketData = {pricePerTicket: 10, numberOfTicketsSold: 100}

export interface ComparisonData {
  name: string;
  data: PricingCalculatorResult;
}

export interface PricingCalculatorInputProps {
  ticketData: PricingCalculatorData[];
  setTicketData: React.Dispatch<React.SetStateAction<PricingCalculatorData[]>>;
  passCostsOn: boolean;
  setPassCostsOn: React.Dispatch<React.SetStateAction<boolean>>;
  requireStamping: boolean;
  setRequireStamping: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface costItem {
  value: number,
  numTimes?: number,
  tfuelValue?: number
}

export interface PricingCalculatorResult {
  actualTicketPrices: number[];
  payout: number;
  costs: {
    [type: string]: costItem
  };
}