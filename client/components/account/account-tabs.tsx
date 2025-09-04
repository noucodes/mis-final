"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

// Interface aligned with backend schema
interface PersonalInfo {
  id: number;
  active: boolean;
  birth_date: string;
  address?: string;
  phone_number?: string;
  emergency_contact_person?: string;
  emergency_contact_number?: string;
  user_id: number;
}

export function AccountTabs({ id }: { id: number }) {
  const router = useRouter();
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    id: 0,
    active: true,
    birth_date: "",
    address: "",
    phone_number: "",
    emergency_contact_person: "",
    emergency_contact_number: "",
    user_id: id,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Check authentication and fetch data on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      setIsAuthenticated(true);
      fetchPersonalInfo(token);
    }
  }, [router]);

  // Fetch personal info
  const fetchPersonalInfo = async (token: string) => {
    try {
      const response = await axios.get<PersonalInfo>(
        `${process.env.NEXT_PUBLIC_API_URL}/personal-info/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPersonalInfo(response.data);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      console.error("Fetch error:", error);
      toast.info("No personal info found, please fill out the form");
      // Keep default state
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPersonalInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!personalInfo.birth_date) {
      setError("Birth date is required.");
      toast.error("Birth date is required.");
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found. Please log in.");
      }

      const response = await axios.put<PersonalInfo>(
        `${process.env.NEXT_PUBLIC_API_URL}/personal-info/${id}`,
        { ...personalInfo, user_id: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Personal info updated successfully!");
      setPersonalInfo(response.data);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      console.error("Error:", error);
      const errorMessage = error || "Failed to update info.";
      setError(`${errorMessage}`);
      toast.error(`${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };


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
              {error && <p className="text-red-500">{error}</p>}
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="birth_date">Date of Birth</Label>
                    <Input
                      id="birth_date"
                      name="birth_date"
                      type="date"
                      placeholder="1990-01-15"
                      value={personalInfo.birth_date}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      placeholder="123 Main St, City, State 12345"
                      value={personalInfo.address || ""}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone_number">Phone Number</Label>
                    <Input
                      id="phone_number"
                      name="phone_number"
                      placeholder="+1 (555) 123-4567"
                      value={personalInfo.phone_number || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergency_contact_person">Emergency Contact Person</Label>
                    <Input
                      id="emergency_contact_person"
                      name="emergency_contact_person"
                      placeholder="Jane Doe"
                      value={personalInfo.emergency_contact_person || ""}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="emergency_contact_number">Emergency Contact Number</Label>
                    <Input
                      id="emergency_contact_number"
                      name="emergency_contact_number"
                      placeholder="+64 9876543210"
                      value={personalInfo.emergency_contact_number || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="active">Active</Label>
                    <Input
                      id="active"
                      name="active"
                      placeholder="Active"
                      value={personalInfo.active ? "Yes" : "No"}
                      disabled
                    />
                  </div>
                </div>
                <div className="w-full flex justify-center mt-4">
                  <Button type="submit" className="w-full" disabled={loading}>
                    <Save className="mr-2 h-4 w-4" />
                    {loading ? "Saving..." : "Next"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* EMPLOYEE INFO (Placeholder) */}
        <TabsContent value="employee" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Employee Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="position">Position</Label>
                  <Input id="position" defaultValue="Senior Developer" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input id="department" defaultValue="Engineering" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="position">Position</Label>
                  <Input id="position" defaultValue="Senior Developer" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input id="department" defaultValue="Engineering" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="position">Position</Label>
                  <Input id="position" defaultValue="Senior Developer" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input id="department" defaultValue="Engineering" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="position">Position</Label>
                  <Input id="position" defaultValue="Senior Developer" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input id="department" defaultValue="Engineering" />
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

        {/* CONTRIBUTION (Placeholder) */}
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
                <Input id="stockOptions" defaultValue="1,000 shares vested" readOnly />
              </div>
              <div className="space-y-2">
                <Label htmlFor="performanceBonus">Performance Bonus (YTD)</Label>
                <Input id="performanceBonus" defaultValue="$5,000" readOnly />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
