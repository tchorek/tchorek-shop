import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote';
import { MarkdownResult } from '../utils';

export const Markdown = ({ children }: { children: MarkdownResult }) => {
  return (
    <MDXRemote
      {...children}
      components={{
        a: ({ href, ...props }) => {
          if (!href) {
            return <a {...props}></a>;
          }

          const APP_URL = process.env.NEXT_PUBLIC_APP_URL;
          if (!APP_URL) {
            throw new Error(`Missing APP_URL env variable!`);
          }

          if (
            href.startsWith('http://' || 'https://') &&
            !href.startsWith(APP_URL)
          ) {
            return (
              <a
                {...props}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
              />
            );
          }

          return (
            <Link href={href}>
              <a {...props}></a>
            </Link>
          );
        },
      }}
    />
  );
};
