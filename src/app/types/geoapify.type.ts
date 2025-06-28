export interface GeoapifyResponse {
  features: {
    properties: {
      lat: number;
      lon: number;
      city?: string;
    };
  }[];
}
