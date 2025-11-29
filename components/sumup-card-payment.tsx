"use client"

import { useState, useEffect } from "react"
import useSumUpCardWidget from "@/hooks/use-sumup-card-widget"

interface SumUpCardPaymentProps {
  checkoutId: string
  onSuccess: (result: any) => void
  onError: (error: any) => void
}

export function SumUpCardPayment({ checkoutId, onSuccess, onError }: SumUpCardPaymentProps) {
  const { SumUpCard, isLoading: sdkLoading } = useSumUpCardWidget()
  const [widgetMounted, setWidgetMounted] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    if (!SumUpCard || !checkoutId || widgetMounted) return

    console.log("[SumUpCardPayment] Mounting widget with checkoutId:", checkoutId)

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      try {
        SumUpCard.mount({
          id: "sumup-card-container",
          checkoutId: checkoutId,
          onResponse: (type: string, body: any) => {
            console.log("[SumUpCardPayment] Response:", type, body)
            
            if (type === "success") {
              setIsProcessing(false)
              onSuccess(body)
            } else if (type === "error") {
              setIsProcessing(false)
              onError(body)
            } else if (type === "sent") {
              setIsProcessing(true)
            }
          },
        })
        setWidgetMounted(true)
      } catch (err) {
        console.error("[SumUpCardPayment] Mount error:", err)
        onError(err)
      }
    }, 100)

    return () => {
      clearTimeout(timer)
      // Unmount widget on cleanup
      if (SumUpCard && widgetMounted) {
        try {
          SumUpCard.unmount()
        } catch (e) {
          // Ignore unmount errors
        }
      }
    }
  }, [SumUpCard, checkoutId, widgetMounted, onSuccess, onError])

  if (sdkLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#85AFFB]"></div>
        <span className="ml-3 text-gray-300">Loading payment form...</span>
      </div>
    )
  }

  return (
    <div className="w-full">
      {isProcessing && (
        <div className="flex items-center justify-center py-4 mb-4 bg-blue-900/30 rounded-lg">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#85AFFB]"></div>
          <span className="ml-3 text-[#85AFFB]">Processing payment...</span>
        </div>
      )}
      <div 
        id="sumup-card-container" 
        className="bg-white rounded-lg p-4 min-h-[200px]"
      />
    </div>
  )
}
