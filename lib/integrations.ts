import { Reminder, HealthStatus } from './admin-types'

// Google Sheets Integration
export async function fetchRemindersFromSheets(): Promise<Reminder[]> {
  const apiKey = process.env.GOOGLE_SHEETS_API_KEY
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID
  
  if (!apiKey || !spreadsheetId) {
    console.warn('Google Sheets credentials not configured, returning mock data')
    return getMockReminders()
  }

  try {
    const range = 'Reminders!A:H' // Assuming columns: ID, DJ/Show, Type, Title, Message, Scheduled, Status, Sent/Cancelled
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`
    
    const response = await fetch(url)
    const data = await response.json()
    
    if (!data.values) return []
    
    const [headers, ...rows] = data.values
    
    return rows.map((row: string[]) => ({
      id: row[0] || crypto.randomUUID(),
      djId: row[1]?.startsWith('dj-') ? row[1] : undefined,
      showId: row[1]?.startsWith('show-') ? row[1] : undefined,
      type: (row[2] as 'show' | 'event' | 'general') || 'general',
      title: row[3] || '',
      message: row[4] || '',
      scheduledFor: row[5] || new Date().toISOString(),
      status: (row[6] as 'pending' | 'sent' | 'cancelled' | 'failed') || 'pending',
      sentAt: row[6] === 'sent' ? row[7] : undefined,
      cancelledAt: row[6] === 'cancelled' ? row[7] : undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }))
  } catch (error) {
    console.error('Error fetching reminders from Google Sheets:', error)
    return getMockReminders()
  }
}

export async function cancelReminder(reminderId: string): Promise<boolean> {
  // In a real implementation, this would update the Google Sheet
  console.log(`Cancelling reminder ${reminderId}`)
  return true
}

// Telegram Bot Integration
export async function sendTelegramMessage(message: string): Promise<boolean> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN
  const channelId = process.env.TELEGRAM_CHANNEL_ID
  
  if (!botToken || !channelId) {
    console.warn('Telegram credentials not configured')
    return false
  }

  try {
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: channelId,
        text: message,
        parse_mode: 'HTML'
      })
    })
    
    return response.ok
  } catch (error) {
    console.error('Error sending Telegram message:', error)
    return false
  }
}

export async function checkTelegramBotStatus(): Promise<{ status: 'healthy' | 'degraded' | 'down', lastMessage?: string }> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN
  
  if (!botToken) {
    return { status: 'down' }
  }

  try {
    const url = `https://api.telegram.org/bot${botToken}/getMe`
    const response = await fetch(url)
    
    if (response.ok) {
      return { status: 'healthy', lastMessage: new Date().toISOString() }
    } else {
      return { status: 'degraded' }
    }
  } catch (error) {
    return { status: 'down' }
  }
}

// Health Check Functions
export async function checkGoogleSheetsStatus(): Promise<{ status: 'healthy' | 'degraded' | 'down', lastSync?: string }> {
  const apiKey = process.env.GOOGLE_SHEETS_API_KEY
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID
  
  if (!apiKey || !spreadsheetId) {
    return { status: 'down' }
  }

  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?key=${apiKey}`
    const response = await fetch(url)
    
    if (response.ok) {
      return { status: 'healthy', lastSync: new Date().toISOString() }
    } else {
      return { status: 'degraded' }
    }
  } catch (error) {
    return { status: 'down' }
  }
}

export async function getHealthStatus(): Promise<HealthStatus> {
  const startTime = Date.now()
  
  const [googleSheets, telegramBot] = await Promise.all([
    checkGoogleSheetsStatus(),
    checkTelegramBotStatus()
  ])
  
  const responseTime = Date.now() - startTime
  
  return {
    timestamp: new Date().toISOString(),
    services: {
      api: {
        status: 'healthy',
        responseTime,
        lastChecked: new Date().toISOString()
      },
      googleSheets: {
        ...googleSheets,
        lastChecked: new Date().toISOString()
      },
      telegramBot: {
        ...telegramBot,
        lastChecked: new Date().toISOString()
      },
      podcastFeeds: {
        status: 'healthy',
        feedsChecked: 0,
        failedFeeds: 0,
        lastChecked: new Date().toISOString()
      }
    }
  }
}

// Mock data for development
function getMockReminders(): Reminder[] {
  return [
    {
      id: '1',
      showId: 'show-1',
      type: 'show',
      title: 'Wake the Mess Reminder',
      message: 'Your show starts in 30 minutes!',
      scheduledFor: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '2',
      djId: 'dj-1',
      type: 'event',
      title: 'Equipment Check',
      message: 'Please check your equipment before the show',
      scheduledFor: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
      status: 'sent',
      sentAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  ]
}