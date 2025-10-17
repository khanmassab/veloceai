import { Metadata } from 'next'
import { Brain, Zap, Users, Target } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About - VeloceAI',
  description: 'Learn about VeloceAI and our mission to make AI accessible to businesses of all sizes. Meet our team and discover our approach to building production-ready AI solutions.',
  openGraph: {
    title: 'About - VeloceAI',
    description: 'Learn about VeloceAI and our mission to make AI accessible to businesses of all sizes.',
    url: 'https://veloceai.co/about',
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-24 neural-bg text-white">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">
            About{' '}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              VeloceAI
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We're on a mission to make AI accessible to businesses of all sizes. 
            Our team of former Google and OpenAI engineers builds production-ready AI solutions in weeks, not months.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-gradient-to-br from-slate-800 to-slate-900 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 text-white">Our Mission</h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-8">
              The AI revolution is happening, but most businesses are being left behind. While tech giants 
              have access to cutting-edge AI capabilities, small and medium businesses struggle with 
              expensive, slow, and often ineffective AI implementations.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              We believe every business deserves access to production-ready AI solutions. That's why we've 
              developed a proven methodology that allows us to ship AI support bots, automation workflows, 
              and intelligent systems in just 6 weeks.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-gradient-to-br from-slate-700 to-slate-800 text-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500/20 border border-blue-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Innovation</h3>
              <p className="text-gray-300">
                We stay at the forefront of AI technology, constantly exploring new approaches and techniques.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-cyan-500/20 border border-cyan-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Speed</h3>
              <p className="text-gray-300">
                We deliver results fast. Our 6-week development cycle gets you to market quickly.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/20 border border-purple-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Collaboration</h3>
              <p className="text-gray-300">
                We work closely with your team to understand your needs and deliver the best solution.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Results</h3>
              <p className="text-gray-300">
                We focus on measurable outcomes that drive real business value for our clients.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-gradient-to-br from-slate-800 to-slate-900 text-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">Our Team</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-slate-700/50 backdrop-blur-sm rounded-xl border border-slate-600/50 p-8">
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                    MK
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2">Massab Khan</h3>
                  <p className="text-lg text-blue-400 mb-4">Founder & CEO</p>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    Former AI engineer at Google and OpenAI. Passionate about making AI accessible 
                    to businesses of all sizes. Expert in building production-ready AI systems, 
                    RAG architectures, and agentic workflows.
                  </p>
                  <div className="flex space-x-4">
                    <a 
                      href="mailto:massab@veloceai.co" 
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Email
                    </a>
                    <a 
                      href="https://www.linkedin.com/in/massabkhan" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      LinkedIn
                    </a>
                    <a 
                      href="https://github.com/massabkhan" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 neural-bg text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help you build production-ready AI solutions for your business.
          </p>
          <a
            href="mailto:massab@veloceai.co"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg font-semibold transition-all duration-200 hover:scale-105"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  )
}
