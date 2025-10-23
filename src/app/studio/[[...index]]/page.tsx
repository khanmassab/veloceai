'use client'

import { NextStudio } from 'next-sanity/studio'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from '../../../schemas'

const config = defineConfig({
  name: 'veloce-blog',
  title: 'VeloceAI Blog CMS',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  plugins: [
    structureTool(),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
  // Add base path for the studio
  basePath: '/studio',
})

export default function StudioPage() {
  // Check if environment variables are properly configured
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID === 'your-project-id') {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="max-w-2xl mx-auto p-8 text-center">
          <h1 className="text-3xl font-bold mb-6 text-blue-400">Sanity Studio Setup Required</h1>
          <div className="bg-slate-800 p-6 rounded-lg mb-6">
            <p className="text-lg mb-4">
              To use the Sanity Studio, you need to set up your Sanity project first.
            </p>
            <ol className="text-left space-y-2 text-gray-300">
              <li>1. Go to <a href="https://sanity.io" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">sanity.io</a> and create a project</li>
              <li>2. Get your Project ID from the project settings</li>
              <li>3. Create a <code className="bg-slate-700 px-2 py-1 rounded">.env.local</code> file with your project details</li>
              <li>4. Restart the development server</li>
            </ol>
          </div>
          <p className="text-gray-400">
            See <code className="bg-slate-700 px-2 py-1 rounded">SANITY_QUICK_SETUP.md</code> for detailed instructions.
          </p>
        </div>
      </div>
    )
  }

  return <NextStudio config={config} />
}
