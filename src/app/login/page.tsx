import FormLogin from "./FormLogin";

export default function Page() {
  return (
    <>
      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
          <div className="flex-1 bg-indigo-100 text-center lg:flex">
            <div
              className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
              style={{ backgroundImage: `url('/loginbg.svg')` }}
            ></div>
          </div>

          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div>
              <img src="/voowlogo.png" className="w-32 mx-auto" alt="Logo" />
            </div>
            <div className="mt-12 flex flex-col items-center">
              <h1 className="text-2xl xl:text-3xl font-extrabold">Login</h1>
              <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                Selamat Datang Dan Silahkan Login
              </div>
              <div className="w-full flex-1 mt-8">
                <div className="mx-auto max-w-xs">
                  {/* Assuming FormLogin is a valid component */}
                  <FormLogin />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
