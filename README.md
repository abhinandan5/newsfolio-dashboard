# NewsFolio News and Payout Dashboard

A feature-rich, responsive dashboard application built with Next.js and Tailwind CSS. This project serves as a comprehensive solution for viewing, filtering, and analyzing news articles, with special administrative features for calculating and exporting author payouts.

---

### **Live Demo:** `https://your-project-name.vercel.app` 
*(Replace this with your Vercel link after deploying!)*

---

## ✨ Key Features

- **User Authentication:** Secure mock login system distinguishing between 'Admin' and 'User' roles.
- **Dynamic News Feed:** Fetches and displays the latest articles from a live news API.
- **Offline-First Experience:** Uses **IndexedDB** to cache articles, allowing the app to be fully functional even without an internet connection.
- **Advanced Filtering & Search:** Filter articles by author, date range, or search globally by keyword.
- **Admin Dashboard:**
    - **Payout Calculator:** Admins can set a per-article payout rate (stored in `localStorage`) to automatically calculate author earnings.
    - **Data Analytics:** Visual charts (Bar and Pie) provide insights into article distribution by author.
- **Data Export:** Admins can export detailed payout reports in **PDF** and **CSV** formats.
- **Modern UI/UX:**
    - Fully responsive design for both mobile and desktop.
    - Seamless Light/Dark mode toggle.
- **Performance Optimized:** Leverages Next.js features like the `<Image>` component for high performance and excellent Lighthouse scores.

## 🛠️ Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS
- **State Management:** React Context API
- **Data Fetching:** Native Fetch API
- **Offline Storage:** IndexedDB
- **Charts:** Recharts
- **Deployment:** Vercel

## 🚀 Getting Started

To run this project on your local machine, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/responsive-dashboard.git](https://github.com/your-username/responsive-dashboard.git)
    cd responsive-dashboard
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Test Credentials

- **Admin:** `admin@demo.com` / `admin123`
- **User:** `user@demo.com` / `password`