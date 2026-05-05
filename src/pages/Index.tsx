import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Icon from "@/components/ui/icon"

const quizQuestions = [
  {
    id: 1,
    question: "Для какой платформы нужно приложение?",
    options: [
      { label: "iOS (iPhone)", value: "ios" },
      { label: "Android", value: "android" },
      { label: "Обе платформы", value: "both" },
      { label: "Ещё не решил", value: "unknown" },
    ],
  },
  {
    id: 2,
    question: "Какова основная функция вашего приложения?",
    options: [
      { label: "Онлайн-продажи / магазин", value: "ecommerce" },
      { label: "Сервис / запись / бронирование", value: "service" },
      { label: "Контент / медиа / новости", value: "content" },
      { label: "Внутренний инструмент для команды", value: "internal" },
    ],
  },
  {
    id: 3,
    question: "Нужна ли оплата прямо в приложении?",
    options: [
      { label: "Да, обязательно", value: "yes" },
      { label: "Желательно", value: "maybe" },
      { label: "Нет", value: "no" },
    ],
  },
  {
    id: 4,
    question: "Каков примерный бюджет проекта?",
    options: [
      { label: "До 500 тыс. руб.", value: "small" },
      { label: "500 тыс. — 1,5 млн руб.", value: "medium" },
      { label: "Более 1,5 млн руб.", value: "large" },
      { label: "Обсудим при встрече", value: "discuss" },
    ],
  },
]

function getQuizResult(answers: Record<number, string>) {
  const platform = answers[1]
  const payment = answers[3]

  let appType = "нативное iOS-приложение"
  if (platform === "android") appType = "нативное Android-приложение"
  if (platform === "both" || platform === "unknown") appType = "кроссплатформенное приложение"

  const paymentNote =
    payment === "yes" || payment === "maybe"
      ? " с интеграцией онлайн-оплаты"
      : ""

  return `Вам подойдёт ${appType}${paymentNote}.`
}

