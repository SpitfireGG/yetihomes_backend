export function generateStaticParams(): { id: string }[] {
  return [{ id: 'placeholder' }];
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
