// npx create-next-app@latest . - новое next приложение, при установке выбрал все опции, кроме алиасов

// npm i cuid - для генерации id

// npx shadcn@latest init - библиотека готовых компонентов, опции выбрал New  York, Zinc, use variables, в проект добавилась папка lib и документ globals.css. Для нормальной работы в документе tailwind.config.ts в опции content оставляем только "./src/**/*.{js,ts,jsx,tsx,mdx}" и в component.json меняем настройки алиасов под свою архитектуру.
// Пример добавления компонента от shadcn:
// npx shadcn@latest add button - добавили кнопку, при добавлении выбрал опцию "Use --legacy-peer-deps", согласно настройкам, появилась в папке shared/ui, уже готова к использованию, со стилями, пример в корнеевой page.tsx
// В layout.tsx добавляем в body цветовую тему dark из shadcn

// npm i zod - для парсинга, в д.с json.parse

// Помимо app в src создаем слои для логики:
// - entities - сущности
// - features - большие куски функциональности
// - kernel - ядро для связи сущностей друг с другом
// - shared - инфраструктурная логика, переиспользуемая во всем приложении

// npm i prisma --save-dev - ставим как БД
// устанавливаем плагин в VSCode для поддержки документов prisma
// npx prisma init
// Создаст папку prisma и строку подключения в .env(переносим в .env.development - с ним next работает по умолчанию, в .env тоже должны быть валидные данные для работы в dev, с ним работает prisma)
// npx prisma migrate dev --name init

// Создаем docker-compose.yml, прописываем подключение БД, запускаем в терминале docker compose up

// Без docker запускаем pgAdmmin, создаем БД, вносим данные подключения в env и запускаем
// npx prisma migrate dev --name iname init - для миграции БД(с докером также запускаем миграцию) - в папке prisma появляется папка migrations с sql документом, описывающим БД

// Подключение к БД производим в shared/lib/db.ts

// npm i -D dotenv-cli - для работы с переменными окружения, понадобится для добавления переменных окружения в команду запуска очистки БД(package.json - db:reset)
// Добавляем в package.json код для добавления сидов - автоматически заполнят БД, удобно для тестирования
// "prisma": {
//   "seed": "tsx prisma/seed.ts"
// },
// npm i -D tsx - модуль для работы сидов
// npx prisma db seed  - команда для запуска работы сидов
// npx prisma migrate reset  - для перезапуска БД(вместо предыдущей)
// добавляем в package.json команду запуска миграций в dev режиме "db:migrate:dev": "dotenv -e .env.development -- npx prisma migrate dev" (при запуске выдал предупреждение, что БД будут сломаны, так что закоментировали сиды, ресетнули и запустили по новому)

// npx shadcn@latest add card - добавили компонент

// npm i -D prettier  - для форматирования кода
// добавляем документ .prettierrc с пустым обьектом в проект и запускаем npx prettier -w .


