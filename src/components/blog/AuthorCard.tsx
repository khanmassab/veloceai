'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { User, Mail, Linkedin, Github, Globe } from 'lucide-react'
import { Author } from '@/lib/blog'

interface AuthorCardProps {
  author: Author
  showBio?: boolean
}

const AuthorCard = ({ author, showBio = true }: AuthorCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6 glass-dark"
    >
      <div className="flex items-start space-x-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          {author.avatar ? (
            <Image
              src={author.avatar}
              alt={author.name}
              width={64}
              height={64}
              className="w-16 h-16 rounded-full object-cover border-2 border-white/20"
            />
          ) : (
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-xl border-2 border-white/20">
              {author.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
            </div>
          )}
        </div>
        
        {/* Author Info */}
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-2">{author.name}</h3>
          
          {showBio && (
            <p className="text-gray-300 mb-4 leading-relaxed">
              {author.bio}
            </p>
          )}
          
          {/* Social Links */}
          <div className="flex space-x-3">
            {author.social.linkedin && (
              <a
                href={author.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 hover:bg-blue-500/20 text-white hover:text-blue-300 rounded-lg transition-colors border border-white/20"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            {author.social.github && (
              <a
                href={author.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 hover:bg-blue-500/20 text-white hover:text-blue-300 rounded-lg transition-colors border border-white/20"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {author.social.website && (
              <a
                href={author.social.website}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 hover:bg-blue-500/20 text-white hover:text-blue-300 rounded-lg transition-colors border border-white/20"
                aria-label="Website"
              >
                <Globe className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default AuthorCard
