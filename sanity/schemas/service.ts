import { defineField, defineType } from "sanity";

export const service = defineType({
  name: "service",
  title: "Услуга",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Название услуги",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Описание",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mainImage",
      title: "Главное изображение",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "features",
      title: "Что входит в услугу",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "duration",
      title: "Срок выполнения",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "price",
      title: "Стоимость",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Иконка",
      type: "string",
      options: {
        list: [
          { title: "BarChart3", value: "BarChart3" },
          { title: "Settings", value: "Settings" },
          { title: "Zap", value: "Zap" },
          { title: "CheckCircle", value: "CheckCircle" },
          { title: "GraduationCap", value: "GraduationCap" },
          { title: "Users", value: "Users" },
          { title: "Clock", value: "Clock" },
          { title: "Shield", value: "Shield" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "popular",
      title: "Популярная услуга",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Порядок отображения",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        {
          name: "metaTitle",
          title: "Meta Title",
          type: "string",
        },
        {
          name: "metaDescription",
          title: "Meta Description",
          type: "text",
          rows: 3,
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      popular: "popular",
      media: "mainImage",
    },
    prepare(selection) {
      const { title, popular } = selection;
      return {
        ...selection,
        subtitle: popular ? "⭐ Популярно" : "Услуга",
      };
    },
  },
  orderings: [
    {
      title: "По порядку",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "По названию",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
  ],
});
