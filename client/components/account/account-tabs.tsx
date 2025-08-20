"use client";

import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import axios from "axios";

interface PersonalInfo {
  id: number;
  active: string;
  birth_date: string;
  address: string;
  phone_number: string;
  emergency_contact_person: string;
  emergency_contact_number: string;
}

export function AccountTabs({ id }: { id: number }) {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
  useEffect(() => {
    const fetchPersonalInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const respersonal = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/personal-info/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setPersonalInfo(respersonal.data);
        console.log("Connected to Personal Info Database Table")
      } catch (err) {
        console.error("Failed to fetch user", err);
      }
    };

    fetchPersonalInfo();
  }, []);
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
              <div className="grid grid-cols-4 gap-4">
                <div className="space-y-2 col-span-3">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    placeholder="123 Main St, City, State 12345"
                    value={personalInfo?.address}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="birthdate">Date of Birth</Label>
                  <Input id="birthdate" type="date" placeholder="1990-01-15" value={personalInfo?.birth_date} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="active">Active</Label>
                  <Input id="active" placeholder="Active" value={personalInfo?.active} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone_number">Phone Number</Label>
                  <Input id="phone_number" placeholder="+1 (555) 123-4567" value={personalInfo?.phone_number} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="emergency_contact_number">Emergency Contact Number</Label>
                  <Input id="emergency_contact_number" placeholder="+64 9876543210" value={personalInfo?.emergency_contact_number} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergency_contact_person">Emergency Contact Person</Label>
                  <Input id="emergency_contact_person" placeholder="John Doe" value={personalInfo?.emergency_contact_person} />
                </div>
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
