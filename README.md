# Legislative Data Challenge - Full Stack Solution

A full-stack application for visualizing legislative data including bills, legislators, and voting records.

---

## 🏗️ Architecture

### Backend (.NET 8)
- **Clean Architecture** with separated layers
- **RESTful APIs** with Swagger documentation
- **CSV Data Source** with efficient in-memory caching
- **Dependency Injection** for loose coupling

### Frontend (React + Vite)
- **Material-UI** for component library
- **Styled Components** for custom styling
- **Custom Hooks** for data fetching
- **Responsive Design** with modern UI/UX

---

## 🚀 Getting Started

### Prerequisites
- .NET 8 SDK
- Node.js 18+ and npm
- Git


### Backend Setup

1. **Navigate to the API project:**
- Create Data folder and add CSV files:
- Copy bills.csv, legislators.csv, votes.csv, vote_results.csv to Data folder
- Restore dependencies and run:
- dotnet restore
- dotnet run
- Access the API:
- API: http://localhost:5000
- Swagger UI: http://localhost:5000/swagger

### Frontend Setup
- Navigate to frontend:
- Install dependencies:
- npm install
- Start development server:
- npm run dev
- Access the application:
- App: http://localhost:5173

### 🎯 Design Decisions
- Decision	Rationale
- Clean Architecture	Separation of concerns, testable, maintainable
- In-Memory Caching	Fast data access, suitable for static CSV data
- Material-UI	Professional UI components out of the box
- Styled Components	CSS-in-JS for component-scoped styling
- Custom Hooks	Reusable data fetching logic
-  Swagger	Auto-generated API documentation
### 📈 Future Enhancements
 - Add filtering capabilities
 - Export data to CSV/Excel
 - Add date range filters for "Bill Voted On Date"
 - Support for co-sponsors
 - Real-time data updates
 - User authentication
 - Data visualization charts
 - Advanced search functionality
 - Bill text preview
 - Voting history timeline
### 🛠️ Tech Stack
## Backend
- .NET 8
- ASP.NET Core Web API
- Swashbuckle (Swagger)
- CsvHelper (CSV parsing)
## Frontend
- React 18
- Vite
- Material-UI (MUI)
- Styled Components
- Axios