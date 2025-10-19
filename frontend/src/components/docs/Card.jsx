import React from 'react';

export default function Card({ title, children, icon: Icon, variant = 'default' }) {
  const variants = {
    default: 'bg-fakepe-surface border-fakepe-border',
    primary: 'bg-gradient-to-br from-fakepe-primary/10 to-fakepe-success/10 border-fakepe-primary/30',
    success: 'bg-gradient-to-br from-fakepe-success/10 to-fakepe-primary/10 border-fakepe-success/30',
    warning: 'bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-500/30',
  };

  return (
    <div className={`my-6 rounded-xl border ${variants[variant]} p-6 shadow-sm transition-all duration-200 hover:shadow-md`}>
      {title && (
        <div className="flex items-center gap-3 mb-4">
          {Icon && (
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-fakepe-primary to-fakepe-success flex items-center justify-center">
              <Icon className="w-5 h-5 text-white" />
            </div>
          )}
          <h3 className="text-lg font-semibold text-fakepe-text-primary">
            {title}
          </h3>
        </div>
      )}
      <div className="text-fakepe-text-secondary">
        {children}
      </div>
    </div>
  );
}

export function InfoCard({ title, children }) {
  return (
    <div className="my-6 rounded-xl border border-fakepe-primary/30 bg-fakepe-primary/10 p-5">
      {title && (
        <h4 className="text-sm font-semibold text-fakepe-text-primary mb-2">
          {title}
        </h4>
      )}
      <div className="text-sm text-fakepe-text-secondary">
        {children}
      </div>
    </div>
  );
}

export function LinkCard({ title, description, href, icon: Icon }) {
  return (
    <a 
      href={href}
      className="block p-6 bg-fakepe-surface border border-fakepe-border rounded-xl hover:shadow-lg hover:border-fakepe-primary transition-all duration-200 group"
    >
      {Icon && (
        <div className="w-10 h-10 bg-fakepe-primary/10 text-fakepe-primary rounded-lg flex items-center justify-center mb-3 group-hover:bg-fakepe-primary group-hover:text-white transition-all duration-200">
          <Icon className="w-5 h-5" />
        </div>
      )}
      <h3 className="font-semibold text-fakepe-text-primary mb-1 group-hover:text-fakepe-primary transition-colors duration-200">
        {title}
      </h3>
      <p className="text-sm text-fakepe-text-secondary">
        {description}
      </p>
    </a>
  );
}
