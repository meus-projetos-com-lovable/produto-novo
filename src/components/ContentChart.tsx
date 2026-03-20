import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

const COLORS = [
  "hsl(174, 62%, 40%)",
  "hsl(210, 80%, 55%)",
  "hsl(38, 92%, 50%)",
  "hsl(152, 60%, 42%)",
  "hsl(280, 60%, 55%)",
  "hsl(0, 72%, 51%)",
];

interface Props {
  type: "bar" | "line" | "pie" | "area";
  data: { name: string; value: number }[];
}

export function ContentChart({ type, data }: Props) {
  if (type === "pie") {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius="40%" outerRadius="70%" dataKey="value" paddingAngle={3} stroke="none">
            {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
          </Pie>
          <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
        </PieChart>
      </ResponsiveContainer>
    );
  }

  if (type === "area") {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={COLORS[0]} stopOpacity={0.2} />
              <stop offset="95%" stopColor={COLORS[0]} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(150, 10%, 88%)" />
          <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="hsl(210, 10%, 46%)" />
          <YAxis tick={{ fontSize: 11 }} stroke="hsl(210, 10%, 46%)" />
          <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
          <Area type="monotone" dataKey="value" stroke={COLORS[0]} fill="url(#areaGrad)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    );
  }

  if (type === "line") {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(150, 10%, 88%)" />
          <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="hsl(210, 10%, 46%)" />
          <YAxis tick={{ fontSize: 11 }} stroke="hsl(210, 10%, 46%)" />
          <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
          <Line type="monotone" dataKey="value" stroke={COLORS[0]} strokeWidth={2} dot={{ r: 4, fill: COLORS[0] }} />
        </LineChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(150, 10%, 88%)" />
        <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="hsl(210, 10%, 46%)" />
        <YAxis tick={{ fontSize: 11 }} stroke="hsl(210, 10%, 46%)" />
        <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
        <Bar dataKey="value" radius={[4, 4, 0, 0]}>
          {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
