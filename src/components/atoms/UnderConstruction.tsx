import underConstructionImg from "@images/under_construction.png";

const UnderConstruction = () => {
  return (
    <div className="bg-slate-950/80 px-4 py-5 md:px-6 md:py-6">
     <div className="w-full max-w-3xl mx-auto">
        <img
          src={underConstructionImg}
          alt="Website under construction"
          className={`
            w-full
            h-40 xs:h-48 sm:h-56
            object-cover object-right
            md:h-auto md:max-h-72
          `}
        />
      </div>

      <p className="mt-4 text-center text-xs md:text-sm text-white">
        Estamos trabajando en esta sección. Algunas funciones aún se están
        construyendo. 🙌
      </p>
    </div>
  );
};

export default UnderConstruction;
