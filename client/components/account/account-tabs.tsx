"use client";

import React, { useEffect, useState } from "react";
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
  user_id: string;
}

interface EmployeeDetails {
  id: number;
  user_id: string; // UUID
  position: string; // since it's VARCHAR(45)[], we can use string[] if you want multiple positions
  job_level: string;
  payment_method: string;
  pay_computation: string;
  salary_type: string;
  basic_pay: number;
  allowance: number;
  gross: number;
  bank_number: string;
  salary_grade: string;
  date_hired: string; // YYYY-MM-DD
  employee_activity: string;
  activity_effect_date: string; // YYYY-MM-DD
  remarks: string;
  department: string;
  manager: string;
  employee_status: string;
}

export function AccountTabs({ id }: { id: number }) {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    id: 0,
    active: true,
    birth_date: "",
    address: "",
    phone_number: "",
    emergency_contact_person: "",
    emergency_contact_number: "",
    user_id: "",
  });

  const [employee, setEmployee] = useState<EmployeeDetails>({
    id: 0,
    user_id: "", // you can pass a generated UUID if needed
    position: "", // or [] if you want multiple values
    job_level: "",
    payment_method: "",
    pay_computation: "",
    salary_type: "",
    basic_pay: 0,
    allowance: 0,
    gross: 0,
    bank_number: "",
    salary_grade: "",
    date_hired: "",
    employee_activity: "",
    activity_effect_date: "",
    remarks: "",
    department: "",
    manager: "",
    employee_status: "Active", // default maybe
  })

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    } else {
      toast.error("No token found. Please log in.");
    }
  }, []);

  // Fetch personal info
  const fetchPersonalInfo = async (token: string) => {
    try {
      const personalResponse = await axios.get<PersonalInfo>(
        `${process.env.NEXT_PUBLIC_API_URL}/personal-info/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPersonalInfo(personalResponse.data);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      console.error("Fetch error:", error);
      toast.info("No personal info found, please fill out the form");
      // Keep default state
    } finally {
      setLoading(false);
    }
  };

  // Fetch personal info
  const fetchEmployeeDetails = async (token: string) => {
    try {
      const employeeResponse = await axios.get<EmployeeDetails>(
        `${process.env.NEXT_PUBLIC_API_URL}/employee-details/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEmployee(employeeResponse.data);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      console.error("Fetch error:", error);
      toast.info("No employee details found, please fill out the form");
      // Keep default state
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchPersonalInfo(token);
      fetchEmployeeDetails(token);
    }
  }, [token]);


  const handlePersonalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPersonalInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleEmployeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Convert numbers properly
    const newValue =
      e.target.type === "number" ? (value === "" ? 0 : parseFloat(value)) : value;

    setEmployee((prev) => ({ ...prev, [name]: newValue }));
  };

  // Handle form submission
  const handlePersonalInfoSubmit = async (e: React.FormEvent) => {
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
      const errorMessage =
        error.response?.data?.message || error.message || "Failed to update info.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleEmployeeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.put<EmployeeDetails>(
        `${process.env.NEXT_PUBLIC_API_URL}/employee-details/${id}`,
        { ...employee, user_id: id }, // make sure backend expects this
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Employee details updated successfully!");
      setEmployee(response.data);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      console.error("Error:", error);
      const errorMessage =
        error.response?.data?.message || error.message || "Failed to update info.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="flex-1 overflow-auto p-6" >
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
            <CardContent >
              {error && <p className="text-red-500">{error}</p>}
              <form onSubmit={handlePersonalInfoSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="birth_date">Date of Birth</Label>
                    <Input
                      id="birth_date"
                      name="birth_date"
                      type="date"
                      placeholder="1990-01-15"
                      value={personalInfo.birth_date}
                      onChange={handlePersonalChange}
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
                      onChange={handlePersonalChange}
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
                      onChange={handlePersonalChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergency_contact_person">Emergency Contact Person</Label>
                    <Input
                      id="emergency_contact_person"
                      name="emergency_contact_person"
                      placeholder="Jane Doe"
                      value={personalInfo.emergency_contact_person || ""}
                      onChange={handlePersonalChange}
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
                      onChange={handlePersonalChange}
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

        <TabsContent value="employee" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Employee Details</CardTitle>
            </CardHeader>
            <CardContent>
              {error && <p className="text-red-500">{error}</p>}
              <form onSubmit={handleEmployeeSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="employee_status">Employee Status</Label>
                    <Input
                      id="employee_status"
                      name="employee_status"
                      placeholder="Active / Inactive"
                      value={employee.employee_status || ""}
                      onChange={handleEmployeeChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position">Position</Label>
                    <Input
                      id="position"
                      name="position"
                      placeholder="Manager, Developer"
                      value={employee.position || ""}
                      onChange={handleEmployeeChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="job_level">Job Level</Label>
                    <Input
                      id="job_level"
                      name="job_level"
                      placeholder="Junior / Mid / Senior"
                      value={employee.job_level || ""}
                      onChange={handleEmployeeChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="payment_method">Payment Method</Label>
                    <Input
                      id="payment_method"
                      name="payment_method"
                      placeholder="Bank Transfer / Cash"
                      value={employee.payment_method || ""}
                      onChange={handleEmployeeChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pay_computation">Pay Computation</Label>
                    <Input
                      id="pay_computation"
                      name="pay_computation"
                      placeholder="Hourly / Monthly"
                      value={employee.pay_computation || ""}
                      onChange={handleEmployeeChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="salary_type">Salary Type</Label>
                    <Input
                      id="salary_type"
                      name="salary_type"
                      placeholder="Fixed / Variable"
                      value={employee.salary_type || ""}
                      onChange={handleEmployeeChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="basic_pay">Basic Pay</Label>
                    <Input
                      id="basic_pay"
                      name="basic_pay"
                      type="number"
                      step="0.01"
                      placeholder="50000"
                      value={employee.basic_pay || 0}
                      onChange={handleEmployeeChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="allowance">Allowance</Label>
                    <Input
                      id="allowance"
                      name="allowance"
                      type="number"
                      step="0.01"
                      placeholder="5000"
                      value={employee.basic_pay || 0}
                      onChange={handleEmployeeChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="gross">Gross</Label>
                    <Input
                      id="gross"
                      name="gross"
                      type="number"
                      step="0.01"
                      placeholder="55000"
                      value={employee.basic_pay || 0}
                      onChange={handleEmployeeChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bank_number">Bank Number</Label>
                    <Input
                      id="bank_number"
                      name="bank_number"
                      placeholder="1234-5678-90"
                      value={employee.bank_number || ""}
                      onChange={handleEmployeeChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="salary_grade">Salary Grade</Label>
                    <Input
                      id="salary_grade"
                      name="salary_grade"
                      placeholder="SG-15"
                      value={employee.salary_grade || ""}
                      onChange={handleEmployeeChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date_hired">Date Hired</Label>
                    <Input
                      id="date_hired"
                      name="date_hired"
                      type="date"
                      value={employee.date_hired || ""}
                      onChange={handleEmployeeChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="employee_activity">Employee Activity</Label>
                    <Input
                      id="employee_activity"
                      name="employee_activity"
                      placeholder="Onboarding / Training"
                      value={employee.employee_activity || ""}
                      onChange={handleEmployeeChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="activity_effect_date">Activity Effect Date</Label>
                    <Input
                      id="activity_effect_date"
                      name="activity_effect_date"
                      type="date"
                      value={employee.activity_effect_date || ""}
                      onChange={handleEmployeeChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="remarks">Remarks</Label>
                    <Input
                      id="remarks"
                      name="remarks"
                      placeholder="Optional notes"
                      value={employee.remarks || ""}
                      onChange={handleEmployeeChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input
                      id="department"
                      name="department"
                      placeholder="HR / IT / Finance"
                      value={employee.department || ""}
                      onChange={handleEmployeeChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="manager">Manager</Label>
                    <Input
                      id="manager"
                      name="manager"
                      placeholder="John Smith"
                      value={employee.manager || ""}
                      onChange={handleEmployeeChange}
                    />
                  </div>
                </div>

                <div className="w-full flex justify-center mt-4">
                  <Button type="submit" className="w-full" disabled={loading}>
                    <Save className="mr-2 h-4 w-4" />
                    {loading ? "Saving..." : "Save"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* CONTRIBUTION (Placeholder) */}
        <TabsContent value="contribution" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Contribution & Benefits</CardTitle>
            </CardHeader>
            <CardContent>
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
    </main >
  );
}
