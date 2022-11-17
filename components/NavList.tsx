import Link from 'next/link';
import { useRouter } from 'next/router';

export interface Navigation {
  name: string;
  href: string;
}

interface NavigationProps {
  navigation: Navigation[];
}

export const NavList = ({ navigation }: NavigationProps) => {
  const router = useRouter();

  return (
    <ul className="flex items-center gap-6 text-sm">
      {navigation.map(({ href, name }) => {
        return (
          <li key={name}>
            <Link href={href}>
              <a
                className={`transition ${
                  router.pathname === href
                    ? 'text-teal-300 hover:text-teal-300/75'
                    : 'text-white hover:text-white/75'
                }`}
              >
                {name}
              </a>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
