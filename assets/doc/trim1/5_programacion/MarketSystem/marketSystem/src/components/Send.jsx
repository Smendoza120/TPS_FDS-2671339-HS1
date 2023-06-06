import { Title } from "./Title";
import { Button } from "./Button";
import { SiWhatsapp } from "react-icons/si";
import { AiFillPrinter, AiOutlineDownload } from "react-icons/ai";
import { BiMailSend } from "react-icons/bi";


// eslint-disable-next-line react/prop-types
export function Send({ title }) {
  return (
    <>
      <Title>{title}</Title>
      <section className="send__form-container">
        <div className="send__form-send">
          <form action="" className="send__form">
            <div className="send__form-data">
              <label className="send__form-label" htmlFor="">Nombre</label>
              <input className="send__form-input" type="text" />
            </div>

            <div className="send__form-data">
              <label className="send__form-label" htmlFor="">Correo</label>
              <input className="send__form-input" type="text" />
            </div>

            <div className="send__form-data">
              <label className="send__form-label" htmlFor="">Celular</label>
              <input className="send__form-input" type="text" />
            </div>

            <div className="send__form-icons">
              <BiMailSend  className="send__form-icons-icon send__form-icons-icon-mail"/>
              <SiWhatsapp  className="send__form-icons-icon send__form-icons-icon-whatsapp"/>
              <AiFillPrinter  className="send__form-icons-icon send__form-icons-icon-print"/>
              <AiOutlineDownload  className="send__form-icons-icon send__form-icons-icon-download"/>
            </div>

            <div className="send__form-button">
              <Button>Enviar</Button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
