// import PDFDocument from "pdfkit";
// import fs from "fs";
// import path from "path";

// // Create output directory if it doesn't exist
// const outputDir = path.join(process.cwd(), "public", "downloads");
// if (!fs.existsSync(outputDir)) {
//   fs.mkdirSync(outputDir, { recursive: true });
// }

// const doc = new PDFDocument({
//   size: "A4",
//   margins: { top: 50, bottom: 50, left: 50, right: 50 },
//   info: {
//     Title: "Wiki PWA - Technical Documentation",
//     Author: "Wiki PWA Team",
//     Subject: "Application Architecture and Functionality",
//   },
// });

// const outputPath = path.join(outputDir, "vas-wiki-documentation.pdf");
// doc.pipe(fs.createWriteStream(outputPath));

// // Colors
// const colors = {
//   primary: "#0f172a",
//   secondary: "#3b82f6",
//   text: "#334155",
//   lightText: "#64748b",
//   accent: "#10b981",
// };

// // Helper functions
// function addTitle(text) {
//   doc
//     .font("Helvetica-Bold")
//     .fontSize(28)
//     .fillColor(colors.primary)
//     .text(text, { align: "center" });
//   doc.moveDown(0.5);
// }

// function addSubtitle(text) {
//   doc
//     .font("Helvetica")
//     .fontSize(14)
//     .fillColor(colors.lightText)
//     .text(text, { align: "center" });
//   doc.moveDown(2);
// }

// function addSectionHeader(text) {
//   doc.moveDown(1);
//   doc.font("Helvetica-Bold").fontSize(18).fillColor(colors.secondary).text(text);
//   doc.moveDown(0.5);
//   doc
//     .strokeColor(colors.secondary)
//     .lineWidth(2)
//     .moveTo(50, doc.y)
//     .lineTo(200, doc.y)
//     .stroke();
//   doc.moveDown(0.75);
// }

// function addSubsectionHeader(text) {
//   doc.moveDown(0.5);
//   doc.font("Helvetica-Bold").fontSize(14).fillColor(colors.primary).text(text);
//   doc.moveDown(0.3);
// }

// function addParagraph(text) {
//   doc.font("Helvetica").fontSize(11).fillColor(colors.text).text(text, {
//     align: "justify",
//     lineGap: 3,
//   });
//   doc.moveDown(0.5);
// }

// function addBulletPoint(text, indent = 0) {
//   const bulletX = 60 + indent * 15;
//   doc
//     .font("Helvetica")
//     .fontSize(11)
//     .fillColor(colors.text)
//     .text(`•  ${text}`, bulletX, doc.y, {
//       width: 495 - indent * 15,
//       lineGap: 2,
//     });
//   doc.moveDown(0.3);
// }

// function addCodeBlock(text) {
//   const startY = doc.y;
//   doc
//     .rect(50, startY, 495, 12 + text.split("\n").length * 14)
//     .fill("#f1f5f9");
//   doc.font("Courier").fontSize(9).fillColor("#1e293b").text(text, 60, startY + 6, {
//     width: 475,
//   });
//   doc.y = startY + 18 + text.split("\n").length * 14;
//   doc.moveDown(0.5);
// }

// function addDiagramBox(title, items) {
//   const boxWidth = 200;
//   const boxHeight = 20 + items.length * 16;
//   const startY = doc.y;

//   doc.rect(50, startY, boxWidth, boxHeight).stroke(colors.secondary);
//   doc
//     .font("Helvetica-Bold")
//     .fontSize(10)
//     .fillColor(colors.secondary)
//     .text(title, 55, startY + 5);

//   items.forEach((item, i) => {
//     doc
//       .font("Helvetica")
//       .fontSize(9)
//       .fillColor(colors.text)
//       .text(`- ${item}`, 60, startY + 20 + i * 14);
//   });

//   doc.y = startY + boxHeight + 10;
// }

// function checkPageBreak(neededSpace = 100) {
//   if (doc.y > 750 - neededSpace) {
//     doc.addPage();
//   }
// }

// // ============== DOCUMENT CONTENT ==============

// // Cover Page
// doc.moveDown(6);
// addTitle("Wiki PWA");
// addSubtitle("Technical Documentation & Architecture Guide");

