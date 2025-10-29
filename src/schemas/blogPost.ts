import { defineType, defineField } from 'sanity'

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
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
      name: 'date',
      title: 'Published Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: { type: 'author' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'contentType',
      title: 'Content Type',
      type: 'string',
      options: {
        list: [
          { title: 'Portable Text (Rich Text)', value: 'portable' },
          { title: 'Markdown', value: 'markdown' },
        ],
        layout: 'radio',
      },
      initialValue: 'portable',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content (Portable Text)',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'H5', value: 'h5' },
            { title: 'H6', value: 'h6' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Number', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'object',
          title: 'Code Block',
          name: 'codeBlock',
          fields: [
            {
              name: 'code',
              type: 'text',
              title: 'Code',
              rows: 10,
            },
            {
              name: 'language',
              type: 'string',
              title: 'Language',
              options: {
                list: [
                  { title: 'JavaScript', value: 'javascript' },
                  { title: 'TypeScript', value: 'typescript' },
                  { title: 'Python', value: 'python' },
                  { title: 'HTML', value: 'html' },
                  { title: 'CSS', value: 'css' },
                  { title: 'JSON', value: 'json' },
                  { title: 'Bash', value: 'bash' },
                  { title: 'SQL', value: 'sql' },
                  { title: 'Markdown', value: 'markdown' },
                ],
              },
            },
            {
              name: 'filename',
              type: 'string',
              title: 'Filename (optional)',
            },
          ],
          preview: {
            select: {
              title: 'language',
              subtitle: 'filename',
            },
            prepare(selection) {
              const { title, subtitle } = selection
              return {
                title: title || 'Code Block',
                subtitle: subtitle || 'No filename',
              }
            },
          },
        },
        {
          type: 'image',
          title: 'Image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            },
          ],
        },
        {
          type: 'object',
          title: 'Table',
          name: 'table',
          fields: [
            {
              name: 'rows',
              type: 'array',
              title: 'Table Rows',
              of: [
                {
                  type: 'object',
                  title: 'Row',
                  fields: [
                    {
                      name: 'cells',
                      type: 'array',
                      title: 'Cells',
                      of: [{ type: 'string' }],
                    },
                    {
                      name: 'isHeader',
                      type: 'boolean',
                      title: 'Header Row',
                      initialValue: false,
                    },
                  ],
                },
              ],
            },
          ],
          preview: {
            select: {
              rows: 'rows',
            },
            prepare(selection) {
              const { rows } = selection
              const rowCount = rows?.length || 0
              return {
                title: 'Table',
                subtitle: `${rowCount} row${rowCount !== 1 ? 's' : ''}`,
              }
            },
          },
        },
      ],
      hidden: ({ parent }) => parent?.contentType !== 'portable',
    }),
    defineField({
      name: 'markdownContent',
      title: 'Content (Markdown)',
      type: 'text',
      rows: 20,
      hidden: ({ parent }) => parent?.contentType !== 'markdown',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'tag' } }],
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }],
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'object',
      fields: [
        {
          name: 'type',
          title: 'Image Type',
          type: 'string',
          options: {
            list: [
              { title: 'Sanity Image', value: 'sanity' },
              { title: 'External URL', value: 'external' },
            ],
            layout: 'radio',
          },
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'sanityImage',
          title: 'Sanity Image',
          type: 'image',
          options: {
            hotspot: true,
          },
          hidden: ({ parent }) => parent?.type !== 'sanity',
        },
        {
          name: 'externalUrl',
          title: 'External URL',
          type: 'url',
          hidden: ({ parent }) => parent?.type !== 'external',
        },
        {
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'published',
      title: 'Published',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'readTime',
      title: 'Read Time (minutes)',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(60),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'coverImage.sanityImage',
    },
    prepare(selection) {
      const { title, author, media } = selection
      return {
        title,
        subtitle: `by ${author}`,
        media,
      }
    },
  },
})
