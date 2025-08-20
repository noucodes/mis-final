import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AccountTabs } from "./account-tabs";
import axios from "axios";
import { useState, useEffect } from "react";

export function Account() {
  const [user, setUser] = useState<{
    id: number;
    name: string;
    email: string;
    avatar?: string;
    role: string;
    employeeId: string;
    password?: string;
  } | null>(null);

  const [tempData, setTempData] = useState<typeof user>(null);
  const [modalOpen, setModalOpen] = useState(false);

  function getInitials(name: string) {
    if (!name) return "";
    const parts = name.trim().split(" ");
    // take first two words only, then get first char of each
    return parts
      .slice(0, 2)
      .map((word) => word[0].toUpperCase())
      .join("");
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const resuser = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(resuser.data);
      } catch (err) {
        console.error("Failed to fetch user", err);
      }
    };

    fetchUser();
  }, []);

  // Sync tempData when user changes
  useEffect(() => {
    if (user) setTempData(user);
  }, [user]);

  if (!user) {
    return (
      <header className="bg-card border-b border-border p-6">
        <div className="flex items-center justify-between" />
      </header>
    );
  }

  return (
    <>
      <header className="bg-card border-b border-border p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            {/* Avatar */}
            <Avatar className="h-20 w-20">
              <AvatarImage
                src={user.avatar || "/placeholder.svg"}
                alt={user.name}
              />
              <AvatarFallback className="text-2xl">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>

            {/* Account Details */}
            <div className="space-y-3">
              <h1 className="text-2xl font-bold text-foreground">
                {user.name}
              </h1>
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <Label className="text-muted-foreground">ID:</Label>
                  <span className="font-medium">{user.employeeId}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Label className="text-muted-foreground">Email:</Label>
                  <span>{user.email}</span>
                </div>
              </div>
            </div>
          </div>

          <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => setModalOpen(true)}
                className="flex items-center space-x-2"
              >
                <Edit className="h-4 w-4" />
                <span>Edit Account</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Edit Account Information</DialogTitle>
              </DialogHeader>
              {tempData && (
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="modal-id">Employee Id</Label>
                    <Input
                      id="modal-id"
                      value={tempData.employeeId}
                      onChange={(e) =>
                        setTempData(
                          (prev) =>
                            prev && { ...prev, employeeId: e.target.value }
                        )
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="modal-name">Name</Label>
                    <Input
                      id="modal-name"
                      value={tempData.name}
                      onChange={(e) =>
                        setTempData(
                          (prev) => prev && { ...prev, name: e.target.value }
                        )
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="modal-email">Email</Label>
                    <Input
                      id="modal-email"
                      type="email"
                      value={tempData.email}
                      onChange={(e) =>
                        setTempData(
                          (prev) => prev && { ...prev, email: e.target.value }
                        )
                      }
                    />
                  </div>
                </div>
              )}
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={async () => {
                    if (!tempData) return;
                    try {
                      const token = localStorage.getItem("token");
                      if (!token) return;
                      await axios.put(
                        `${process.env.NEXT_PUBLIC_API_URL}/me`,
                        tempData,
                        {
                          headers: { Authorization: `Bearer ${token}` },
                        }
                      );
                      setUser(tempData);
                      setModalOpen(false);
                    } catch (err) {
                      console.error("Failed to update user", err);
                    }
                  }}
                >
                  Save Changes
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </header>
      <AccountTabs id={user.id} />
    </>
  );
}
