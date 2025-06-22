"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// Simple SVG icon components
const ArrowLeftIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const FileTextIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const MapPinIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

const LogoutIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

// Real data based on your Google Keep notes and Drive structure
const jobApplicationsData = [
  // Government Jobs (govjobs.lu)
  {
    id: 1,
    company: "Government (govjobs.lu)",
    position: "Data Analyst",
    status: "Applied",
    stage: "Application Submitted",
    dateApplied: "2025-03-05",
    location: "Luxembourg",
    notes: "Application deadline: March 5th",
    driveFolder: "#",
    source: "govjobs.lu",
    reference: "A1/Fevrier/20250205-dataanalystemfrfe00033831-345188"
  },
  {
    id: 2,
    company: "STATEC",
    position: "Data Production Survey",
    status: "Applied",
    stage: "Application Submitted",
    dateApplied: "2025-04-07",
    location: "Luxembourg",
    notes: "Government statistical office - production statistics",
    driveFolder: "https://drive.google.com/drive/folders/19o_zd_TuVSjT-8FdS6dwt3zVVp7Z8iFo",
    source: "govjobs.lu"
  },
  {
    id: 3,
    company: "STATEC",
    position: "Analyste quantitatif (Économiste)",
    status: "Applied",
    stage: "Application Submitted",
    dateApplied: "2025-04-30",
    location: "Luxembourg",
    notes: "Quantitative analyst position - ref: E00034989",
    driveFolder: "https://drive.google.com/drive/folders/1fI4QkIbLkREHxLSc9bqtvYb1cTNR9s5Z",
    source: "govjobs.lu",
    reference: "E00034989"
  },
  {
    id: 4,
    company: "EIB",
    position: "Trainee",
    status: "Applied",
    stage: "Under Review",
    dateApplied: "2025-05-19",
    location: "Luxembourg",
    notes: "European Investment Bank traineeship program",
    driveFolder: "https://drive.google.com/drive/folders/1KDxuvw-mEtDrZJi-wYfkR8Mt3OwmdLq4",
    source: "EIB Website"
  },
  {
    id: 5,
    company: "Government",
    position: "Business Analyst",
    status: "Applied",
    stage: "Application Submitted",
    dateApplied: "2025-05-26",
    location: "Luxembourg",
    notes: "Government business analyst role",
    driveFolder: "https://drive.google.com/drive/folders/1igGHZrrCrus0El8rIkFO3OHlrs36Yem4",
    source: "govjobs.lu"
  },
  // Networking & Contacts
  {
    id: 6,
    company: "Encevo/Enovos",
    position: "Billing Analyst",
    status: "Interview",
    stage: "First Interview Completed",
    dateApplied: "2025-01-28",
    location: "Esch-sur-Alzette",
    notes: "Contact: Charlotte Langer. Interview #1 completed on 28/01/2025",
    driveFolder: "#",
    source: "Contact Network",
    contact: "Charlotte Langer"
  },
  // Recruiters
  {
    id: 7,
    company: "KRC Recruitment",
    position: "Various Data Analyst Roles",
    status: "Applied",
    stage: "CV Sent to Recruiter",
    dateApplied: "2025-02-05",
    location: "Luxembourg",
    notes: "Sent CV to KRC recruiter for multiple data analyst positions",
    driveFolder: "#",
    source: "Recruiter"
  },
  {
    id: 8,
    company: "AZ Consult",
    position: "Data Analyst Roles",
    status: "Applied",
    stage: "CV Sent to Recruiter",
    dateApplied: "2025-01-27",
    location: "Luxembourg",
    notes: "Sent CV to AZ Consult for data analyst opportunities",
    driveFolder: "#",
    source: "Recruiter"
  },
  // NATO/NSPA
  {
    id: 9,
    company: "NATO NSPA",
    position: "Data Analyst (PA-8-15-A2)",
    status: "Researching",
    stage: "Position Identified",
    dateApplied: "2025-02-11",
    location: "Luxembourg",
    notes: "NATO Support and Procurement Agency position",
    driveFolder: "#",
    source: "nspa-nato.career.emply.com"
  }
];

