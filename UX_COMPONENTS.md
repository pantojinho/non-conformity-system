# Robotics Hub - Componentes UI Criados

## 📦 Componentes Implementados (Sprint 0 - UX/Visual)

### 1. **Badge** (`src/components/ui/badge.tsx`)
Badges coloridos para status, tags e indicadores.

**Variants:**
- `default` (gray)
- `primary` (blue)
- `success` (green)
- `warning` (yellow)
- `danger` (red)
- `info` (cyan)

**Sizes:** sm, md, lg

```tsx
<Badge variant="success">Concluído</Badge>
<Badge variant="danger" size="sm">Crítico</Badge>
```

---

### 2. **Button** (`src/components/ui/button.tsx`)
Botões com variants, loading states e suporte a ícones.

**Variants:**
- `primary` (blue, ação principal)
- `secondary` (gray, ação secundária)
- `danger` (red, ação destrutiva)
- `ghost` (transparent, hover background)
- `outline` (bordered)

**Sizes:** sm, md, lg

**Features:**
- Loading state com spinner
- Ícones esquerdo/direito
- Disabled state
- Focus ring acessível

```tsx
<Button variant="primary" isLoading>
  Salvar
</Button>
<Button variant="danger" size="sm" leftIcon={<Trash />}>
  Excluir
</Button>
```

---

### 3. **Card** (`src/components/ui/card.tsx`)
Container com borda, shadow e suporte a composição.

**Sub-componentes:**
- `Card` (container base)
- `CardHeader` (cabeçalho com borda)
- `CardTitle` (título)
- `CardDescription` (descrição)
- `CardContent` (conteúdo)
- `CardFooter` (rodapé com background)

**Features:**
- Hoverable (cursor pointer, hover shadow)
- Dark mode suportado

```tsx
<Card>
  <CardHeader>
    <CardTitle>Título</CardTitle>
    <CardDescription>Descrição opcional</CardDescription>
  </CardHeader>
  <CardContent>Conteúdo aqui</CardContent>
  <CardFooter>Botões aqui</CardFooter>
</Card>
```

---

### 4. **Alert** (`src/components/ui/alert.tsx`)
Alertas contextuais com ícones e dismissible.

**Variants:**
- `default` (gray)
- `info` (blue)
- `success` (green)
- `warning` (yellow)
- `danger` (red)

**Features:**
- Ícone opcional (Lucide Icon)
- Dismissible com botão X
- Title + message
- Aria role="alert"

```tsx
<Alert variant="warning" icon={AlertTriangle} title="Atenção" dismissible onDismiss={handleClose}>
  Mensagem de aviso aqui
</Alert>
```

---

### 5. **Input** (`src/components/ui/input.tsx`)
Input de texto com label, error state e helper text.

**Features:**
- Label opcional
- Error state (border + message)
- Helper text
- Aria attributes
- Dark mode

```tsx
<Input
  label="Nome"
  placeholder="Digite seu nome"
  error={errors.name}
  helperText="Mínimo 3 caracteres"
/>
```

---

### 6. **Select** (`src/components/ui/select.tsx`)
Dropdown select com options array.

**Features:**
- Label opcional
- Error state
- Helper text
- Placeholder option
- Options com value/label/disabled

```tsx
<Select
  label="Norma"
  placeholder="Selecione uma norma"
  options={[
    { value: "iso9001", label: "ISO 9001" },
    { value: "iso14001", label: "ISO 14001" },
  ]}
  error={errors.norma}
/>
```

---

### 7. **Textarea** (`src/components/ui/textarea.tsx`)
Textarea multiline com resize vertical.

**Features:**
- Label opcional
- Error state
- Helper text
- Auto resize (via CSS)
- Dark mode

```tsx
<Textarea
  label="Descrição"
  placeholder="Descreva o problema"
  rows={4}
  error={errors.description}
/>
```

---

### 8. **Modal** (`src/components/ui/modal.tsx`)
Modal com backdrop, focus trap e backdrop blur.

