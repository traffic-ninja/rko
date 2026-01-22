"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function HeroSelectionForm() {
  const router = useRouter()
  const [businessType, setBusinessType] = useState("")
  const [turnover, setTurnover] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (businessType) params.set("businessType", businessType)
    if (turnover) params.set("turnover", turnover)
    router.push(`/selection?${params.toString()}`)
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl">Быстрый подбор РКО</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="businessType">Тип бизнеса</Label>
            <Select value={businessType} onValueChange={setBusinessType}>
              <SelectTrigger id="businessType">
                <SelectValue placeholder="Выберите тип" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ip">ИП</SelectItem>
                <SelectItem value="ooo">ООО</SelectItem>
                <SelectItem value="self_employed">Самозанятый</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="turnover">Оборот в месяц</Label>
            <Select value={turnover} onValueChange={setTurnover}>
              <SelectTrigger id="turnover">
                <SelectValue placeholder="Выберите оборот" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-300000">До 300 000 ₽</SelectItem>
                <SelectItem value="300000-1000000">300 000 — 1 000 000 ₽</SelectItem>
                <SelectItem value="1000000-3000000">1 000 000 — 3 000 000 ₽</SelectItem>
                <SelectItem value="3000000+">Более 3 000 000 ₽</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full" size="lg">
            Подобрать тарифы
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
