import {
  SquareTerminal,
  Bot,
  BookOpen,
  Settings2,
  LayoutDashboard,
  IdCardLanyard,
  ClipboardList,
  CircleAlert,
  FileWarning,
  GitPullRequest,
  FilePenLine,
  Spotlight,
} from "lucide-react";

export const navMainData = {
  label: "User Management",
  items: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Dashboard",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
};

export const HRData = {
  label: "Human Resource Management",
  items: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Employee Management",
      url: "/construction",
      icon: IdCardLanyard,
      items: [
        {
          title: "List of Employees",
          url: "/employee-management/list",
        },
        {
          title: "Add/Edit Employee Info",
          url: "/construction",
        },
        {
          title: "Employment Status History",
          url: "/construction",
        },
      ],
    },
    {
      title: "Masterlist of Timesheet",
      url: "/construction",
      icon: ClipboardList,
      items: [
        {
          title: "Introduction",
          url: "/construction",
        },
        {
          title: "Get Started",
          url: "/construction",
        },
        {
          title: "Tutorials",
          url: "/construction",
        },
        {
          title: "Changelog",
          url: "/construction",
        },
      ],
    },

    {
      title: "Policies",
      url: "/construction",
      icon: CircleAlert,
    },

    {
      title: "HMOs",
      url: "/construction",
      icon: FileWarning,
    },

    {
      title: "COE Request",
      url: "/construction",
      icon: GitPullRequest,
    },

    {
      title: "Leave Management",
      url: "/construction",
      icon: FilePenLine,
      items: [
        {
          title: "Employee Leave Credits",
          url: "/construction",
        },
        {
          title: "Approve/Decline Leave",
          url: "/construction",
        },
      ],
    },

    {
      title: "Performance Review",
      url: "/construction",
      icon: Spotlight,
      items: [
        {
          title: "Employee Evaluations",
          url: "/construction",
        },
        {
          title: "Review Templates",
          url: "/construction",
        },
      ],
    },
  ],
};

export const HRecruitmentData = {
  label: "Recruitment Management",
  items: [
    {
      title: "Applicants",
      url: "#",
      icon: IdCardLanyard,
      items: [
        {
          title: "Initial Interview",
          url: "#",
        },
        {
          title: "Examination",
          url: "#",
        },
        {
          title: "Final Interview",
          url: "#",
        },
        {
          title: "Job Offer",
          url: "#",
        },
        {
          title: "Contract Signing",
          url: "#",
        },
      ],
    },

    {
      title: "Calendar",
      url: "#",
      icon: IdCardLanyard,
    },
    {
      title: "Scheduling",
      url: "#",
      icon: IdCardLanyard,
    },

    {
      title: "On Boarding Process",
      url: "#",
      icon: IdCardLanyard,
      items: [
        {
          title: "Orientation",
          url: "#",
        },
        {
          title: "Google Account Creation",
          url: "#",
        },
        {
          title: "Time Doctor",
          url: "#",
        },
        {
          title: "Documents / Requirements",
          url: "#",
        },
        {
          title: "Asset Assignment",
          url: "#",
        },
      ],
    },

    {
      title: "Off Boarding Process",
      url: "#",
      icon: IdCardLanyard,
      items: [
        {
          title: "Resignation Letter",
          url: "#",
        },
        {
          title: "Clearance",
          url: "#",
        },
        {
          title: "Exit Interview",
          url: "#",
        },
      ],
    },
  ],
};

export const FinanceData = {
  label: "Accounting Management",
  items: [
    {
      title: "Dashboard",
      url: "#",
      icon: SquareTerminal,
    },
    {
      title: "Payroll Management",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Payruns",
          url: "#",
        },
        {
          title: "Pay Computation Setups",
          url: "#",
        },
        {
          title: "Pay Items",
          url: "#",
        },
        {
          title: "Process Payroll",
          url: "#",
        },
        {
          title: "De Minimis Reference",
          url: "#",
        },
        {
          title: "Employee Last Pays",
          url: "#",
        },
        {
          title: "Disbursements",
          url: "#",
        },
        {
          title: "View Salary Summary",
          url: "#",
        },
        {
          title: "Apply Deductions (Automated)",
          url: "#",
        },
      ],
    },
    {
      title: "Tax Reports",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Generate BIR Forms",
          url: "#",
        },
        {
          title: "View Tax History",
          url: "#",
        },
      ],
    },
    {
      title: "Financial Reports",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Employee Cost Summary",
          url: "#",
        },
        {
          title: "Monthly Expenses",
          url: "#",
        },
      ],
    },
  ],
};
