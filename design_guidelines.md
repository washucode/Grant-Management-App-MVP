# Lattice.Africa Grant Management System - Design Guidelines

## Organization Context

**Lattice.Africa** is a trusted advisory firm transforming communities and industries across Africa through strategic expertise, bold and practical solutions, and a commitment to sustainable growth. With over two decades of experience, Lattice delivers practical, insight-driven solutions in corporate strategy, financial advisory, and capacity development.

**Core Focus Areas**:
- Aquaculture Development - Sustainable fish farming value chains
- MSME Finance - Unlocking capital for small businesses, youth, and women
- Agriculture Transformation - Technology, capacity building, market linkages
- Strategic Advisory - Corporate finance, strategy, and capacity development

## Design Approach

**System-Based Approach**: Material Design 3 principles adapted for enterprise financial applications serving African markets. Drawing inspiration from Linear's clean data presentation and Stripe Dashboard's professional aesthetic, while incorporating warmth and accessibility appropriate for African users. This is a data-intensive administrative tool requiring clarity, efficiency, trust, and cultural resonance.

## Brand Identity

**Name**: Lattice.Africa
**Tagline**: "Strategic Expertise for Sustainable Growth in Africa"

**Brand Meaning**: "Lattice" - A framework or structure that combines multidimensional tools to deliver robust and stable solutions.

**Visual Identity**: Professional, trustworthy, and approachable with African cultural resonance.

## Color System

### Primary Palette
- **Primary (Deep Blue)**: #0F4C81 - Trust, professionalism, stability
  - Use for: Primary buttons, links, active states, headers
  - Represents: Financial stability and strategic depth

- **Accent (Warm Amber)**: #F59E0B - Growth, optimism, African warmth
  - Use for: CTAs, highlights, success indicators, trends
  - Represents: Growth, opportunity, and African sunlight

- **Success (Sustainable Green)**: #10B981 - Agriculture, sustainability, approval
  - Use for: Approved status, positive indicators, growth metrics
  - Represents: Agricultural focus and environmental sustainability

### Supporting Colors
- **Warning (Terracotta)**: #EA580C - Attention, pending items
- **Destructive (Deep Red)**: #DC2626 - Rejections, errors, critical actions
- **Info (Sky Blue)**: #0EA5E9 - Under review, informational states

### Neutral Palette
- **Background**: #FFFFFF (light mode), #0A0F1A (dark mode)
- **Surface**: #F8FAFC (light mode), #1E293B (dark mode)
- **Border**: #E2E8F0 (light mode), #334155 (dark mode)
- **Text Primary**: #0F172A (light mode), #F1F5F9 (dark mode)
- **Text Secondary**: #64748B (light mode), #94A3B8 (dark mode)
- **Text Tertiary**: #94A3B8 (light mode), #64748B (dark mode)

## Typography System

**Font Stack**: Inter via Google Fonts CDN
- **Display/Headers**: 600 weight, tracking-tight
- **Section Headers**: 500 weight  
- **Body Text**: 400 weight, tracking-normal, leading-relaxed
- **Data/Numbers**: 500 weight tabular-nums for alignment
- **Labels/Captions**: 500 weight, text-sm, uppercase tracking-wide for form labels and table headers

**Hierarchy**:
- Page titles: text-3xl to text-4xl
- Section headers: text-xl to text-2xl
- Card titles: text-lg
- Body/forms: text-base
- Metadata/captions: text-sm
- Fine print: text-xs

## Layout System

**Spacing Primitives**: Use Tailwind units 1, 2, 3, 4, 6, 8, 12, 16
- Component padding: p-4 to p-6
- Section spacing: space-y-6 to space-y-8
- Card internal spacing: p-6
- Form field spacing: space-y-4
- Table cell padding: px-4 py-3
- Page margins: px-6 to px-8

**Grid System**:
- Dashboard stats: grid-cols-1 md:grid-cols-2 lg:grid-cols-4
- Main content: Sidebar + main using Shadcn sidebar system
- Form layouts: Single column max-w-2xl for focused data entry
- Table layouts: Full-width with horizontal scroll on mobile

## Component Library

### Navigation
**Sidebar Navigation** (Shadcn sidebar component):
- Lattice.Africa logo and tagline at top
- Vertical menu with icon + label format
- Active state with distinct visual treatment
- Grouped sections by user role
  - **Applicants**: My Applications, Available Programs, Profile
  - **Reviewers**: Review Queue, All Applications, Programs, Reports
  - **Admins**: Dashboard, Applications, Programs, Users, Settings
- User profile with role badge at bottom

