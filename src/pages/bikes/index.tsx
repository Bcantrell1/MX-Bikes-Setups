import { trpc } from '../../utils/trpc';
import Link from 'next/link';

export default function BikesListingPage() {
    const {data, isLoading, error} = trpc.useQuery(['bikes.categories']);
    const categories = [...new Set(data?.map(bikes => bikes.category))];

    if(isLoading) {
        return <p>Loading...</p>
    }

    return (
        <>
            {error && <p>Error: {error.message}</p>}
            {categories?.map((bike) => (
                <article key={bike}>
                    <Link href={`/bikes/${bike}`}>{bike}</Link>
                </article>
            ))}
        </>
    )
}

BikesListingPage.auth = true;