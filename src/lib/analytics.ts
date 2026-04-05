/**
 * GA4 event tracking helpers
 * All events are fire-and-forget — failures are silent to avoid impacting UX.
 */

declare function gtag(command: 'event', eventName: string, params?: Record<string, unknown>): void

function safeGtag(eventName: string, params?: Record<string, unknown>) {
  try {
    if (typeof gtag === 'function') {
      gtag('event', eventName, params)
    }
  } catch {
    // Silent — analytics must never break the user experience
  }
}

/** Fired when a user successfully submits the inquiry form */
export function trackQualifyLead(params: {
  productInterest?: string
  companyName?: string
}) {
  safeGtag('qualify_lead', {
    product_interest: params.productInterest || 'unknown',
    company: params.companyName || 'unknown',
  })
}

/** Fired when a user clicks the WhatsApp floating button */
export function trackWhatsAppClick() {
  safeGtag('whatsapp_click', {
    method: 'whatsapp',
  })
}

/** Fired when a user navigates to a product detail page */
export function trackViewItem(params: {
  productId: string
  productName: string
  category?: string
}) {
  safeGtag('view_item', {
    items: [
      {
        item_id: params.productId,
        item_name: params.productName,
        item_category: params.category || 'unknown',
      },
    ],
  })
}

/** Fired when a user submits a search query */
export function trackViewSearchResults(params: { query: string }) {
  safeGtag('view_search_results', {
    search_term: params.query,
  })
}
