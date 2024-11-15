import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';
import classNames from 'classnames';

// hooks
import { useUser } from '../hooks';

//helpers
import { findAllParent, findMenuItem } from '../helpers/menu';

// constants
// import { MenuItemTypes } from '../constants/menu';
//import { NavigateTypes } from '../constants/navigate';

export type NavigateTypes = {
    label: string;
    isTitle?: boolean;
    icon?: string;
    url?: string;
    badge?: {
        variant: string;
        text: string;
    };
    parentKey?: string;
    target?: string;
    children?: NavigateTypes[];
};

type SubMenus = {
    item: NavigateTypes;
    linkClassName?: string;
    subMenuClassNames?: string;
    activeMenuItems?: Array<string>;
    toggleMenu?: (item: NavigateTypes, status: boolean) => void;
    className?: string;
};

const MenuItemWithChildren = ({
    item,
    linkClassName,
    subMenuClassNames,
    activeMenuItems,
    toggleMenu,
    onMenuItemClick,
}: SubMenus & { onMenuItemClick: () => void }) => {
    const [open, setOpen] = useState<boolean>(activeMenuItems!.includes(item.label));

    useEffect(() => {
        setOpen(activeMenuItems!.includes(item.label));
    }, [activeMenuItems, item]);

    const toggleMenuItem = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        const status = !open;
        setOpen(status);
        if (toggleMenu) toggleMenu(item, status);
        return false;
    };

    return (
        <li className={classNames('side-nav-item', { 'menuitem-active': open })}>
            <Link
                to="#"
                onClick={toggleMenuItem}
                data-menu-key={item.label}
                aria-expanded={open}
                className={classNames('has-arrow', 'side-sub-nav-link', linkClassName, {
                    'menuitem-active': activeMenuItems!.includes(item.label) ? 'active' : '',
                })}>
                {item.icon && <i className={item.icon} />}
                {!item.badge ? (
                    <span className="menu-arrow"></span>
                ) : (
                    <span className={classNames('badge', 'bg-' + item.badge.variant, 'rounded-pill', 'float-end')}>
                        {item.badge.text}
                    </span>
                )}
                <span> {item.label} </span>
            </Link>
            <Collapse in={open}>
                <div>
                    <ul className={classNames(subMenuClassNames)}>
                        {(item.children || []).map((child, i) => {
                            return (
                                <React.Fragment key={i}>
                                    {child.children ? (
                                        <>
                                            {/* parent */}
                                            <MenuItemWithChildren
                                                item={child}
                                                linkClassName={activeMenuItems!.includes(child.label) ? 'active' : ''}
                                                activeMenuItems={activeMenuItems}
                                                subMenuClassNames="side-nav-third-level"
                                                toggleMenu={toggleMenu}
                                                onMenuItemClick={onMenuItemClick}
                                            />
                                        </>
                                    ) : (
                                        <>
                                            {/* child */}
                                            <MenuItem
                                                item={child}
                                                className={
                                                    activeMenuItems!.includes(child.label) ? 'menuitem-active' : ''
                                                }
                                                onMenuItemClick={onMenuItemClick}
                                                linkClassName={activeMenuItems!.includes(child.label) ? 'active' : ''}
                                            />
                                        </>
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </ul>
                </div>
            </Collapse>
        </li>
    );
};

const MenuItem = ({ item, className, linkClassName, onMenuItemClick }: SubMenus & { onMenuItemClick: () => void }) => {
    return (
        <li className={classNames('side-nav-item', className)}>
            <MenuItemLink item={item} className={linkClassName} onMenuItemClick={onMenuItemClick} />
        </li>
    );
};

const MenuItemLink = ({ item, className, onMenuItemClick }: SubMenus & { onMenuItemClick: () => void }) => {
    return (
        <Link
            to={item.url!}
            target={item.target}
            className={classNames('side-nav-link-ref', 'side-sub-nav-link', className)}
            onClick={onMenuItemClick}
            data-menu-key={item.label}>
            {item.icon && <i className={item.icon} />}
            {item.badge && (
                <span className={classNames('badge', 'bg-' + item.badge.variant, 'rounded-pill', 'float-end')}>
                    {item.badge.text}
                </span>
            )}
            <span> {item.label} </span>
        </Link>
    );
};

/**
 * Renders the application menu
 */
type AppMenuProps = {
    menuItems: NavigateTypes[];
    onMenuItemClick: () => void;
};

const AppMenu = ({ menuItems, onMenuItemClick }: AppMenuProps) => {
    let location = useLocation();

    const menuRef: any = useRef(null);

    const [activeMenuItems, setActiveMenuItems] = useState<Array<string>>([]);

    const [loggedInUser] = useUser();
    const userRights = loggedInUser?.userDetails.userRights || '{}'; // Retrieve user rights
    const userRole = loggedInUser?.userDetails?.role_name; // Retrieve user role

    const Navigate: NavigateTypes[] = [
        { label: 'Navigation', isTitle: true },
        {
            label: 'Dashboard',
            isTitle: false,
            icon: 'mdi mdi-view-dashboard-outline',
            url: '/dashboard',
        },
        ...(['claim_ins', 'claim_upd', 'claim_del'].some((perm) => userRights[perm] || userRole === 'Admin')
            ? [
                { label: 'Claim', isTitle: true },
                {
                    label: 'Claim',
                    isTitle: false,
                    icon: 'mdi mdi-account-check',
                    url: '/claim',
                },
            ]
            : []),
        ...(['staff_leave_ins', 'staff_leave_upd', 'staff_leave_del'].some(
            (perm) => userRights[perm] || userRole === 'Admin'
        )
            ? [
                {
                    label: 'Staff Leave',
                    isTitle: false,
                    icon: 'mdi mdi-account-check',
                    url: '/staff-leave',
                },
            ]
            : []),
        ...(['staff_attendance_ins', 'staff_attendance_upd', 'staff_attendance_del'].some(
            (perm) => userRights[perm] || userRole === 'Admin'
        )
            ? [
                { label: 'Attendance', isTitle: true },
                {
                    label: 'Staff Attendance',
                    isTitle: false,
                    icon: 'mdi mdi-account-check',
                    url: '/staff-attendance',
                },
            ]
            : []),
        { label: 'Allowance', isTitle: true },
        ...(['visit_entry_ins', 'visit_entry_upd', 'visit_entry_del'].some(
            (perm) => userRights[perm] || userRole === 'Admin'
        )
            ? [
                {
                    label: 'Visit Entry',
                    isTitle: false,
                    icon: 'mdi mdi-account-check',
                    url: '/allowance/visit-entry',
                },
            ]
            : []),
        ...(['petrol_allowance_ins', 'petrol_allowance_upd', 'petrol_allowance_del'].some(
            (perm) => userRights[perm] || userRole === 'Admin'
        )
            ? [
                {
                    label: 'Petrol Allowance',
                    isTitle: false,
                    icon: 'mdi mdi-account-check',
                    url: '/allowance/petrol-allowance',
                },
            ]
            : []),
        ...(['holiday_ins', 'holiday_upd', 'holiday_del'].some((perm) => userRights[perm] || userRole === 'Admin')
            ? [
                {
                    label: 'Holiday',
                    isTitle: false,
                    icon: 'mdi mdi-account-cash',
                    url: '/view/holiday',
                },
            ]
            : []),
        ...(['staff_salary_ins', 'staff_salary_upd'].some((perm) => userRights[perm] || userRole === 'Admin')
            ? [
                {
                    label: 'Salary',
                    isTitle: false,
                    icon: 'mdi mdi-account-cash',
                    url: 'staff-salary',
                },
            ]
            : []),
        ...(['master_ins', 'master_upd', 'master_del'].some((perm) => userRights[perm] || userRole === 'Admin')
            ? [
                { label: 'Master', isTitle: true },
                {
                    label: 'Master',
                    isTitle: false,
                    icon: 'mdi mdi-chart-donut-variant',
                    children: [
                        ...(userRole === 'Admin'
                            ? [
                                {
                                    label: 'Branch',
                                    url: '/view/branch',
                                    parentKey: 'Master',
                                },
                            ]
                            : []),
                        {
                            label: 'Transfer Staff',
                            url: '/view/transfer-staff',
                            parentKey: 'Master',
                        },
                        {
                            label: 'Permission',
                            url: '/view/permission',
                            parentKey: 'Master',
                        },
                        {
                            label: 'Attendance Incharge',
                            url: '/view/attendance-incharge',
                            parentKey: 'Master',
                        },
                        {
                            label: 'Staff Advance',
                            url: '/view/staff-advance',
                            parentKey: 'Master',
                        },
                        {
                            label: 'Deputation',
                            url: '/view/deputation',
                            parentKey: 'Master',
                        },
                        {
                            label: 'Department',
                            url: '/view/department',
                            parentKey: 'Master',
                        },
                        {
                            label: 'Activity',
                            url: '/view/activity',
                            parentKey: 'Master',
                        },
                        {
                            label: 'Claim Type',
                            url: '/view/claim-type',
                            parentKey: 'Master',
                        },
                        {
                            label: 'Designation',
                            url: '/view/designation',
                            parentKey: 'Master',
                        },
                        {
                            label: 'Staff',
                            url: '/view/staff',
                            parentKey: 'Master',
                        },
                        {
                            label: 'Proof Type',
                            url: '/view/proof-type',
                            parentKey: 'Master',
                        },
                    ],
                },
            ]
            : []),
        ...(['setting_ins', 'setting_upd', 'setting_del'].some((perm) => userRights[perm] || userRole === 'Admin')
            ? [
                {
                    label: 'Setting',
                    isTitle: false,
                    icon: 'mdi mdi-chart-donut-variant',
                    children: [
                        {
                            label: 'Working Day',
                            url: '/view/setting-working-day',
                            parentKey: 'Setting',
                        },
                        {
                            label: 'Leave Deduction',
                            url: '/view/setting-leave-deduction',
                            parentKey: 'Setting',
                        },
                        {
                            label: 'Benefit',
                            url: '/view/setting-benefit',
                            parentKey: 'Setting',
                        },
                    ],
                },
            ]
            : []),
    ];

    /*
     * toggle the menus
     */
    const toggleMenu = (menuItem: NavigateTypes, show: boolean) => {
        if (show) setActiveMenuItems([menuItem['label'], ...findAllParent(menuItems, menuItem)]);
    };

    /**
     * activate the menuitems
     */
    const activeMenu = useCallback(() => {
        const div = document.getElementById('side-menu');
        let matchingMenuItem = null;

        if (div) {
            let items: any = div.getElementsByClassName('side-nav-link-ref');
            for (let i = 0; i < items.length; ++i) {
                if (location.pathname === items[i].pathname) {
                    matchingMenuItem = items[i];
                    break;
                }
            }

            if (matchingMenuItem) {
                const mid = matchingMenuItem.getAttribute('data-menu-key');
                const activeMt = findMenuItem(menuItems, mid);
                if (activeMt) {
                    setActiveMenuItems([activeMt['label'], ...findAllParent(menuItems, activeMt)]);
                }
            }
        }
    }, [location, menuItems]);

    useEffect(() => {
        activeMenu();
    }, [activeMenu]);

    return (
        <>
            <ul className="side-menu" ref={menuRef} id="side-menu">
                {(Navigate || []).map((item, idx) => {
                    return (
                        <React.Fragment key={idx}>
                            {item.isTitle ? (
                                <li
                                    className={classNames('menu-title', {
                                        'mt-2': idx !== 0,
                                    })}>
                                    {item.label}
                                </li>
                            ) : (
                                <>
                                    {item.children ? (
                                        <MenuItemWithChildren
                                            item={item}
                                            toggleMenu={toggleMenu}
                                            subMenuClassNames="nav-second-level"
                                            activeMenuItems={activeMenuItems}
                                            linkClassName="side-nav-link"
                                            onMenuItemClick={onMenuItemClick}
                                        />
                                    ) : (
                                        <MenuItem
                                            item={item}
                                            linkClassName="side-nav-link"
                                            className={activeMenuItems!.includes(item.label) ? 'menuitem-active' : ''}
                                            onMenuItemClick={onMenuItemClick}
                                        />
                                    )}
                                </>
                            )}
                        </React.Fragment>
                    );
                })}
            </ul>
        </>
    );
};

export default AppMenu;
