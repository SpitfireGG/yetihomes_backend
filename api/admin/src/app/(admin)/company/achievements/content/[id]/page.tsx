import AddContentForm from './content-add'

type Props = {
    params: Promise<{ trip_id: string, id: string }>
}

const page = async ({ params }: Props) => {
    const { trip_id, id } = await params;
    return (
        <AddContentForm tripId={trip_id} destinationId={id} />
    )
}

export default page