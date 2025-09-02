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
      /**walaa ang dropdown boi! */ title: "Dashboard",
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
          url: "/construction",
        },
        {
          /**butangi nig dropdown boi! */ title: "Add/Edit Employee Info",
          url: "/construction",
        },
        {
          title: "Employment Status History",
          url: "/construction",
        },
      ],
    },
    {
      /**walaa ang dropdown boi! */ title: "Masterlist of Timesheet",
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
      /**walaa ang dropdown boi! */ title: "Policies",
      url: "/construction",
      icon: CircleAlert,
    },

    {
      /**walaa ang dropdown boi! */ title: "HMOs",
      url: "/construction",
      icon: FileWarning,
    },

    {
      /**walaa ang dropdown boi! */ title: "COE Request",
      url: "/construction",
      icon: GitPullRequest,
    },

    {
      /**walaa ang dropdown boi! */ title: "Leave Management",
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
      /**walaa ang dropdown boi! */ title: "Performance Review",
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
      title: "Online Applicants /Walk-In Applicants",
      url: "/404",
      icon: IdCardLanyard,
      items: [
        {
          title: "Initial Interview",
          url: "/404",
        },
        {
          title: "Examination",
          url: "/404",
        },
        {
          title: "Final Interview",
          url: "/404",
        },
        {
          title: "Job Offer",
          url: "/404",
        },
        {
          title: "Contract Signing",
          url: "/404",
        },
      ],
    },

    {
      title: "Calendar",
      url: "/404",
      icon: IdCardLanyard,
    },
    {
      title: "Scheduling",
      url: "/404",
      icon: IdCardLanyard,
    },

    {
      title: "On Boarding Process",
      url: "/404",
      icon: IdCardLanyard,
      items: [
        {
          title: "Orientation",
          url: "/404",
        },
        {
          title: "Google Account Creation",
          url: "/404",
        },
        {
          title: "Time Doctor",
          url: "/404",
        },
        {
          title: "Documents / Requirements",
          url: "/404",
        },
        {
          title: "Asset Assignment",
          url: "/404",
        },
      ],
    },

    {
      title: "Off Boarding Process",
      url: "/404",
      icon: IdCardLanyard,
      items: [
        {
          title: "Resignation Letter",
          url: "/404",
        },
        {
          title: "Clearance",
          url: "/404",
        },
        {
          title: "Exit Interview",
          url: "/404",
        },
      ],
    },
  ],
};

export const FinanceData = {
  label: "",
  items: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "History",
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
