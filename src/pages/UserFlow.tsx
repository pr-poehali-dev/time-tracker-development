import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import Icon from "@/components/ui/icon"

type NodeType = "start" | "page" | "action" | "decision" | "problem" | "end"

interface FlowNode {
  id: string
  type: NodeType
  label: string
  sublabel?: string
  problemNote?: string
}

interface FlowStep {
  phase: string
  phaseColor: string
  phaseIcon: string
  nodes: FlowNode[]
}

const steps: FlowStep[] = [
  {
    phase: "Точки входа",
    phaseColor: "bg-slate-600",
    phaseIcon: "Globe",
    nodes: [
      { id: "s1", type: "start", label: "Поиск Google / Яндекс", sublabel: "«разработка мобильного приложения под заказ»" },
      { id: "s2", type: "start", label: "Контекстная реклама", sublabel: "Яндекс.Директ, Google Ads" },
      { id: "s3", type: "start", label: "Рекомендация", sublabel: "Друг, коллега, партнёр" },
      { id: "s4", type: "start", label: "Социальные сети", sublabel: "VK, Telegram-канал студии" },
    ],
  },
  {
    phase: "Главная страница",
    phaseColor: "bg-blue-600",
    phaseIcon: "Monitor",
    nodes: [
      {
        id: "p1",
        type: "page",
        label: "Пользователь попадает на главную",
        sublabel: "Видит Hero: заголовок, преимущества, CTA",
        problemNote: "Может уйти, если заголовок не «зацепил» за 5 секунд",
      },
      { id: "p2", type: "action", label: "Скроллит вниз", sublabel: "Изучает О студии, Услуги, Портфолио" },
      {
        id: "p3",
        type: "decision",
        label: "Замечает блок теста?",
        sublabel: "Раздел «Интерактивный тест» с бейджем",
        problemNote: "Может проскроллить мимо — важен яркий визуальный акцент",
      },
    ],
  },
  {
    phase: "Начало теста",
    phaseColor: "bg-purple-600",
    phaseIcon: "ClipboardList",
    nodes: [
      { id: "q0", type: "action", label: "Читает заголовок теста", sublabel: "«Какое приложение вам нужно? Ответьте на 4 вопроса»" },
      {
        id: "q1",
        type: "decision",
        label: "Решает пройти тест",
        sublabel: "Нажимает на первый вопрос или кнопку",
        problemNote: "Слово «тест» может пугать — лучше «подбор» или «калькулятор»",
      },
    ],
  },
  {
    phase: "Прохождение теста (4 вопроса)",
    phaseColor: "bg-indigo-600",
    phaseIcon: "MessageSquare",
    nodes: [
      {
        id: "q2",
        type: "action",
        label: "Вопрос 1: Платформа",
        sublabel: "iOS / Android / Обе / Не решил",
      },
      {
        id: "q3",
        type: "action",
        label: "Вопрос 2: Функция приложения",
        sublabel: "Магазин / Сервис / Контент / Внутренний инструмент",
      },
      {
        id: "q4",
        type: "action",
        label: "Вопрос 3: Нужна ли оплата?",
        sublabel: "Да / Желательно / Нет",
        problemNote: "Пользователь может не знать ответа — нужна подсказка или «Не знаю»",
      },
      {
        id: "q5",
        type: "action",
        label: "Вопрос 4: Бюджет",
        sublabel: "До 500 тыс. / 500к–1.5млн / Более 1.5млн / Обсудим",
        problemNote: "Вопрос о бюджете — самый стрессовый. Часть уходит, не ответив",
      },
    ],
  },
  {
    phase: "Результат",
    phaseColor: "bg-green-600",
    phaseIcon: "CheckCircle",
    nodes: [
      {
        id: "r1",
        type: "page",
        label: "Экран результата",
        sublabel: "Рекомендация: тип приложения + особенности (оплата, платформа)",
      },
      {
        id: "r2",
        type: "decision",
        label: "Что пользователь делает дальше?",
        sublabel: "Разветвление на 3 пути",
      },
    ],
  },
  {
    phase: "Следующий шаг",
    phaseColor: "bg-orange-500",
    phaseIcon: "ArrowRight",
    nodes: [
      {
        id: "e1",
        type: "end",
        label: "Оставляет заявку",
        sublabel: "Кнопка «Получить расчёт стоимости» → форма контакта",
      },
      {
        id: "e2",
        type: "end",
        label: "Проходит тест заново",
        sublabel: "Хочет проверить другой вариант ответов",
      },
      {
        id: "e3",
        type: "end",
        label: "Продолжает изучать сайт",
        sublabel: "Идёт в Портфолио или Блог за дополнительной уверенностью",
        problemNote: "Может уйти без заявки — нужен ретаргетинг или сохранение результата",
      },
    ],
  },
]

