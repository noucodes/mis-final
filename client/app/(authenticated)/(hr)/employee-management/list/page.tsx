import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { ModeToggle } from "@/components/toggle-mode";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { columns, Employee } from "./columns"
import { DataTable } from "@/components/data-table"

async function getData(): Promise<Employee[]> {
    // Fetch data from your API here.
    return [
        {
            employeeid: "001",
            name: "Elton John M. Escudero",
            position: "Jr. Web Developer",
            teamleader: "Lea A. Samontina",
            status: "pending",
        },
        {
            employeeid: "002",
            name: "Elton Rey Ybanez",
            position: "Jr. Web Developer",
            teamleader: "Lea A. Samontina",
            status: "active",
        },
        {
            employeeid: "003",
            name: "Mclean Suarez",
            position: "Sr. Web Developer",
            teamleader: "Taryn Boxer",
            status: "resigned",
        },
        // ...
    ]
}


export default async function Page() {
    const data = await getData()
    return (
        <main className="space-y-8">
            <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>Employee Management</span>
                    <span>/</span>
                    <span>List</span>
                </div>
                <h1 className="text-3xl font-bold text-balance">Employee List</h1>
                <p className="text-muted-foreground text-balance">
                    Manage your employees info and data
                </p>
            </div>
            <DataTable columns={columns} data={data} />
        </main>
    );
}