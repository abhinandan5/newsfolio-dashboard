'use client';
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';

const PayoutCalculator = ({ articles }) => {
    const { isAdmin } = useAuth();
    const [payoutRate, setPayoutRate] = useState(25);
    const [authorPayouts, setAuthorPayouts] = useState([]);
    const [isExporting, setIsExporting] = useState(false);
    
    // Load payout rate from local storage only once on component mount
    useEffect(() => {
        const savedRate = localStorage.getItem('payoutRate');
        if (savedRate) {
            setPayoutRate(parseFloat(savedRate));
        }
    }, []);

    useEffect(() => {
        if (isAdmin) {
            localStorage.setItem('payoutRate', payoutRate);
        }
    }, [payoutRate, isAdmin]);

    const calculatePayouts = useCallback(() => {
        const counts = articles.reduce((acc, article) => {
            const author = article.author || 'Unknown Author';
            acc[author] = (acc[author] || 0) + 1;
            return acc;
        }, {});

        const payouts = Object.entries(counts).map(([author, count]) => ({
            author,
            articleCount: count,
            payout: (count * payoutRate).toFixed(2),
        }));
        setAuthorPayouts(payouts);
    }, [articles, payoutRate]);

    useEffect(() => {
        calculatePayouts();
    }, [calculatePayouts]);

    const loadScript = (src) => {
        return new Promise((resolve, reject) => {
            if (document.querySelector(`script[src="${src}"]`)) return resolve();
            const script = document.createElement('script');
            script.src = src;
            script.onload = () => resolve();
            script.onerror = () => reject(new Error(`Script load error for ${src}`));
            document.head.appendChild(script);
        });
    };

    const exportToPDF = async () => {
        setIsExporting(true);
        try {
            await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');
            await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.8.2/jspdf.plugin.autotable.min.js');
            
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            
            doc.text("Payout Report", 14, 16);
            doc.autoTable({
                head: [['Author', 'Article Count', 'Payout ($)']],
                body: authorPayouts.map(p => [p.author, p.articleCount, `$${p.payout}`]),
                startY: 20,
            });
            doc.save('payout-report.pdf');
        } catch (error) {
            console.error("Failed to export PDF:", error);
        } finally {
            setIsExporting(false);
        }
    };

    const exportToCSV = () => {
        let csvContent = "data:text/csv;charset=utf-8,Author,Article Count,Payout ($)\n";
        authorPayouts.forEach(p => {
            const author = `"${p.author.replace(/"/g, '""')}"`;
            csvContent += `${author},${p.articleCount},${p.payout}\n`;
        });
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "payout-report.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (!isAdmin) return null;

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mt-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Admin: Payout Calculator</h2>
            <div className="mb-6">
                <label htmlFor="payoutRate" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
                    Set Payout per Article ($)
                </label>
                <input
                    type="number"
                    id="payoutRate"
                    value={payoutRate}
                    onChange={(e) => setPayoutRate(parseFloat(e.target.value) || 0)}
                    className="w-full md:w-1/3 p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
            </div>
            <div className="flex space-x-4 mb-6">
                <button onClick={exportToPDF} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg disabled:opacity-50" disabled={isExporting}>
                    {isExporting ? 'Exporting...' : 'Export to PDF'}
                </button>
                <button onClick={exportToCSV} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg">Export to CSV</button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Author</th>
                            <th scope="col" className="px-6 py-3">Article Count</th>
                            <th scope="col" className="px-6 py-3">Total Payout</th>
                        </tr>
                    </thead>
                    <tbody>
                        {authorPayouts.map((payout, index) => (
                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{payout.author}</td>
                                <td className="px-6 py-4">{payout.articleCount}</td>
                                <td className="px-6 py-4">${payout.payout}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PayoutCalculator;