import Link from 'next/link'

export function NavLink({ href, children }) {
  return (
    <Link
      href={href}
      className="inline-block rounded-lg py-1 px-2 text-md text-theme-oldlace hover:bg-slate-100 hover:text-theme-navy"
    >
      {children}
    </Link>
  )
}
