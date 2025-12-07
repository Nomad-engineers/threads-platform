# 🚀 Универсальное руководство по разработке на Next.js Frontend

## 🎯 ПРАВИЛО №1 - ВСЕГДА СОХРАНЯТЬ ИНФОРМАЦИЮ В CLAUDE.md

**ВАЖНОЕ ПРАВИЛО ДЛЯ CLAUDE:**
- При получении любой важной информации о проекте (архитектура, эндпоинты, переменные окружения, бизнес-логика) - немедленно добавляй её в этот файл
- Каждое обновление документации является обязательным шагом в работе
- Не полагайся на память или контекст сессии
- CLAUDE.md - единый источник правды о проекте
- Всегда проверяй CLAUDE.md при вопросах по проекту

**ЧТО СОХРАНЯТЬ:**
- Новые эндпоинты и их параметры
- Структуру классов и архитектуру бэкенда
- Переменные окружения и их назначение
- Важные бизнес-правила и ограничения
- Структуру базы данных и моделей
- Любые архитектурные решения

## 📁 Структура проекта

Проект использует современную архитектуру:

- **Frontend**: Next.js 15 + React 19 + TypeScript
- **UI**: Tailwind CSS + shadcn/ui
- **State Management**: React Context + Custom Hooks
- **Backend**: Отдельный сервер с базой данных и бизнес-логикой
- **Forms**: React Hook Form + Zod
- **Testing**: Jest + Testing Library или Vitest

### Backend API

Основной backend находится на отдельном сервере, URL которого настраивается через:
- Переменная окружения: `NEXT_PUBLIC_BACKEND_API_URL`
- Используется для всех API запросов к данным приложения

**Endpoints для разработки/тестирования:**
- `GET /users/login/:id` - вход по ID пользователя в development режиме
- `GET /users/me` - получение информации о текущем пользователе
- `GET /users/login` - общий endpoint для логина

## 🧵 Instagram Threads API Integration

### Overview
The platform includes comprehensive integration with the Instagram Threads API, allowing users to:
- Authenticate with their Threads account
- Publish text, image, video, and carousel posts
- Retrieve detailed analytics and insights
- Manage media content and replies
- Monitor engagement metrics

### Authentication System

The platform uses OAuth 2.0 for Threads authentication:

**Required Scopes:**
- `threads_basic` - Basic profile access
- `threads_content_publish` - Publishing permissions
- `threads_manage_insights` - Analytics access
- `threads_manage_replies` - Reply management
- `threads_profile_discovery` - Profile discovery
- `threads_read_replies` - Read reply permissions

**Environment Variables:**
```bash
NEXT_PUBLIC_THREADS_CLIENT_ID=your_threads_app_id
NEXT_PUBLIC_THREADS_REDIRECT_URI=your_oauth_redirect_uri
NEXT_PUBLIC_BACKEND_API_URL=your_backend_api_url
```

### Threads API Client

**Core Components:**
- `ThreadsApiClient` - Main API client class (`/lib/api/threads-api.ts`)
- `useThreadsAuth` - Authentication hook (`/hooks/use-threads-auth.ts`)
- `useThreadsProfile` - Profile management hook (`/hooks/use-threads-api.ts`)
- `useThreadsMedia` - Media management hook (`/hooks/use-threads-api.ts`)
- `useThreadsPublish` - Publishing hook (`/hooks/use-threads-api.ts`)
- `useThreadsAnalytics` - Analytics hook (`/hooks/use-threads-api.ts`)

### API Endpoints

**Next.js API Routes:**
- `/api/threads/profile` - Get user profile information
- `/api/threads/publish` - Create and publish content
- `/api/threads/media` - Manage media posts
- `/api/threads/insights` - Fetch analytics and insights

### Core Features

#### 1. Publishing Content

**Text Posts:**
- Auto-publish with `auto_publish_text: true`
- Character limit: 500 characters
- Optional link attachments and topic tags
- Reply control settings

**Image Posts:**
- Public image URLs required
- Supported formats: JPEG, PNG, GIF
- Maximum size: 10MB
- Alt text for accessibility
- Processing time: ~30 seconds

#### 2. Analytics & Insights

**Available Metrics:**
- Views, Likes, Replies, Reposts, Quotes, Shares
- Post-level insights
- Account-level aggregated insights
- Time-based analytics with custom ranges

#### 3. Media Management

**Features:**
- Retrieve user's published media
- Delete posts (irreversible action)
- Repost existing content
- View detailed post information
- Media container status checking

### User Interface Components

**Dashboard Components:**
- `ThreadsConnect` - Main dashboard component (`/components/dashboard/threads-connect.tsx`)
- `ThreadsPublishForm` - Publishing form (`/components/dashboard/threads-publish-form.tsx`)

