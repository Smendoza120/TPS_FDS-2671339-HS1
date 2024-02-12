//Componente para renderizar los botones del aplicativo

// eslint-disable-next-line react/prop-types
export function Button({ children }) {
  return (
    <>
      <button className="btn-general">{children}</button>
    </>
  );
}
