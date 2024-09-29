import {
  Cpu,
  Paperclip,
  Construction,
  GlassWater,
  InspectionPanel,
} from "lucide-react";

export function UpcomingMarketsCard() {
  return (
    <div className="px-2 py-2 md:px-6 md:py-10 mt-10 mb-4 ml-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold capitalize text-black lg:text-3xl">
            Upcoming Local Markets
          </h1>
          <p className="my-2 text-gray-600">
            Discover local markets happening near you this week.
          </p>
        </div>
        {/* Horizontal Countdown Timer */}
        <ul className="flex items-center gap-4">
          <li className="flex flex-col items-center justify-center bg-gray-200 p-2 rounded-md">
            <h5 className="text-xl font-bold text-black">00</h5>
            <span className="text-gray-600 text-sm">Days</span>
          </li>
          <li className="flex flex-col items-center justify-center bg-gray-200 p-2 rounded-md">
            <h5 className="text-xl font-bold text-black">00</h5>
            <span className="text-gray-600 text-sm">Hours</span>
          </li>
          <li className="flex flex-col items-center justify-center bg-gray-200 p-2 rounded-md">
            <h5 className="text-xl font-bold text-black">00</h5>
            <span className="text-gray-600 text-sm">Min</span>
          </li>
          <li className="flex flex-col items-center justify-center bg-gray-200 p-2 rounded-md">
            <h5 className="text-xl font-bold text-black">00</h5>
            <span className="text-gray-600 text-sm">Sec</span>
          </li>
        </ul>
      </div>
      <hr />
      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 xl:mt-12 xl:grid-cols-3 xl:gap-16">
        {/* Market 1 */}
        <div className="market-card flex items-center p-4 rounded-2 gap-4 shadow-lg">
          <div className="thumbnail position-relative rounded-2">
            <a href="#">
              <img
                loading="lazy"
                decoding="async"
                width="500"
                height="400"
                src="/farmers-market.png"
                className="img-fluid rounded-lg"
                alt="Farmers Market"
              />
            </a>
          </div>
          <div className="card-content mt-4 mt-sm-0">
            <h2 className="fw-bold text-heading title d-block text-xl">
              Farmers Market
            </h2>
            <p className="text-gray-600 mt-2">Sunday, August 25, 2024</p>
            <p className="text-gray-600">Downtown Plaza, Los Angeles</p>
          </div>
        </div>
        {/* Add more market cards as needed */}
      </div>
    </div>
  );
}

export default UpcomingMarketsCard;
