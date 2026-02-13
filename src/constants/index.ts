// ─── Lead Status Values ─────────────────────────────────────────
export const LEAD_STATUSES = ['new', 'contacted', 'qualified', 'converted', 'closed'] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

// ─── Interest Type Values ───────────────────────────────────────
export const INTEREST_TYPES = [
  'hearing_test',
  'hearing_aid',
  'tinnitus',
  'consultation',
  'other',
] as const;
export type InterestType = (typeof INTEREST_TYPES)[number];

// ─── Product Styles ─────────────────────────────────────────────
export const PRODUCT_STYLES = ['RIC', 'BTE', 'CIC'] as const;
export type ProductStyle = (typeof PRODUCT_STYLES)[number];

// ─── Pagination defaults ────────────────────────────────────────
export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;