**Navigation:**
- Integrated into main dashboard navigation
- Dedicated Threads tab in header
- Publish page at `/dashboard/threads/publish`

### Integration Examples

**Basic Text Post:**
```typescript
const { publishTextPost } = useThreadsPublish()
await publishTextPost("Hello Threads!", {
  topic_tag: "technology",
  reply_control: "everyone"
})
```

**Image Post with Caption:**
```typescript
const { publishImagePost } = useThreadsPublish()
await publishImagePost("https://example.com/image.jpg", "Check this out!", {
  alt_text: "A beautiful landscape photo"
})
```

## 📁 Директории проекта

```
/project/
├── app/                          # Next.js App Router страницы
│   ├── (auth)/                  # Страницы аутентификации
│   ├── (components)/             # Компоненты для страниц
│   ├── dashboard/                # Dashboard страницы
│   ├── api/                      # Next.js API routes (если нужно)
│   ├── layout.tsx                # Root layout
│   ├── loading.tsx               # Глобальный loading
│   └── error.tsx                 # Глобальный error
├── components/                   # Глобальные переиспользуемые компоненты
│   ├── ui/                       # shadcn/ui базовые компоненты
│   ├── forms/                    # Формы
│   ├── layout/                   # Layout компоненты
│   └── common/                   # Общие компоненты
├── lib/                          # Утилиты и конфигурации
│   ├── api-client.ts             # HTTP клиент
│   ├── utils.ts                  # Общие утилиты
│   └── validations.ts            # Zod схемы
├── hooks/                        # Пользовательские хуки
│   ├── use-api.ts                # Хук для API запросов
│   └── use-local-storage.ts      # Работа с localStorage
├── types/                        # TypeScript типы
├── contexts/                     # React контексты
├── stores/                       # Состояния (Zustand/Jotai)
└── public/                       # Статичные ресурсы
```

### Backend Routes Architecture

Класс Users на бэкенде реализует следующие endpoints:

```typescript
class Users {
  get routes(): Omit<Endpoint, 'root'>[] {
    return [
      {
        path: '/login',
        method: 'get',
        handler: this.login,
      },
      {
        path: '/login/:id',
        method: 'get',
        handler: this.loginById,
      },
      {
        path: '/me',
        method: 'get',
        handler: this.me,
      },
    ]
  }
}
```

### Development Features

**Dev Login Component:**
- Компонент `DevLogin` доступен только в development режиме
- Позволяет войти по userId через GET запрос к `GET /users/login/:id`
- Использует переменную окружения `NEXT_PUBLIC_BACKEND_API_URL`
- Отображается на странице `/auth` в самом низу
- Стилизован в едином дизайне с основным UI (как основной auth компонент)
- Интегрирован с `useThreadsAuth` хуком для полноценной аутентификации

**useThreadsAuth Hook - Dev Login:**
- Добавлена функция `handleDevLogin(userId: string)` для dev аутентификации
- Выполняет GET запрос к бэкенду
- Сохраняет accessToken и user data через `authStorage`
- Показывает toast уведомления об успехе/ошибке
- Выполняет редирект в dashboard после успешного входа
- Обрабатывает ошибки и устанавливает состояние загрузки

**Authentication Flow - sendAuthCode:**
- Функция `sendAuthCode` теперь добавляет `redirectUri` в query параметры
- `redirectUri` берется из `NEXT_PUBLIC_THREADS_REDIRECT_URI` env переменной
- Запрос отправляется на: `GET /users/login?redirect_uri=<encoded_url>`
- Позволяет бэкенду знать куда выполнять redirect пользователя после OAuth

### Директории проекта

```
/project/
├── app/                          # Next.js App Router страницы
│   ├── (auth)/                  # Страницы аутентификации
│   ├── (components)/             # Компоненты для страниц
│   ├── dashboard/                # Dashboard страницы
│   ├── api/                      # Next.js API routes (если нужно)
│   ├── layout.tsx                # Root layout
│   ├── loading.tsx               # Глобальный loading
│   └── error.tsx                 # Глобальный error
├── components/                   # Глобальные переиспользуемые компоненты
│   ├── ui/                       # shadcn/ui базовые компоненты
│   ├── forms/                    # Формы
│   ├── layout/                   # Layout компоненты
│   └── common/                   # Общие компоненты
├── lib/                          # Утилиты и конфигурации
│   ├── api-client.ts             # HTTP клиент
│   ├── utils.ts                  # Общие утилиты
│   └── validations.ts            # Zod схемы
├── hooks/                        # Пользовательские хуки
│   ├── use-api.ts                # Хук для API запросов
│   └── use-local-storage.ts      # Работа с localStorage
├── types/                        # TypeScript типы
├── contexts/                     # React контексты
├── stores/                       # Состояния (Zustand/Jotai)
└── public/                       # Статичные ресурсы
```

