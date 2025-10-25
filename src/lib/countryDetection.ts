// Detect user's country from timezone
export function getCountryFromTimezone(): string | undefined {
  try {
    if (typeof window === 'undefined') return undefined

    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

    // Map common timezones to country codes
    const timezoneToCountry: Record<string, string> = {
      // North America
      'America/New_York': 'US',
      'America/Chicago': 'US',
      'America/Denver': 'US',
      'America/Los_Angeles': 'US',
      'America/Phoenix': 'US',
      'America/Anchorage': 'US',
      'America/Toronto': 'CA',
      'America/Vancouver': 'CA',
      'America/Montreal': 'CA',
      'America/Mexico_City': 'MX',
      
      // Europe
      'Europe/London': 'GB',
      'Europe/Paris': 'FR',
      'Europe/Berlin': 'DE',
      'Europe/Madrid': 'ES',
      'Europe/Rome': 'IT',
      'Europe/Amsterdam': 'NL',
      'Europe/Brussels': 'BE',
      'Europe/Vienna': 'AT',
      'Europe/Zurich': 'CH',
      'Europe/Dublin': 'IE',
      'Europe/Lisbon': 'PT',
      'Europe/Stockholm': 'SE',
      'Europe/Oslo': 'NO',
      'Europe/Copenhagen': 'DK',
      'Europe/Helsinki': 'FI',
      'Europe/Warsaw': 'PL',
      'Europe/Prague': 'CZ',
      'Europe/Budapest': 'HU',
      'Europe/Athens': 'GR',
      'Europe/Moscow': 'RU',
      'Europe/Istanbul': 'TR',
      
      // Asia
      'Asia/Dubai': 'AE',
      'Asia/Karachi': 'PK',
      'Asia/Kolkata': 'IN',
      'Asia/Dhaka': 'BD',
      'Asia/Bangkok': 'TH',
      'Asia/Singapore': 'SG',
      'Asia/Hong_Kong': 'HK',
      'Asia/Shanghai': 'CN',
      'Asia/Tokyo': 'JP',
      'Asia/Seoul': 'KR',
      'Asia/Manila': 'PH',
      'Asia/Jakarta': 'ID',
      'Asia/Kuala_Lumpur': 'MY',
      'Asia/Riyadh': 'SA',
      'Asia/Tel_Aviv': 'IL',
      'Asia/Tehran': 'IR',
      
      // Oceania
      'Australia/Sydney': 'AU',
      'Australia/Melbourne': 'AU',
      'Australia/Brisbane': 'AU',
      'Australia/Perth': 'AU',
      'Pacific/Auckland': 'NZ',
      
      // South America
      'America/Sao_Paulo': 'BR',
      'America/Buenos_Aires': 'AR',
      'America/Santiago': 'CL',
      'America/Lima': 'PE',
      'America/Bogota': 'CO',
      
      // Africa
      'Africa/Cairo': 'EG',
      'Africa/Johannesburg': 'ZA',
      'Africa/Lagos': 'NG',
      'Africa/Nairobi': 'KE',
      'Africa/Casablanca': 'MA',
    }

    // Direct match
    if (timezoneToCountry[timezone]) {
      return timezoneToCountry[timezone]
    }

    // Fallback: try to match by continent/major city patterns
    if (timezone.includes('America/')) {
      if (timezone.includes('New_York') || timezone.includes('Chicago') || 
          timezone.includes('Los_Angeles') || timezone.includes('Denver')) {
        return 'US'
      }
      if (timezone.includes('Toronto') || timezone.includes('Vancouver')) {
        return 'CA'
      }
    }

    if (timezone.includes('Europe/')) {
      return 'GB' // Default to UK for Europe
    }

    if (timezone.includes('Asia/')) {
      // Try to guess based on common patterns
      if (timezone.includes('Karachi') || timezone.includes('Lahore')) return 'PK'
      if (timezone.includes('Kolkata') || timezone.includes('Mumbai') || timezone.includes('Delhi')) return 'IN'
      if (timezone.includes('Dubai')) return 'AE'
    }

    // Use browser language as fallback
    const language = navigator.language || navigator.languages?.[0]
    if (language) {
      const countryCode = language.split('-')[1]?.toUpperCase()
      if (countryCode && countryCode.length === 2) {
        return countryCode
      }
    }

    return undefined
  } catch (error) {
    console.error('Error detecting country:', error)
    return undefined
  }
}

// Get country name from code
export function getCountryName(code: string): string {
  const countries: Record<string, string> = {
    US: 'United States',
    GB: 'United Kingdom',
    CA: 'Canada',
    PK: 'Pakistan',
    IN: 'India',
    AU: 'Australia',
    // Add more as needed
  }
  return countries[code] || code
}