// Networking contacts and insights from Google Keep + Gmail analysis
const networkingData = [
  {
    name: "Alper",
    company: "Luxembourg (Private Sector)",
    meetDate: "2025-01-08",
    insights: "600+ applications submitted, EU citizenship important, personal contacts crucial, LinkedIn outreach, CV catering to HR",
    advice: "Language: English primarily, no shame in asking contacts for job referrals",
    status: "Met - Valuable Contact"
  },
  {
    name: "Guillaume Osier",
    company: "STATEC (Head of Unit 'Living Conditions')",
    meetDate: "2025-05-26",
    insights: "Research presentation opportunity at STATEC internal seminars. LinkedIn contact established.",
    advice: "Research summary submitted and confirmed received. Opportunity for academic-industry collaboration.",
    status: "Active - Research Opportunity"
  },
  {
    name: "Anthony Martini",
    company: "Unknown",
    action: "LinkedIn Message Planned",
    strategy: "Start directly with CEO or HR managers, highlight flexibility and academia background",
    status: "Contact Planned"
  },
  {
    name: "Charlotte Langer",
    company: "Encevo/Enovos",
    role: "Billing Analyst Contact",
    action: "CV sent for job opening",
    status: "Interview Completed"
  },
  {
    name: "Mounir Ess",
    company: "New Consulting Company",
    role: "Data Scientist Opportunities",
    action: "CV sent",
    status: "CV Submitted"
  },
  {
    name: "Melanie Molinari",
    company: "STATEC (HR)",
    role: "Recruitment Contact",
    outcome: "Rejection for production statistics role (E00035020) on May 14, 2025",
    status: "Professional Rejection Handled"
  }
];

// Enhanced insights from Google Keep notes
const jobSearchInsights = {
  totalApplications: 600, // From Alper's experience
  strategies: [
    "EU citizenship advantage",
    "Personal contacts crucial",
    "LinkedIn outreach",
    "CV catering to HR",
    "English language focus",
    "Direct CEO/HR contact",
    "Highlight flexibility and academia",
    "Data analyst profile prominence",
    "Double decker CV format"
  ],
  tools: ["Microsoft tools", "Power BI", "SAP consultancy CUBIS"],
  targetSectors: ["Government", "FinTech", "EU Institutions", "Consulting"],
  keyPlatforms: ["govjobs.lu", "LinkedIn", "Recruiter networks", "Direct company contact"]
};

// Sankey diagram data structure
const sankeyData = {
  nodes: [
    // Sources
    { id: "applications", label: "Applications", color: "#3B82F6" },
    { id: "interviews", label: "Interviews", color: "#10B981" },
    { id: "final", label: "Final Round", color: "#F59E0B" },
    { id: "offers", label: "Offers", color: "#EF4444" },
    { id: "rejections", label: "Rejections", color: "#6B7280" },
    { id: "pending", label: "Pending", color: "#8B5CF6" }
  ],
  links: [
    { source: "applications", target: "interviews", value: 1 },
    { source: "applications", target: "pending", value: 3 },
    { source: "interviews", target: "final", value: 0 },
    { source: "final", target: "offers", value: 0 },
    { source: "interviews", target: "rejections", value: 0 }
  ]
};

