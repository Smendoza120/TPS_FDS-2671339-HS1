//AiFillEye -> icono para cuando queramos mostrar la contraseña
import { AiFillEdit, AiFillEyeInvisible } from "react-icons/ai";
import { Title } from "../../../components/Title";
import { Button } from "../../../components/Button";
import { BackButton } from "../../../components/BackButton";

import { useForm } from "react-hook-form";

export function ProfileEditing({ back }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <section className="profile__content">
      <BackButton back={back} />

      <Title>Edición de perfil</Title>

      <section className="profile__form-container">
        <div className="profile__form-box">
          <form
            action=""
            className="profile__form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="profile__form-info">
              <div className="profile__form-inputs">
                <label className="profile__form-label" htmlFor="">
                  Nombre
                </label>
                <input
                  className="profile__form-input"
                  name="nameUser"
                  id="nameUser"
                  type="text"
                  {...register("nameUser", {
                    required: true,
                    pattern: /^[A-Za-z]+$/g,
                  })}
                />
                {errors?.nameUser?.type === "pattern" && (
                  <p>Solo puedes agregar texto</p>
                )}
                {errors?.nameUser?.type == "required" && (
                  <p>Este campo es obligatorio</p>
                )}
              </div>

              <div className="profile__form-inputs">
                <label className="profile__form-label" name="" id="" htmlFor="">
                  Contraseña
                </label>
                <input
                  className="profile__form-input"
                  name="passUser"
                  id="passUser"
                  type="password"
                  {...register("passUser", {
                    minLength: 8,
                    required: true,
                  })}
                />
                {errors?.passUser?.type === "minLength" && (
                  <p>La contraseña debe contener 8 caracteres</p>
                )}
                {errors?.passUser?.type === "required" && (
                  <p>Este campo es obligatorio</p>
                )}
                <AiFillEyeInvisible className="profile__form-icon-pass" />
              </div>

              <div className="profile__form-inputs">
                <label className="profile__form-label" htmlFor="">
                  Correo
                </label>
                <input
                  className="profile__form-input"
                  name="mailUser"
                  id="mailUser"
                  type="text"
                  {...register("mailUser", {
                    required: true,
                    pattern: /\S+@\S+\.\S+/,
                  })}
                />
                {errors?.mailUser?.type === "required" && (
                  <p>Este campo es boligatorio</p>
                )}
                {errors?.mailUser?.type === "pattern" && (
                  <p>Formato correo es incorrecto</p>
                )}
              </div>

              <div className="profile__form-inputs">
                <label className="profile__form-label" htmlFor="">
                  Telefono
                </label>
                <input
                  className="profile__form-input"
                  name="phoneUser"
                  id="phoneUser"
                  type="text"
                  {...register("phoneUser", {
                    required: true,
                    pattern: /^[0-9]+$/,
                    maxLength: 10,
                    minLength: 10
                  })}
                />
                {errors?.phoneUser?.type === "required" && (
                  <p>Este campo es boligatorio</p>
                )}
                {errors?.phoneUser?.type === "pattern" && (
                  <p>Formato telefono es incorrecto</p>
                )}
                {errors?.phoneUser?.type === "maxLength" && (
                  <p>El maximo de caracteres es 10</p>
                )}
                {errors?.phoneUser?.type === "minLength" && (
                  <p>El minimo de caracteres es 10</p>
                )}
              </div>

              <div className="profile__form-inputs">
                <label className="profile__form-label" htmlFor="">
                  Cargo
                </label>
                <select
                  className="profile__form-input"
                  name="chargeUser"
                  id="chargeUser"
                >
                  <option>Empleado</option>
                  <option>Administrador</option>
                </select>
              </div>
            </div>

            <div className="profile__form-permits">
              <div className="profile__form-check">
                <input
                  className="profile__form-input"
                  type="checkbox"
                  name="edittingDailySales"
                  id="edittingDailySales"
                />
                <label
                  className="profile__form-label profile__form-text"
                  htmlFor="edittingDailySales"
                >
                  Ventas Diarias
                </label>
              </div>

              <div className="profile__form-check">
                <input
                  className="profile__form-input"
                  type="checkbox"
                  name="edittingInventoryControl"
                  id="edittingInventoryControl"
                />
                <label
                  className="profile__form-label profile__form-text"
                  htmlFor="edittingInventoryControl"
                >
                  Control Inventario
                </label>
              </div>

              <div className="profile__form-check">
                <input
                  className="profile__form-input"
                  type="checkbox"
                  name="edittingHistoricalInvoicing"
                  id="edittingHistoricalInvoicing"
                />
                <label
                  className="profile__form-label profile__form-text"
                  htmlFor="edittingHistoricalInvoicing"
                >
                  Historico Facturación
                </label>
              </div>

              <div className="profile__form-check">
                <input
                  className="profile__form-input"
                  type="checkbox"
                  name="edittingAccountCreation"
                  id="edittingAccountCreation"
                />
                <label
                  className="profile__form-label profile__form-text"
                  htmlFor="edittingAccountCreation"
                >
                  Creacion Cuentas
                </label>
              </div>
            </div>

            <div className="profile__form__buttons">
              <Button className="profile__form__buttons-button">
                Realizar Cambios
              </Button>
            </div>
          </form>
        </div>
      </section>
    </section>
  );
}