const nodeStyles: Record<NodeType, { bg: string; border: string; text: string; icon: string }> = {
  start: { bg: "bg-slate-100", border: "border-slate-400", text: "text-slate-700", icon: "Circle" },
  page: { bg: "bg-blue-50", border: "border-blue-400", text: "text-blue-800", icon: "Monitor" },
  action: { bg: "bg-indigo-50", border: "border-indigo-400", text: "text-indigo-800", icon: "MousePointer" },
  decision: { bg: "bg-yellow-50", border: "border-yellow-400", text: "text-yellow-800", icon: "GitBranch" },
  problem: { bg: "bg-red-50", border: "border-red-400", text: "text-red-800", icon: "AlertTriangle" },
  end: { bg: "bg-green-50", border: "border-green-400", text: "text-green-800", icon: "Flag" },
}

const typeLabel: Record<NodeType, string> = {
  start: "Источник",
  page: "Экран",
  action: "Действие",
  decision: "Развилка",
  problem: "Проблема",
  end: "Результат",
}

function FlowCard({ node, onClick, isActive }: { node: FlowNode; onClick: () => void; isActive: boolean }) {
  const style = nodeStyles[node.type]
  return (
    <button
      onClick={onClick}
      className={`w-full text-left rounded-xl border-2 p-4 transition-all hover:shadow-md ${style.bg} ${isActive ? "border-blue-500 shadow-lg ring-2 ring-blue-300" : style.border}`}
    >
      <div className="flex items-start gap-3">
        <div className={`mt-0.5 flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center ${isActive ? "bg-blue-500" : "bg-white"}`}>
          <Icon name={style.icon as never} size={14} className={isActive ? "text-white" : style.text} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className={`text-xs font-semibold uppercase tracking-wide opacity-60 ${style.text}`}>
              {typeLabel[node.type]}
            </span>
            {node.problemNote && (
              <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full font-medium">
                ⚠ Риск
              </span>
            )}
          </div>
          <p className={`font-semibold text-sm leading-tight ${style.text}`}>{node.label}</p>
          {node.sublabel && (
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">{node.sublabel}</p>
          )}
        </div>
      </div>
    </button>
  )
}

