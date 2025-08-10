import { defineField, defineType } from 'sanity'

export const category = defineType({
  name: 'category',
  title: 'Категория',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Название',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Описание',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'color',
      title: 'Цвет',
      type: 'string',
      options: {
        list: [
          { title: 'Синий', value: 'blue' },
          { title: 'Зеленый', value: 'green' },
          { title: 'Красный', value: 'red' },
          { title: 'Желтый', value: 'yellow' },
          { title: 'Фиолетовый', value: 'purple' },
          { title: 'Серый', value: 'gray' },
        ],
      },
      initialValue: 'blue',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})