## 🔧 Работа с API

### Frontend API Layer

#### 1. Создание API хуков:

```typescript
// api/{feature}/index.ts
import { ApiClient } from '@/lib/api-client'

export interface EntityData {
  id: string
  name: string
  description?: string
  createdAt: string
  updatedAt: string
}

export interface CreateEntityData {
  name: string
  description?: string
}

export class EntityApi {
  private client = new ApiClient()

  async getAll(params?: Record<string, any>) {
    return await this.client.get<EntityData[]>('/api/entities', params)
  }

  async getById(id: string) {
    return await this.client.get<EntityData>(`/api/entities/${id}`)
  }

  async create(data: CreateEntityData) {
    return await this.client.post<EntityData>('/api/entities', data)
  }

  async update(id: string, data: Partial<CreateEntityData>) {
    return await this.client.put<EntityData>(`/api/entities/${id}`, data)
  }

  async delete(id: string) {
    return await this.client.delete(`/api/entities/${id}`)
  }
}

export const entityApi = new EntityApi()
```

#### 2. Создание универсального React хука:

```typescript
// hooks/use-crud.ts
import { useState, useCallback, useEffect } from 'react'

interface UseCrudOptions<T, CreateData> {
  api: {
    getAll: (params?: any) => Promise<T[]>
    create: (data: CreateData) => Promise<T>
    update: (id: string, data: Partial<CreateData>) => Promise<T>
    delete: (id: string) => Promise<void>
  }
  initialParams?: Record<string, any>
}

export function useCrud<T extends { id: string }, CreateData>(
  options: UseCrudOptions<T, CreateData>
) {
  const { api, initialParams } = options

  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetch = useCallback(
    async (params?: Record<string, any>) => {
      setLoading(true)
      setError(null)
      try {
        const result = await api.getAll({ ...initialParams, ...params })
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    },
    [api, initialParams]
  )

  const create = useCallback(
    async (newData: CreateData) => {
      try {
        const result = await api.create(newData)
        setData(prev => [...prev, result])
        return result
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
        throw err
      }
    },
    [api]
  )

  const update = useCallback(
    async (id: string, updateData: Partial<CreateData>) => {
      try {
        const result = await api.update(id, updateData)
        setData(prev => prev.map(item => (item.id === id ? result : item)))
        return result
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
        throw err
      }
    },
    [api]
  )

  const remove = useCallback(
    async (id: string) => {
      try {
        await api.delete(id)
        setData(prev => prev.filter(item => item.id !== id))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
        throw err
      }
    },
    [api]
  )

  useEffect(() => {
    fetch()
  }, [fetch])

  return {
    data,
    loading,
    error,
    refetch: fetch,
    create,
    update,
    delete: remove,
  }
}
```

## 🎨 Работа с компонентами

### Глобальные компоненты

#### 1. Базовые UI компоненты (shadcn/ui):

```
components/ui/
├── button.tsx
├── card.tsx
├── dialog.tsx
├── input.tsx
├── table.tsx
├── badge.tsx
├── avatar.tsx
├── separator.tsx
├── form.tsx
├── dropdown-menu.tsx
├── toast.tsx
└── sheet.tsx
```

#### 2. Универсальный компонент карточки:

```typescript
// components/common/entity-card.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MoreHorizontal, Edit, Trash2, Eye } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

interface EntityCardProps<T> {
  data: T & {
    id: string
    name: string
    description?: string
    active?: boolean
    createdAt: string
    updatedAt: string
  }
  onView?: (id: string) => void
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
  actions?: React.ReactNode
  status?: {
    value: boolean | string
    label: string
    variant?: 'default' | 'secondary' | 'destructive' | 'outline'
  }
}

export function EntityCard<T>({ data, onView, onEdit, onDelete, actions, status }: EntityCardProps<T>) {
  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle className='flex justify-between items-center'>
          <span>{data.name}</span>
          <div className='flex items-center gap-2'>
            {status && <Badge variant={status.variant || 'secondary'}>{status.label}</Badge>}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost' size='sm'>
                  <MoreHorizontal className='h-4 w-4' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                {onView && (
                  <DropdownMenuItem onClick={() => onView(data.id)}>
                    <Eye className='h-4 w-4 mr-2' />
                    View
                  </DropdownMenuItem>
                )}
                {onEdit && (
                  <DropdownMenuItem onClick={() => onEdit(data.id)}>
                    <Edit className='h-4 w-4 mr-2' />
                    Edit
                  </DropdownMenuItem>
                )}
                {onDelete && (
                  <DropdownMenuItem onClick={() => onDelete(data.id)} className='text-destructive'>
                    <Trash2 className='h-4 w-4 mr-2' />
                    Delete
                  </DropdownMenuItem>
                )}
                {actions}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {data.description && <p className='text-muted-foreground text-sm mb-4'>{data.description}</p>}
        <div className='mt-4 flex justify-between text-xs text-muted-foreground'>
          <span>Created: {new Date(data.createdAt).toLocaleDateString()}</span>
          <span>Updated: {new Date(data.updatedAt).toLocaleDateString()}</span>
        </div>
      </CardContent>
    </Card>
  )
}
```

