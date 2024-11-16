import { MENU_ITEMS, HORIZONTAL_MENU_ITEMS, MenuItemTypes } from '../constants/menu';
import { Navigate,NavigateTypes } from '../constants/navigate';
const getMenuItems = () => {
    // NOTE - You can fetch from server and return here as well
    return Navigate;
};

const getHorizontalMenuItems = () => {
    // NOTE - You can fetch from server and return here as well
    return HORIZONTAL_MENU_ITEMS;
};


const findAllParent = (menuItems: NavigateTypes[], menuItem: NavigateTypes): string[] => {
    let parents: string[] = [];
    const parent = findMenuItem(menuItems, menuItem['parentKey']);

    if (parent) {
        parents.push(parent['label']);
        if (parent['parentKey']) parents = [...parents, ...findAllParent(menuItems, parent)];
    }

    return parents;
};

const findMenuItem = (
    menuItems: NavigateTypes[] | undefined,
    menuItemLabel: NavigateTypes['label'] | undefined
): NavigateTypes | null => {
    if (menuItems && menuItemLabel) {
        for (var i = 0; i < menuItems.length; i++) {
            if (menuItems[i].label === menuItemLabel) {
                return menuItems[i];
            }
            var found = findMenuItem(menuItems[i].children, menuItemLabel);
            if (found) return found;
        }
    }
    return null;
};

// const findAllParent = (menuItems: MenuItemTypes[], menuItem: MenuItemTypes): string[] => {
//     let parents: string[] = [];
//     const parent = findMenuItem(menuItems, menuItem['parentKey']);

//     if (parent) {
//         parents.push(parent['key']);
//         if (parent['parentKey']) parents = [...parents, ...findAllParent(menuItems, parent)];
//     }

//     return parents;
// };

// const findMenuItem = (
//     menuItems: MenuItemTypes[] | undefined,
//     menuItemKey: MenuItemTypes['key'] | undefined
// ): MenuItemTypes | null => {
//     if (menuItems && menuItemKey) {
//         for (var i = 0; i < menuItems.length; i++) {
//             if (menuItems[i].key === menuItemKey) {
//                 return menuItems[i];
//             }
//             var found = findMenuItem(menuItems[i].children, menuItemKey);
//             if (found) return found;
//         }
//     }
//     return null;
// };

export { getMenuItems, getHorizontalMenuItems, findAllParent, findMenuItem };
