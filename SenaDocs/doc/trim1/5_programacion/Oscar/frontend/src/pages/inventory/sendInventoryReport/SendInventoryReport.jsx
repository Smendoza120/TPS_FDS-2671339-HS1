import { Send } from "../../../components/Send";
import { BackButton } from "../../../components/BackButton";

export function SendInventoryReport({ back }) {
  return (
    <>
      <BackButton back={back} />
      <Send title={"Enviar reporte inventario"} />
    </>
  );
}
