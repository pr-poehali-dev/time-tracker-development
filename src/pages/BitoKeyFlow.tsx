import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Icon from "@/components/ui/icon"

// ─── Types ───────────────────────────────────────────────────────────────────

type StepStatus = "ok" | "warning" | "error"

interface FlowStep {
  id: number
  title: string
  where: string
  userGoal: string
  action: string
  status: StepStatus
}

interface Problem {
  id: string
  type: "ux" | "ui"
  severity: "high" | "medium" | "low"
  step: number
  title: string
  description: string
  impact: string
  suggestion: string
}

// ─── Data ────────────────────────────────────────────────────────────────────

const scenario = {
  name: "Заказ разработки сайта",
  persona: "Владелец малого бизнеса, 35–50 лет. Ищет подрядчика для создания корпоративного сайта. Не технарь, ориентируется на доверие и цену.",
  goal: "Найти студию → убедиться в надёжности → оставить заявку",
}

const steps: FlowStep[] = [
  {
    id: 1,
    title: "Поиск в Яндексе",
    where: "Поисковая выдача",
    userGoal: "Найти надёжную студию разработки сайтов в Москве",
    action: "Вводит запрос «разработка сайта Москва», видит сниппет bitokey.ru и кликает",
    status: "ok",
  },
  {
    id: 2,
    title: "Попадание на главную",
    where: "bitokey.ru — Hero-блок",
    userGoal: "За 5 секунд понять: «Это то, что мне нужно?»",
    action: "Читает заголовок, смотрит на визуал, ищет цену и примеры работ",
    status: "warning",
  },
  {
    id: 3,
    title: "Изучение услуг",
    where: "Раздел «Услуги» / «Что мы делаем»",
    userGoal: "Понять, делают ли они именно корпоративные сайты",
    action: "Скроллит вниз, читает карточки услуг, ищет подходящий тип",
    status: "warning",
  },
  {
    id: 4,
    title: "Просмотр портфолио",
    where: "Раздел «Портфолио» / «Наши работы»",
    userGoal: "Убедиться в качестве и релевантном опыте",
    action: "Листает примеры проектов, пробует кликнуть на работы",
    status: "error",
  },
  {
    id: 5,
    title: "Поиск цен",
    where: "Раздел с тарифами / прайсом",
    userGoal: "Узнать стоимость, чтобы понять «вписываюсь ли я в бюджет»",
    action: "Ищет блок с ценами, читает условия",
    status: "warning",
  },
  {
    id: 6,
    title: "Проверка доверия",
    where: "Раздел «О нас», отзывы, сертификаты",
    userGoal: "Убедиться, что студия реальная и надёжная",
    action: "Читает о компании, ищет отзывы и кейсы с результатами",
    status: "error",
  },
  {
    id: 7,
    title: "Оставить заявку",
    where: "Форма обратной связи / CTA-блок",
    userGoal: "Написать студии и получить ответ",
    action: "Находит форму, заполняет поля, нажимает кнопку отправки",
    status: "warning",
  },
]

