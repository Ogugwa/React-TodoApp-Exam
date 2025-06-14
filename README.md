# ✅ Todo App

A responsive, theme-toggleable Todo application built using **React** and **Vite**. This app features task management, search filtering, light/dark mode support, API integration, form handling, and error routing — all styled using **Tailwind CSS** and **Chakra UI**.

---

## 🧩 Features

- ✅ Add, update, and delete todos  
- 🔁 Toggle task completion status  
- 🌙 Dark/light mode toggle with `localStorage` persistence  
- 🔍 Search bar to filter todos by title  
- 📱 Responsive across all device sizes  
- 📥 Form validation using **React Hook Form** and **TanStack Form**  
- 🌐 External API integration with **JSONPlaceholder**  
- ♿ Accessibility enhancements with **React Aria**  
- 🚧 Custom 404 error page for invalid routes  

---

## 🛠 Installation & Setup

### Step 1: Create your React app using Vite

```bash
npm create vite@latest my-todo-app -- --template react
cd my-todo-app
```

### Step 2: Install Tailwind CSS

Follow the [official Tailwind CSS with Vite guide](https://tailwindcss.com/docs/guides/vite).

### Step 3: Reset Tailwind preset styles

Clear unnecessary default styles to customize your design fully.

### Step 4: Set up Routing with React Router

Install React Router and create page routes like `/`, `/login`, and `*` for the 404 error page.

### Step 5: Install React Aria for accessibility

```bash
npm install @react-aria/utils
```

### Step 6: Install React Icons

```bash
npm install react-icons
```

### Step 7: Install Form Libraries

```bash
npm install react-hook-form @tanstack/react-form
```

---

## 📜 Available Scripts

```bash
npm install          # Install dependencies
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

---

## 🧱 Technology Stack & Architecture

| Layer         | Tools / Libraries                              |
|---------------|------------------------------------------------|
| Frontend      | React (Vite)                                   |
| Styling       | Tailwind CSS, Chakra UI                        |
| Routing       | React Router                                   |
| Forms         | React Hook Form, TanStack Form                 |
| Icons         | React Icons                                    |
| Accessibility | React Aria                                     |
| API           | JSONPlaceholder                                |
| Hosting       | Vercel                                         |

---

## ⚙️ API Usage

All todos are fetched from and synced with [JSONPlaceholder](https://jsonplaceholder.typicode.com).

| Method  | Endpoint        | Description              |
|---------|------------------|--------------------------|
| GET     | `/todos`         | Fetch todos              |
| POST    | `/todos`         | Add a new todo           |
| PATCH   | `/todos/:id`     | Update a todo            |
| DELETE  | `/todos/:id`     | Delete a todo            |

---

## 🧠 Architecture & Key Decisions

- 🧩 **Component-based structure** promotes reusability and clarity.  
- 🧠 **State management** is handled using React Hooks.  
- 🔁 Todos are managed via **Axios** and synced with JSONPlaceholder.  
- 💡 **Theme mode** is stored in `localStorage` for persistent user preference.

---

## 🎥 Project Preview

Watch a short video demo here:  
🔗 [https://youtu.be/Eq6wXuw5KAo](https://youtu.be/Eq6wXuw5KAo)

---

## ⚠️ Known Issues

- ❌ No persistent backend — todos reset after each session.  
- ⚠️ Authentication is mocked — not suitable for production.  
- 🧪 Basic input validation only — more robust logic is needed.

---

## 🔮 Future Improvements

- 🗃 Connect to a real backend (e.g., Firebase, Supabase)  
- 🔐 Add user authentication (JWT or OAuth)  
- 🏷 Implement priority tags and task categories  
- 🔔 Add reminders/notifications and due dates  
 

---

## 🗂 Sample Folder Structure

```
src/
│
├── components/
│   └── default.jsx, navbar.jsx, 
│
├── pages/
│   └── basetodo.jsx, errorpage.jsx, login.jsx, signup.jsx,todocalls.jsx
│
├── feature_modules/
│   └── formfooter.js
│
├── App.jsx
└── main.jsx
```

---

## 📝 License

This project is open source and available under the **MIT License**.

---

## 🙌 Author

Built with 💙 by Okolo Deborah 