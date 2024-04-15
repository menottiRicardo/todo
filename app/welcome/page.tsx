import Link from 'next/link';
import React from 'react';

const page = () => {
  return (
    <section className="flex justify-center items-center h-screen">
      <div className="mx-auto px-4 py-8 sm:px-6 lg:px-8 my-auto flex justify-center items-center h-full">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="bg-blue-800 p-8 md:p-12 lg:px-16 lg:py-24">
            <div className="mx-auto max-w-xl text-center">
              <h2 className="text-2xl font-bold text-white md:text-3xl">
                Welcome to Beast List
              </h2>

              <p className="hidden text-white/90 sm:mt-4 sm:block">
                I Appreciate the opportunity to present this test. Let me know
                if you have any other questions!
              </p>

              <div className="mt-4 md:mt-8">
                <Link
                  href={`/api/auth/signin?callbackUrl=${encodeURIComponent(
                    '/'
                  )}`}
                  className="inline-block rounded border border-white bg-white px-12 py-3 text-sm font-medium text-blue-500 transition hover:bg-transparent hover:text-white focus:outline-none focus:ring focus:ring-yellow-400"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-1 lg:grid-cols-2">
            <img
              alt=""
              src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=3544&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="h-40 w-full object-cover sm:h-56 md:h-full"
            />

            <img
              alt=""
              src="https://plus.unsplash.com/premium_photo-1661963783275-dff88a0296f6?q=80&w=3538&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="h-40 w-full object-cover sm:h-56 md:h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
