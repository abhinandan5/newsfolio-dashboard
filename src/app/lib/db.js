const DB_NAME = 'NewsDashboardDB';
const DB_VERSION = 1;
const STORE_NAME = 'articles';

let dbPromise = null;

function getDb() {
  if (typeof window === 'undefined') {
    return null; // IndexedDB is not available on the server
  }
  if (!dbPromise) {
    dbPromise = new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = (event) => {
        console.error("IndexedDB error:", event.target.error);
        reject("IndexedDB error");
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'url' });
        }
      };

      request.onsuccess = (event) => {
        resolve(event.target.result);
      };
    });
  }
  return dbPromise;
}

export async function saveArticlesToDB(articles) {
  const db = await getDb();
  if (!db) return;

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    
    const clearRequest = store.clear();
    clearRequest.onsuccess = () => {
        articles.forEach(article => {
            if(article.url) { // Must have a URL to be a unique key
                store.put(article);
            }
        });
    };
    
    transaction.oncomplete = () => {
      resolve();
    };
    
    transaction.onerror = (event) => {
      console.error("Transaction error:", event.target.error);
      reject(event.target.error);
    };
  });
}

export async function getArticlesFromDB() {
  const db = await getDb();
  if (!db) return [];

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      console.error("Request error:", event.target.error);
      reject(event.target.error);
    };
  });
}