**Features:**
- Backdrop com blur
- Title + close button
- Size variants (sm, md, lg, xl)
- Auto scroll (max-height)
- Body scroll lock quando aberto
- Aria role="dialog"

```tsx
<Modal isOpen={isOpen} onClose={onClose} title="Editar Usuário" size="lg">
  <UserForm user={user} />
</Modal>
```

---

### 9. **Toast** (`src/components/ui/toast.tsx`)
Sistema de notificações com provider e context.

**Features:**
- ToastProvider (envolver layout)
- useToast() hook
- 4 variants: success, error, warning, info
- Auto-dismiss (5s default, ou 0 para sticky)
- Stack bottom-right
- Animação slide-in
- Title + message

**Usage:**
```tsx
// Em layout.tsx (já adicionado):
<ToastProvider>{children}</ToastProvider>

// Em qualquer componente:
const { showToast } = useToast();

showToast({
  type: "success",
  title: "Salvo!",
  message: "Usuário atualizado com sucesso",
});
```

---

### 10. **Loading States** (`src/components/ui/loading.tsx`)
Spinners e skeletons para loading states.

**Componentes:**
- `Spinner` (svg spinner, sizes sm/md/lg)
- `LoadingSkeleton` (bloco cinza animado)
- `LoadingPage` (page loader centralizado)
- `LoadingCard` (card skeleton)

```tsx
<Spinner size="lg" />
<LoadingSkeleton className="h-4 w-full" />
<LoadingPage message="Carregando dados..." />
```

---

### 11. **EmptyState** (`src/components/ui/empty-state.tsx`)
Componente para listas vazias com CTA.

**Features:**
- Icon opcional (Lucide)
- Title + description
- Action button opcional

```tsx
<EmptyState
  icon={Inbox}
  title="Nenhuma NC encontrada"
  description="Crie sua primeira não conformidade para começar"
  action={{
    label: "Criar NC",
    onClick: () => router.push('/nc/new')
  }}
/>
```

---

### 12. **KPICard** (`src/components/ui/kpi-card.tsx`)
Card de KPI com value, trend e icon.

**Features:**
- Title + value
- Change percentage (+/-)
- Icon opcional
- Positive/negative styling automático

```tsx
<KPICard
  title="NCs Abertas"
  value={12}
  change={{ value: 2, label: "esta semana", positive: false }}
  icon={FileWarning}
/>
```

---

## 🎨 Design System

### Cores
```css
--primary: blue-600 (blue-500 dark)
--success: green-600 (green-500 dark)
--warning: yellow-600 (yellow-500 dark)
--danger: red-600 (red-500 dark)
--info: cyan-600 (cyan-500 dark)
```

### Espaçamento
- Base: 4px (Tailwind space-1)
- Buttons: px-4 py-2 (md)
- Cards: p-6
- Modals: px-6 py-4

### Border Radius
- sm: rounded-lg (0.5rem)
- md: rounded-xl (0.75rem)
- full: rounded-full

### Shadows
- sm: shadow-sm (subtle cards)
- md: shadow-md (hover cards)
- xl: shadow-xl (modals)

### Transitions
- Duration: 150ms (cubic-bezier 0.4, 0, 0.2, 1)
- Props: color, background, border, opacity, box-shadow

---

## 🚀 Como Usar

### Importar componentes
```tsx
import { Button, Card, Input, Badge } from "@/components/ui";
```

### Toast no layout (já adicionado)
```tsx
// src/app/(app)/layout.tsx
import { ToastProvider } from "@/components/ui/toast";

<ToastProvider>
  {children}
</ToastProvider>
```

### Usar toast em qualquer página
```tsx
"use client";

import { useToast } from "@/components/ui/toast";

export default function MyPage() {
  const { showToast } = useToast();

  const handleSubmit = async () => {
    // ... lógica
    showToast({
      type: "success",
      title: "Sucesso!",
      message: "Dados salvos",
    });
  };

  return <Button onClick={handleSubmit}>Salvar</Button>;
}
```

---

## 📊 Próximos Passos (Sprint 1)

