
import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";


export const Chart = ({data}) => {
  return (
    <ResponsiveContainer  width={"90%"} height={300}>
      <BarChart width={100} height={40} data={data}>
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray='3 3' />
        <Bar dataKey='total' fill='#583dff' />
      </BarChart>
    </ResponsiveContainer>
  );
};