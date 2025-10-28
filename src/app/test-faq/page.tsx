import FAQSection from '@/components/blog/FAQSection'

export default function TestFAQPage() {
  const testFAQs = [
    {
      question: "What is the best AI chatbot platform for small businesses?",
      answer: "Tidio and ManyChat work well for small businesses. They offer low-cost entry points, simple setup, and pre-built templates. Both integrate with common tools like Shopify and Facebook. Tidio excels at e-commerce. ManyChat dominates social media automation."
    },
    {
      question: "How much does an AI chatbot cost?",
      answer: "Free plans exist but have limits. Paid plans start around $20-$50 monthly for small businesses. Enterprise solutions like Intercom and Drift range from $39 per seat to $2,500+ monthly. Custom development costs more but delivers exactly what you need. Most businesses see ROI within 3-4 months through reduced support costs."
    },
    {
      question: "Can AI chatbots integrate with my existing CRM?",
      answer: "Yes. Most leading platforms integrate with major CRMs like Salesforce, HubSpot, and Zendesk. Check for pre-built connectors before choosing a platform. API quality matters. Strong APIs enable custom integrations. Weak APIs create implementation headaches. Test integration capabilities during evaluation."
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">FAQ Component Test</h1>
          <p className="text-gray-300 mb-8">
            This page tests the FAQ component with expandable/collapsible functionality.
          </p>
          
          <FAQSection faqs={testFAQs} title="Test FAQ Section" />
          
          <div className="mt-12 p-6 bg-slate-700/50 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">How to Use</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Click on any question to expand/collapse the answer</li>
              <li>Use "Expand All" / "Collapse All" to toggle all FAQs at once</li>
              <li>The component supports rich text formatting in answers</li>
              <li>Styling matches your site's dark theme</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
