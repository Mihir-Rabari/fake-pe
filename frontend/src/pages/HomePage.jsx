import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Zap, Shield, Code, ArrowRight, CheckCircle2, Terminal, 
  Github, ChevronRight, Clock, Sparkles, Menu, X, ExternalLink,
  Wallet, BarChart3, Lock, Globe, RefreshCw
} from 'lucide-react';
import Logo from '../components/Logo';
import { Button, Card, Badge, CodeBlock, CodeBlockHeader, CodeBlockBody, CodeBlockContent } from '../components/ui';

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-fakepe-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-fakepe-background/80 backdrop-blur-xl border-b border-fakepe-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/">
              <Logo size="md" showText={true} />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-fakepe-text-secondary hover:text-fakepe-primary transition">
                Features
              </a>
              <Link to="/docs" className="text-fakepe-text-secondary hover:text-fakepe-primary transition">
                Docs
              </Link>
              <a href="#pricing" className="text-fakepe-text-secondary hover:text-fakepe-primary transition">
                Pricing
              </a>
              <a 
                href="https://github.com/Mihir-Rabari/fake-pe" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-fakepe-text-secondary hover:text-fakepe-primary transition"
              >
                <Github className="w-5 h-5" />
              </a>
              <Link to="/login" className="text-fakepe-text-secondary hover:text-fakepe-primary transition font-medium">
                Sign In
              </Link>
              <Link to="/register">
                <Button variant="primary" size="sm">
                  Get Started <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-fakepe-text-secondary hover:text-fakepe-primary"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-fakepe-surface border-t border-fakepe-border">
            <div className="container mx-auto px-4 py-4 space-y-3">
              <a href="#features" className="block py-2 text-fakepe-text-secondary">Features</a>
              <Link to="/docs" className="block py-2 text-fakepe-text-secondary">Docs</Link>
              <a href="#pricing" className="block py-2 text-fakepe-text-secondary">Pricing</a>
              <Link to="/login" className="block py-2 text-fakepe-text-secondary">Sign In</Link>
              <Link to="/register" className="block">
                <Button variant="primary" size="sm" className="w-full">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-fakepe-primary rounded-full mix-blend-soft-light filter blur-3xl opacity-10 animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-fakepe-accent rounded-full mix-blend-soft-light filter blur-3xl opacity-10 animate-pulse-slow"></div>
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center justify-center mb-6">
              <Badge variant="primary" size="md">
                <Sparkles className="w-4 h-4" />
                For when you just want it to look real
              </Badge>
            </div>

            {/* Heading */}
            <h1 className="text-5xl md:text-7xl font-bold text-fakepe-text-primary mb-6 leading-tight">
              Fake Payments<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-fakepe-primary to-fakepe-accent">
                Interface
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-fakepe-text-secondary mb-10 max-w-2xl mx-auto leading-relaxed">
              A simulated payment gateway that looks legitimate but is purely visual. 
              Perfect for demos, testing, and development.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/register">
                <Button variant="primary" size="lg">
                  Start Building <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/docs">
                <Button variant="secondary" size="lg">
                  <Terminal className="w-5 h-5" />
                  View Documentation
                </Button>
              </Link>
            </div>

            {/* Trust Badge */}
            <div className="mt-12 flex items-center justify-center gap-8 text-fakepe-text-secondary text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-fakepe-success" />
                <span>Free & Open Source</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-fakepe-primary" />
                <span>Instant Setup</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-fakepe-accent" />
                <span>No Real Money</span>
              </div>
            </div>
          </div>

          {/* Hero Demo Card */}
          <div className="mt-16 max-w-5xl mx-auto">
            <Card variant="glow" className="p-8">
              <div className="bg-fakepe-background rounded-lg p-6 border border-fakepe-border">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <Badge variant="success">Live Demo</Badge>
                </div>
                <div className="font-mono text-sm text-fakepe-text-secondary">
                  <div className="mb-2">
                    <span className="text-fakepe-accent">const</span> <span className="text-fakepe-text-primary">payment</span> = <span className="text-fakepe-accent">await</span> <span className="text-fakepe-primary">fakepe</span>.<span className="text-fakepe-text-primary">create</span>({'{'}
                  </div>
                  <div className="ml-4 mb-2">
                    <span className="text-fakepe-text-primary">amount</span>: <span className="text-fakepe-success">50000</span>,
                  </div>
                  <div className="ml-4 mb-2">
                    <span className="text-fakepe-text-primary">currency</span>: <span className="text-orange-400">'INR'</span>,
                  </div>
                  <div className="ml-4 mb-2">
                    <span className="text-fakepe-text-primary">status</span>: <span className="text-orange-400">'COMPLETED'</span>
                  </div>
                  <div>{'}'});</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-fakepe-background relative">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge variant="primary" size="md" className="mb-4">Features</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-fakepe-text-primary mb-4">
              Everything you need for fake payments
            </h2>
            <p className="text-xl text-fakepe-text-secondary max-w-2xl mx-auto">
              Powerful features that make your demos look professional and your testing seamless.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} variant="default" hover={true} className="p-6 group">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-fakepe-text-primary mb-2">
                  {feature.title}
                </h3>
                <p className="text-fakepe-text-secondary">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Code Example Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="primary" size="md" className="mb-4">Developer Experience</Badge>
              <h2 className="text-4xl font-bold text-fakepe-text-primary mb-4">
                Simple API, powerful results
              </h2>
              <p className="text-xl text-fakepe-text-secondary mb-6">
                Integrate fake payments in minutes with our clean and intuitive API. 
                No complex configurations, just straightforward code.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-fakepe-text-secondary">
                  <CheckCircle2 className="w-5 h-5 text-fakepe-success flex-shrink-0" />
                  <span>TypeScript support out of the box</span>
                </li>
                <li className="flex items-center gap-3 text-fakepe-text-secondary">
                  <CheckCircle2 className="w-5 h-5 text-fakepe-success flex-shrink-0" />
                  <span>Comprehensive documentation</span>
                </li>
                <li className="flex items-center gap-3 text-fakepe-text-secondary">
                  <CheckCircle2 className="w-5 h-5 text-fakepe-success flex-shrink-0" />
                  <span>REST API & SDK available</span>
                </li>
              </ul>
              <Link to="/docs">
                <Button variant="primary" size="lg">
                  Explore Documentation <ChevronRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>

            <CodeBlock>
              <CodeBlockHeader filename="payment.js" language="javascript" />
              <CodeBlockBody>
                <CodeBlockContent 
                  code={`// Install the SDK
npm install fakepe-sdk

// Create a payment
import FakePE from 'fakepe-sdk'

const fakepe = new FakePE({
  apiKey: 'your_api_key'
});

const payment = await fakepe.payments.create({
  amount: 50000,
  currency: 'INR',
});`}
                  language="javascript"
                  showLineNumbers={true}
                  showCopyButton={true}
                />
              </CodeBlockBody>
            </CodeBlock>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <Card variant="gradient" className="p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-fakepe-primary/10 to-fakepe-accent/10"></div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-fakepe-text-primary mb-4">
                Ready to get started?
              </h2>
              <p className="text-xl text-fakepe-text-secondary mb-8 max-w-2xl mx-auto">
                Start building with FakePE today. No credit card required.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/register">
                  <Button variant="primary" size="lg">
                    Create Free Account <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <a href="https://github.com/Mihir-Rabari/fake-pe" target="_blank" rel="noopener noreferrer">
                  <Button variant="secondary" size="lg">
                    <Github className="w-5 h-5" />
                    View on GitHub
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </a>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-fakepe-border">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <Logo size="sm" showText={true} className="mb-4" />
              <p className="text-fakepe-text-secondary text-sm">
                For when you just want it to look real.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-fakepe-text-primary mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-fakepe-text-secondary">
                <li><a href="#features" className="hover:text-fakepe-primary transition">Features</a></li>
                <li><Link to="/docs" className="hover:text-fakepe-primary transition">Documentation</Link></li>
                <li><a href="#pricing" className="hover:text-fakepe-primary transition">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-fakepe-text-primary mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-fakepe-text-secondary">
                <li><Link to="/docs" className="hover:text-fakepe-primary transition">API Reference</Link></li>
                <li><Link to="/docs/examples" className="hover:text-fakepe-primary transition">Examples</Link></li>
                <li><a href="https://github.com/Mihir-Rabari/fake-pe" className="hover:text-fakepe-primary transition">GitHub</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-fakepe-text-primary mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-fakepe-text-secondary">
                <li><a href="#" className="hover:text-fakepe-primary transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-fakepe-primary transition">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-fakepe-border text-center text-sm text-fakepe-text-secondary">
            <p>© 2024 FakePE. All rights reserved. Made with <span className="text-fakepe-primary">♥</span> for developers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    icon: Zap,
    title: 'Instant Transactions',
    description: 'Simulate instant payment transactions without any delays or real processing.',
    gradient: 'from-fakepe-primary to-fakepe-success'
  },
  {
    icon: Shield,
    title: '100% Safe',
    description: 'No real money involved. Perfect for testing, demos, and development environments.',
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    icon: Code,
    title: 'Developer Friendly',
    description: 'Clean API, comprehensive docs, and SDK support for quick integration.',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Terminal,
    title: 'Custom Receipts',
    description: 'Generate professional-looking receipts and transaction confirmations.',
    gradient: 'from-orange-500 to-red-500'
  },
  {
    icon: Wallet,
    title: 'Multiple Methods',
    description: 'Support for UPI, cards, wallets, and more payment methods.',
    gradient: 'from-fakepe-accent to-fakepe-primary'
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description: 'Track and analyze all your fake transactions in real-time.',
    gradient: 'from-indigo-500 to-purple-500'
  }
];