const problems: Problem[] = [
  // UX
  {
    id: "ux1",
    type: "ux",
    severity: "high",
    step: 4,
    title: "Портфолио без ссылок на живые проекты",
    description:
      "Работы в портфолио представлены только скриншотами без возможности перейти на готовый сайт. Пользователь не может убедиться, что сайт реально работает и не «картинка ради картинки».",
    impact:
      "Снижает доверие: потенциальный клиент не может проверить качество в деле. Высокий риск ухода на сайт конкурента.",
    suggestion:
      "Добавить кнопку «Открыть сайт» к каждому кейсу. Если проект закрыт — показать видео-демонстрацию или интерактивный прототип.",
  },
  {
    id: "ux2",
    type: "ux",
    severity: "high",
    step: 7,
    title: "Форма заявки требует слишком много данных сразу",
    description:
      "В форме обратной связи сразу запрашивается имя, телефон, email, тип проекта и описание задачи — 5+ полей на первом касании. Для «холодного» пользователя это высокий барьер.",
    impact:
      "Конверсия формы падает: пользователь не готов тратить 3–5 минут на первое обращение. Часть уходит, так и не написав.",
    suggestion:
      "Сократить до 2 полей (имя + телефон / мессенджер). Остальное уточнит менеджер при звонке. Или добавить мини-квиз вместо формы.",
  },
  {
    id: "ux3",
    type: "ux",
    severity: "medium",
    step: 2,
    title: "Нет чёткого УТП в первом экране",
    description:
      "Hero-блок содержит общий заголовок без конкретики: непонятно, чем студия отличается от конкурентов. Пользователь не понимает, почему выбрать именно bitokey.ru, а не другую студию.",
    impact:
      "Высокий показатель отказов с первого экрана. Пользователь возвращается в поиск и выбирает другого подрядчика.",
    suggestion:
      "Добавить конкретику в заголовок: срок, цену, гарантию или уникальное преимущество. Например: «Сайт под ключ за 30 дней с гарантией результата».",
  },
  // UI
  {
    id: "ui1",
    type: "ui",
    severity: "high",
    step: 3,
    title: "Перегруженность текстом без визуальной иерархии",
    description:
      "Блоки с описанием услуг содержат длинные абзацы без выделений, подзаголовков и разбивки. Все элементы имеют одинаковый визуальный вес — глаз не знает, за что зацепиться.",
    impact:
      "Пользователь «сканирует» страницу по диагонали и не находит ключевую информацию. Вероятность чтения длинного текста — менее 20%.",
    suggestion:
      "Разбить текст на короткие буллеты с иконками. Выделить ключевые слова жирным. Добавить заголовки H3 к каждому блоку услуги.",
  },
  {
    id: "ui2",
    type: "ui",
    severity: "medium",
    step: 6,
    title: "Низкий контраст текста на тёмном фоне",
    description:
      "В ряде секций (фоновые баннеры, карточки) текст серого цвета размещён на тёмно-сером или насыщенном фоне. Соотношение контраста не соответствует WCAG AA (минимум 4.5:1).",
    impact:
      "Текст сложно читать при дневном освещении на мобильных экранах. Нарушение доступности — часть аудитории (люди со сниженным зрением) не может прочитать содержимое.",
    suggestion:
      "Проверить все текстовые блоки через contrast checker. Повысить яркость текста или осветлить фон. Использовать белый текст на тёмном фоне вместо серого.",
  },
  {
    id: "ui3",
    type: "ui",
    severity: "low",
    step: 5,
    title: "Непоследовательный стиль кнопок CTA",
    description:
      "На странице встречаются кнопки разных размеров, цветов и форм (квадратные, скруглённые, с рамкой, залитые). Нет единого визуального языка для призывов к действию.",
    impact:
      "Пользователь не понимает, какая кнопка главная. Внимание рассеивается, приоритет действия размыт.",
    suggestion:
      "Определить один основной стиль CTA-кнопки и использовать его для всех ключевых действий. Второстепенные действия — только outline-вариант.",
  },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

const statusConfig = {
  ok: { color: "bg-green-500", label: "Без проблем", icon: "CheckCircle", ring: "ring-green-200" },
  warning: { color: "bg-yellow-400", label: "Есть замечания", icon: "AlertTriangle", ring: "ring-yellow-200" },
  error: { color: "bg-red-500", label: "Критичная проблема", icon: "XCircle", ring: "ring-red-200" },
}

const severityConfig = {
  high: { label: "Критично", bg: "bg-red-100", text: "text-red-700", border: "border-red-200" },
  medium: { label: "Важно", bg: "bg-yellow-100", text: "text-yellow-700", border: "border-yellow-200" },
  low: { label: "Незначительно", bg: "bg-blue-100", text: "text-blue-700", border: "border-blue-200" },
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function BitoKeyFlow() {
  const [activeStep, setActiveStep] = useState<number | null>(null)
  const [filter, setFilter] = useState<"all" | "ux" | "ui">("all")

  const uxProblems = problems.filter((p) => p.type === "ux")
  const uiProblems = problems.filter((p) => p.type === "ui")
  const filteredProblems = filter === "all" ? problems : problems.filter((p) => p.type === filter)

  const stepProblems = (stepId: number) => problems.filter((p) => p.step === stepId)

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <a href="/" className="text-slate-400 hover:text-slate-600 transition-colors">
              <Icon name="ArrowLeft" size={18} />
            </a>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-slate-900">UX/UI Анализ · bitokey.ru</h1>
                <Badge className="bg-slate-100 text-slate-600 hover:bg-slate-100 text-xs">Студент: Алиса</Badge>
              </div>
              <p className="text-sm text-slate-500">Сценарий: заказ разработки сайта</p>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-100">{steps.length} шагов</Badge>
            <Badge className="bg-red-100 text-red-700 hover:bg-red-100">⚠ {uxProblems.length} UX-проблемы</Badge>
            <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">⬡ {uiProblems.length} UI-проблемы</Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">

        {/* Persona + Scenario */}
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="border-0 shadow-sm bg-gradient-to-br from-indigo-50 to-blue-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2 text-indigo-800">
                <Icon name="User" size={16} /> Персона пользователя
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-indigo-700 leading-relaxed">{scenario.persona}</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm bg-gradient-to-br from-purple-50 to-pink-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2 text-purple-800">
                <Icon name="Target" size={16} /> Цель сценария
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-purple-700 leading-relaxed font-medium">{scenario.goal}</p>
              <p className="text-xs text-purple-500 mt-2">Сайт: bitokey.ru — веб-студия «Бит Окей», Москва</p>
            </CardContent>
          </Card>
        </div>

        {/* ─── User Flow ────────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-1 flex items-center gap-2">
            <Icon name="GitBranch" size={20} className="text-indigo-500" />
            User Flow
          </h2>
          <p className="text-sm text-slate-500 mb-5">Кликните на шаг, чтобы увидеть связанные проблемы</p>

          {/* Legend */}
          <div className="flex gap-3 mb-5 flex-wrap">
            {(Object.entries(statusConfig) as [StepStatus, typeof statusConfig[StepStatus]][]).map(([k, v]) => (
              <div key={k} className="flex items-center gap-2 text-xs text-slate-600">
                <div className={`w-3 h-3 rounded-full ${v.color}`} />
                {v.label}
              </div>
            ))}
          </div>

          {/* Steps */}
          <div className="flex flex-col gap-0">
            {steps.map((step, idx) => {
              const cfg = statusConfig[step.status]
              const related = stepProblems(step.id)
              const isActive = activeStep === step.id

              return (
                <div key={step.id} className="flex gap-4">
                  {/* Timeline spine */}
                  <div className="flex flex-col items-center">
                    <button
                      onClick={() => setActiveStep(isActive ? null : step.id)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 transition-all ring-4 ${cfg.color} ${isActive ? cfg.ring : "ring-transparent"} hover:scale-110`}
                    >
                      {step.id}
                    </button>
                    {idx < steps.length - 1 && (
                      <div className="w-0.5 bg-slate-200 flex-1 my-1" style={{ minHeight: 24 }} />
                    )}
                  </div>

                  {/* Content */}
                  <div className={`flex-1 mb-4 rounded-2xl border-2 transition-all cursor-pointer hover:shadow-md ${isActive ? "border-indigo-400 bg-indigo-50 shadow-md" : "border-slate-100 bg-white"}`}
                    onClick={() => setActiveStep(isActive ? null : step.id)}>
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-3 flex-wrap">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="font-bold text-slate-900">{step.title}</span>
                            <Badge className="text-xs bg-slate-100 text-slate-500 hover:bg-slate-100 font-normal">
                              {step.where}
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-500 mb-1">
                            <span className="font-medium text-slate-700">Цель:</span> {step.userGoal}
                          </p>
                          <p className="text-sm text-slate-600">
                            <span className="font-medium text-slate-700">Действие:</span> {step.action}
                          </p>
                        </div>
                        <div className="flex gap-2 items-center flex-shrink-0">
                          {related.map((p) => (
                            <span
                              key={p.id}
                              className={`text-xs font-semibold px-2 py-0.5 rounded-full ${p.type === "ux" ? "bg-red-100 text-red-700" : "bg-orange-100 text-orange-700"}`}
                            >
                              {p.type.toUpperCase()}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Expanded problems */}
                      {isActive && related.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-indigo-100 space-y-3">
                          {related.map((p) => (
                            <div key={p.id} className={`rounded-xl border p-3 ${p.type === "ux" ? "bg-red-50 border-red-200" : "bg-orange-50 border-orange-200"}`}>
                              <div className="flex items-center gap-2 mb-1">
                                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${p.type === "ux" ? "bg-red-500 text-white" : "bg-orange-500 text-white"}`}>
                                  {p.type.toUpperCase()}
                                </span>
                                <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${severityConfig[p.severity].bg} ${severityConfig[p.severity].text} ${severityConfig[p.severity].border}`}>
                                  {severityConfig[p.severity].label}
                                </span>
                              </div>
                              <p className="font-semibold text-sm text-slate-800">{p.title}</p>
                              <p className="text-xs text-slate-600 mt-0.5">{p.description}</p>
                            </div>
                          ))}
                        </div>
                      )}
                      {isActive && related.length === 0 && (
                        <div className="mt-4 pt-4 border-t border-indigo-100 text-sm text-green-600 flex items-center gap-2">
                          <Icon name="CheckCircle" size={14} />
                          На этом шаге серьёзных UX/UI проблем не выявлено
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* ─── Problems Report ──────────────────────────────────────────────── */}
        <section>
          <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Icon name="Bug" size={20} className="text-red-500" />
              Отчёт по UX/UI проблемам
            </h2>
            <div className="flex gap-2">
              {(["all", "ux", "ui"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${filter === f ? "bg-indigo-600 text-white" : "bg-white border border-slate-200 text-slate-600 hover:border-indigo-300"}`}
                >
                  {f === "all" ? "Все" : f.toUpperCase()} {f !== "all" && `(${problems.filter(p => p.type === f).length})`}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {filteredProblems.map((p, i) => (
              <Card key={p.id} className="border-0 shadow-sm overflow-hidden">
                <div className={`h-1 ${p.type === "ux" ? "bg-red-400" : "bg-orange-400"}`} />
                <CardContent className="pt-5">
                  <div className="flex items-start gap-4">
                    {/* Number */}
                    <div className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-sm ${p.type === "ux" ? "bg-red-500" : "bg-orange-500"}`}>
                      {i + 1}
                    </div>

                    <div className="flex-1 space-y-3">
                      {/* Title row */}
                      <div className="flex items-start gap-2 flex-wrap">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full text-white ${p.type === "ux" ? "bg-red-500" : "bg-orange-500"}`}>
                          {p.type.toUpperCase()}
                        </span>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${severityConfig[p.severity].bg} ${severityConfig[p.severity].text} ${severityConfig[p.severity].border}`}>
                          {severityConfig[p.severity].label}
                        </span>
                        <span className="text-xs text-slate-400">Шаг {p.step}: {steps.find(s => s.id === p.step)?.title}</span>
                      </div>

                      <h3 className="font-bold text-slate-900 text-base">{p.title}</h3>

                      {/* 3-column grid */}
                      <div className="grid md:grid-cols-3 gap-3">
                        <div className="bg-slate-50 rounded-xl p-3">
                          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Проблема</div>
                          <p className="text-sm text-slate-700 leading-relaxed">{p.description}</p>
                        </div>
                        <div className="bg-amber-50 rounded-xl p-3 border border-amber-100">
                          <div className="text-xs font-semibold text-amber-600 uppercase tracking-wide mb-1 flex items-center gap-1">
                            <Icon name="TrendingDown" size={11} /> Влияние
                          </div>
                          <p className="text-sm text-amber-800 leading-relaxed">{p.impact}</p>
                        </div>
                        <div className="bg-green-50 rounded-xl p-3 border border-green-100">
                          <div className="text-xs font-semibold text-green-600 uppercase tracking-wide mb-1 flex items-center gap-1">
                            <Icon name="Lightbulb" size={11} /> Рекомендация
                          </div>
                          <p className="text-sm text-green-800 leading-relaxed">{p.suggestion}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* ─── Summary ─────────────────────────────────────────────────────── */}
        <section>
          <Card className="border-0 overflow-hidden shadow-md">
            <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-6 text-white">
              <h2 className="text-lg font-bold mb-1 flex items-center gap-2">
                <Icon name="BarChart3" size={18} />
                Итоговая оценка
              </h2>
              <p className="text-slate-400 text-sm">На основе анализа пользовательского пути</p>
            </div>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-4 gap-4 mb-6">
                {[
                  { label: "Шагов в сценарии", value: steps.length, icon: "Route", color: "text-indigo-600" },
                  { label: "UX-проблемы", value: uxProblems.length, icon: "Users", color: "text-red-600" },
                  { label: "UI-проблемы", value: uiProblems.length, icon: "Palette", color: "text-orange-600" },
                  { label: "Критичных проблем", value: problems.filter(p => p.severity === "high").length, icon: "AlertOctagon", color: "text-red-700" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center p-4 bg-slate-50 rounded-2xl">
                    <Icon name={stat.icon as never} size={24} className={`${stat.color} mx-auto mb-2`} />
                    <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
                    <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
                <h3 className="font-bold text-amber-900 mb-3 flex items-center gap-2">
                  <Icon name="AlertTriangle" size={16} className="text-amber-500" />
                  Главный вывод
                </h3>
                <p className="text-sm text-amber-800 leading-relaxed">
                  Сайт bitokey.ru выполняет базовую задачу — представить студию и её услуги. Однако
                  <strong> два ключевых момента конверсии</strong> (портфолио и форма заявки) имеют
                  критичные UX-проблемы, которые напрямую снижают количество обращений.
                  Устранение именно этих двух точек даст наибольший рост конверсии
                  без переработки всего сайта.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Footer */}
        <div className="text-center text-xs text-slate-400 pb-4">
          Анализ выполнен в рамках учебного задания · AppLab Studio · 2025
        </div>

      </div>
    </div>
  )
}
