export type PartnerStore = {
  name: string;
  logo: string;
  url?: string;
};

export const partnerStores: PartnerStore[] = [
  {
    name: "Mosali Boutique",
    logo: "/images/stores/mosali_logo.png",
    url: "https://mosali.cl",
  },
  {
    name: "MKD London",
    logo: "/images/stores/mkdlondon-logo.jpg",
    url: "https://www.mkdlondon.cl/",
  },
];
