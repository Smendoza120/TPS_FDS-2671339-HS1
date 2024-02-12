import { Send } from "../../../components/Send";
import { BackButton } from "../../../components/BackButton";

export function SendingInvoice({ back }) {
  return (
    <>
      <BackButton back={back} />
      <Send title={"Enviar Factura"} />
    </>
  );
}
