import 'dotenv/config'
import { db } from '../lib/db'
import { generateEmbedding } from '../lib/ai/embedding'

// ROQ CX content to seed
const ROQCX_CONTENT = [
  {
    content: `ROQ CX is a development agency partner that specializes in building custom technology solutions for businesses. We combine cutting-edge AI, automation, and data analysis to create powerful tools that transform customer experiences and drive business growth.`,
    isGlobal: true
  },
  {
    content: `Our core offerings include:
- Custom AI chatbot development and integration
- Data analysis and business intelligence tools
- Process automation solutions
- Customer experience optimization platforms
- Integration with existing business systems
- Real-time analytics and reporting`,
    isGlobal: true
  },
  {
    content: `We serve a diverse range of industries:
- E-commerce and retail
- Financial services and fintech
- Healthcare and medical technology
- Travel and hospitality
- Technology and SaaS companies
- Oil and gas
- Logistics and supply chain
- Professional services`,
    isGlobal: true
  },
  {
    content: `Benefits of partnering with ROQ CX:
- Custom-built solutions tailored to your needs
- Expert development team with AI and automation expertise
- Seamless integration with your existing systems
- Data-driven insights for better decision making
- Scalable solutions that grow with your business
- Ongoing support and optimization`,
    isGlobal: true
  },
  {
    content: `Our development process:
1. Discovery and requirements analysis
2. Solution design and architecture
3. Development and testing
4. Deployment and integration
5. Training and support
6. Continuous optimization`,
    isGlobal: true
  },
  {
    content: `Our technology stack includes:
- AI and machine learning frameworks
- Cloud computing platforms
- Data analysis and visualization tools
- API integration capabilities
- Security and compliance features
- Scalable infrastructure`,
    isGlobal: true
  },
  {
    content: `About our team:
- Experienced developers and engineers
- AI and machine learning specialists
- Data scientists and analysts
- UX/UI designers
- Project managers
- Quality assurance experts
- DevOps engineers`,
    isGlobal: true
  },
  {
    content: `Our approach to security and compliance:
- Data encryption and secure storage
- Regular security audits
- Compliance with industry standards
- GDPR and data privacy compliance
- Secure API integrations
- Regular security updates and patches`,
    isGlobal: true
  },
  {
    content: `Pricing and engagement models:
- Fixed-price projects
- Time and materials
- Dedicated team
- Hybrid engagement models
- Transparent pricing
- Flexible payment terms`,
    isGlobal: true
  },
  {
    content: `Support and maintenance:
- Regular system updates
- Performance monitoring
- Security patches
- Feature enhancements
- Training and documentation`,
    isGlobal: true
  },
  {
    content: `Our success metrics:
- Client satisfaction rates
- Project completion on time
- System performance metrics
- User adoption rates
- ROI measurement
- Customer feedback scores`,
    isGlobal: true
  },
  {
    content: `Case studies and success stories:
- Emirates Dubai 7s Ticketing Platform & Mobile App:
  * Developed a comprehensive digital platform for one of the region's premier rugby events
  * Processed 80,000+ ticket passes and 2M+ app interactions
  * Implemented real-time ticket validation with 3,000+ scans per hour during peak times
  * Integrated digital payments with 2,400+ transactions
  * Provided detailed attendee insights and analytics
  * Enhanced security and streamlined event operations`,
    isGlobal: true
  },
  {
    content: `Integration capabilities:
- CRM systems (Salesforce, HubSpot)
- ERP systems
- Payment gateways
- E-commerce platforms
- Marketing automation tools
- Analytics platforms`,
    isGlobal: true
  },
  {
    content: `Our commitment to quality:
- Code review processes
- Automated testing
- Performance optimization
- Security best practices
- Documentation standards
- Continuous improvement`,
    isGlobal: true
  }
]

async function seedDatabase() {
  try {
    console.log('Starting database seeding...')
    
    // Process each content item
    for (const { content, isGlobal } of ROQCX_CONTENT) {
      console.log('Processing content:', content.slice(0, 50) + '...')
      
      // Generate embedding for the content
      const embedding = await generateEmbedding(content)
      
      // Insert into database
      const chunkId = crypto.randomUUID()
      const now = Date.now()
      
      await db.batch([
        {
          sql: `
            INSERT INTO chunks (id, content, is_global, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?)
          `,
          args: [chunkId, content, isGlobal, now, now]
        },
        {
          sql: `
            INSERT INTO embeddings (id, chunk_id, embedding, created_at, updated_at)
            VALUES (?, ?, vector32(?), ?, ?)
          `,
          args: [crypto.randomUUID(), chunkId, JSON.stringify(embedding), now, now]
        }
      ])
      
      console.log('Content processed successfully')
    }

    console.log('Database seeding completed successfully')
    process.exit(0)
  } catch (error) {
    console.error('Error seeding database:', error)
    process.exit(1)
  }
}

seedDatabase() 