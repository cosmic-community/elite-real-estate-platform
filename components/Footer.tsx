import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-secondary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                </svg>
              </div>
              <span className="text-xl font-bold">Elite Real Estate</span>
            </div>
            <p className="text-secondary-300 mb-4 max-w-md">
              Your trusted partner in finding luxury properties and exceptional real estate services. 
              We specialize in connecting clients with their dream homes and investment opportunities.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/properties" className="text-secondary-300 hover:text-white transition-colors">
                  Properties
                </Link>
              </li>
              <li>
                <Link href="/agents" className="text-secondary-300 hover:text-white transition-colors">
                  Agents
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-secondary-300">Property Sales</span>
              </li>
              <li>
                <span className="text-secondary-300">Investment Properties</span>
              </li>
              <li>
                <span className="text-secondary-300">Market Analysis</span>
              </li>
              <li>
                <span className="text-secondary-300">Luxury Homes</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-secondary-700 mt-8 pt-8 text-center">
          <p className="text-secondary-300">
            © {new Date().getFullYear()} Elite Real Estate Platform. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}