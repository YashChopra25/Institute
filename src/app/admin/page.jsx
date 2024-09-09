import AdminDashboard from "../../components/admin/AdminDashboard";
import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await auth();
  console.log("auth", session);
  if (!session || session.user.role !== "ADMIN") {
    redirect("/");
  }
  return <AdminDashboard />;
}
