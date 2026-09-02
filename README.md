# PawCare India 🐾

**PawCare India** is a dedicated animal healthcare discovery platform and veterinary document intelligence assistant tailored for pet parents, rescuers, and animal caretakers across India. Conceptually modeled as a "Practo for Pets", PawCare bridges the gap between pet owners and verified veterinary infrastructure while demystifying complex medical reports using AI.

---

## 🌟 Key Features

### 1. 🏥 Veterinary & Healthcare Discovery (`Explore`)
- **Multi-Category Directory**: Browse and filter verified Veterinary Clinics & Hospitals, 24/7 Emergency Trauma Centers, Pet Ambulances (with on-board oxygen), Animal Rescue NGOs, and Pet Boarding Resorts.
- **Smart Filtering**: Filter by doctor specialization, treatment types (surgery, diagnostics, vaccination, dental, etc.), species treated (dogs, cats, birds, exotics, community animals), distance radius, and "Open Now" status.
- **Interactive Multi-View**: Switch between split-screen, card list, and full interactive map layouts with live geolocation and distance calculations.
- **Clinic Transparency**: View consultation fees, doctor credentials (degrees, VCI registration, experience), clinic facilities (X-ray, ultrasound, ICU, isolation ward), and verified reviews.

### 2. 🚨 24/7 Emergency SOS Network
- **Direct Emergency Lines**: 1-tap dialing for national animal ambulance services (`1962`), Mumbai/regional 24-hour trauma units, and snake/wildlife rescue teams.
- **In-Transit First Aid**: Instant situational guidance on stabilizing trauma, poisoning, and respiratory distress while en route to a clinic.

### 3. 📄 PawCare AI Medical Document Analyzer (`Health`)
- **Veterinary Report Understanding**: Upload CBC blood panels, serum biochemistry tests, urinalysis, pathology results, or vet prescriptions (PDF, JPG, PNG).
- **Automated Biomarker Flagging**: Automatically extracts test values, compares them with species-specific reference ranges, and highlights out-of-range parameters.
- **Plain-English Translation**: Converts dense veterinary medical terminology into easy-to-understand summaries.
- **Veterinary Questions Generator**: Formulates targeted, clinically relevant questions for pet parents to bring to their veterinarian consultation.
- **Interactive Follow-Up Q&A**: Ask follow-up questions to understand care routines, diet, and recovery precautions.
- **Sample Reports**: 1-click demo reports (Canine Renal Panel, Feline CBC & Infection, Pre-Op Biochemistry) for instant evaluation.

### 4. 📅 Appointment Booking & Pet Management (`Profile`)
- **Direct Slot Reservation**: Reserve verified in-clinic appointment slots without convenience charges or mandatory pre-payments.
- **Pet Health Cards**: Maintain digital records for multiple pets with microchip/tag numbers, vaccination logs, blood groups, and known allergies.
- **Saved Medical History**: Access past AI analysis summaries anytime for comparative health tracking.

---

## 🛠️ Tech Stack

- **Frontend**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vite.dev/)
- **Styling & UI**: [Tailwind CSS v4](https://tailwindcss.com/), [Lucide React](https://lucide.dev/), [Motion](https://motion.dev/)
- **Backend API**: [Express](https://expressjs.com/) with Node.js
- **AI & Intelligence**: [@google/genai](https://www.npmjs.com/package/@google/genai) powering server-side document understanding with Gemini models
- **Maps & Geolocation**: Browser Geolocation API + interactive mapping integration

---

## 📁 Project Structure

```
├── public/                # Static assets and icons
├── src/
│   ├── components/        # Reusable UI modules
│   │   ├── AIReportView.tsx          # Comprehensive AI report summary & biomarker table
│   │   ├── AppointmentModal.tsx      # In-clinic appointment booking modal
│   │   ├── DocumentUploader.tsx      # Drag-and-drop file uploader & demo samples
│   │   ├── EmergencySOSModal.tsx     # 24/7 Emergency SOS helpline dialog
│   │   ├── FilterModal.tsx           # Advanced clinic search & filtering modal
│   │   ├── Navbar.tsx                # Responsive top navigation & emergency banner
│   │   ├── ProviderCard.tsx          # Veterinary clinic/hospital list item card
│   │   └── ProviderDetailModal.tsx   # Detailed doctor profiles, reviews & services
│   ├── data/
│   │   ├── mockProviders.ts          # Verified clinic, hospital & ambulance dataset
│   │   └── sampleReports.ts          # Sample veterinary lab reports for demonstration
│   ├── pages/
│   │   ├── ExplorePage.tsx           # Map and list discovery page
│   │   ├── HealthPage.tsx            # AI report analyzer page
│   │   ├── HomePage.tsx              # Landing dashboard and quick category access
│   │   └── ProfilePage.tsx           # Pet profiles, bookings & saved medical records
│   ├── types/
│   │   └── index.ts                  # Shared TypeScript interfaces & types
│   ├── App.tsx                       # Root application component & state management
│   ├── index.css                     # Tailwind CSS global styles
│   └── main.tsx                      # React DOM entry point
├── server.ts                         # Express server with Vite middleware & Gemini API proxy
├── metadata.json                     # AI Studio metadata & permission declarations
├── package.json                      # Dependencies and build scripts
└── vite.config.ts                    # Vite build configuration
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18+ recommended)
- `npm` or `yarn`

### Installation & Local Development

1. **Clone the repository and install dependencies**:
   ```bash
   npm install
   ```

2. **Configure Environment Variables**:
   Create a `.env` file or provide environment variables:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

3. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build for Production**:
   ```bash
   npm run build
   ```

5. **Start Production Server**:
   ```bash
   npm start
   ```

---

## 🔒 Security & Medical Disclaimer

- **API Key Protection**: All AI analysis requests are securely routed through server-side endpoints (`/api/*`). API keys are never exposed to the client.
- **Veterinary Medical Disclaimer**: PawCare AI provides educational insights and plain-language summaries to assist pet owners. It does not provide definitive medical diagnoses or replace direct consultation, physical examination, and treatment by a registered, licensed veterinary professional.

---

## 📄 License
This project is private and maintained for Google AI Studio Build.
