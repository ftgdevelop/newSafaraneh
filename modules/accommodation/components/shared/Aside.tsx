import { Accommodation, ServerAddress } from '@/enum/url';
import { Location } from '@/modules/shared/components/ui/icons';
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

function AccommodationAside({ loading, reserveInfo }: { loading?: boolean; reserveInfo?: any }) {
  if (loading) {
    return (
      <div className="p-4 bg-white border rounded-lg text-center">
        <span>در حال بارگذاری...</span>
      </div>
    );
  }
  const [house, setHouse] = useState<any>(null);

  useEffect(() => {
    const fetchHouseDetails = async (houseId: number) => {
      try {
        const response = await axios.get(
          `${ServerAddress.Type}${ServerAddress.Accommodation_Data}${Accommodation.GetHouse}?Id=${houseId}`,
          {
            headers: {
              accept: "text/plain",
              apikey: process.env.PROJECT_SERVER_APIKEY,
              tenantId: process.env.PROJECT_SERVER_TENANTID,
              "accept-language": "fa-IR",
              currency: "EUR",
            },
          }
        );

        setHouse(response.data.result);

      } catch (error) {
        console.error("Error fetching house details:", error);
      }
    };

    fetchHouseDetails(reserveInfo.houseId);

  }, [reserveInfo.houseId]);

  return (
    <div className="p-4 bg-white border rounded-lg">
        {house && (
            <div className="grid grid-cols-3 gap-4 items-start">
                <Image
                    src={house.pictures?.records?.[0]?.path || "/default-image.jpg"}
                    alt={house.title}
                    className="w-full h-24 object-cover rounded-lg mb-4"
                    width={200}
                    height={160}
                />
                <div className="col-span-2 flex flex-col justify-center">
                    <h4 className="text-md font-bold mb-1 mb-2">{house.title}</h4>
                    {house.location && (
                        <div className="text-sm text-gray-500">
                            <Location className="w-4 h-4 fill-current inline-block align-middle" /> {house.location.province || "نامشخص"}، {house.location.city || "نامشخص"}، {house.location.village || "نامشخص"}
                        </div>
                    )}
                </div>
            </div>
        )}
      <hr className="pt-4" />
      <div className='mb-4 flex flex-col gap-4'>
        <div className='flex flex-row justify-between'>
            <span className='text-sm text-gray-500'>تاریخ ورود</span>
            <div>{reserveInfo?.checkin ? new Date(reserveInfo.checkin).toLocaleDateString('fa-IR') : "-"}</div>
        </div>
        <div className='flex flex-row justify-between'>
            <span className='text-sm text-gray-500'>تاریخ خروج</span>
            <div>{reserveInfo?.checkout ? new Date(reserveInfo.checkout).toLocaleDateString('fa-IR') : "-"}</div>
        </div>
      </div>
      {/* <hr className="pt-2" /> */}
      <div className="mb-4 flex justify-between">
        <span className="text-sm text-gray-500">مدت اقامت</span>
        <span className="text-md font-bold">
          {reserveInfo?.stayNights ? `${reserveInfo.stayNights} شب` : "-"}
        </span>
      </div>

      <hr className="pt-4 border-dashed" />

      <div className="mb-2 flex justify-between">
        <span className="text-sm text-gray-500 font-bold">مبلغ قابل پرداخت</span>
        <span className="text-lg font-bold">
          {reserveInfo?.totalPrice
            ? `${reserveInfo.totalPrice.toLocaleString()} تومان`
            : "-"}
        </span>
      </div>
    </div>
  );
}

export default AccommodationAside;