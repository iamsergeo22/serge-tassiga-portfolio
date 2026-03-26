'use client';

import { usePathname } from 'next/navigation';

const Head = () => {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const pathname = usePathname() as string;

  const titleFixedToShow = pathname.slice(1).charAt(0).toUpperCase() + pathname.slice(2);

  const meta = {
    title: `Serge Anan TASSIGA ${pathname === '/' ? '' : '· ' + titleFixedToShow}`,
    type: 'website'
  };

  return (
    <>
      <title>{meta.title}</title>
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta name='robots' content='follow, index' />
      <link rel='me' href='mailto:sergetassiga22@gmail.com' />
      <meta property='og:type' content={meta.type} />
      <meta property='og:site_name' content='Serge Anan TASSIGA' />
    </>
  )
}

export default Head;