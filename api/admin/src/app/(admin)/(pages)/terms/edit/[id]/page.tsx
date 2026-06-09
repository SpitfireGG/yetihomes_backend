import AboutEditForm from './abou-edit-form';

export function generateStaticParams(): { id: string }[] {
  return [{ id: 'placeholder' }];
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <AboutEditForm termsId={id} />;
}