// doc.moveDown(4);
// doc.font("Helvetica").fontSize(12).fillColor(colors.text);
// doc.text("A Progressive Web Application for Knowledge Management", { align: "center" });
// doc.moveDown(1);
// doc.text("Version 1.0", { align: "center" });
// doc.moveDown(1);
// doc.fontSize(10).fillColor(colors.lightText);
// doc.text(`Last Updated: ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`, { align: "center" });

// // Table of Contents
// doc.addPage();
// addSectionHeader("Table of Contents");
// doc.font("Helvetica").fontSize(11).fillColor(colors.text);
// const tocItems = [
//   "1. Executive Summary",
//   "2. System Architecture Overview",
//   "3. Frontend Architecture",
//   "4. Backend Architecture",
//   "5. PWA Implementation",
//   "6. Data Flow & State Management",
//   "7. Component Breakdown",
//   "8. API Reference",
//   "9. File Structure",
//   "10. Customization Guide",
// ];
// tocItems.forEach((item) => {
//   doc.text(item);
//   doc.moveDown(0.4);
// });

// // Section 1: Executive Summary
// doc.addPage();
// addSectionHeader("1. Executive Summary");
// addParagraph(
//   "Wiki PWA is a Progressive Web Application designed for offline-capable knowledge management. Built with Next.js 15, React, and TypeScript, it provides a modern, responsive interface for browsing, searching, and reading educational content."
// );
// addParagraph(
//   "The application features full PWA support including offline functionality, installability on any device, and automatic caching of content. It uses a modular architecture that allows easy customization of the dataset through a simple JSON file."
// );

// addSubsectionHeader("Key Features");
// addBulletPoint("Offline-first architecture with service worker caching");
// addBulletPoint("Installable as a native app on desktop and mobile");
// addBulletPoint("Full-text search across all articles");
// addBulletPoint("Responsive design for all screen sizes");
// addBulletPoint("Custom dataset support via JSON configuration");
// addBulletPoint("Markdown-like content rendering");

// // Section 2: System Architecture
// doc.addPage();
// addSectionHeader("2. System Architecture Overview");
// addParagraph(
//   "The Wiki PWA follows a modern JAMstack architecture pattern, combining static generation with dynamic client-side functionality. The system is composed of four main layers:"
// );

// addSubsectionHeader("Architecture Layers");
// addBulletPoint("Presentation Layer: React components with Tailwind CSS styling");
// addBulletPoint("Application Layer: Next.js App Router with server and client components");
// addBulletPoint("Data Layer: JSON-based data storage with TypeScript interfaces");
// addBulletPoint("PWA Layer: Service worker and manifest for offline capability");

// checkPageBreak(150);
// addSubsectionHeader("Technology Stack");
// addBulletPoint("Framework: Next.js 15 (App Router)");
// addBulletPoint("Language: TypeScript");
// addBulletPoint("Styling: Tailwind CSS v4");
// addBulletPoint("UI Components: shadcn/ui");
// addBulletPoint("Icons: Lucide React");
// addBulletPoint("PWA: Custom service worker + Web App Manifest");

// // Section 3: Frontend Architecture
// doc.addPage();
// addSectionHeader("3. Frontend Architecture");

// addSubsectionHeader("Component Hierarchy");
// addParagraph("The frontend follows a hierarchical component structure with clear separation of concerns:");
// addCodeBlock(`app/
// ├── page.tsx          (Landing Page)
// ├── wiki/
// │   └── page.tsx      (Wiki Application)
// └── api/
//     └── articles/     (REST API Routes)`);

// addSubsectionHeader("State Management");
// addParagraph(
//   "The application uses React's built-in state management with useState and useMemo hooks. The main wiki page maintains three key pieces of state:"
// );
// addBulletPoint("searchQuery: Current search filter text");
// addBulletPoint("selectedId: Currently selected article ID");
// addBulletPoint("sidebarOpen: Mobile sidebar visibility state");

// addSubsectionHeader("Rendering Strategy");
// addParagraph(
//   "Components are marked with 'use client' directive when they require browser APIs or user interaction. The landing page and documentation pages leverage server components for better performance."
// );

// // Section 4: Backend Architecture
// doc.addPage();
// addSectionHeader("4. Backend Architecture");

