import { useContext } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { ReservationCardProps } from "../../types/types";
import { HandleOpenContext } from "../../utils/context";
import Swal from "sweetalert2";
import { deleteReservation } from "../../redux/slices/reservations.slice";

const ReservationRow = ({ reservationData, index }: ReservationCardProps) => {
  const dispatch = useAppDispatch();
  const context = useContext(HandleOpenContext);
  const { checkInDate, checkOutDate, room, userId, idReservation } =
    reservationData;

  const userName = useAppSelector((state) => state.userReducer.users)
    .filter((user) => user.id === userId)
    .map((user) => user.email);

  const hotelName = room?.hotel?.name;
  const cityHotel = room?.hotel?.city;

  return (
    <tr
      className={`${
        index ? (index % 2 === 0 ? "bg-white" : "bg-blue-100/disabled") : 0
      }  gap-2 group hover:bg-blue-600 hover:text-white text-gray-900"  `}
    >
      <td>{userName[0]}</td>
      <td>{hotelName}</td>
      <td>{cityHotel}</td>
      <td>{`${checkInDate
        .slice(0, 10)
        .replace(/-/g, "/")
        .split("/")
        .reverse()
        .join("/")} - ${checkOutDate
        .slice(0, 10)
        .replace(/-/g, "/")
        .split("/")
        .reverse()
        .join("/")}`}</td>
      <td className="flex flex-row justify-start gap-2">
        <button
          className="border border-black group-hover:border-white rounded-lg p-1"
          onClick={() => {
            context?.handleReservationDetailOpen(idReservation);
          }}
        >
          Ver detalle
        </button>

        <button
          className="border border-black group-hover:border-white rounded-lg p-1"
          onClick={() => {
            context?.handleReservationUpdateOpen(idReservation);
          }}
        >
          Editar reserva
        </button>
        <button
          className=" bg-red-500 text-white border-black group-hover:border-white rounded-lg p-1"
          onClick={() => {
            Swal.fire({
              title: "Desea eliminar la reserva?",
              text: "No podrá revertirlo",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Si, borrar",
            }).then((result) => {
              if (result.isConfirmed) {
                dispatch(deleteReservation(idReservation));
                Swal.fire(
                  "Eliminada!",
                  "Su reserva ha sido eliminada exitosamente",
                  "success"
                );
              }
            });
          }}
        >
          Eliminar reserva
        </button>
      </td>
    </tr>
  );
};

export default ReservationRow;