### Page-specific компоненты

#### 1. Структура страницы:

```
app/{feature}/
├── page.tsx              # Основная страница
├── (components)/         # Компоненты только для этой страницы
│   ├── {Feature}List.tsx
│   ├── {Feature}Form.tsx
│   ├── {Feature}Stats.tsx
│   └── {Feature}Header.tsx
├── loading.tsx           # Состояние загрузки
└── error.tsx             # Состояние ошибки
```

## 📋 Декомпозиция page.tsx файлов

**Всегда разделяйте page.tsx на более мелкие компоненты!**

### Правильный подход:

#### 1. Основной page.tsx (только логика и композиция):

```typescript
// app/{feature}/page.tsx
import { Suspense } from 'react'
import { redirect } from 'next/navigation'
import { getServerSession } from '@/lib/auth'
import { FeatureHeader } from './(components)/feature-header'
import { FeatureStats } from './(components)/feature-stats'
import { FeatureList } from './(components)/feature-list'
import { PageLoader } from '@/components/ui/page-loader'

export default async function FeaturePage() {
  const session = await getServerSession()

  if (!session) {
    redirect('/login')
  }

  return (
    <div className='container mx-auto py-8 space-y-8'>
      <FeatureHeader />

      <Suspense fallback={<PageLoader />}>
        <FeatureStats />
      </Suspense>

      <Suspense fallback={<PageLoader />}>
        <FeatureList />
      </Suspense>
    </div>
  )
}
```

## 🛠️ Команды разработки

```bash
# Frontend (Next.js)
npm run dev              # Запуск dev сервера
npm run build           # Production сборка
npm run start           # Запуск production сервера
npm run lint            # Проверка линтером
npm run type-check      # Проверка TypeScript
npm run test            # Запуск тестов
npm run test:watch      # Тесты в режиме watch
npm run test:coverage   # Тесты с покрытием

# Дополнительные команды
npm run format          # Форматирование кода
npm run format:check    # Проверка форматирования
npm run clean           # Очистка cache
```

## ✅ Лучшие практики

### 1. Структура кода:

- **Всегда декомпозируйте page.tsx**
- **Используйте TypeScript для всего**
- **Следуйте структуре директорий**
- **Используйте консистентные именования**
- **Создавайте переиспользуемые компоненты**

### 2. Производительность:

- **Используйте React.memo для дорогих компонентов**
- **Применяйте useMemo/useCallback для оптимизации**
- **Ленивая загрузка компонентов с React.lazy**
- **Оптимизация изображений с Next.js Image**
- **Используйте Suspense boundaries**

### 3. UX/UI:

- **Показывайте состояния загрузки**
- **Обрабатывайте ошибки корректно**
- **Используйте анимации для переходов**
- **Следуйте дизайну системы**
- **Создавайте доступные интерфейсы**

### 4. Доступность:

- **Используйте семантическую HTML разметку**
- **Добавьте ARIA атрибуты где необходимо**
- **Обеспечьте навигацию с клавиатуры**
- **Проверьте контрастность цветов**
- **Тестируйте с screen readers**

### 5. Тестирование:

- **Тестируйте пользовательские хуки**
- **Пишите интеграционные тесты для форм**
- **Тестируйте компоненты в изоляции**
- **Проверяйте доступность**
- **Используйте E2E тесты для критических путей**

### 6. Разработка и отладка:

- **Сохраняйте скриншоты Chrome DevTools в отдельную папку `screenshots/` в корне проекта**
- **Используйте MCP chrome-devtools для автоматизации браузера и отладки**
- **Ведите документацию найденных проблем с визуальными материалами**
- **Создавайте скриншоты для баг-репортов и документации**
- **Используйте именованные файлы скриншотов с датой и описанием проблемы**

### 7. Безопасность:

- **Валидация данных на клиенте**
- **Используйте HTTPS в production**
- **Защита от XSS атак**
- **Безопасное хранение секретов**
- **CORS настройки**