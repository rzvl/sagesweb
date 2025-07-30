# Sages Web 🚀

A modern web application featuring a robust, custom-built authentication system from scratch.

**Live Demo:** [**sagesweb.com**](https://sagesweb.com)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyour-username%2Fsages-web)

---

## 💡 About The Project

Sages Web was envisioned as a modern, centralized **directory for spiritual teachers and their teachings**. The goal was to create a platform where users could discover, learn from, and connect with various spiritual guides from around the world.

The foundational step for this vision was to build a secure and feature-rich user management system, which is the current state of the project.

---

## ⚠️ Project Status: On Hold

This project is currently on hold. The core authentication system and user settings pages have been fully developed and are operational. Future development is paused at this time.

---

## ✨ Features

Sages Web's primary focus was to build a secure, performant, and modern authentication experience without relying on third-party authentication libraries.

* **Custom Authentication:** The entire authentication flow is built from the ground up using TypeScript, providing full control over the user experience and security model.
    * **Session-Based:** Uses secure, HTTP-only session cookies for user authentication.
    * **Credential & OAuth Login:** Supports standard sign-up/sign-in with username/email and password, as well as OAuth providers for social logins.
* **Email Verification:** New users receive a verification link via email (powered by **Resend**) and must confirm their address before gaining full access.
* **Two-Factor Authentication (2FA):** Users can enhance their account security by enabling 2FA through their settings page.
* **High-Performance Sessions:** User sessions are cached in **Upstash Redis**, enabling near-instantaneous reads and writes for a faster, more responsive authentication experience compared to traditional database lookups.
* **Modern UI:** Built with **ShadCn UI** for a sleek, accessible, and customizable component library.

---

## 💻 Tech Stack

This project leverages a modern, type-safe, and scalable technology stack.

| Category             | Technology                                                                                                  |
| -------------------- | ----------------------------------------------------------------------------------------------------------- |
| **Framework** | [Next.js 15](https://nextjs.org/)                                                                           |
| **Language** | [TypeScript](https://www.typescriptlang.org/)                                                               |
| **UI Library** | [React 19](https://react.dev/) & [ShadCn UI](https://ui.shadcn.com/)                                          |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/)                                                                    |
| **ORM** | [Drizzle ORM](https://orm.drizzle.team/)                                                                    |
| **Database** | [Neon DB](https://neon.tech/) (Serverless Postgres)                                                         |
| **Schema/Validation**| [Zod](https://zod.dev/) & [React Hook Forms](https://react-hook-form.com/)                                    |
| **File Uploads** | [Uploadthing](https://uploadthing.com/)                                                                     |
| **Email Service** | [Resend](https://resend.com/)                                                                               |
| **Caching** | [Upstash Redis](https://upstash.com/)                                                                       |
| **Linting/Formatting**| [ESLint](https://eslint.org/) & [Prettier](https://prettier.io/)                                            |
