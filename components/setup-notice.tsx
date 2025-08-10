import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, ExternalLink, Settings } from 'lucide-react'
import Link from "next/link"

export function SetupNotice() {
  return (
    <Card className="border-yellow-200 bg-yellow-50">
      <CardHeader>
        <div className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-yellow-600" />
          <CardTitle className="text-yellow-800">Настройка Sanity CMS</CardTitle>
        </div>
        <CardDescription className="text-yellow-700">
          Для полноценной работы блога необходимо настроить Sanity CMS
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-yellow-700">
          <p className="mb-2">Шаги для настройки:</p>
          <ol className="list-decimal list-inside space-y-1 ml-4">
            <li>Создайте проект на <Link href="https://sanity.io" className="underline" target="_blank">sanity.io</Link></li>
            <li>Скопируйте Project ID из настроек проекта</li>
            <li>Обновите переменную NEXT_PUBLIC_SANITY_PROJECT_ID в .env.local</li>
            <li>Перезапустите сервер разработки</li>
          </ol>
        </div>
        <div className="flex gap-2">
          <Button asChild size="sm" variant="outline">
            <Link href="/studio">
              <Settings className="w-4 h-4 mr-2" />
              Открыть Studio
            </Link>
          </Button>
          <Button asChild size="sm">
            <Link href="https://sanity.io" target="_blank">
              <ExternalLink className="w-4 h-4 mr-2" />
              Создать проект
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
