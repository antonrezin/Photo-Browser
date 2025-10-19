
# 📸 Photo Browser

A simple, responsive photo browsing web application built with **React (Vite)**.  
The app demonstrates fetching data from a REST API, dynamically rendering photo lists, and displaying detailed information for each photo.

🔗 **Live Demo:** [https://antonrezin.github.io/Photo-Browser/](https://antonrezin.github.io/Photo-Browser/)

---

## 🧩 Project Overview

The project consists of two main components:

- **`PhotoList.jsx`** — Displays a grid of photo thumbnails fetched from the API.  
- **`PhotoDetails.jsx`** — Opens a selected photo in full view with detailed information.

---

## 🚀 Key Features

- **Dynamic Photo Loading:**  
  The first render displays **60 photos**, and the **“Load More”** button loads 60 more with each click, creating one large scrollable list.

- **API Integration:**  
  Photo data is fetched from the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/photos).  
  Since some image URLs are dead, they are replaced dynamically with working images from [Picsum Photos](https://picsum.photos/).

- **Back to Top Button:**  
  Becomes visible after scrolling down; clicking it smoothly scrolls the page back to the top.

- **Photo Details View:**  
  Clicking a photo opens a **details page** (`PhotoDetails.jsx`) that displays:
  - Author (from the Picsum API)  
  - Resolution (width × height)  
  - Source link (to the Picsum photo page)  
  - “Download: Full Size” link that opens the image in original resolution

- **Navigation:**  
  Fully functional **React Router** navigation:
  - Click a photo → opens its details page  
  - “Back to List” button → returns to the main gallery  
  - Browser **back/forward navigation** works correctly

- **Material-UI (MUI) Styling:**  
  The app uses MUI components for layout, buttons, icons, and responsive photo grids.

---

## 🛠️ Tech Stack

- **React (Vite)**  
- **React Router DOM**  
- **Material-UI (MUI)**  
- **Fetch API**  
- **Picsum Photos API**  
- **JSONPlaceholder API**
