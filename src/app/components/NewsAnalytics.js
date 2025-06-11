'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const NewsAnalytics = ({ articles }) => {
    const { isAdmin } = useAuth();
    const [chartData, setChartData] = useState([]);
    const PIE_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

    useEffect(() => {
        const authorCounts = articles.reduce((acc, article) => {
            const author = article.author || 'Unknown Author';
            acc[author] = (acc[author] || 0) + 1;
            return acc;
        }, {});

        const sortedAuthors = Object.entries(authorCounts)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 5)
            .map(([name, value]) => ({ name, value }));
        
        setChartData(sortedAuthors);
    }, [articles]);

    if (!isAdmin) return null;

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mt-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">News Analytics (Top 5 Authors)</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                 <div style={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer>
                        <BarChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                            <XAxis dataKey="name" stroke="#a1a1aa" tick={{ fontSize: 12 }} interval={0} angle={-20} textAnchor="end" height={60} />
                            <YAxis stroke="#a1a1aa" />
                            <Tooltip wrapperClassName="dark:!bg-gray-700 !border-gray-600" contentStyle={{backgroundColor: 'rgba(31, 41, 55, 0.8)', border: '1px solid #4b5563'}} />
                            <Legend />
                            <Bar dataKey="value" name="Articles" fill="#3b82f6" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div style={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{backgroundColor: 'rgba(31, 41, 55, 0.8)', border: '1px solid #4b5563'}}/>
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

export default NewsAnalytics;