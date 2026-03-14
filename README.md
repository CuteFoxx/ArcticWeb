# Команди і інструкції до запску

1. Потрібно встановити всі залежності `npm install`
2. Потрібно створити .env файл в корені проєкту і можна скопіювати дефолтні значення для розробки з .example.env
3. Потрібно створити .env.local у папці /frontend значення також можна скопіювати з .example.env
4. Після чого можна просто ввести `docker compose up` в корені проєкту і все повино працювати

## Лайв превью проєкту

захощено на railway так як наскільки пам'ятаю vercel не вмів працювати з monorepo + nestjs
[Live_preview](/test)

## Приклади запитів

### Створити сніпет

```bash
curl -X POST http://localhost:5000/snippets \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Docker cleanup",
    "content": "docker system prune -af --volumes",
    "tags": ["docker", "devops"],
    "type": "command"
  }'
```

Допустимі значення `type`: `"link"`, `"note"`, `"command"`

### Отримати всі сніпети (з пагінацією, пошуком, фільтрацією)

```bash
# Базовий запит
curl http://localhost:5000/snippets

# З пагінацією
curl "http://localhost:5000/snippets?page=1&limit=5"

# Пошук за текстом (шукає в title та content)
curl "http://localhost:5000/snippets?search=docker"

# Фільтрація за тегом
curl "http://localhost:5000/snippets?tag=devops"

# Сортування
curl "http://localhost:5000/snippets?sortBy=title&order=asc"

# Комбінований запит
curl "http://localhost:5000/snippets?search=docker&tag=devops&page=1&limit=5&sortBy=createdAt&order=desc"
```

### Отримати сніпет за ID

```bash
curl http://localhost:5000/snippets/<snippet_id>
```

### Оновити сніпет

```bash
curl -X PATCH http://localhost:5000/snippets/<snippet_id> \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Docker full cleanup",
    "tags": ["docker", "devops", "cleanup"]
  }'
```

### Видалити сніпет

```bash
curl -X DELETE http://localhost:5000/snippets/<snippet_id>
```
