export type Navigation = {
  name: string;
  href: string;
  icon: string;
  isSection: boolean;
  children?: Navigation[];
};
