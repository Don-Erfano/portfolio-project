export interface NavItem {
  id: number;
  label: string;
  sectionId: string;
}

export const navItems: NavItem[] = [
  { id: 1, label: 'INTRO', sectionId: 'intro' },
  { id: 2, label: 'UI/UX & LOGO DESIGNS', sectionId: 'ui-ux' },
  { id: 3, label: 'POSTERS', sectionId: 'posters' },
  { id: 4, label: '3D ARTS & ANIMATIONS', sectionId: '3d-arts' },
];
