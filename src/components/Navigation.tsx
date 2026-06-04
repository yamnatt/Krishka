import { useState } from 'react';
import { Menu, X, Leaf, Globe, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', href: '#dashboard', isAnchor: true },
    { name: 'Soil Health', href: '#soil-upload-section', isAnchor: true },
    { name: 'Crop Monitor', href: '#monitor', isAnchor: true },
    { name: 'Predictions', href: '#predictions', isAnchor: true },
    { name: 'Community', href: '/community', isAnchor: false },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Leaf className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-heading font-bold gradient-text">
              Krishika
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              item.isAnchor ? (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-foreground hover:text-primary transition-colors font-medium"
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-foreground hover:text-primary transition-colors font-medium"
                >
                  {item.name}
                </Link>
              )
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Globe className="w-4 h-4 mr-2" />
              हिंदी
            </Button>
            <Button variant="outline" size="sm">
              <User className="w-4 h-4 mr-2" />
              Login
            </Button>
            <Button variant="hero" size="sm">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border bg-background">
            <div className="space-y-4">
              {navItems.map((item) => (
                item.isAnchor ? (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block py-2 text-foreground hover:text-primary transition-colors font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="block py-2 text-foreground hover:text-primary transition-colors font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                )
              ))}
              <div className="pt-4 border-t border-border space-y-3">
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <Globe className="w-4 h-4 mr-2" />
                  हिंदी
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <User className="w-4 h-4 mr-2" />
                  Login
                </Button>
                <Button variant="hero" size="lg" className="w-full">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;