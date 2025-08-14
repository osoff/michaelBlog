// Скрипт миграции для обновления постов с одной категории на массив категорий
// Запускать в Sanity Studio

import { client } from "@sanity/client";

// Получаем все посты с одной категорией
const posts = await client.fetch(`
  *[_type == "post" && defined(category)]
`);

console.log(`Найдено ${posts.length} постов для миграции`);

// Обновляем каждый пост
for (const post of posts) {
  try {
    // Создаем массив категорий из существующей категории
    const categories = post.category ? [post.category] : [];

    // Обновляем пост
    await client
      .patch(post._id)
      .set({
        categories: categories,
      })
      .unset(["category"]) // Удаляем старое поле
      .commit();

    console.log(`✅ Пост "${post.title}" обновлен`);
  } catch (error) {
    console.error(`❌ Ошибка при обновлении поста "${post.title}":`, error);
  }
}

console.log("Миграция завершена!");
