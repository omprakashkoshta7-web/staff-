// Staff Portal API Configuration
export const STAFF_API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:4000',
  TIMEOUT: 30000,
  ENDPOINTS: {
    // Auth
    AUTH: {
      LOGIN: '/api/staff/auth/login',
      VERIFY: '/api/auth/verify',
      ME: '/api/auth/me',
      MFA_VERIFY: '/api/staff/auth/mfa/verify',
      LOGOUT: '/api/staff/auth/logout',
      SESSION: '/api/staff/auth/session',
      SESSIONS: '/api/staff/auth/sessions',
      KILL_SESSION: (id: string) => `/api/staff/auth/session/${id}`,
    },
    // RBAC
    RBAC: {
      USER_ROLE: (userId: string) => `/api/staff/roles/${userId}`,
      PERMISSIONS: (role: string) => `/api/staff/permissions/${role}`,
      ASSIGN_ROLE: '/api/staff/roles/assign',
    },
    // Tasks
    TASKS: {
      LIST: '/api/staff/tasks',
      DETAIL: (id: string) => `/api/staff/tasks/${id}`,
      COMPLETE: (id: string) => `/api/staff/tasks/${id}/complete`,
      ASSIGN: (id: string) => `/api/staff/tasks/${id}/assign`,
    },
    // Orders
    ORDERS: {
      VENDORS: '/api/staff/vendors',
      QUEUE: '/api/staff/orders',
      DETAIL: (id: string) => `/api/staff/orders/${id}`,
      REASSIGN_VENDOR: (id: string) => `/api/staff/orders/${id}/reassign-vendor`,
      CLARIFICATION: (id: string) => `/api/staff/orders/${id}/clarification`,
    },
    // Support
    SUPPORT: {
      TICKETS: '/api/staff/tickets',
      TICKET_DETAIL: (id: string) => `/api/staff/tickets/${id}`,
      REPLY: (id: string) => `/api/staff/tickets/${id}/reply`,
      CLOSE: (id: string) => `/api/staff/tickets/${id}/close`,
      ESCALATE: (id: string) => `/api/staff/tickets/${id}/escalate`,
      VENDOR_TICKETS: '/api/staff/vendor-tickets',
      VENDOR_REPLY: (id: string) => `/api/staff/vendor-tickets/${id}/reply`,
      UPLOAD_ATTACHMENTS: '/api/staff/uploads/attachments',
    },
    // Finance
    FINANCE: {
      REFUNDS: '/api/staff/refunds',
      APPROVE_REFUND: (id: string) => `/api/staff/refunds/${id}/approve`,
      ESCALATE_REFUND: (id: string) => `/api/staff/refunds/${id}/escalate`,
      CREDIT_WALLET: '/api/staff/wallet/credit',
      DEBIT_WALLET: '/api/staff/wallet/debit',
      WALLET_LEDGER: '/api/staff/wallet/ledger',
      PAYOUTS: '/api/staff/payouts',
      ISSUE_PAYOUT_TICKET: '/api/staff/payouts/issue-ticket',
    },
    // Marketing - Using Admin Coupon APIs
    MARKETING: {
      CAMPAIGNS: '/api/staff/campaigns', // Placeholder
      CREATE_COUPON: '/api/staff/coupons', // Placeholder
      CREATE_TARGETING: '/api/staff/targeting', // Placeholder
      ANALYTICS_REPORTS: '/api/staff/analytics/reports', // Placeholder
      // Real Admin Coupon APIs
      COUPONS: '/api/admin/coupons',
      COUPON_DETAIL: (id: string) => `/api/admin/coupons/${id}`,
      UPDATE_COUPON: (id: string) => `/api/admin/coupons/${id}`,
      DELETE_COUPON: (id: string) => `/api/admin/coupons/${id}`,
      COUPON_USAGE: (id: string) => `/api/admin/coupons/${id}/usage`,
    },
    // Escalation
    ESCALATION: {
      TRIGGER: '/api/staff/escalation',
      LIST: '/api/staff/escalations',
    },
    // Audit
    AUDIT: {
      LOGS: '/api/staff/audit/logs',
      ACTIVITY: '/api/staff/activity',
      PERFORMANCE: '/api/staff/performance',
    },
    // System
    SYSTEM: {
      STATUS: '/api/staff/system/status',
      PERMISSIONS_CHECK: '/api/staff/permissions/check',
      CONFLICT_LOCK: '/api/staff/conflict/lock',
    },
  },
};

export default STAFF_API_CONFIG;
