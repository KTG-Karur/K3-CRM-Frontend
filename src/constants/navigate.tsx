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

const loginData = sessionStorage.getItem('loginInfo') || '{}';
const userData = JSON.parse(loginData);
const userRights = userData?.userDetails?.userRights || {};
const userRole = userData?.userDetails?.role_name || '';

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
                      {
                          label: 'Branch',
                          url: '/view/branch',
                          parentKey: 'Master',
                      },
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

export { Navigate };