### Formulários
- [ ] Form validation com React Hook Form + Zod
- [ ] Multi-step forms para NC
- [ ] File upload com Supabase Storage

### Tabelas
- [ ] Table component com sorting
- [ ] Pagination
- [ ] Mobile-optimized (cards instead of rows)
- [ ] Filters por coluna

### Dashboard
- [ ] Charts com Recharts (já configurado)
- [ ] Date range picker
- [ ] Export CSV/PDF

### UX Avançada
- [ ] Confirmation dialogs
- [ ] Progress indicators
- [ ] Tooltips
- [ ] Accordions

---

## ✅ Checklist Sprint 0 UX/Visual

- [x] Button components
- [x] Card components
- [x] Badge components
- [x] Alert components
- [x] Input components
- [x] Select components
- [x] Textarea components
- [x] Modal components
- [x] Toast notifications
- [x] Loading states
- [x] Empty states
- [x] KPI cards
- [x] Dark mode suportado em todos os componentes
- [x] Acessibilidade (aria labels, roles, focus)
- [x] Responsivo (mobile-first)

**Status:** ✅ Sprint 0 UX/Visual DONE — Todos os componentes base criados, prontos para uso na Sprint 1.

---

## 📦 Componentes Sprint 1 — NPS Module

### 13. **NPS Complaint Card** (`src/app/(app)/complaints/page.tsx`)
Card de reclamação NPS com KPIs visuais.

**Features:**
- Cliente, descrição, status, canal, NPS score
- Dropdown de status: aberto, em_analise, em_andamento, resolvido, fechado
- Botão de excluir registro (com confirmação modal)
- Busca e filtros (por status, categoria, assunto, departamento)
- KPI cards: NPS score, total, SLA, resolvidas
- NPS score visual (10 dots com cores: vermelho/amarelo/verde)
- Indicadores de canal com emojis (📧, 📞, 📊, 🌐, 💬)
- Badges de status e prioridade
- Barra de progresso SLA com clamp visual a 100%

### 14. **NPS Detail Page** (`src/app/(app)/complaints/[id]/page.tsx`)
Página de detalhes com todas as seções.

**Features:**
- Visão geral completa da reclamação
- Seção de anexos com upload/download/delete
- Seção de comentários com autor e data
- Timeline de atividades (activity log)
- Ações corretivas vinculadas
- Edição inline de status

### 15. **Attachment Card** (inline in complaints/[id])
Card individual de anexo com ações.

**Features:**
- Nome do arquivo original (file_name)
- Tamanho formatado (KB/MB)
- Tipo com ícone (foto→📷, pdf→📄, video→🎬, etc.)
- Botão de download (abre URL do Storage)
- Botão de delete (com confirmação + activity log)
- Upload via FormData → Supabase Storage bucket `nps-attachments`

### 16. **Comment Section** (inline in complaints/[id])
Seção de comentários com formulário.

**Features:**
- Lista de comentários com autor (nome + data)
- Formulário de novo comentário (textarea + submit)
- Mapeamento correto DB campo `conteudo`
- Join com tabela `users` para nome do autor

### 17. **Activity Timeline** (inline in complaints/[id])
Timeline de atividades do registro NPS.

**Features:**
- Registra: created, status_changed, comment_added, attachment_added, assigned, escalated, updated
- Cada entrada: ação + descrição + autor + data
- Ordenação cronológica
- Ícones por tipo de atividade

---

## 📊 Sprint 1 — Progresso UX

### ✅ Implementado
- [x] NPS Complaint Cards com todos os KPIs
- [x] NPS Detail Page completa
- [x] Attachment cards com download/delete
- [x] Comment section com autor e data
- [x] Activity timeline
- [x] Upload de anexos funcional (MIME + FK fix)
- [x] Barra SLA com clamp visual
- [x] Busca ampliada (assunto, departamento)

### ⏳ Pendente
- [ ] Formulário criar nova reclamação (`/complaints/new`)
- [ ] Charts do Dashboard (Recharts)
- [ ] Date range picker
- [ ] Export CSV/PDF
- [ ] Paginação na lista de reclamações