export interface Menu {
    route: string;
    label: string;
    iconClass: string;
    submenu?: SubMenu[];
    hasChildren: boolean;
    hasSubmenu: boolean;
}

export interface SubMenu {
    route: string;
    label: string;
    hasSubmenu: boolean;
    submenu?: SubMenu[];
}