// addSubsectionHeader("API Routes");
// addParagraph("The backend consists of Next.js API routes that provide RESTful endpoints:");

// addCodeBlock(`GET /api/articles
//   - Returns all articles
//   - Query params: ?q=search_term
//   - Optional: ?meta=true for full metadata

// GET /api/articles/[id]
//   - Returns single article by ID
//   - Returns 404 if not found`);

// addSubsectionHeader("Data Loader Module");
// addParagraph(
//   "The data-loader.ts module provides a clean abstraction over the JSON data file, offering functions for:"
// );
// addBulletPoint("getAllArticles(): Retrieve all articles");
// addBulletPoint("getArticleById(id): Fetch specific article");
// addBulletPoint("searchArticles(query): Full-text search");
// addBulletPoint("getCategories(): List all categories");
// addBulletPoint("getWikiMeta(): Get wiki metadata");

// // Section 5: PWA Implementation
// doc.addPage();
// addSectionHeader("5. PWA Implementation");

// addSubsectionHeader("Service Worker (sw.js)");
// addParagraph(
//   "The service worker implements a network-first caching strategy with fallback to cache, ensuring fresh content when online and cached content when offline."
// );

// addCodeBlock(`Caching Strategy:
// 1. Try network request first
// 2. On success: Cache response, return to user
// 3. On failure: Return cached version
// 4. For navigation: Fall back to /wiki page`);

// addSubsectionHeader("Web App Manifest");
// addParagraph("The manifest.json file defines the PWA properties:");
// addBulletPoint("App name and description");
// addBulletPoint("Theme and background colors");
// addBulletPoint("Display mode (standalone)");
// addBulletPoint("App icons (192x192, 512x512)");
// addBulletPoint("Start URL (/wiki)");

// addSubsectionHeader("Install Prompt Hook (use-pwa.ts)");
// addParagraph(
//   "The usePWA hook manages the entire PWA lifecycle including service worker registration, offline detection, and the install prompt. It captures the beforeinstallprompt event to enable a custom install button."
// );

// // Section 6: Data Flow
// doc.addPage();
// addSectionHeader("6. Data Flow & State Management");

// addSubsectionHeader("Data Flow Diagram");
// addParagraph("The application follows a unidirectional data flow pattern:");

// addCodeBlock(`JSON File (wiki-data.json)
//        ↓
// Data Loader (data-loader.ts)
//        ↓
// API Routes (/api/articles)
//        ↓
// React Components
//        ↓
// User Interface`);

// addSubsectionHeader("Search Flow");
// addBulletPoint("User types in SearchBar component");
// addBulletPoint("searchQuery state updates in parent WikiPage");
// addBulletPoint("useMemo recalculates filteredArticles");
// addBulletPoint("ArticleList re-renders with filtered results");

// addSubsectionHeader("Article Selection Flow");
// addBulletPoint("User clicks article in ArticleList");
// addBulletPoint("onSelect callback fires with article ID");
// addBulletPoint("selectedId state updates in WikiPage");
// addBulletPoint("ArticleView receives and displays selected article");
// addBulletPoint("Mobile: Sidebar closes automatically");

// // Section 7: Component Breakdown
// doc.addPage();
// addSectionHeader("7. Component Breakdown");

// addSubsectionHeader("SearchBar Component");
// addParagraph("A controlled input component that filters articles in real-time.");
// addCodeBlock(`Props:
// - value: string (current search query)
// - onChange: (value: string) => void`);

// addSubsectionHeader("ArticleList Component");
// addParagraph("Displays a scrollable list of article cards with metadata.");
// addCodeBlock(`Props:
// - articles: Article[] (filtered list)
// - selectedId: string | null
// - onSelect: (id: string) => void`);

// addSubsectionHeader("ArticleView Component");
// addParagraph("Renders article content with markdown-like formatting support.");
// addCodeBlock(`Props:
// - article: Article | null
// - onClose: () => void

// Features:
// - Heading detection (## and ###)
// - Code block rendering
// - List item formatting
// - Tag display
// - Reading time estimate`);

// checkPageBreak(150);
// addSubsectionHeader("InstallButton Component");
// addParagraph("PWA install prompt button that adapts to installation state.");
// addCodeBlock(`Props:
// - canInstall: boolean
// - isInstalled: boolean  
// - onInstall: () => Promise<void>`);

