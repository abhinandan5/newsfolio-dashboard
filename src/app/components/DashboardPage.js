'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Header from './Header';
import NewsAnalytics from './NewsAnalytics';
import PayoutCalculator from './PayoutCalculator';
import { getArticlesFromDB, saveArticlesToDB } from '../lib/db';
import { NEWS_API_URL } from '../lib/constants';

/**
 * The main dashboard page component.
 * It handles fetching data, managing filters, and displaying articles and analytics.
 * Implements an "offline-first" strategy by caching data in IndexedDB.
 */

const DashboardPage = () => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ author: '', startDate: '', endDate: '', searchTerm: '' });
  const [statusMessage, setStatusMessage] = useState('Loading news...');

  useEffect(() => {
    // This function handles offline caching and fetching live data
    async function loadInitialData() {
      // 1. Try to load articles from IndexedDB first for instant offline access
      try {
        setStatusMessage('Loading from offline cache...');
        const cachedArticles = await getArticlesFromDB();
        if (cachedArticles && cachedArticles.length > 0) {
          setArticles(cachedArticles);
          setStatusMessage('Showing cached news. Checking for updates...');
          setLoading(false); // Show cached data immediately
        }
      } catch (dbError) {
        console.error("Error loading from DB:", dbError);
        setStatusMessage('Could not load cached news.');
      }
      
      // 2. Fetch fresh data from the API
      await fetchNews();
    }
    
    loadInitialData();
  }, []);

  // Fetches the latest articles from the News API and saves them to IndexedDB.
  const fetchNews = async () => {
    try {
      const response = await fetch(NEWS_API_URL);
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'API Error');

      const validArticles = data.articles.filter(article => article.title && article.title !== "[Removed]");
      
      setArticles(validArticles);
      await saveArticlesToDB(validArticles); // Save fresh data to DB
      setStatusMessage(''); // Clear status message on success
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // This effect recalculates the displayed articles whenever the main list or filters change.
  useEffect(() => {
      let result = articles;
      if (filters.searchTerm) {
          result = result.filter(article => 
              (article.title?.toLowerCase().includes(filters.searchTerm.toLowerCase())) ||
              (article.description?.toLowerCase().includes(filters.searchTerm.toLowerCase()))
          );
      }
      if (filters.author) {
          result = result.filter(article => article.author?.toLowerCase().includes(filters.author.toLowerCase()));
      }
      if (filters.startDate) {
          result = result.filter(article => new Date(article.publishedAt) >= new Date(filters.startDate));
      }
      if (filters.endDate) {
          result = result.filter(article => new Date(article.publishedAt) <= new Date(filters.endDate));
      }
      setFilteredArticles(result);
  }, [filters, articles]);
  
  const handleFilterChange = (e) => {
      setFilters(prev => ({...prev, [e.target.name]: e.target.value}));
  }

  const uniqueAuthors = [...new Set(articles.map(a => a.author).filter(Boolean))].sort();

  return (
    <div>
      <Header />
      <main className="p-4 md:p-8">
        {loading && <p className="text-center text-gray-600 dark:text-gray-300">{statusMessage}</p>}
        {error && !loading && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative" role="alert"><strong className="font-bold">API Error: </strong><span>{error} (showing cached data if available)</span></div>}
        
        {/* We show the content even if there's an error, because we might have cached data */}
        {articles.length > 0 && (
            <>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
                        <input type="text" name="searchTerm" placeholder="Search by keyword..." value={filters.searchTerm} onChange={handleFilterChange} className="p-2 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600" aria-label="Search by keyword" />
                        <select name="author" value={filters.author} onChange={handleFilterChange} className="p-2 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600" aria-label="Filter by author">
                            <option value="">All Authors</option>
                            {uniqueAuthors.map(author => <option key={author} value={author}>{author}</option>)}
                        </select>
                        <input type="date" name="startDate" value={filters.startDate} onChange={handleFilterChange} className="p-2 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600" title="Start Date" aria-label="Filter by start date"/>
                        <input type="date" name="endDate" value={filters.endDate} onChange={handleFilterChange} className="p-2 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600" title="End Date" aria-label="Filter by end date"/>
                    </div>
                </div>
                
                {statusMessage && !loading && <p className="text-center text-sm text-yellow-600 dark:text-yellow-400 mb-4">{statusMessage}</p>}

                <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">Displaying {filteredArticles.length} of {articles.length} articles.</p>
                
                <NewsAnalytics articles={filteredArticles} />
                <PayoutCalculator articles={filteredArticles} />

                <div className="grid gap-6 mt-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredArticles.map((article, index) => (
                        <div key={article.url || index} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 flex flex-col">
                            <div className="relative w-full h-48">
                                <Image 
                                    src={article.urlToImage || 'https://placehold.co/600x400/1f2937/ffffff?text=News'} 
                                    alt={article.title} 
                                    fill
                                    style={{objectFit: 'cover'}}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    priority={index < 4} // Prioritize loading the first few images
                                />
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-white h-14 overflow-hidden">{article.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 h-20 overflow-hidden flex-grow">{article.description}</p>
                                <div className="text-xs text-gray-500 dark:text-gray-500 mt-auto">
                                    <p className="truncate">By: {article.author || 'Unknown'}</p>
                                    <p>Published: {new Date(article.publishedAt).toLocaleDateString()}</p>
                                </div>
                                <a href={article.url} target="_blank" rel="noopener noreferrer" className="inline-block mt-4 text-blue-500 hover:text-blue-600 font-semibold">Read More &rarr;</a>
                            </div>
                        </div>
                    ))}
                </div>
            </>
        )}
      </main>
    </div>
  );
};

export default DashboardPage;