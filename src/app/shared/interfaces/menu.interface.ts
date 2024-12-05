export interface Menu {
    route: string;
    label: string;
    iconClass: string;
    submenu?: SubMenu;
    hasSubmenu: boolean;
}

export interface SubMenu {
    route: string;
    label: string;
}