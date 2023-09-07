import { Title } from "../../../components/Title";
import { Button } from "../../../components/Button";
import axios from "axios";
import { useEffect, useState } from "react";
import { BackButton } from "../../../components/BackButton";
import { useForm } from "react-hook-form";

export function UserCreation({ back }) {
  //Validacion de formularios
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const [userData, setUserData] = useState({
    names: "",
    mail: "",
    phone: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   axios
  //     .post("users", userData)
  //     .then((response) => {
  //       console.log("respuesta servidor", response);
  //     })
  //     .catch((error) => {
  //       console.error("Error en el servidor", error);
  //     });
  // };

  return (
    <section className="creation__container">
      <BackButton back={back} />

      <Title>Creacion de usuarios</Title>

      <section className="creation__form-container">
        <div className="creation__form-box">
          <form
            action=""
            className="creation__form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="creation__form-inputs">
              <label className="creation__form-label" htmlFor="nameUser">
                Nombre
              </label>
              <input
                className="creation__form-input"
                name="nameUser"
                id="nameUser"
                type="text"
                {...register("nameUser", {
                  required: true,
                  pattern: /^[A-Za-z]+$/g,
                })}
              />
              {errors?.nameUser?.type === "required" && (
                <p>Este campo es obligatorio</p>
              )}
              {errors?.nameUser?.type === "pattern" && (
                <p>Solo puedes agregar texto</p>
              )}
            </div>

            <div className="creation__form-inputs">
              <label className="creation__form-label" htmlFor="passUser">
                Contraseña
              </label>
              <input
                className="creation__form-input"
                name="passUser"
                id="passUser"
                type="password"
                {...register("passUser", {
                  required: true,
                  minLength: 8,
                })}
              />
              {errors?.passUser?.type === "minLength" && (
                <p>La contraseña debe contener 8 caracteres</p>
              )}
              {errors?.passUser?.type === "required" && (
                <p>Este campo es obligatorio</p>
              )}
            </div>

            <div className="creation__form-inputs">
              <label className="creation__form-label" htmlFor="mailUser">
                Correo
              </label>
              <input
                className="creation__form-input"
                name="mailUser"
                id="mailUser"
                type="email"
                {...register("mailUser", {
                  required: true,
                  pattern: /\S+@\S+\.\S+/,
                })}
              />
              {errors?.mailUser?.type === "required" && (
                <p>Este campo es obligatorio</p>
              )}
              {errors?.mailUser?.type === "pattern" && (
                <p>Formato correo es incorrecto</p>
              )}
            </div>

            <div className="creation__form-inputs">
              <label className="creation__form-label" htmlFor="mailUser">
                Telefono
              </label>
              <input
                className="creation__form-input"
                name="phoneUser"
                id="phoneUser"
                type="text"
                pattern="[0-9]+"
                {...register("phoneUser", {
                  required: true,
                  minLength: 10,
                  maxLength: 10,
                  pattern: /^[0-9]+$/,
                })}
              />
              {errors?.phoneUser?.type === "required" && (
                <p>Este campo es obligatorio</p>
              )}
              {errors?.phoneUser?.type === "minLength" && (
                <p>El minimo de caracteres es 10</p>
              )}
              {errors?.phoneUser?.type === "maxLength" && (
                <p>El maximo de caracteres es 10</p>
              )}
              {errors?.phoneUser?.type === "pattern" && (
                <p>Formato telefono es incorrecto</p>
              )}
            </div>

            <div className="creation__form-inputs">
              <label className="creation__form-label" htmlFor="chargeUser">
                Cargo
              </label>
              <select
                className="creation__form-input"
                name="chargeUser"
                id="chargeUser"
              >
                <option>Empleado</option>
                <option>Administrador</option>
              </select>
            </div>

            <div className="creation__form-check-container">
              <div className="creation__form-check">
                <input
                  className="creation__form-check-input"
                  type="checkbox"
                  name="userDailySales"
                  id="userDailySales"
                />
                <label
                  className="creation__form-check-label"
                  htmlFor="userDailySales"
                >
                  Ventas Diarias
                </label>
              </div>

              <div className="creation__form-check">
                <input
                  className="creation__form-check-input"
                  type="checkbox"
                  name="userInventoryControl"
                  id="userInventoryControl"
                />
                <label
                  className="creation__form-check-label"
                  htmlFor="userInventoryControl"
                >
                  Control Inventario
                </label>
              </div>

              <div className="creation__form-check">
                <input
                  className="creation__form-check-input"
                  type="checkbox"
                  name="userHistoricalInvoicing"
                  id="userHistoricalInvoicing"
                />
                <label
                  className="creation__form-check-label"
                  htmlFor="userHistoricalInvoicing"
                >
                  Historico Facturación
                </label>
              </div>

              <div className="creation__form-check">
                <input
                  className="creation__form-check-input"
                  type="checkbox"
                  name="userAccountCreation"
                  id="userAccountCreation"
                />
                <label
                  className="creation__form-check-label"
                  htmlFor="userAccountCreation"
                >
                  Creacion Cuentas
                </label>
              </div>
            </div>
            <Button>Crear Usuario</Button>
          </form>
        </div>
      </section>
    </section>
  );
}
