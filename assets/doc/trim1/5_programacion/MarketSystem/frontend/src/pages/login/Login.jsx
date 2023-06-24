import profileImg from "../../assets/images/icono_sesion.jpg";
// import { useHistory } from "react-router-dom";

//Validacion formulario
import { useForm } from "react-hook-form";

// eslint-disable-next-line react/prop-types
export function Login() {
  // const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data)
    // history.push('/')
  };

  //Funcion para ir a la otra pagina
  //Aqui iria la funcion para poder hacer la ruta e ir a la otra pagina

  return (
    <section className="login">
      <div className="login__container">
        <img className="login__logo" src={profileImg} alt="Logo" />

        <h1 className="login__title">Iniciar Sesión</h1>

        <div className="login__form-container">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="login__form"
            action=""
          >
            <div className="login__form-inputs">
              <label className="login__form-label" htmlFor="mail">
                Correo
              </label>
              <input
                className="login__form-input"
                type="text"
                name="mail"
                id="mail"
                placeholder="example@correo.com"
                {...register("mail", {
                  required: true,
                  pattern: /\S+@\S+\.\S+/,
                })}
              />
              {errors.mail?.type === "required" && (
                <p>Este campo es obligatorio</p>
              )}
              {errors.mail?.type === "pattern" && (
                <p>Formato correo es incorrecto</p>
              )}
            </div>

            <div className="login__form-inputs">
              <label className="login__form-label" htmlFor="pass">
                Contraseña
              </label>
              <input
                className="login__form-input"
                type="password"
                name="pass"
                id="pass"
                placeholder="********"
                {...register("pass", { required: true, minLength: 8})}
              />
              {errors.pass?.type === "required" && (
                <p>Este campo es obligatorio</p>
              )}
              {errors.pass?.type === 'minLength' && (
                <p>La contraseña debe tener mas de 8 caracteres</p>
              )}
            </div>

            <input
              className="login__form-button"
              type="submit"
              value="Ingresar"
            />
          </form>
        </div>
      </div>
    </section>
  );
}
