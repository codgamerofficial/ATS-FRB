'use client';

import { useState } from 'react';
import { Users, Shield, BarChart3, Settings, Crown, Zap } from 'lucide-react';
import { SciFiCard } from '@/components/ui/SciFiCard';
import { Button } from '@/components/ui/Button';

export default function EnterpriseFeatures() {
  const [activeTab, setActiveTab] = useState('team');

  const features = {
    team: {
      title: 'Team Collaboration',
      icon: Users,
      items: [
        'Real-time collaborative editing',
        'Team workspace management',
        'Role-based access control',
        'Shared template libraries',
        'Team performance analytics'
      ]
    },
    security: {
      title: 'Enterprise Security',
      icon: Shield,
      items: [
        'SSO integration (SAML, OAuth)',
        'Advanced data encryption',
        'Audit logs and compliance',
        'Custom security policies',
        'GDPR compliance tools'
      ]
    },
    analytics: {
      title: 'Advanced Analytics',
      icon: BarChart3,
      items: [
        'Team productivity metrics',
        'Resume performance insights',
        'Hiring funnel analytics',
        'Custom reporting dashboards',
        'API access for integrations'
      ]
    },
    admin: {
      title: 'Admin Controls',
      icon: Settings,
      items: [
        'Centralized user management',
        'Custom branding options',
        'Template approval workflows',
        'Usage monitoring and limits',
        'Priority support channel'
      ]
    }
  };

  const pricingTiers = [
    {
      name: 'Team',
      price: '$29',
      period: 'per user/month',
      features: ['Up to 50 users', 'Basic collaboration', 'Standard templates', 'Email support'],
      popular: false
    },
    {
      name: 'Business',
      price: '$59',
      period: 'per user/month',
      features: ['Up to 200 users', 'Advanced collaboration', 'Premium templates', 'Priority support', 'Analytics dashboard'],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'contact sales',
      features: ['Unlimited users', 'Full feature access', 'Custom integrations', 'Dedicated support', 'SLA guarantee'],
      popular: false
    }
  ];

  return (
    <div className="space-y-8">
      {/* Feature Tabs */}
      <SciFiCard variant="glow" className="p-6">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Enterprise Features</h2>
        
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {Object.entries(features).map(([key, feature]) => {
            const IconComponent = feature.icon;
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  activeTab === key
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                    : 'bg-slate-800 text-gray-300 hover:text-white'
                }`}
              >
                <IconComponent className="w-5 h-5" />
                {feature.title}
              </button>
            );
          })}
        </div>

        <div className="bg-slate-800 rounded-lg p-6 border border-cyan-500/20">
          <div className="flex items-center gap-3 mb-4">
            {(() => {
              const IconComponent = features[activeTab as keyof typeof features].icon;
              return <IconComponent className="w-6 h-6 text-cyan-400" />;
            })()}
            <h3 className="text-xl font-bold text-white">
              {features[activeTab as keyof typeof features].title}
            </h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            {features[activeTab as keyof typeof features].items.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                <span className="text-gray-300">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </SciFiCard>

      {/* Pricing Tiers */}
      <SciFiCard className="p-6">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Enterprise Pricing</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {pricingTiers.map((tier, index) => (
            <div
              key={index}
              className={`relative bg-slate-800 rounded-lg p-6 border ${
                tier.popular 
                  ? 'border-cyan-500 ring-2 ring-cyan-500/20' 
                  : 'border-cyan-500/20'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Crown className="w-4 h-4" />
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
                <div className="text-3xl font-bold text-cyan-400 mb-1">{tier.price}</div>
                <div className="text-gray-400 text-sm">{tier.period}</div>
              </div>

              <div className="space-y-3 mb-6">
                {tier.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center gap-3">
                    <Zap className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <Button 
                className={`w-full ${
                  tier.popular 
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-500' 
                    : ''
                }`}
              >
                {tier.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
              </Button>
            </div>
          ))}
        </div>
      </SciFiCard>

      {/* Integration Options */}
      <SciFiCard className="p-6">
        <h2 className="text-2xl font-bold text-white mb-6">Enterprise Integrations</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: 'Slack', logo: '💬', description: 'Team notifications' },
            { name: 'Microsoft Teams', logo: '👥', description: 'Collaboration hub' },
            { name: 'Salesforce', logo: '☁️', description: 'CRM integration' },
            { name: 'Workday', logo: '📊', description: 'HR management' },
            { name: 'BambooHR', logo: '🎋', description: 'HR platform' },
            { name: 'Greenhouse', logo: '🏢', description: 'Recruiting software' },
            { name: 'JIRA', logo: '🎯', description: 'Project tracking' },
            { name: 'Custom API', logo: '🔧', description: 'Build your own' }
          ].map((integration, index) => (
            <div key={index} className="bg-slate-800 rounded-lg p-4 border border-cyan-500/20 text-center">
              <div className="text-3xl mb-2">{integration.logo}</div>
              <h3 className="text-white font-semibold mb-1">{integration.name}</h3>
              <p className="text-gray-400 text-sm">{integration.description}</p>
            </div>
          ))}
        </div>
      </SciFiCard>
    </div>
  );
}