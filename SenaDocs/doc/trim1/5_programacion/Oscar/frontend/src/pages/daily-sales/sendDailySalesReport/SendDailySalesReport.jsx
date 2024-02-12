import { Send } from "../../../components/Send";
import { BackButton } from "../../../components/BackButton";

export function SendDailySalesReport({ back }) {
  return (
    <>
      <BackButton back={back} />
      <Send title={"Enviar reporte de ventas diarias"} />
    </>
  );
}
