"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function AccountTabs() {
  return (
    <main className="flex-1 overflow-auto p-6">
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-2/5 grid-cols-3">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="employee">Employee Info</TabsTrigger>
          <TabsTrigger value="contribution">Contribution</TabsTrigger>
        </TabsList>

        {/* PERSONAL INFO */}
        <TabsContent value="personal" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" defaultValue="+1 (555) 123-4567" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  defaultValue="123 Main St, City, State 12345"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="birthdate">Date of Birth</Label>
                <Input id="birthdate" type="date" defaultValue="1990-01-15" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* EMPLOYEE INFO */}
        <TabsContent value="employee" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Employee Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input id="department" defaultValue="Engineering" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">Position</Label>
                  <Input id="position" defaultValue="Senior Developer" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="manager">Manager</Label>
                  <Input id="manager" defaultValue="Jane Smith" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input id="startDate" type="date" defaultValue="2022-03-01" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="salary">Annual Salary</Label>
                <Input id="salary" defaultValue="$85,000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="workLocation">Work Location</Label>
                <Input id="workLocation" defaultValue="Remote" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* CONTRIBUTION */}
        <TabsContent value="contribution" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Contribution & Benefits</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="retirement401k">401(k) Contribution</Label>
                  <Input id="retirement401k" defaultValue="6%" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="healthInsurance">Health Insurance Plan</Label>
                  <Input id="healthInsurance" defaultValue="Premium Plan" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="vacationDays">Vacation Days Remaining</Label>
                  <Input id="vacationDays" defaultValue="15 days" readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sickDays">Sick Days Remaining</Label>
                  <Input id="sickDays" defaultValue="8 days" readOnly />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="stockOptions">Stock Options</Label>
                <Input
                  id="stockOptions"
                  defaultValue="1,000 shares vested"
                  readOnly
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="performanceBonus">
                  Performance Bonus (YTD)
                </Label>
                <Input id="performanceBonus" defaultValue="$5,000" readOnly />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
