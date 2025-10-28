import PortableTextRenderer from '@/components/blog/PortableTextRenderer'
import MarkdownRenderer from '@/components/blog/MarkdownRenderer'

export default function TestBlogFormatting() {
  // Sample Portable Text content
  const portableTextContent = [
    {
      _type: 'block',
      style: 'h1',
      children: [
        {
          _type: 'span',
          text: 'Test Blog Post - Portable Text Formatting'
        }
      ]
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'This is a test paragraph to verify that the blog formatting is working correctly. The text should be properly styled with good typography and spacing.'
        }
      ]
    },
    {
      _type: 'block',
      style: 'h2',
      children: [
        {
          _type: 'span',
          text: 'Grid Layout - Style 0'
        }
      ]
    },
    {
      _type: 'block',
      style: 'h3',
      children: [
        {
          _type: 'span',
          text: 'Modern Card Grid Design'
        }
      ]
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'This H2 section uses a responsive grid layout where all H3s are displayed as modern cards in a grid. Perfect for showcasing multiple related concepts or features.'
        }
      ]
    },
    {
      _type: 'block',
      style: 'h3',
      children: [
        {
          _type: 'span',
          text: 'Responsive Design'
        }
      ]
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'The grid automatically adjusts from 1 column on mobile to 2 on tablet and 3 on desktop, ensuring optimal viewing on all devices.'
        }
      ]
    },
    {
      _type: 'block',
      style: 'h3',
      children: [
        {
          _type: 'span',
          text: 'Hover Effects'
        }
      ]
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'Each card has beautiful hover effects including color transitions, shadow changes, and animated bottom borders for enhanced interactivity.'
        }
      ]
    },
    {
      _type: 'block',
      style: 'h2',
      children: [
        {
          _type: 'span',
          text: 'Flex Layout - Style 1'
        }
      ]
    },
    {
      _type: 'block',
      style: 'h3',
      children: [
        {
          _type: 'span',
          text: 'Horizontal Card Layout'
        }
      ]
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'This H2 section uses a flex layout where H3s are displayed as horizontal cards with the title on the left and content on the right. Great for detailed explanations.'
        }
      ]
    },
    {
      _type: 'block',
      style: 'h3',
      children: [
        {
          _type: 'span',
          text: 'Two-Column Design'
        }
      ]
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'Each H3 gets a dedicated left column for the title with a gradient background, while the content flows in the larger right column for better readability.'
        }
      ]
    },
    {
      _type: 'block',
      style: 'h2',
      children: [
        {
          _type: 'span',
          text: 'Masonry Layout - Style 2'
        }
      ]
    },
    {
      _type: 'block',
      style: 'h3',
      children: [
        {
          _type: 'span',
          text: 'Pinterest-Style Cards'
        }
      ]
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'This H2 section uses a masonry layout where H3s are displayed as staggered cards similar to Pinterest. Perfect for showcasing varied content lengths.'
        }
      ]
    },
    {
      _type: 'block',
      style: 'h3',
      children: [
        {
          _type: 'span',
          text: 'Dynamic Heights'
        }
      ]
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'The masonry layout automatically adjusts card heights based on content, creating a dynamic and visually interesting layout that maximizes space usage.'
        }
      ]
    },
    {
      _type: 'block',
      style: 'h3',
      children: [
        {
          _type: 'span',
          text: 'Special Effects'
        }
      ]
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'Each card features special effects including floating accent dots, gradient borders, and smooth animations that activate on hover for a premium feel.'
        }
      ]
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'This paragraph contains some ',
          marks: []
        },
        {
          _type: 'span',
          text: 'bold text',
          marks: ['strong']
        },
        {
          _type: 'span',
          text: ' and some ',
          marks: []
        },
        {
          _type: 'span',
          text: 'italic text',
          marks: ['em']
        },
        {
          _type: 'span',
          text: ' to test the formatting.'
        }
      ]
    },
    {
      _type: 'block',
      style: 'blockquote',
      children: [
        {
          _type: 'span',
          text: 'This is a blockquote to test the blockquote styling. It should have a nice border and background.'
        }
      ]
    },
    {
      _type: 'block',
      listItem: 'bullet',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'First bullet point'
        }
      ]
    },
    {
      _type: 'block',
      listItem: 'bullet',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'Second bullet point'
        }
      ]
    },
    {
      _type: 'block',
      listItem: 'bullet',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'Third bullet point'
        }
      ]
    },
  ]

  // Sample Markdown content
  const markdownContent = `# Test Blog Post - Markdown Formatting

This is a test paragraph to verify that the markdown formatting is working correctly. The text should be properly styled with good typography and spacing.

## Heading 2 Test

This is another paragraph under the H2 heading. It should have proper spacing and typography.

### Heading 3 Test

This paragraph contains some **bold text** and some *italic text* to test the formatting.

> This is a blockquote to test the blockquote styling. It should have a nice border and background.

- First bullet point
- Second bullet point
- Third bullet point

Here's some \`inline code\` to test code formatting.

\`\`\`javascript
// Code block test
function testFunction() {
  console.log('This is a code block test');
  return 'Hello World';
}
\`\`\`

[This is a link](https://example.com) to test link formatting.

![Test Image](https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop&crop=center)
*This is a test image to showcase the enhanced image styling with gradient borders, hover effects, and beautiful animations.*

## FAQ

### What is this test about?

This is a test FAQ section to verify that the FAQ component is working correctly. The FAQ should be rendered as an interactive component with expandable questions and answers.

### How does the FAQ work?

The FAQ component uses React state to manage which questions are expanded or collapsed. Users can click on questions to toggle their visibility.

### Can I expand all FAQs at once?

Yes! There's an "Expand All" button in the FAQ header that allows you to expand or collapse all questions at once.
`

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">Blog Formatting Test</h1>
          
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-blue-400">Portable Text Renderer Test</h2>
            <div className="blog-content">
              <PortableTextRenderer content={portableTextContent} />
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-blue-400">Markdown Renderer Test</h2>
            <div className="blog-content">
              <MarkdownRenderer content={markdownContent} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