export default function UserFlow() {
  const [activeNode, setActiveNode] = useState<string | null>(null)

  const allNodes = steps.flatMap((s) => s.nodes)
  const activeData = allNodes.find((n) => n.id === activeNode)

  const totalProblems = allNodes.filter((n) => n.problemNote).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <a href="/" className="text-slate-500 hover:text-slate-700 transition-colors">
              <Icon name="ArrowLeft" size={18} />
            </a>
            <div>
              <h1 className="text-lg font-bold text-slate-900">User Flow — Тест на подбор приложения</h1>
              <p className="text-sm text-slate-500">AppLab Studio · Интерактивная схема</p>
            </div>
          </div>
          <div className="flex gap-3 flex-wrap">
            <Badge className="bg-slate-100 text-slate-700 hover:bg-slate-100">{steps.length} этапов</Badge>
            <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-100">{allNodes.length} шагов</Badge>
            <Badge className="bg-red-100 text-red-700 hover:bg-red-100">⚠ {totalProblems} точки риска</Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Legend */}
        <div className="flex flex-wrap gap-3 mb-8">
          {(Object.entries(nodeStyles) as [NodeType, typeof nodeStyles[NodeType]][]).map(([type, style]) => (
            <div key={type} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium ${style.bg} ${style.border} ${style.text}`}>
              <Icon name={style.icon as never} size={12} />
              {typeLabel[type]}
            </div>
          ))}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium bg-red-50 border-red-300 text-red-700">
            ⚠ Точка риска
          </div>
        </div>

        {/* Flow */}
        <div className="flex gap-4 overflow-x-auto pb-4">
          {steps.map((step, stepIdx) => (
            <div key={step.phase} className="flex-shrink-0 flex flex-col" style={{ width: 240 }}>
              {/* Phase header */}
              <div className={`${step.phaseColor} text-white rounded-xl px-4 py-3 mb-3 flex items-center gap-2`}>
                <Icon name={step.phaseIcon as never} size={16} />
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide opacity-80">Этап {stepIdx + 1}</div>
                  <div className="text-sm font-bold leading-tight">{step.phase}</div>
                </div>
              </div>

              {/* Nodes */}
              <div className="flex flex-col gap-3 flex-1">
                {step.nodes.map((node, nodeIdx) => (
                  <div key={node.id} className="flex flex-col gap-1">
                    <FlowCard
                      node={node}
                      onClick={() => setActiveNode(activeNode === node.id ? null : node.id)}
                      isActive={activeNode === node.id}
                    />
                    {/* Arrow between nodes */}
                    {nodeIdx < step.nodes.length - 1 && (
                      <div className="flex justify-center">
                        <Icon name="ArrowDown" size={14} className="text-slate-300" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Arrow between phases */}
              {stepIdx < steps.length - 1 && (
                <div className="hidden" /> /* horizontal arrows via flex layout */
              )}
            </div>
          ))}

          {/* Horizontal arrows between columns — spacers */}
          {steps.map((_, i) =>
            i < steps.length - 1 ? (
              <div key={`arr-${i}`} className="flex-shrink-0 flex items-center justify-center" style={{ width: 24 }}>
                <div className="flex flex-col items-center gap-1 text-slate-300">
                  <div className="w-px h-8 bg-slate-200" />
                  <Icon name="ChevronRight" size={16} />
                  <div className="w-px h-8 bg-slate-200" />
                </div>
              </div>
            ) : null
          )}
        </div>

        {/* Detail panel */}
        {activeData && (
          <div className="mt-6 bg-white rounded-2xl border shadow-lg p-6 max-w-2xl">
            <div className="flex items-start gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${nodeStyles[activeData.type].bg} ${nodeStyles[activeData.type].border} border-2`}>
                <Icon name={nodeStyles[activeData.type].icon as never} size={18} className={nodeStyles[activeData.type].text} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs font-semibold uppercase tracking-wide ${nodeStyles[activeData.type].text} opacity-70`}>
                    {typeLabel[activeData.type]}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">{activeData.label}</h3>
                {activeData.sublabel && (
                  <p className="text-slate-600 mb-3">{activeData.sublabel}</p>
                )}
                {activeData.problemNote && (
                  <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                    <Icon name="AlertTriangle" size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-sm font-semibold text-red-700 mb-0.5">Точка риска</div>
                      <p className="text-sm text-red-600">{activeData.problemNote}</p>
                    </div>
                  </div>
                )}
              </div>
              <button onClick={() => setActiveNode(null)} className="text-slate-400 hover:text-slate-600">
                <Icon name="X" size={18} />
              </button>
            </div>
          </div>
        )}

        {/* Problems summary */}
        <div className="mt-8 bg-white rounded-2xl border shadow-sm p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Icon name="AlertTriangle" size={18} className="text-red-500" />
            Ключевые точки риска
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {allNodes
              .filter((n) => n.problemNote)
              .map((n, i) => {
                const phase = steps.find((s) => s.nodes.includes(n))
                return (
                  <div
                    key={n.id}
                    className="flex gap-3 p-4 bg-red-50 border border-red-100 rounded-xl cursor-pointer hover:border-red-300 transition-colors"
                    onClick={() => {
                      setActiveNode(n.id)
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }}
                  >
                    <div className="flex-shrink-0 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {i + 1}
                    </div>
                    <div>
                      <div className="text-xs text-red-400 font-medium mb-0.5">{phase?.phase}</div>
                      <div className="text-sm font-semibold text-red-800 mb-1">{n.label}</div>
                      <p className="text-xs text-red-600 leading-relaxed">{n.problemNote}</p>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>

        {/* Narrative summary */}
        <div className="mt-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Icon name="BookOpen" size={18} />
            Краткое описание пути
          </h2>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white/10 rounded-xl p-4">
              <div className="font-semibold mb-2">1. Приход на сайт</div>
              <p className="opacity-90 leading-relaxed">
                Пользователь приходит через поиск, рекламу или рекомендацию. Изучает главную страницу и скроллит вниз.
              </p>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <div className="font-semibold mb-2">2. Тест (1–2 мин)</div>
              <p className="opacity-90 leading-relaxed">
                Замечает блок теста, отвечает на 4 вопроса кликом. Прогресс-бар показывает, сколько осталось.
              </p>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <div className="font-semibold mb-2">3. Результат → заявка</div>
              <p className="opacity-90 leading-relaxed">
                Получает персональную рекомендацию. Переходит к форме заявки для расчёта стоимости.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
