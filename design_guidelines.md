# Grant Management Application Design Guidelines

## Design Approach

**System-Based Approach**: Material Design 3 principles adapted for enterprise financial applications, drawing inspiration from Linear's clean data presentation and Stripe Dashboard's professional aesthetic. This is a data-intensive administrative tool requiring clarity, efficiency, and trust.

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
- Main content: Two-column layout (sidebar + main) using grid-cols-[240px_1fr] on desktop
- Form layouts: Single column max-w-2xl for focused data entry
- Table layouts: Full-width with horizontal scroll on mobile

## Component Library

### Navigation
**Sidebar Navigation** (Fixed, 240px width):
- Logo/app name at top
- Vertical menu with icon + label format
- Active state with distinct visual treatment
- Grouped sections (Applications, Grants, Reports, Settings)
- User profile/logout at bottom

### Dashboard Components
**Stat Cards** (4-column grid on desktop):
- Large number display (text-3xl tabular-nums)
- Label beneath (text-sm uppercase tracking-wide)
- Optional trend indicator (arrow + percentage)
- Minimal borders, subtle background differentiation

**Data Tables**:
- Sticky header row with uppercase labels (text-xs tracking-wide)
- Alternating row treatment for readability
- Right-aligned numeric columns (tabular-nums)
- Action buttons/icons in final column
- Status badges inline (pill shape, text-xs font-medium)
- Pagination controls at bottom
- Filter/search bar above table
- Export button (CSV) in table header

### Forms
**Application Forms**:
- Single-column layout, max-w-2xl centered
- Clear section groupings with dividers
- Field labels above inputs (text-sm font-medium mb-1)
- Input fields: rounded-lg, px-4 py-2.5, border
- Required field indicators (asterisk)
- Helper text below fields (text-sm)
- File upload zones with drag-and-drop visual cues
- Multi-step forms with progress indicator at top
- Action buttons at bottom (Cancel + Primary CTA)

### Status & Workflow
**Status Badges** (inline elements):
- Pill shape: rounded-full px-3 py-1
- Font: text-xs font-medium uppercase tracking-wide
- States: Pending, Under Review, Approved, Rejected, Disbursed, Completed
- Use semantic styling per state

**Approval Workflow Timeline**:
- Vertical timeline with connected nodes
- Each stage shows: date, reviewer, status, comments
- Icons for each stage (checkmark, clock, x-mark)
- Progressive disclosure for stage details

### Cards & Containers
**Grant Application Cards**:
- Border, rounded-lg, p-6
- Header with grant name (text-lg font-semibold) + status badge
- Metadata grid: applicant, amount, date, program (text-sm)
- Brief description (text-sm line-clamp-2)
- Action buttons at bottom (View Details, Edit)

**Detail Views**:
- Header section with title + actions
- Tabbed interface for: Overview, Documents, Timeline, Disbursements
- Two-column info display for key details
- Document list with download icons
- Transaction history table

### Buttons & Actions
**Button Hierarchy**:
- Primary: Filled, medium prominence actions (Submit, Approve)
- Secondary: Outlined, supporting actions (Cancel, Back)
- Tertiary: Text only, minimal actions (Learn More, Skip)
- Destructive: For delete/reject actions
- Sizes: px-4 py-2 (default), px-6 py-3 (large), px-3 py-1.5 (small)
- All buttons: rounded-lg, font-medium, focus rings

### Reporting Components
**Report Filters Panel**:
- Sidebar or collapsible panel
- Stacked filter groups (Date Range, Status, Program, Amount Range)
- Apply + Clear Filters buttons
- Active filter chips displayed above results

**Charts & Visualizations**:
- Use Chart.js library via CDN
- Bar charts for disbursement comparisons
- Line charts for application trends over time
- Donut charts for status distribution
- Minimal chart chrome, clear axis labels

## Page-Specific Layouts

### Dashboard (Home)
- 4-column stat cards at top
- Recent applications table below
- Pending approvals section
- Alerts/notifications panel

### Applications List
- Filter bar with search + status filters
- Sortable table with pagination
- Bulk action checkbox column
- Quick filters above table (All, Pending, Approved, etc.)

### Application Detail View
- Breadcrumb navigation
- Header with applicant name, program, status
- Tabbed content area
- Sidebar with quick actions (Approve, Reject, Request More Info)
- Activity timeline at bottom

### Grant Programs Configuration
- List view with program cards
- Create New Program button (top right)
- Each card shows: name, budget, criteria summary, active/inactive toggle

### Profile & Settings
- Left sidebar navigation for settings sections
- Single-column form layouts
- Section headers with descriptions

## Accessibility & Interaction

- Focus states: visible ring-2 ring-offset-2
- Form validation: inline error messages (text-red-600, text-sm) below fields
- Loading states: skeleton screens for tables, spinners for button actions
- Empty states: Centered icon + message + CTA for empty tables/lists
- Confirmation modals for destructive actions
- Toast notifications for success/error feedback (top-right corner)

## Responsive Behavior

- **Mobile** (< 768px): Collapse sidebar to hamburger menu, stack stats vertically, tables scroll horizontally
- **Tablet** (768px-1024px): 2-column stat grid, persistent sidebar
- **Desktop** (>1024px): Full layout with fixed sidebar, 4-column grids