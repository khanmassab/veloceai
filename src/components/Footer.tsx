import Link from 'next/link'
import { Mail, Linkedin } from 'lucide-react'
import Logo from './Logo'

const Footer = () => {
  const currentYear = 2025 // Use static year to avoid hydration mismatch

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <Logo className="w-12 h-12" />
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  VeloceAI
                </h3>
                <p className="text-sm text-gray-400">Ship AI features in weeks, not quarters</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              We build production-ready AI support bots while your competitors are still hiring teams. 
              Ship in 6 weeks, not 6 months.
            </p>
            <div className="flex space-x-4">
              <a 
                href="mailto:massab@veloceai.co" 
                className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a 
                href="https://www.linkedin.com/company/veloceaico/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-blue-400 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <a 
                  href="mailto:massab@veloceai.co" 
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li className="text-gray-300">AI Support Bots</li>
              <li className="text-gray-300">RAG Implementation</li>
              <li className="text-gray-300">Agentic Workflows</li>
              <li className="text-gray-300">Custom AI Solutions</li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {currentYear} VeloceAI. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
