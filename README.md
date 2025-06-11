# NewsFolio Dashboard

A feature-rich, responsive dashboard application built with Next.js and Tailwind CSS. This project serves as a comprehensive solution for viewing, filtering, and analyzing news articles, with special administrative features for calculating and exporting author payouts.

---

### 🚀 **Live Demo:** [https://newsfolio-dashboard-git-main-abhinandan5s-projects.vercel.app/](https://newsfolio-dashboard-git-main-abhinandan5s-projects.vercel.app/)

---

## 📸 Screenshots

| Login Page & Light Mode | Dark Mode |
| :---: | :---: |
| ![Login Page](photos/Login-Page.png) | ![Dashboard Dark Mode](photos/dashboard-dark.png) |

| Admin Analytics & Payouts | Exported PDF Report |
| :---: | :---: |
| ![Admin News Analytics](photos/admin-News-Analytics-Charts.png) | ![Downloaded PDF Report](photos/downloaded-pdf.png) |

| Mobile Responsive View 1 | Mobile Responsive View 2 |
| :---: | :---: |
| ![Mobile View 1](photos/mobile-view-1.png) | ![Mobile View 2](photos/mobile-view-2.png) |

---

## ✨ Key Features

-   **User Authentication:** Secure mock login system distinguishing between 'Admin' and 'User' roles.
-   **Dynamic News Feed:** Fetches and displays the latest articles from a live news API.
-   **Offline-First Experience:** Uses **IndexedDB** to cache articles, allowing the app to be fully functional even without an internet connection.
-   **Advanced Filtering & Search:** Filter articles by author, date range, or search globally by keyword.
-   **Admin Dashboard:**
    -   **Payout Calculator:** Admins can set a per-article payout rate (stored in `localStorage`) to automatically calculate author earnings.
    -   **Data Analytics:** Visual charts (Bar and Pie) provide insights into article distribution by author.
-   **Data Export:** Admins can export detailed payout reports in **PDF** and **CSV** formats.
-   **Modern UI/UX:**
    -   Fully responsive design for both mobile and desktop.
    -   Seamless Light/Dark mode toggle.
-   **Performance Optimized:** Leverages Next.js features like the `<Image>` component for high performance and excellent Lighthouse scores.

## 💡 Deployment Note on Live API

The free developer plan for the NewsAPI restricts live API calls to `localhost` only. As a result, the live Vercel deployment will show an API error after the initial load.

However, this project was built with an **offline-first strategy**. The application gracefully handles this by falling back to the last set of articles cached in the browser's IndexedDB, demonstrating its offline capabilities and robust error handling. The full live API functionality can be experienced by running the project on a local machine.

## 🛠️ Tech Stack

-   **Framework:** Next.js (App Router)
-   **Styling:** Tailwind CSS
-   **State Management:** React Context API
-   **Charts:** Recharts
-   **Offline Storage:** IndexedDB
-   **Deployment:** Vercel

## 🚀 Getting Started

To run this project on your local machine, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/abhinandan5/newsfolio-dashboard.git](https://github.com/abhinandan5/newsfolio-dashboard.git)
    cd newsfolio-dashboard
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Create your local environment file:**
    Create a file named `.env.local` in the root of the project and add your NewsAPI key. The key must be prefixed with `NEXT_PUBLIC_`.
    ```
    NEXT_PUBLIC_NEWS_API_KEY=your_api_key_here
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Test Credentials

-   **Admin:** `admin@demo.com` / `admin123`
-   **User:** `user@demo.com` / `password`