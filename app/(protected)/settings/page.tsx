import { auth, signOut } from "@/auth";
import Image from "next/image";
import React from "react";
import { CardContainer, CardItem, CardBody } from "@/components/ui/3d-card";

const SettingsPage = async () => {
  const session = await auth();
  // session?.user.id; mejora el autocompletado

  return (
    <div>
      {JSON.stringify(session)}
      <form
        action={async () => {
          // esto es exclusivamente del lado del servidor
          "use server";
          await signOut();
        }}
      >
        {/* boton de cerrar session de supermaven */}
        {/* <button type="submit" onClick={async () => {
					await auth.signOut();
				}}>
					Cerrar sesión
				</button> */}

        <button>Cerrar Sessión</button>
      </form>

      <div className="flex items-center justify-center">
        <CardContainer className="inter-var">
          <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
            <CardItem
              translateZ="50"
              className="text-xl font-bold text-neutral-600 dark:text-white"
            >
              Bienvenido Usuario
            </CardItem>
            <CardItem
              as="p"
              translateZ="60"
              className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
            >
              Prueba todas nuestras funcionalidades
            </CardItem>
            <CardItem
              translateZ="100"
              // rotateX={20}
              // rotateZ={-10}
              className="w-full mt-4"
            >
              <Image
                src="https://res.cloudinary.com/dy8crd62e/image/upload/v1717429749/gamaliel_gaoa0t.png"
                height="1000"
                width="1000"
                className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                alt="thumbnail"
              />
            </CardItem>
            <div className="flex justify-between items-center mt-20">
              <CardItem
                translateZ={20}
                translateX={-40}
                as="button"
                className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
              >
                Configuración →
              </CardItem>
              <CardItem
                translateZ={20}
                translateX={40}
                as="button"
                className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
              >
                Mis Mascotas
              </CardItem>
            </div>
          </CardBody>
        </CardContainer>
      </div>
    </div>
  );
};

export default SettingsPage;
