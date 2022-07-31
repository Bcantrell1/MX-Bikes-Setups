import { trpc } from '../../../utils/trpc';
import Link from 'next/link';
import {useRouter} from 'next/router';

function BikesCategoryPage() {
    const router = useRouter();
    const {category} = router.query;
    const {data, isLoading, error} = trpc.useQuery(['bikes.category-bikes', {
        category: category as string
    }]);

    if(isLoading) {
        return <p>Loading...</p>
    }

    return (
        <>
            {error && <p>Error: {error.message}</p>}
            {data?.map((bike) => (
                <article key={bike.id}>
                    <Link href={`/bikes/${bike.name}`}>{bike.name}</Link>
                </article>
            ))}
        </>
    )
}

export default BikesCategoryPage;