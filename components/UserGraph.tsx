"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function UserGraph({ users }: any) {
  const data = [
    {
      name: "Users",
      value: users.filter((u: any) => u.role === "user").length,
    },
    {
      name: "Admins",
      value: users.filter((u: any) => u.role === "admin").length,
    },
  ];

  return (
    <div className="card p-6">
      <h2 className="mb-4 font-semibold">User Distribution</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" stroke="#fff" />
          <YAxis stroke="#fff" />
          <Tooltip />
          <Bar dataKey="value" fill="#ffffff" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