### Logo Treatment
**Primary Logo**: "Lattice" wordmark in Deep Blue (#0F4C81)
- Subtitle: ".africa" in Amber (#F59E0B)
- Tagline: "Strategic Expertise for Growth" in secondary text

### Dashboard Components
**Stat Cards** (4-column grid on desktop):
- Large number display (text-3xl tabular-nums)
- Label beneath (text-sm uppercase tracking-wide)
- Icon in accent color (Amber or context-appropriate)
- Optional trend indicator (arrow + percentage in Green/Red)
- Subtle background with border in brand colors

**Data Tables**:
- Sticky header row with uppercase labels (text-xs tracking-wide)
- Zebra striping for readability
- Right-aligned numeric columns (tabular-nums)
- Action buttons/icons in final column
- Status badges inline (pill shape, text-xs font-medium)
- Pagination controls at bottom
- Filter/search bar above table in Amber accent
- Export button in primary blue

### Forms
**Application Submission Forms** (Applicant-facing):
- Single-column layout, max-w-2xl centered
- Progress indicator with Amber accent for active steps
- Clear section groupings with green dividers (representing growth/progress)
- Field labels above inputs (text-sm font-medium mb-1)
- Input fields: rounded-lg, px-4 py-2.5, border with blue focus ring
- Required field indicators (asterisk in amber)
- Helper text below fields (text-sm tertiary)
- File upload zones with drag-and-drop in amber accent
- Multi-step forms with progress bar
- Action buttons at bottom (Cancel outline + Primary CTA in blue)

### Status & Workflow
**Status Badges** (inline elements):
- Pill shape: rounded-full px-3 py-1
- Font: text-xs font-medium uppercase tracking-wide
- States with cultural context:
  - **Submitted/Pending**: Amber (#F59E0B) - Opportunity, waiting
  - **Under Review**: Sky Blue (#0EA5E9) - In process
  - **Approved**: Green (#10B981) - Growth, success
  - **Rejected**: Red (#DC2626) - Clear negative
  - **Disbursed**: Deep Blue (#0F4C81) - Financial completion
  - **Completed**: Neutral Gray - Final state

**Approval Workflow Timeline**:
- Vertical timeline with connected nodes in Amber
- Each stage shows: date, reviewer, status, comments
- Icons for each stage (checkmark in green, clock in amber, x-mark in red)
- Progressive disclosure for stage details

### User Role Indicators
**Role Badges**:
- Applicant: Amber background with dark text
- Reviewer: Blue background with white text
- Admin: Green background with white text
- Display in user profile section and user management tables

### Cards & Containers
**Application Cards** (for applicants):
- Border in brand colors, rounded-lg, p-6
- Header with program name (text-lg font-semibold) + status badge
- Metadata: amount requested, submission date, current status
- Progress indicator if multi-stage
- Action button (View Details in primary blue)

**Program Cards** (for browsing):
- Amber accent border for active programs
- Focus areas icons (aquaculture, agriculture, MSME, etc.)
- Budget availability with green progress bar
- Deadline prominently displayed
- "Apply Now" CTA in primary blue

### Buttons & Actions
**Button Hierarchy**:
- Primary: Filled blue (#0F4C81), for main actions (Submit, Approve, Apply)
- Accent: Filled amber (#F59E0B), for promotional CTAs (Apply for Grant)
- Secondary: Outlined, supporting actions (Cancel, Back)
- Tertiary: Text only, minimal actions (Learn More, Skip)
- Success: Green for approvals
- Destructive: Red for delete/reject actions
- Sizes: px-4 py-2 (default), px-6 py-3 (large), px-3 py-1.5 (small)
- All buttons: rounded-lg, font-medium, focus rings in brand colors

### Cultural Considerations
**African Context Design**:
- Use warm, welcoming language in empty states
- Celebrate success moments (approved applications) with positive feedback
- Consider mobile-first given African mobile penetration
- Use clear, simple language avoiding jargon
- Show transparency in decision-making process
- Honor cultural values of community and shared success

## Page-Specific Layouts

### Landing Page (Logged Out Users)
- Hero section with Lattice.Africa mission and value proposition
- Statistics on impact (applications funded, businesses supported, etc.)
- Available grant programs preview
- "Get Started" and "Login" CTAs in brand colors
- Testimonials from successful applicants
- Footer with contact information

### Applicant Dashboard
- Welcome message with user name
- "My Applications" section showing status of all applications
- "Available Programs" section showing open grant opportunities
- Quick actions: Start New Application, Track Application
- Notifications about application status changes

### Reviewer Dashboard
- Review queue showing pending applications requiring action
- Statistics on review workload
- Recent activity timeline
- Quick filters by program, date, amount
- Bulk action capabilities

### Admin Dashboard
- System-wide statistics (total grants, applications, disbursements)
- Recent applications across all programs
- User management quick access
- Program budget status
- System health and activity logs

## Accessibility & Interaction

- Focus states: visible ring-2 ring-offset-2 in brand colors
- Form validation: inline error messages (text-red-600, text-sm) below fields
- Loading states: skeleton screens for tables, spinners in brand colors
- Empty states: Welcoming icon + encouraging message + CTA
- Confirmation modals for destructive actions
- Toast notifications for success/error feedback (top-right corner)
- High contrast ratios meeting WCAG AA standards
- Screen reader friendly labels and ARIA attributes

## Responsive Behavior

- **Mobile** (< 768px): Hamburger menu, vertical stat stacking, horizontal table scroll, thumb-friendly touch targets
- **Tablet** (768px-1024px): 2-column stat grid, collapsible sidebar
- **Desktop** (>1024px): Full layout with persistent sidebar, 4-column grids

## Multilingual Considerations

While English is primary, design should accommodate:
- Right-to-left (RTL) layout capability for Arabic speakers
- Longer text strings for French translations (common in West/Central Africa)
- Local currency display (KES, UGX, TZS, etc.)
- Date formats following local conventions