export default function JobsPage() {
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [view, setView] = useState<"sankey" | "table">("sankey");

  const handleLogout = async () => {
    try {
      await fetch('/api/logout', { method: 'POST' });
      window.location.href = '/private';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Sankey diagram component (enhanced with real data)
  const SankeyDiagram = () => {
    const totalApplications = jobApplicationsData.length;
    const pendingCount = jobApplicationsData.filter(app => app.status === "Applied").length;
    const interviewCount = jobApplicationsData.filter(app => app.status === "Interview").length;
    const rejectedCount = jobApplicationsData.filter(app => app.status === "Rejected").length;
    const networkingCount = jobApplicationsData.filter(app => app.status === "Networking").length;
    const researchingCount = jobApplicationsData.filter(app => app.status === "Researching").length;
    const underReviewCount = jobApplicationsData.filter(app => app.stage === "Under Review").length;

    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Job Application Flow (Real Data from Gmail & Google Keep)</h3>
        
        <div className="flex items-center justify-between space-x-4">
          {/* Applications */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {totalApplications}
            </div>
            <span className="text-sm text-gray-600 mt-2">Applied</span>
          </div>

          {/* Arrow */}
          <div className="flex-1 flex items-center">
            <div className="w-full h-1 bg-gray-200 relative">
              <div 
                className="h-full bg-blue-500" 
                style={{ width: `${(pendingCount / totalApplications) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Pending */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {pendingCount}
            </div>
            <span className="text-sm text-gray-600 mt-2">Pending</span>
          </div>

          {/* Arrow */}
          <div className="flex-1 flex items-center">
            <div className="w-full h-1 bg-gray-200 relative">
              <div 
                className="h-full bg-green-500" 
                style={{ width: `${interviewCount > 0 ? (interviewCount / totalApplications) * 100 : 0}%` }}
              ></div>
            </div>
          </div>

          {/* Interviews */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {interviewCount}
            </div>
            <span className="text-sm text-gray-600 mt-2">Interviews</span>
          </div>

          {/* Arrow */}
          <div className="flex-1 flex items-center">
            <div className="w-full h-1 bg-gray-200 relative">
              <div 
                className="h-full bg-red-400" 
                style={{ width: `${rejectedCount > 0 ? (rejectedCount / totalApplications) * 100 : 0}%` }}
              ></div>
            </div>
          </div>

          {/* Rejections */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-red-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {rejectedCount}
            </div>
            <span className="text-sm text-gray-600 mt-2">Rejected</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-6 gap-4 text-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{totalApplications}</div>
            <div className="text-gray-600">Total Applied</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{pendingCount}</div>
            <div className="text-gray-600">Pending Review</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{interviewCount}</div>
            <div className="text-gray-600">Interviews</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-400">{rejectedCount}</div>
            <div className="text-gray-600">Rejected</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-600">{networkingCount}</div>
            <div className="text-gray-600">Networking</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-600">{researchingCount}</div>
            <div className="text-gray-600">Researching</div>
          </div>
        </div>

        {/* Application Sources Breakdown */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="text-md font-medium text-gray-900 mb-3">Application Sources</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600">
                {jobApplicationsData.filter(app => app.source === "govjobs.lu").length}
              </div>
              <div className="text-gray-600">govjobs.lu</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">
                {jobApplicationsData.filter(app => app.source === "Recruiter").length}
              </div>
              <div className="text-gray-600">Recruiters</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-purple-600">
                {jobApplicationsData.filter(app => app.source === "Contact Network" || app.source === "LinkedIn Network").length}
              </div>
              <div className="text-gray-600">Network</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-orange-600">
                {jobApplicationsData.filter(app => app.source?.includes("Website")).length + 
                 jobApplicationsData.filter(app => app.source?.includes("emply")).length}
              </div>
              <div className="text-gray-600">Direct Apply</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link
                href="/private"
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeftIcon />
                <span className="ml-2">Back to Private</span>
              </Link>
              <h1 className="text-xl font-semibold text-gray-900">Job Applications Tracker</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setView("sankey")}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${ 
                  view === "sankey" 
                    ? "bg-blue-100 text-blue-700" 
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Flow View
              </button>
              <button
                onClick={() => setView("table")}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${ 
                  view === "table" 
                    ? "bg-blue-100 text-blue-700" 
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Table View
              </button>
              
              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-2 text-sm font-medium text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
              >
                <LogoutIcon />
                <span className="ml-1">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {view === "sankey" ? (
          <div className="space-y-6">
            <SankeyDiagram />
            
            {/* Enhanced Stats with Real Insights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Recent Activity</h3>
                <p className="text-3xl font-bold text-blue-600">{jobApplicationsData.length}</p>
                <p className="text-sm text-gray-600">Active applications tracked</p>
                <p className="text-xs text-gray-500 mt-1">Last applied: {new Date(Math.max(...jobApplicationsData.map(app => new Date(app.dateApplied).getTime()))).toLocaleDateString()}</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Interview Rate</h3>
                <p className="text-3xl font-bold text-green-600">
                  {jobApplicationsData.length > 0 ? Math.round((jobApplicationsData.filter(app => app.status === "Interview").length / jobApplicationsData.length) * 100) : 0}%
                </p>
                <p className="text-sm text-gray-600">Conversion to interviews</p>
                <p className="text-xs text-gray-500 mt-1">1 interview from {jobApplicationsData.length} applications</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Primary Focus</h3>
                <p className="text-xl font-bold text-purple-600">Data Analysis</p>
                <p className="text-sm text-gray-600">Government & EU institutions</p>
                <p className="text-xs text-gray-500 mt-1">STATEC, EIB, govjobs.lu focus</p>
              </div>
            </div>
            
            {/* Networking Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Networking & Contacts</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {networkingData.map((contact, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{contact.name}</h4>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        contact.status === "Met - Valuable Contact" 
                          ? "bg-green-100 text-green-800"
                          : contact.status === "Interview Completed"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}>
                        {contact.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{contact.company}</p>
                    {contact.insights && (
                      <p className="text-xs text-gray-500">{contact.insights}</p>
                    )}
                    {contact.strategy && (
                      <p className="text-xs text-blue-600 mt-1">{contact.strategy}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Table View */
          <div className="bg-white shadow-sm rounded-lg border overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">All Applications</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Company & Position
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date Applied
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Source
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {jobApplicationsData.map((application) => (
                    <tr key={application.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {application.company}
                          </div>
                          <div className="text-sm text-gray-500">
                            {application.position}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          application.status === "Applied" 
                            ? "bg-purple-100 text-purple-800"
                            : application.status === "Interview"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}>
                          {application.stage}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <CalendarIcon />
                          <span className="ml-1">{new Date(application.dateApplied).toLocaleDateString()}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <MapPinIcon />
                          <span className="ml-1">{application.location}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setSelectedApplication(application)}
                            className="text-blue-600 hover:text-blue-800 transition-colors"
                          >
                            <FileTextIcon />
                          </button>
                          <a
                            href={application.driveFolder}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-gray-800 transition-colors"
                          >
                            <ExternalLinkIcon />
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Notes Section */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Notes & Insights</h3>
          <div className="prose prose-sm text-gray-600">
            <ul className="space-y-2">
              <li>🎯 <strong>Focus:</strong> Government and EU institutions in Luxembourg</li>
              <li>📊 <strong>Strategy:</strong> Targeting analyst and statistician roles</li>
              <li>📝 <strong>Next Steps:</strong> Follow up on pending applications</li>
              <li>💡 <strong>Insights:</strong> All applications are recent (May 2025), showing active job search</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Application Detail Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {selectedApplication.company} - {selectedApplication.position}
                </h3>
                <button
                  onClick={() => setSelectedApplication(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Status</label>
                  <p className="text-sm text-gray-900">{selectedApplication.stage}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700">Date Applied</label>
                  <p className="text-sm text-gray-900">
                    {new Date(selectedApplication.dateApplied).toLocaleDateString()}
                  </p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700">Location</label>
                  <p className="text-sm text-gray-900">{selectedApplication.location}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700">Notes</label>
                  <p className="text-sm text-gray-900">{selectedApplication.notes}</p>
                </div>
                
                <div className="pt-4">
                  <a
                    href={selectedApplication.driveFolder}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    <ExternalLinkIcon />
                    <span className="ml-2">View in Google Drive</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
