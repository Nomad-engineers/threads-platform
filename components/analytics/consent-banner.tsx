// GDPR/CCPA consent banner component

'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { consentManager } from '@/lib/analytics/utils/consent'
import { Check, Cookie, Shield, Eye, Megaphone, Settings } from 'lucide-react'

interface ConsentBannerProps {
  onAccept?: () => void
  onDecline?: () => void
}

export function ConsentBanner({ onAccept, onDecline }: ConsentBannerProps) {
  const [showBanner, setShowBanner] = useState(false)
  const [preferences, setPreferences] = useState(consentManager.getConsent())

  // Check if we need to show consent banner
  useEffect(() => {
    const consent = consentManager.getConsent()
    const hasConsent = consent.analytics || consent.marketing || consent.preferences

    // Show banner if no consent is given and we're not in development
    if (!hasConsent && process.env.NODE_ENV !== 'development') {
      setShowBanner(true)
    }
  }, [])

  const handleAccept = () => {
    consentManager.updateConsent({
      analytics: true,
      marketing: true,
      preferences: true,
    })
    setPreferences(consentManager.getConsent())
    setShowBanner(false)
    onAccept?.()
  }

  const handleAcceptEssential = () => {
    consentManager.updateConsent({
      analytics: false,
      marketing: false,
      preferences: false,
    })
    setPreferences(consentManager.getConsent())
    setShowBanner(false)
    onAccept?.()
  }

  const handleDecline = () => {
    consentManager.resetNonEssentialConsent()
    setPreferences(consentManager.getConsent())
    setShowBanner(false)
    onDecline?.()
  }

  const updatePreference = (type: keyof typeof preferences, value: boolean) => {
    const newPreferences = {
      ...preferences,
      [type]: value,
    }
    setPreferences(newPreferences)
    consentManager.updateConsent({ [type]: value })
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 pointer-events-none">
      <div className="max-w-4xl mx-auto">
        <Card className="border pointer-events-auto shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Cookie className="h-5 w-5" />
              Cookie Preferences
            </CardTitle>
            <CardDescription>
              We use cookies and similar technologies to enhance your experience, analyze site traffic, and for marketing purposes.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Toggle preferences */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-sm font-medium flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    Analytics
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Track visits, pages, and usage patterns
                  </p>
                </div>
                <Switch
                  checked={preferences.analytics}
                  onCheckedChange={(checked) => updatePreference('analytics', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-sm font-medium flex items-center gap-2">
                    <Megaphone className="h-4 w-4" />
                    Marketing
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Personalized ads and content recommendations
                  </p>
                </div>
                <Switch
                  checked={preferences.marketing}
                  onCheckedChange={(checked) => updatePreference('marketing', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-sm font-medium flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Preferences
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Remember your preferences and settings
                  </p>
                </div>
                <Switch
                  checked={preferences.preferences}
                  onCheckedChange={(checked) => updatePreference('preferences', checked)}
                />
              </div>
            </div>

            <Separator />

            {/* Compliance badges */}
            <div className="flex items-center gap-4 flex-wrap">
              <Badge variant="outline" className="text-xs">
                <Shield className="h-3 w-3 mr-1" />
                GDPR Compliant
              </Badge>
              <Badge variant="outline" className="text-xs">
                <Shield className="h-3 w-3 mr-1" />
                CCPA Compliant
              </Badge>
              <Badge variant="outline" className="text-xs">
                <Check className="h-3 w-3 mr-1" />
                Cookie Control
              </Badge>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                onClick={handleAccept}
                className="flex-1"
                size="sm"
              >
                Accept All
              </Button>
              <Button
                onClick={handleAcceptEssential}
                variant="outline"
                className="flex-1"
                size="sm"
              >
                Accept Essential Only
              </Button>
              <Button
                onClick={handleDecline}
                variant="ghost"
                className="flex-1"
                size="sm"
              >
                Decline All
              </Button>
            </div>

            {/* Links */}
            <div className="text-center text-xs text-muted-foreground">
              <a
                href="/privacy-policy"
                className="hover:text-foreground underline"
              >
                Privacy Policy
              </a>
              {' • '}
              <a
                href="/cookie-policy"
                className="hover:text-foreground underline"
              >
                Cookie Policy
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}