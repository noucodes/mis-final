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
import { columns, Payment } from "./columns"
import { DataTable } from "@/components/data-table"

async function getData(): Promise<Payment[]> {
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
            status: "pending",
        },
        // ...
    ]
}


export default async function Page() {
    const data = await getData()
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 justify-between px-4">
                    <div className="flex items-center gap-2">
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 data-[orientation=vertical]:h-4"
                        />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink href="#">Account</BreadcrumbLink>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                    <ModeToggle />
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <DataTable columns={columns} data={data} />
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}