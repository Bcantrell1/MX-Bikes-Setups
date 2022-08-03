import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { trpc } from "../../../../utils/trpc";

export default function Bike() {
  const router = useRouter();
  const { bikeName } = router.query;

  const { data, isLoading, error } = trpc.useQuery([
    "bikes.single-bike",
    {
      name: bikeName as string,
    },
  ]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Bike</h1>
      {error && <p>Error: {error.message}</p>}
      {data && (
        <>
          <h2>{data.name}</h2>
          <p>{data.bikeId}</p>
          <Image
            src={`/bikes/${data.image}`}
            alt={data.name}
            width={400}
            height={275}
          />
        </>
      )}
    </div>
  );
}

Bike.auth = true;
