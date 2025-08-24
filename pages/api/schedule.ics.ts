import { NextApiRequest, NextApiResponse } from 'next';
import { createShopifyClient } from '../../lib/shopify';

interface Event {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location?: string;
}

/**
 * Format date for ICS format (YYYYMMDDTHHMMSSZ)
 */
function formatICSDate(date: Date): string {
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

/**
 * Escape text for ICS format
 */
function escapeICSText(text: string): string {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '');
}

/**
 * Generate ICS calendar content using JavaScript template literals
 */
function generateICS(events: Event[]): string {
  const now = new Date();
  const prodId = '-//HOTMESS//Shopify Schedule//EN';
  
  const calendarHeader = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:${prodId}
CALSCALE:GREGORIAN
METHOD:PUBLISH`;

  const calendarFooter = `END:VCALENDAR`;

  const eventBlocks = events.map(event => {
    const uid = `${event.id}@hotmess.shopify`;
    const dtStamp = formatICSDate(now);
    const dtStart = formatICSDate(event.startDate);
    const dtEnd = formatICSDate(event.endDate);
    const summary = escapeICSText(event.title);
    const description = escapeICSText(event.description);
    const location = event.location ? escapeICSText(event.location) : '';

    // Using JavaScript template literals instead of Python f-string syntax
    return `BEGIN:VEVENT
UID:${uid}
DTSTAMP:${dtStamp}
DTSTART:${dtStart}
DTEND:${dtEnd}
SUMMARY:${summary}
DESCRIPTION:${description}${location ? `
LOCATION:${location}` : ''}
STATUS:CONFIRMED
TRANSP:OPAQUE
END:VEVENT`;
  }).join('\n');

  return `${calendarHeader}
${eventBlocks}
${calendarFooter}`;
}

/**
 * Convert Shopify orders to calendar events
 */
function convertOrdersToEvents(orders: any[]): Event[] {
  return orders.map(order => {
    const orderDate = new Date(order.created_at);
    const fulfillmentDate = order.fulfillment_status === 'fulfilled' 
      ? new Date(order.updated_at) 
      : new Date(orderDate.getTime() + 24 * 60 * 60 * 1000); // Add 1 day if not fulfilled

    const customerName = order.customer 
      ? `${order.customer.first_name} ${order.customer.last_name}`.trim()
      : 'Guest Customer';

    const lineItems = order.line_items?.map((item: any) => 
      `${item.quantity}x ${item.title}`
    ).join(', ') || 'No items';

    return {
      id: order.id.toString(),
      title: `Order #${order.order_number} - ${customerName}`,
      description: `Order Details: ${lineItems}\nTotal: ${order.total_price} ${order.currency}\nStatus: ${order.fulfillment_status || 'pending'}`,
      startDate: orderDate,
      endDate: fulfillmentDate,
      location: order.shipping_address ? 
        `${order.shipping_address.address1}, ${order.shipping_address.city}, ${order.shipping_address.province}` : 
        undefined
    };
  });
}

/**
 * API endpoint to generate and serve ICS calendar file
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Initialize Shopify client
    const shopifyClient = createShopifyClient();

    // Fetch recent orders
    const limit = parseInt(req.query.limit as string) || 50;
    const ordersResponse = await shopifyClient.getOrders(limit);
    const orders = ordersResponse.orders || [];

    // Convert orders to calendar events
    const events = convertOrdersToEvents(orders);

    // Generate ICS content using JavaScript template literals
    const icsContent = generateICS(events);

    // Set appropriate headers for calendar file
    const filename = `hotmess-schedule-${new Date().toISOString().split('T')[0]}.ics`;
    
    res.setHeader('Content-Type', 'text/calendar; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    // Send the ICS content
    res.status(200).send(icsContent);

  } catch (error) {
    console.error('Error generating schedule:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    const statusCode = error instanceof Error && 'status' in error 
      ? (error as any).status || 500 
      : 500;

    res.status(statusCode).json({ 
      error: 'Failed to generate schedule',
      details: errorMessage,
      timestamp: new Date().toISOString()
    });
  }
}