// // Section 8: API Reference
// doc.addPage();
// addSectionHeader("8. API Reference");

// addSubsectionHeader("Article Type Interface");
// addCodeBlock(`interface Article {
//   id: string;
//   title: string;
//   content: string;
//   tags: string[];
//   category: string;
//   author: string;
//   createdAt: string;
//   difficulty?: "beginner" | "intermediate" | "advanced";
// }`);

// addSubsectionHeader("Category Type Interface");
// addCodeBlock(`interface Category {
//   id: string;
//   name: string;
//   description: string;
//   icon: string;
// }`);

// addSubsectionHeader("WikiData Type Interface");
// addCodeBlock(`interface WikiData {
//   meta: {
//     title: string;
//     description: string;
//     version: string;
//     lastUpdated: string;
//   };
//   categories: Category[];
//   articles: Article[];
// }`);

// // Section 9: File Structure
// doc.addPage();
// addSectionHeader("9. File Structure");

// addCodeBlock(`/vercel/share/v0-project/
// ├── app/
// │   ├── layout.tsx           # Root layout with PWA meta
// │   ├── page.tsx             # Landing/promotional page
// │   ├── globals.css          # Global styles
// │   ├── wiki/
// │   │   └── page.tsx         # Main wiki application
// │   |
// │   └── api/
// │       └── articles/
// │           ├── route.ts     # GET all articles
// │           └── [id]/
// │               └── route.ts # GET single article
// ├── components/
// │   ├── ui/                  # shadcn/ui components
// │   └── wiki/
// │       ├── search-bar.tsx
// │       ├── article-list.tsx
// │       ├── article-view.tsx
// │       └── install-button.tsx
// ├── hooks/
// │   ├── use-pwa.ts          # PWA functionality hook
// │   └── use-articles.ts     # SWR data fetching hook
// ├── lib/
// │   ├── types.ts            # TypeScript interfaces
// │   ├── data-loader.ts      # Data access layer
// │   └── utils.ts            # Utility functions
// └── public/
//     ├── manifest.json       # PWA manifest
//     ├── sw.js               # Service worker
//     ├── icon-192x192.png    # PWA icon
//     ├── icon-512x512.png    # PWA icon
//     └── data/
//         └── wiki-data.json  # Article database`);

// // Section 10: Customization Guide
// doc.addPage();
// addSectionHeader("10. Customization Guide");

// addSubsectionHeader("Adding New Articles");
// addParagraph("To add new articles, edit the public/data/wiki-data.json file:");

// addCodeBlock(`{
//   "id": "unique-article-id",
//   "title": "Article Title",
//   "content": "Article content with ## headings...",
//   "tags": ["tag1", "tag2"],
//   "category": "category-id",
//   "author": "Author Name",
//   "createdAt": "2024-01-15",
//   "difficulty": "beginner"
// }`);

// addSubsectionHeader("Adding New Categories");
// addBulletPoint("Add category object to categories array in JSON");
// addBulletPoint("Use consistent ID format (lowercase, hyphens)");
// addBulletPoint("Reference category ID in article's category field");

// addSubsectionHeader("Customizing Appearance");
// addBulletPoint("Edit globals.css for theme colors and fonts");
// addBulletPoint("Modify Tailwind classes in components");
// addBulletPoint("Update manifest.json for PWA branding");

// addSubsectionHeader("Deployment");
// addParagraph("The application can be deployed to any platform supporting Next.js:");
// addBulletPoint("Vercel (recommended): One-click deployment");
// addBulletPoint("Netlify: With Next.js adapter");
// addBulletPoint("Self-hosted: Using Node.js server");

// // Footer on last page
// doc.moveDown(2);
// doc
//   .font("Helvetica")
//   .fontSize(10)
//   .fillColor(colors.lightText)
//   .text("---", { align: "center" });
// doc.moveDown(0.5);
// doc.text("Wiki PWA - Technical Documentation", { align: "center" });
// doc.text("Built with Next.js, React, and TypeScript", { align: "center" });

// // Finalize
// doc.end();

// console.log(`PDF generated successfully: ${outputPath}`);
