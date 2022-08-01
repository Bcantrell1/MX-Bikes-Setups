import { useRouter } from "next/router";
import { useForm } from 'react-hook-form';
import { CreateBikeInput } from "../../schema/bike.schema";
import { trpc } from "../../utils/trpc";
import {getSession} from 'next-auth/react';

export default function CreateBikePage() {
    const {handleSubmit, register} = useForm<CreateBikeInput>();
    const router = useRouter();
    const session = getSession();

    const {mutate, error} = trpc.useMutation(['bikes.create-bike'], {
        onSuccess: ({category}) => router.push(`/bikes/${category}`),
    });

    function onSubmit(values: CreateBikeInput) {
        mutate(values);
      }

      if(!session) return <div>Please Sign to access this route</div>;

      return (
        <div className="h-screen flex justify-center items-center">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-xs bg-white flex flex-col py-5 px-8 rounded-lg shadow-lg">
              {error && error.message}
              <label className="text-gray-700 font-bold py-2" htmlFor="name">Name</label>
              <input className="text-gray-700 shadow border rounded border-gray-300 focus:outline-none focus:shadow-outline py-1 px-3 mb-3" type="text" placeholder="Bike Name" {...register('name')} />
              <label className="text-gray-700 font-bold py-2" htmlFor="name">Category</label>
              <input className="text-gray-700 shadow border rounded border-gray-300 focus:outline-none focus:shadow-outline py-1 px-3 mb-6" type="text" placeholder="Bike Category" {...register('category')} />
              <button className="bg-orange-600 hover:bg-orange-800 text-white font-bold rounded py-2 px-4">Create bike</button>
          </form>
        </div>
      )
}

CreateBikePage.auth = true;