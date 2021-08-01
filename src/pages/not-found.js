import Header from '../components/header';

export default function NotFound() {
  // edint: for route in ROUTES, print link to ROUTE
  return (
    <>
      <div className="bg-gray-background">
        <Header />
        <div className="mx-auth max-w-screen-lg">
          <div>
            <p className="text-center text-2xl">Page not found!</p>
          </div>
        </div>
      </div>
    </>
  );
}
