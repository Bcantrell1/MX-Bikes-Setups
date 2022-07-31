import type { NextPage } from 'next'
import {useSession, signIn, signOut} from 'next-auth/react';

const SignInBtn: NextPage = () => {
  const {data: session} = useSession();

  if(session) {
    return (
        <button className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900" onClick={() => signOut()}>Sign out</button>
    );
  };
  
  return (
      <button className="whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-orange-600 hover:bg-orange-700" onClick={() => signIn()}>Sign In</button>
  );
};

export default SignInBtn;