export default function StudioSite() {
  const [quizStep, setQuizStep] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({})
  const [quizDone, setQuizDone] = useState(false)

  const handleAnswer = (questionId: number, value: string) => {
    const updated = { ...quizAnswers, [questionId]: value }
    setQuizAnswers(updated)
    if (quizStep < quizQuestions.length - 1) {
      setQuizStep(quizStep + 1)
    } else {
      setQuizDone(true)
    }
  }

  const resetQuiz = () => {
    setQuizStep(0)
    setQuizAnswers({})
    setQuizDone(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="font-bold text-xl text-slate-900">
              <span className="text-blue-600">App</span>Lab Studio
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#about" className="text-slate-600 hover:text-slate-900 transition-colors">О студии</a>
              <a href="#services" className="text-slate-600 hover:text-slate-900 transition-colors">Услуги</a>
              <a href="#portfolio" className="text-slate-600 hover:text-slate-900 transition-colors">Портфолио</a>
              <a href="#reviews" className="text-slate-600 hover:text-slate-900 transition-colors">Отзывы</a>
              <a href="#quiz" className="text-slate-600 hover:text-slate-900 transition-colors">Тест</a>
              <a href="#blog" className="text-slate-600 hover:text-slate-900 transition-colors">Блог</a>
              <a href="#contact" className="text-slate-600 hover:text-slate-900 transition-colors">Контакты</a>
            </div>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
              Оставить заявку
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">
                Принимаем новые проекты
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                Разрабатываем мобильные приложения{" "}
                <span className="text-blue-600">под ваш бизнес</span>
              </h1>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Создаём iOS и Android-приложения на заказ: от идеи до публикации в магазине.
                Работаем с малым и средним бизнесом, стартапами и корпорациями.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                  Обсудить проект
                  <Icon name="ArrowRight" size={16} className="ml-2" />
                </Button>
                <Button variant="outline" size="lg" onClick={() => document.getElementById("quiz")?.scrollIntoView({ behavior: "smooth" })}>
                  Подобрать тип приложения
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
                <div className="space-y-5">
                  <div className="flex items-center gap-3">
                    <Icon name="Smartphone" size={24} />
                    <span className="font-semibold">iOS & Android разработка</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon name="Zap" size={24} />
                    <span className="font-semibold">Сроки — от 2 месяцев</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon name="ShieldCheck" size={24} />
                    <span className="font-semibold">Гарантия и поддержка после запуска</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon name="Users" size={24} />
                    <span className="font-semibold">Команда из 12 специалистов</span>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-white/30 grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-bold">80+</div>
                    <div className="text-sm text-white/80">проектов</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold">6 лет</div>
                    <div className="text-sm text-white/80">на рынке</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold">97%</div>
                    <div className="text-sm text-white/80">довольных клиентов</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">О студии</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Мы — команда разработчиков, дизайнеров и менеджеров, которые превращают бизнес-идеи в работающие приложения
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Ваше приложение — наша ответственность</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                За 6 лет работы мы запустили более 80 мобильных приложений для разных отраслей:
                ретейл, медицина, логистика, fintech и образование. Каждый проект ведём
                от брифа до релиза — с фиксированными сроками и прозрачным бюджетом.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Мобильная разработка</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">React Native</Badge>
                    <Badge variant="secondary">Flutter</Badge>
                    <Badge variant="secondary">Swift</Badge>
                    <Badge variant="secondary">Kotlin</Badge>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Backend & API</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Node.js</Badge>
                    <Badge variant="secondary">Python</Badge>
                    <Badge variant="secondary">PostgreSQL</Badge>
                    <Badge variant="secondary">Firebase</Badge>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="border-0 shadow-md text-center p-6">
                <div className="text-4xl font-bold text-blue-600 mb-2">80+</div>
                <div className="text-slate-600 text-sm">приложений в App Store и Google Play</div>
              </Card>
              <Card className="border-0 shadow-md text-center p-6">
                <div className="text-4xl font-bold text-purple-600 mb-2">6 лет</div>
                <div className="text-slate-600 text-sm">опыта в мобильной разработке</div>
              </Card>
              <Card className="border-0 shadow-md text-center p-6">
                <div className="text-4xl font-bold text-green-600 mb-2">12</div>
                <div className="text-slate-600 text-sm">специалистов в команде</div>
              </Card>
              <Card className="border-0 shadow-md text-center p-6">
                <div className="text-4xl font-bold text-orange-500 mb-2">97%</div>
                <div className="text-slate-600 text-sm">клиентов рекомендуют нас</div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Услуги</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Полный цикл разработки мобильных приложений — под ключ
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Icon name="Smartphone" size={24} className="text-blue-600" />
                </div>
                <CardTitle>Нативные приложения</CardTitle>
                <CardDescription>
                  Разработка под iOS и Android с максимальной производительностью и нативным UX.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>✓ Swift / Kotlin разработка</li>
                  <li>✓ Нативные анимации и жесты</li>
                  <li>✓ Работа с камерой, GPS, уведомлениями</li>
                  <li>✓ Публикация в App Store и Google Play</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Icon name="Layers" size={24} className="text-purple-600" />
                </div>
                <CardTitle>Кроссплатформенные</CardTitle>
                <CardDescription>
                  Одна кодовая база для iOS и Android — экономит бюджет без потери качества.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>✓ React Native / Flutter</li>
                  <li>✓ Единый дизайн на всех устройствах</li>
                  <li>✓ Быстрый выход на рынок</li>
                  <li>✓ Простая поддержка и обновления</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Icon name="CreditCard" size={24} className="text-green-600" />
                </div>
                <CardTitle>Интеграции и оплата</CardTitle>
                <CardDescription>
                  Подключаем платёжные шлюзы, CRM, аналитику и любые сторонние сервисы.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>✓ Apple Pay, Google Pay, эквайринг</li>
                  <li>✓ Интеграция с 1С, amoCRM, Bitrix</li>
                  <li>✓ Push-уведомления и чаты</li>
                  <li>✓ Аналитика и A/B тестирование</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Icon name="Paintbrush" size={24} className="text-orange-600" />
                </div>
                <CardTitle>UX/UI Дизайн</CardTitle>
                <CardDescription>
                  Создаём понятные и красивые интерфейсы, которые удерживают пользователей.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>✓ Прототипирование и wireframes</li>
                  <li>✓ Дизайн-система и UI Kit</li>
                  <li>✓ Пользовательское тестирование</li>
                  <li>✓ Figma + Handoff для разработчиков</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Icon name="RefreshCw" size={24} className="text-red-600" />
                </div>
                <CardTitle>Поддержка и развитие</CardTitle>
                <CardDescription>
                  Сопровождаем приложение после запуска — обновления, доработки, мониторинг.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>✓ Ежемесячная техподдержка</li>
                  <li>✓ Обновление под новые версии iOS/Android</li>
                  <li>✓ Ускорение и оптимизация</li>
                  <li>✓ SLA и личный менеджер</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Icon name="BarChart3" size={24} className="text-blue-600" />
                </div>
                <CardTitle>Аудит и консультации</CardTitle>
                <CardDescription>
                  Разберём ваш проект, найдём узкие места и предложим лучшее техническое решение.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>✓ Технический аудит приложения</li>
                  <li>✓ Оценка бюджета и сроков</li>
                  <li>✓ Выбор технологического стека</li>
                  <li>✓ Бесплатная первая консультация</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Портфолио</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Несколько проектов из нашего портфеля — каждый решает реальную бизнес-задачу
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                img: "/ecommerce-mobile-app.png",
                title: "ShopFast — e-commerce",
                desc: "Мобильный магазин с каталогом, корзиной, оплатой и программой лояльности. 50 000+ установок.",
                tags: ["React Native", "iOS", "Android"],
                color: "bg-blue-600",
              },
              {
                img: "/modern-web-dashboard.png",
                title: "MedBook — запись к врачу",
                desc: "Приложение для сети клиник: онлайн-запись, результаты анализов, push-напоминания.",
                tags: ["Flutter", "Firebase", "iOS"],
                color: "bg-purple-600",
              },
              {
                img: "/developer-workspace.png",
                title: "LogiTrack — логистика",
                desc: "Трекинг грузов в реальном времени, маршрутизация водителей, интеграция с 1С.",
                tags: ["Kotlin", "Android", "API"],
                color: "bg-green-600",
              },
            ].map((project, i) => (
              <Card key={i} className="border-0 shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                <div className="relative">
                  <img
                    src={project.img}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className={`absolute inset-0 ${project.color} opacity-40`} />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <CardDescription>{project.desc}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button variant="outline" size="lg">
              Смотреть все проекты
              <Icon name="ArrowRight" size={16} className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Отзывы клиентов</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Что говорят предприниматели, которые уже запустили приложение с нами
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Алексей Морозов",
                role: "Основатель интернет-магазина",
                text: "AppLab сделали нам приложение за 2,5 месяца. Чёткие сроки, понятная коммуникация, результат превзошёл ожидания. Продажи через приложение выросли на 35% за первый квартал.",
                stars: 5,
              },
              {
                name: "Мария Соколова",
                role: "Директор сети клиник «МедПлюс»",
                text: "Нам важно было, чтобы пациенты легко записывались на приём. Команда разобралась в наших процессах и предложила удобное решение. Теперь 60% записей идёт через приложение.",
                stars: 5,
              },
              {
                name: "Дмитрий Краснов",
                role: "CEO транспортной компании",
                text: "Работали с несколькими студиями, AppLab — лучший опыт. Техническая команда глубоко погрузилась в задачу, сделали кастомную карту с маршрутами. Рекомендую без оговорок.",
                stars: 5,
              },
            ].map((review, i) => (
              <Card key={i} className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex gap-1 mb-2">
                    {Array.from({ length: review.stars }).map((_, j) => (
                      <Icon key={j} name="Star" size={16} className="text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <CardDescription className="text-slate-700 text-base leading-relaxed">
                    "{review.text}"
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                      {review.name[0]}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">{review.name}</div>
                      <div className="text-sm text-slate-500">{review.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quiz Section */}
      <section id="quiz" className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-purple-100 text-purple-800 hover:bg-purple-200">Интерактивный тест</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Какое приложение вам нужно?</h2>
            <p className="text-xl text-slate-600">
              Ответьте на 4 вопроса — получите персональную рекомендацию за 1 минуту
            </p>
          </div>

          <Card className="border-0 shadow-xl">
            <CardContent className="pt-8 pb-8 px-8">
              {!quizDone ? (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-sm text-slate-500">
                      Вопрос {quizStep + 1} из {quizQuestions.length}
                    </span>
                    <div className="flex gap-1">
                      {quizQuestions.map((_, idx) => (
                        <div
                          key={idx}
                          className={`h-2 w-8 rounded-full transition-colors ${idx <= quizStep ? "bg-blue-600" : "bg-slate-200"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-6">
                    {quizQuestions[quizStep].question}
                  </h3>
                  <div className="grid gap-3">
                    {quizQuestions[quizStep].options.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => handleAnswer(quizQuestions[quizStep].id, opt.value)}
                        className="w-full text-left px-5 py-4 rounded-xl border-2 border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all text-slate-700 font-medium"
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon name="CheckCircle" size={32} className="text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Ваша рекомендация готова!</h3>
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl p-6 mb-6">
                    <p className="text-xl font-semibold">{getQuizResult(quizAnswers)}</p>
                  </div>
                  <p className="text-slate-600 mb-8">
                    Хотите узнать точную стоимость и сроки? Наш менеджер свяжется с вами в течение 2 часов
                    и подготовит индивидуальное предложение.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
                      Получить расчёт стоимости
                      <Icon name="ArrowRight" size={16} className="ml-2" />
                    </Button>
                    <Button variant="outline" size="lg" onClick={resetQuiz}>
                      Пройти тест заново
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Блог</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Делимся опытом: как создаются мобильные приложения и на что обратить внимание
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                date: "28 апреля 2025",
                tag: "Разработка",
                title: "React Native vs Flutter: что выбрать в 2025 году",
                desc: "Сравниваем два главных кроссплатформенных фреймворка — производительность, экосистема, стоимость разработки.",
              },
              {
                date: "15 апреля 2025",
                tag: "Бизнес",
                title: "Сколько стоит мобильное приложение: разбираем по статьям",
                desc: "Прозрачный разбор бюджета: дизайн, разработка, публикация, поддержка. Реальные цифры без воды.",
              },
              {
                date: "3 апреля 2025",
                tag: "UX",
                title: "5 ошибок при разработке мобильного приложения, которые стоят денег",
                desc: "Что чаще всего идёт не так у заказчиков — и как мы помогаем этого избежать с первого дня.",
              },
            ].map((post, i) => (
              <Card key={i} className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Badge variant="secondary">{post.tag}</Badge>
                    <span className="text-sm text-slate-400">{post.date}</span>
                  </div>
                  <CardTitle className="text-lg leading-tight">{post.title}</CardTitle>
                  <CardDescription className="leading-relaxed">{post.desc}</CardDescription>
                </CardHeader>
                <CardContent>
                  <button className="text-blue-600 font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all">
                    Читать статью <Icon name="ArrowRight" size={14} />
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Оставить заявку</h2>
            <p className="text-xl text-slate-600">
              Расскажите о проекте — мы свяжемся в течение 2 часов и ответим на все вопросы
            </p>
          </div>

          <Card className="border-0 shadow-xl">
            <CardContent className="pt-8 pb-8 px-8">
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Ваше имя *</label>
                    <input
                      type="text"
                      placeholder="Иван Иванов"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Телефон *</label>
                    <input
                      type="tel"
                      placeholder="+7 (999) 000-00-00"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="ivan@company.ru"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Расскажите о проекте</label>
                  <textarea
                    rows={4}
                    placeholder="Кратко опишите идею приложения, вашу аудиторию и основные функции..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
                  />
                </div>
                <Button type="submit" size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Отправить заявку
                  <Icon name="Send" size={16} className="ml-2" />
                </Button>
                <p className="text-center text-sm text-slate-400">
                  Нажимая кнопку, вы соглашаетесь на обработку персональных данных
                </p>
              </form>
            </CardContent>
          </Card>

          <div className="mt-10 grid grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Icon name="Phone" size={18} className="text-blue-600" />
              </div>
              <div className="text-sm text-slate-600">+7 (495) 000-00-00</div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Icon name="Mail" size={18} className="text-blue-600" />
              </div>
              <div className="text-sm text-slate-600">hello@applab.ru</div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Icon name="MapPin" size={18} className="text-blue-600" />
              </div>
              <div className="text-sm text-slate-600">Москва, Россия</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-slate-900 text-slate-400">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="font-bold text-xl text-white">
              <span className="text-blue-400">App</span>Lab Studio
            </div>
            <div className="flex gap-6 text-sm">
              <a href="#about" className="hover:text-white transition-colors">О студии</a>
              <a href="#services" className="hover:text-white transition-colors">Услуги</a>
              <a href="#portfolio" className="hover:text-white transition-colors">Портфолио</a>
              <a href="#blog" className="hover:text-white transition-colors">Блог</a>
              <a href="#contact" className="hover:text-white transition-colors">Контакты</a>
            </div>
            <div className="text-sm">© 2025 AppLab Studio. Все права защищены.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
