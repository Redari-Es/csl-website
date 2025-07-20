// types.ts
export interface NavItemType {
  key: string;
  name: string;
  href: string;
  hasSubItems: boolean;
  subItems?: {
    name: string;
    href: string;
    description?: string;
  }[];
}