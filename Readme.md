✨ What's Lavendish? An e-commerce platform primarily focused on selling stylish bags! 👜🛍️ A blend of modern tech and best practices to deliver a robust shopping experience. 🌐

[Youtube Link: Lavendish](https://youtu.be/grHTfdDoVyQ?feature=shared)

---

## 🚀 Project Overview
Lavendish is a modern e-commerce platform designed for selling stylish bags. It combines robust backend practices with a clean, user-friendly interface. Built as a personal project to sharpen backend skills, Lavendish demonstrates best practices in authentication, security, and code organization.

## 🔍 Key Features and Technologies
- 🏗️ Industry-Level File Structure: Organized and efficient for scalability and maintenance.
- 🔐 JWT with Cookies: Secure authentication & authorization mechanisms.
- 🛡️ Encryption with Bcrypt: Password security and data protection.
- 🔧 Environment Management: `.env` & `config` folders for secret management.
- 🐞 Efficient Debugging: Using `debugger` over `console.log` for troubleshooting.
- ❌ Robust Error Handling throughout the codebase.
- 🧹 Separation of Concerns: Clean, modular code.
- 📂 File Uploads with Multer: Smooth file handling.
- 📊 MongoDB for CRUD Operations: Efficient NoSQL data management.
- 🎨 Tailwind CSS for Styling: Minimalistic, beautiful UI.

## 🛠️ Installation
1. **Clone the repo:**
   ```bash
   git clone https://github.com/Yash2204V/lavendish.git
   cd lavendish
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set up environment variables:**
   - Copy `.env.example` to `.env` and fill in the required values (MongoDB URI, JWT secrets, etc.)
4. **Start the application:**
   ```bash
   npm start
   ```
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

## 💻 Usage
- Visit `http://localhost:3000` in your browser.
- Register or log in as a user or owner.
- Browse products, add to cart, or manage products as an owner.

## 📁 Folder Structure
```
lavendish/
├── app.js                  # Main Express app
├── config/                 # Configuration files (Mongoose, Multer)
├── controllers/            # Route controllers (auth, owner)
├── middlewares/            # Authentication middlewares
├── models/                 # Mongoose models (User, Owner, Product)
├── public/                 # Static assets (images, JS, CSS)
├── routes/                 # Express route handlers
├── utils/                  # Utility functions (token generation)
├── views/                  # EJS templates
├── package.json            # Project metadata and dependencies
├── vercel.json             # Vercel deployment config
└── Readme.md               # Project documentation
```

## 🤝 Collaboration Guidelines
Main steps to follow for collaborators:
1. Clone the repo.
2. (VERY IMP.) ⇒ Make your own branch, NEVER MAKE CHANGES IN MAIN BRANCH.
3. Write your code in that branch only.
4. After completing ⇒ commit & push the code.
5. Inform me to see your commits.
6. MERGER (Me) ⇒ if changes seem intriguing and relevant, I will add it to the main branch.

## 🔥 About
Lavendish is all about combining fashion with technology to deliver an amazing shopping experience! 🔥

Although, it was just to sharpen my backend as a practice. It helps me a lot.
It's been an incredible journey exploring these technologies and integrating them seamlessly. Ready for the next challenge! 💪

💡 Always aiming to innovate and build solutions that matter. 💡

## Credits
Credit goes to [Sheryians Coding School](https://www.youtube.com/@sheryians) and their [YouTube channel](https://www.youtube.com/@sheryians) for guidance in building this project.
