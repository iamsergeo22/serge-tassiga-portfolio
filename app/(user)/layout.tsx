import '../../styles/globals.css';
import local from 'next/font/local';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import Head from '../head';
import Script from 'next/script';
import { CookiesConsent } from '@/components/sections/CookiesConsent';
import { CookiesSettingsButton } from '@/components/sections/CookiesSettingsButton';

const graphik = local({
  src: [
    {
      path: '../../public/fonts/Graphik-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Graphik-Medium.ttf',
      weight: '600',
      style: 'bold',
    },
  ],
  variable: '--font-graphik',
  display: 'swap',
});

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='fr'>
      <head>
        <Head />
      </head>
      <body className='bg-[#080809] transition ease'>
        <Header />
        <main>{children}</main>
        <Footer />


        {/* Cookies Consent Banner */}
        <CookiesConsent />
        
        {/* Bouton de paramètres des cookies (visible après consentement) */}
        <CookiesSettingsButton />

        {/* Chatwoot Widget */}
        <Script
          strategy="lazyOnload"
          id="chatwoot-script"
          dangerouslySetInnerHTML={{
            __html: `
              (function(d,t) {
                var BASE_URL = "https://app.chatwoot.com";
                var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
                g.src=BASE_URL+"/packs/js/sdk.js";
                g.defer = true;
                g.async = true;
                s.parentNode.insertBefore(g,s);
                g.onload=function(){
                  window.chatwootSDK.run({
                    websiteToken: 'DF7tr98VJ9WZsvoYSoCRyYGA',
                    baseUrl: BASE_URL
                  })
                }
              })(document,"script");
            `
          }}
        />
      </body>
    </html>
  );
};

export default RootLayout;